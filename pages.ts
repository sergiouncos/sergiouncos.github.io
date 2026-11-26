import type { MouseEvent } from 'react';

export const SITE_URL = 'https://sergiouncos.github.io';

export const PAGES = {
  home: {
    path: '/',
    title: 'Sergio Uncos | Senior Security Engineer',
    description: 'Sergio Uncos\' cybersecurity portfolio: security engineering, GRC, third-party risk management, IAM, cloud security, and incident response.',
  },
  experience: {
    path: '/experience/',
    title: 'Cybersecurity & Third-Party Risk Experience | Sergio Uncos',
    description: 'Explore Sergio Uncos\' experience in third-party risk management, GRC, security engineering, vulnerability management, and incident response.',
  },
  about: {
    path: '/about/',
    title: 'About Sergio Uncos | Security Skills & Certifications',
    description: 'Learn about Sergio Uncos\' cybersecurity background, security skills, certifications, and fluency in English, Portuguese, and Spanish.',
  },
  tools: {
    path: '/tools/',
    title: 'Cybersecurity Tools & Security Arsenal | Sergio Uncos',
    description: 'Discover the cybersecurity tools Sergio Uncos uses for intelligence, security analysis, vulnerability management, and defense.',
  },
  contact: {
    path: '/contact/',
    title: 'Contact Sergio Uncos | Cybersecurity & GRC',
    description: 'Contact Sergio Uncos to discuss security architecture, compliance audits, cybersecurity work, and professional opportunities.',
  },
} as const;

export type PageId = keyof typeof PAGES;

export const isPageId = (page: string): page is PageId => Object.hasOwn(PAGES, page);

export const getPagePath = (page: string) => PAGES[isPageId(page) ? page : 'home'].path;

export const getPageFromPath = (pathname: string): PageId => {
  const path = pathname.replace(/\/index\.html$/, '/').replace(/\/?$/, '/');
  return (Object.keys(PAGES) as PageId[]).find((page) => PAGES[page].path === path) ?? 'home';
};

export const followPageLink = (
  event: MouseEvent<HTMLAnchorElement>,
  page: string,
  navigate: (page: string) => void,
) => {
  if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return false;
  event.preventDefault();
  navigate(page);
  return true;
};

export const updatePageMetadata = (page: PageId) => {
  const { title, description, path } = PAGES[page];
  const url = `${SITE_URL}${path}`;
  document.title = title;
  const values: Record<string, string> = {
    'meta[name="description"]': description,
    'meta[property="og:title"]': title,
    'meta[property="og:description"]': description,
    'meta[property="og:url"]': url,
    'meta[name="twitter:title"]': title,
    'meta[name="twitter:description"]': description,
  };
  for (const [selector, value] of Object.entries(values)) {
    document.querySelector(selector)?.setAttribute('content', value);
  }
  document.querySelector('link[rel="canonical"]')?.setAttribute('href', url);
  const profile = document.getElementById('portfolio-profile');
  if (profile?.textContent) {
    const data = JSON.parse(profile.textContent);
    profile.textContent = JSON.stringify({ ...data, url, name: title, description });
  }
};
