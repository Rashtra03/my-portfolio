import { useState, useEffect, useRef } from 'react';
import { X, ExternalLink, Globe, RefreshCw } from 'lucide-react';
import gsap from 'gsap';

interface EcommerceDemoProps {
  onClose: () => void;
}

export default function EcommerceDemo({ onClose }: EcommerceDemoProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [iframeKey, setIframeKey] = useState(0); // Used for refreshing the iframe
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const demoUrl = 'https://rashtra03.github.io/E-Commerce-Store/';

  // Animate modal open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    
    const tl = gsap.timeline();
    tl.fromTo(modalRef.current, 
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: 'power2.out' }
    ).fromTo(contentRef.current,
      { scale: 0.95, y: 20, opacity: 0 },
      { scale: 1, y: 0, opacity: 1, duration: 0.4, ease: 'back.out(1.1)' },
      '-=0.1'
    );

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Handle Close with animation
  const handleClose = () => {
    const tl = gsap.timeline({
      onComplete: onClose
    });
    
    tl.to(contentRef.current, {
      scale: 0.95,
      y: 20,
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in'
    }).to(modalRef.current, {
      opacity: 0,
      duration: 0.2
    }, '-=0.1');
  };

  const handleRefresh = () => {
    setIsLoading(true);
    setIframeKey(prev => prev + 1);
  };

  return (
    <div 
      ref={modalRef}
      className="fixed inset-0 z-50 bg-[#0a0a0f]/90 backdrop-blur-sm flex items-center justify-center p-2 md:p-6"
    >
      <div 
        ref={contentRef}
        className="relative w-full max-w-6xl h-[92vh] bg-[#12121a] border border-white/10 rounded-2xl flex flex-col overflow-hidden shadow-2xl"
      >
        
        {/* Top Control Bar */}
        <header className="px-4 py-3 border-b border-white/10 flex items-center justify-between bg-[#1a1a25]/90 z-10">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
              <Globe className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <span className="font-display font-semibold text-sm text-white block truncate">
                E-Commerce Store Live Demo
              </span>
              <a 
                href={demoUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-[10px] text-zinc-500 hover:text-indigo-400 flex items-center gap-1 font-mono truncate transition-colors"
              >
                {demoUrl}
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>
          </div>
          
          <div className="flex items-center gap-2 shrink-0">
            {/* Refresh Button */}
            <button 
              onClick={handleRefresh}
              title="Refresh Demo"
              className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>

            {/* Open in New Tab Button */}
            <a 
              href={demoUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.8 h-9 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-semibold shadow-md shadow-indigo-500/10 transition-all duration-300"
            >
              <span className="hidden sm:inline">Open in New Tab</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            {/* Close Button */}
            <button 
              onClick={handleClose}
              className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-[#ef4444]/20 hover:border-[#ef4444]/30 hover:text-[#ef4444] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Iframe Viewport */}
        <div className="flex-1 bg-[#0a0a0f] relative">
          
          {/* Loading Spinner */}
          {isLoading && (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#12121a]">
              <div className="w-10 h-10 border-3 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4" />
              <p className="text-zinc-500 text-xs font-mono">Loading live storefront...</p>
            </div>
          )}

          <iframe 
            key={iframeKey}
            src={demoUrl} 
            title="E-Commerce Store Live Demo"
            className="w-full h-full border-0 bg-white"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
            onLoad={() => setIsLoading(false)}
          />
        </div>

      </div>
    </div>
  );
}
