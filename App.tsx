import React, { Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import SecurityGrid from './components/SecurityGrid';
import Navbar from './components/Navbar';
import AiAssistant from './components/AiAssistant';
import HomeView from './components/views/HomeView';
import { trackPageView } from './analytics';
import { getPageFromPath, getPagePath, isPageId, updatePageMetadata, type PageId } from './pages';

import ExperienceView from './components/views/ExperienceView';
import AboutView from './components/views/AboutView';
import ToolsView from './components/views/ToolsView';
import ContactView from './components/views/ContactView';

const MotionDiv = motion.div as any;

const ViewFallback = () => (
  <div role="status" className="flex min-h-[60vh] items-center justify-center px-6 text-sm text-slate-400">
    Loading section…
  </div>
);

function App({ initialPage = 'home' }: { initialPage?: PageId }) {
  const [activePage, setActivePage] = useState<PageId>(initialPage);
  const mainRef = useRef<HTMLElement>(null);
  const isInitialRender = useRef(true);

  useEffect(() => {
    const handlePopState = () => setActivePage(getPageFromPath(window.location.pathname));
    const handleHashChange = () => {
      const page = window.location.hash.slice(1);
      if (!isPageId(page)) return;
      window.history.replaceState(null, '', `${getPagePath(page)}${window.location.search}`);
      setActivePage(page);
    };
    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  useEffect(() => {
    updatePageMetadata(activePage);
    trackPageView(document.title);

    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    window.requestAnimationFrame(() => mainRef.current?.focus({ preventScroll: true }));
  }, [activePage]);

  const navigate = useCallback((page: string) => {
    const nextPage = isPageId(page) ? page : 'home';
    const path = getPagePath(nextPage);
    if (window.location.pathname !== path || window.location.hash) {
      window.history.pushState(null, '', path);
    }
    setActivePage(nextPage);
    window.scrollTo(0, 0);
  }, []);

  const renderPage = () => {
    switch (activePage) {
      case 'home': return <HomeView onNavigate={navigate} />;
      case 'experience': return <ExperienceView />;
      case 'about': return <AboutView />;
      case 'tools': return <ToolsView />;
      case 'contact': return <ContactView />;
      default: return <HomeView onNavigate={navigate} />;
    }
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-screen overflow-x-hidden bg-slate-950 text-slate-300 selection:bg-brand-accent/30 selection:text-white">
        <SecurityGrid />

        <div className="relative z-10 flex min-h-screen flex-col">
          <Navbar activePage={activePage} setActivePage={navigate} />
          <AiAssistant />

          <main ref={mainRef} tabIndex={-1} className="flex flex-grow flex-col outline-none">
            <AnimatePresence mode="wait">
              <MotionDiv
                key={activePage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="flex-grow"
              >
                <Suspense fallback={<ViewFallback />}>
                  {renderPage()}
                </Suspense>
              </MotionDiv>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </MotionConfig>
  );
}

export default App;
