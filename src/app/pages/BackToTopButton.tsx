import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export function BackToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="
        fixed bottom-6 right-6
        w-12 h-12
        rounded-full
        bg-[#0095DA]/80
        backdrop-blur-xl
        border border-white/30
        shadow-lg
        flex items-center justify-center
        hover:bg-[#0077B3]
        transition-all duration-300
        z-50
      "
      aria-label="Back to top"
    >
      <ArrowUp size={20} className="text-white" />
    </button>
  );
}