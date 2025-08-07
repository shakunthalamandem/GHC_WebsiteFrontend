import { useState, useEffect } from 'react';
import logo from '@/assets/Color logo - no background.png'; // <-- Add your logo image here (no background PNG)

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
        {/* Logo Section */}
        <div className="flex items-center space-x-3">
          <img
            src={logo}
            alt="Golden Hills India Logo"
            className="w-50 h-20 object-contain"
          />
        
        </div>

        {/* Navigation */}
        <div className="flex items-center space-x-8">
          <a
            href="#history"
            className="text-foreground font-medium glow-underline transition-all duration-300 hover:text-primary"
          >
 
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
