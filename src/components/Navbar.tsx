import { useState, useEffect } from 'react';
import logo from '@/assets/Color logo - no background.png';
import { motion, AnimatePresence } from 'framer-motion';
import Careers from './Careers';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCareersOpen, setIsCareersOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled ? 'glass-morphism py-3' : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img
              src={logo}
              alt="Golden Hills India Logo"
              className="w-50 h-20 object-contain"
            />
          </div>

          {/* Navigation */}
          <div className="flex items-center space-x-8">
         
          </div>
        </div>
      </nav>

      {/* Careers Modal */}
      <AnimatePresence>
        {isCareersOpen && (
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100] flex justify-center items-center overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Modal Content */}
            <motion.div
              className="bg-[#081a2f] max-w-6xl w-full rounded-2xl shadow-lg overflow-hidden relative"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Close Button */}
              <button
                onClick={() => setIsCareersOpen(false)}
                className="absolute top-4 right-4 text-white hover:text-red-400 text-2xl"
              >
                ✕
              </button>

              {/* Careers Component */}
              <Careers />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
