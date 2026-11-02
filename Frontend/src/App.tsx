import { useEffect, useRef, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Problem from './components/Problem';
import Process from './components/Process';
import Operations from './components/Operations';
import Impact from './components/Impact';
import AuthFlow from './components/AuthFlow';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

// Per-section color mapping (saturated, vivid versions from logo)
const SECTION_COLORS: Record<string, string> = {
  hero:       'rgba(34, 139, 34, 0.55)',
  operations: 'rgba(30, 100, 220, 0.55)',
  problem:    'rgba(240, 150, 20, 0.55)',
  process:    'rgba(34, 139, 34, 0.55)',
  impact:     'rgba(30, 100, 220, 0.55)',
  footer:     'rgba(34, 139, 34, 0.55)',
};

function App() {
  const [bgColor, setBgColor] = useState(SECTION_COLORS.hero);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [initialAuthMode, setInitialAuthMode] = useState<'login' | 'signup'>('login');
  const [initialAuthRole, setInitialAuthRole] = useState<'water' | 'electric' | 'waste' | null>(null);
  const [user, setUser] = useState<{ adminName: string; role: string } | null>(null);

  const heroRef = useRef<HTMLDivElement>(null);
  const commandRef = useRef<HTMLDivElement>(null);
  const problemRef = useRef<HTMLDivElement>(null);
  const systemRef = useRef<HTMLDivElement>(null);
  const impactRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sectionMap: { ref: React.RefObject<HTMLDivElement | null>; key: string }[] = [
      { ref: heroRef, key: 'hero' },
      { ref: commandRef, key: 'operations' },
      { ref: problemRef, key: 'problem' },
      { ref: systemRef, key: 'process' },
      { ref: impactRef, key: 'impact' },
      { ref: footerRef, key: 'footer' },
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the most visible section
        let best: IntersectionObserverEntry | null = null;
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!best || entry.intersectionRatio > best.intersectionRatio) {
              best = entry;
            }
          }
        });
        if (best) {
          const key = (best as IntersectionObserverEntry).target.getAttribute('data-section');
          if (key && SECTION_COLORS[key]) {
            setBgColor(SECTION_COLORS[key]);
          }
        }
      },
      { threshold: [0.1, 0.3, 0.5, 0.7], rootMargin: '-10% 0px -10% 0px' }
    );

    sectionMap.forEach(({ ref }) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen selection:bg-blue-600 selection:text-white">
      {/* Scroll-driven color background */}
      <div
        className="fixed inset-0 z-[-2] min-h-screen pointer-events-none"
        style={{ backgroundColor: bgColor, transition: 'background-color 0.4s ease' }}
      />
      {/* Subtle grid texture */}
      <div className="fixed inset-0 z-[-1] min-h-screen grid-bg pointer-events-none opacity-30" />

      <Navbar 
        user={user}
        onLogout={() => setUser(null)}
        onOpenAuth={(mode, role) => {
          setInitialAuthMode(mode);
          setInitialAuthRole(role || null);
          setIsAuthOpen(true);
        }} 
      />

      <main className="flex flex-col gap-16 md:gap-32 pb-32 pt-16 relative z-10">
        <div ref={heroRef} data-section="hero"><Hero /></div>
        <div ref={commandRef} data-section="operations">
          <Operations 
            user={user}
            onOpenAuth={(mode, role) => {
              setInitialAuthMode(mode);
              setInitialAuthRole(role || null);
              setIsAuthOpen(true);
            }} 
          />
        </div>
        <div ref={problemRef} data-section="problem"><Problem /></div>
        <div ref={systemRef} data-section="process"><Process /></div>
        <div ref={impactRef} data-section="impact"><Impact /></div>
      </main>

      <AuthFlow 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)} 
        initialMode={initialAuthMode}
        initialRole={initialAuthRole}
        onLoginSuccess={(userData) => {
          setUser(userData);
          setIsAuthOpen(false);
        }}
      />

      <FAQ />

      <div ref={footerRef} data-section="footer">
        <Footer />
      </div>
    </div>
  );
}

export default App;
