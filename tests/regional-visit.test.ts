import assert from 'node:assert/strict';
import test from 'node:test';
import { GEOLOCATION_URL, REGIONAL_VISIT_SESSION_KEY, lookupRegionalVisit, parseRegionalVisit } from '../regional-visit.ts';

const eligible = {
  ipAddress: '203.0.113.42',
  countryCode: 'BR',
  regionCode: 'RS',
  regionName: 'Rio Grande do Sul',
  cityName: 'Esteio',
};

const session = () => {
  const values = new Map<string, string>();
  return {
    values,
    getItem: (key: string) => values.get(key) ?? null,
    setItem: (key: string, value: string) => { values.set(key, value); },
  };
};

const jsonRequest = (value: unknown, status = 200) =>
  (async () => new Response(JSON.stringify(value), { status })) as typeof fetch;

test('only accepts Rio Grande do Sul in Brazil with a valid IP address', () => {
  assert.deepEqual(parseRegionalVisit(eligible), {
    ip: '203.0.113.42',
    location: 'Esteio · Rio Grande do Sul · Brasil',
  });
  assert.equal(parseRegionalVisit({ ...eligible, countryCode: 'RS' }), null);
  assert.equal(parseRegionalVisit({ ...eligible, regionCode: 'SP', regionName: 'São Paulo' }), null);
  assert.equal(parseRegionalVisit({ ...eligible, regionCode: 'RS', regionName: 'São Paulo' }), null);
  assert.equal(parseRegionalVisit({ ...eligible, regionCode: '', regionName: '' }), null);
  assert.equal(parseRegionalVisit({ ...eligible, ipAddress: '999.0.0.1' }), null);
  assert.equal(parseRegionalVisit({ ...eligible, ipAddress: 'example.com' }), null);
  assert.equal(parseRegionalVisit({ ...eligible, ipAddress: '2001:db8::1]/path' }), null);
  assert.equal(parseRegionalVisit(null), null);
});

test('supports IPv6 and missing city without inventing a city', () => {
  assert.deepEqual(parseRegionalVisit({ ...eligible, ipAddress: '2001:db8::1', cityName: null }), {
    ip: '2001:db8::1',
    location: 'Rio Grande do Sul · Brasil',
  });
  assert.notEqual(parseRegionalVisit({ ...eligible, regionCode: '', regionName: 'Rio Grande do Sul' }), null);
  assert.notEqual(parseRegionalVisit({ ...eligible, regionCode: 'BR-RS' }), null);
});

test('does not attach visitor data, cookies or a referrer to the lookup request', async () => {
  const storage = session();
  const request = (async (input, options) => {
    assert.equal(input, GEOLOCATION_URL);
    assert.equal(options?.method, 'GET');
    assert.equal(options?.credentials, 'omit');
    assert.equal(options?.referrerPolicy, 'no-referrer');
    assert.equal(options?.cache, 'no-store');
    assert.equal(options?.body, undefined);
    return new Response(JSON.stringify(eligible));
  }) as typeof fetch;
  assert.notEqual(await lookupRegionalVisit(storage, new AbortController().signal, request), null);
});

test('stores only a shown marker and skips further lookups in the same tab session', async () => {
  const storage = session();
  let lookups = 0;
  const request = (async () => {
    lookups++;
    return new Response(JSON.stringify(eligible));
  }) as typeof fetch;
  const signal = new AbortController().signal;
  assert.notEqual(await lookupRegionalVisit(storage, signal, request), null);
  assert.equal(await lookupRegionalVisit(storage, signal, request), null);
  assert.equal(lookups, 1);
  assert.deepEqual([...storage.values], [[REGIONAL_VISIT_SESSION_KEY, 'shown']]);
});

test('another region does not display or persist the visitor data', async () => {
  const storage = session();
  const result = await lookupRegionalVisit(storage, new AbortController().signal,
    jsonRequest({ ...eligible, regionCode: 'SP', regionName: 'São Paulo' }));
  assert.equal(result, null);
  assert.equal(storage.values.size, 0);
});

test('HTTP errors, invalid JSON and network failures leave no stored data', async () => {
  const requests = [
    jsonRequest({ error: 'limited' }, 429),
    (async () => new Response('invalid JSON')) as typeof fetch,
    (async () => { throw new TypeError('Network unavailable'); }) as typeof fetch,
  ];
  for (const request of requests) {
    const storage = session();
    assert.equal(await lookupRegionalVisit(storage, new AbortController().signal, request), null);
    assert.equal(storage.values.size, 0);
  }
});

test('aborted requests cannot display a notice or set the session marker', async () => {
  const storage = session();
  const controller = new AbortController();
  controller.abort();
  const neverRequest = (async () => { assert.fail('Request should not run'); }) as typeof fetch;
  assert.equal(await lookupRegionalVisit(storage, controller.signal, neverRequest), null);
  const secondController = new AbortController();
  const request = (async () => {
    secondController.abort();
    return new Response(JSON.stringify(eligible));
  }) as typeof fetch;
  assert.equal(await lookupRegionalVisit(storage, secondController.signal, request), null);
  assert.equal(storage.values.size, 0);
});

test('unavailable session storage fails closed instead of repeating the notice', async () => {
  const blocked = {
    getItem: () => { throw new Error('Storage unavailable'); },
    setItem: () => { assert.fail('Storage write should not run'); },
  };
  const neverRequest = (async () => { assert.fail('Request should not run'); }) as typeof fetch;
  assert.equal(await lookupRegionalVisit(blocked, new AbortController().signal, neverRequest), null);
  const writeBlocked = {
    getItem: () => null,
    setItem: () => { throw new Error('Storage write blocked'); },
  };
  assert.equal(await lookupRegionalVisit(writeBlocked, new AbortController().signal, jsonRequest(eligible)), null);
});
