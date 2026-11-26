export const REGIONAL_VISIT_SESSION_KEY = 'portfolio:regional-visit:shown:v1';
export const GEOLOCATION_URL = 'https://free.freeipapi.com/api/v1/json';

export type RegionalVisit = {
  ip: string;
  location: string;
};

type SessionStorage = Pick<Storage, 'getItem' | 'setItem'>;

const isIpAddress = (value: string): boolean => {
  if (value.length > 45) return false;
  if (value.includes(':')) {
    if (!/^[\da-f:.]+$/i.test(value)) return false;
    try {
      return new URL(`https://[${value}]/`).hostname.startsWith('[');
    } catch {
      return false;
    }
  }
  const parts = value.split('.');
  return parts.length === 4 && parts.every(part =>
    /^(0|[1-9]\d{0,2})$/.test(part) && Number(part) <= 255
  );
};

export const parseRegionalVisit = (value: unknown): RegionalVisit | null => {
  if (!value || typeof value !== 'object') return null;
  const data = value as Record<string, unknown>;
  if (data.countryCode !== 'BR') return null;
  const regionCode = typeof data.regionCode === 'string' ? data.regionCode.trim().toUpperCase() : '';
  const regionName = typeof data.regionName === 'string' ? data.regionName.trim().toLowerCase() : '';
  if (regionCode && regionCode !== 'RS' && regionCode !== 'BR-RS') return null;
  if (!regionCode && regionName !== 'rio grande do sul') return null;
  if (regionName && regionName !== 'rio grande do sul') return null;
  if (typeof data.ipAddress !== 'string') return null;
  const ip = data.ipAddress.trim();
  if (!isIpAddress(ip)) return null;
  const city = typeof data.cityName === 'string'
    ? data.cityName.trim().replace(/[\u0000-\u001f\u007f]/g, '').slice(0, 80)
    : '';
  return {
    ip,
    location: [city, 'Rio Grande do Sul', 'Brasil'].filter(Boolean).join(' · '),
  };
};

export const lookupRegionalVisit = async (
  storage: SessionStorage,
  signal: AbortSignal,
  request: typeof fetch = fetch,
): Promise<RegionalVisit | null> => {
  try {
    if (signal.aborted || storage.getItem(REGIONAL_VISIT_SESSION_KEY) === 'shown') return null;
    const response = await request(GEOLOCATION_URL, {
      method: 'GET',
      mode: 'cors',
      credentials: 'omit',
      referrerPolicy: 'no-referrer',
      cache: 'no-store',
      signal,
    });
    if (!response.ok || signal.aborted) return null;
    const visit = parseRegionalVisit(await response.json());
    if (!visit || signal.aborted || storage.getItem(REGIONAL_VISIT_SESSION_KEY) === 'shown') return null;
    storage.setItem(REGIONAL_VISIT_SESSION_KEY, 'shown');
    return visit;
  } catch {
    return null;
  }
};
