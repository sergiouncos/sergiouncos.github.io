const GOOGLE_TAG_ID = 'G-WDGZL3L2WF';
const GOOGLE_TAG_SCRIPT_ID = 'google-tag-script';

declare global {
  interface Window {
    dataLayer: IArguments[];
    gtag?: (...args: unknown[]) => void;
  }
}

let lastTrackedPath = '';

const initializeGoogleTag = () => {
  window.dataLayer = window.dataLayer || [];

  if (!window.gtag) {
    window.gtag = function gtag(..._args: unknown[]) {
      window.dataLayer.push(arguments);
    };

    window.gtag('js', new Date());
    window.gtag('config', GOOGLE_TAG_ID, {
      send_page_view: false,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
    });
  }

  if (!document.getElementById(GOOGLE_TAG_SCRIPT_ID)) {
    const script = document.createElement('script');
    script.id = GOOGLE_TAG_SCRIPT_ID;
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_TAG_ID}`;
    document.head.appendChild(script);
  }
};

export const trackPageView = (pageTitle: string) => {
  const pagePath = `${window.location.pathname}${window.location.search}${window.location.hash}`;
  if (pagePath === lastTrackedPath) return;

  lastTrackedPath = pagePath;
  window.gtag?.('event', 'page_view', {
    page_title: pageTitle,
    page_location: window.location.href,
    page_path: pagePath,
  });
};

initializeGoogleTag();
