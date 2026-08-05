import React, { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import SecurityGrid from './components/SecurityGrid';
import Navbar from './components/Navbar';
import AiAssistant from './components/AiAssistant';
import HomeView from './components/views/HomeView';
import { NAV_LINKS } from './constants';
import { trackPageView } from './analytics';

const ExperienceView = lazy(() => import('./components/views/ExperienceView'));
const AboutView = lazy(() => import('./components/views/AboutView'));
const ToolsView = lazy(() => import('./components/views/ToolsView'));
const ContactView = lazy(() => import('./components/views/ContactView'));

const MotionDiv = motion.div as any;
const validPages = new Set(NAV_LINKS.map((link) => link.id));

const getPageFromHash = () => {
  const page = window.location.hash.replace(/^#/, '');
  return validPages.has(page) ? page : 'home';
};

const ViewFallback = () => (
  <div role="status" className="flex min-h-[60vh] items-center justify-center px-6 text-sm text-slate-400">
    Loading section…
  </div>
);

function App() {
  const [activePage, setActivePage] = useState(getPageFromHash);
  const mainRef = useRef<HTMLElement>(null);
  const isInitialRender = useRef(true);

  useEffect(() => {
    const handleHashChange = () => setActivePage(getPageFromHash());
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    const pageName = NAV_LINKS.find((link) => link.id === activePage)?.name ?? 'Home';
    document.title = `${pageName} | Sergio Uncos`;
    trackPageView(document.title);

    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    window.requestAnimationFrame(() => mainRef.current?.focus({ preventScroll: true }));
  }, [activePage]);

  const navigate = useCallback((page: string) => {
    const nextPage = validPages.has(page) ? page : 'home';
    setActivePage(nextPage);
    if (window.location.hash !== `#${nextPage}`) {
      window.location.hash = nextPage;
    }
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
