import { useState, useEffect } from 'react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? 'glass-morphism py-3' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-sky-gold rounded-full flex items-center justify-center shadow-glow">
            <span className="text-white font-bold text-lg">GHC</span>
          </div>
          <h1 className="text-xl font-bold text-foreground font-inter">
            Golden Hills India
          </h1>
        </div>

        {/* Navigation */}
        <div className="flex items-center space-x-8">
          <a
            href="#history"
            className="text-foreground font-medium glow-underline transition-all duration-300 hover:text-primary"
          >
            History
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;