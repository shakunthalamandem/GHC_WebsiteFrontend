import { useEffect, useRef, useState } from 'react';
import { MessageCircle, Briefcase, Mail, Users } from 'lucide-react';
import heroVideo from '@/assets/Aicm.mp4';
import Careers from '@/components/Careers'; // import your Careers component

const HeroSection = () => {
  const parallaxRef = useRef<HTMLVideoElement>(null);
  const [showCareers, setShowCareers] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.3;
        parallaxRef.current.style.transform = `translateY(${rate}px) scale(1.1)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll to sections
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden particle-bg">
      {/* Video Background */}
      <video
        ref={parallaxRef}
        src={heroVideo}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-background/20" />

      {/* Left Sidebar Navigation */}
      <nav className="absolute top-1/3 left-6 flex flex-col gap-6 z-20">
        <button
          onClick={() => scrollToSection('ask-ai')}
          className="flex flex-col items-center text-gray-800 hover:text-blue-900 transition-colors"
        >
          <MessageCircle   className="w-10 h-10 mb-1 p-2 rounded-full bg-blue-100 text-blue-700
               hover:bg-blue-500 hover:text-white hover:shadow-[0_0_12px_rgba(59,130,246,0.8)]
               transition-all duration-300" />
          <span className="text-xs font-medium">Ask our AI</span>
        </button>

        <button
          onClick={() => scrollToSection('expertise')}
          className="flex flex-col items-center text-gray-800 hover:text-blue-900 transition-colors"
        >
          <Briefcase   className="w-10 h-10 mb-1 p-2 rounded-full bg-blue-100 text-blue-700
               hover:bg-blue-500 hover:text-white hover:shadow-[0_0_12px_rgba(59,130,246,0.8)]
               transition-all duration-300" />
          <span className="text-xs font-medium">Expertise</span>
        </button>

        <button
          onClick={() => scrollToSection('contact')}
          className="flex flex-col items-center text-gray-800 hover:text-blue-900 transition-colors"
        >
          <Mail   className="w-10 h-10 mb-1 p-2 rounded-full bg-blue-100 text-blue-700
               hover:bg-blue-500 hover:text-white hover:shadow-[0_0_12px_rgba(59,130,246,0.8)]
               transition-all duration-300" />
          <span className="text-xs font-medium">Contact Us</span>
        </button>

        <button
          onClick={() => setShowCareers(true)}
          className="flex flex-col items-center text-gray-800 hover:text-blue-900 transition-colors"
        >
          <Users   className="w-10 h-10 mb-1 p-2 rounded-full bg-blue-100 text-blue-700
               hover:bg-blue-500 hover:text-white hover:shadow-[0_0_12px_rgba(59,130,246,0.8)]
               transition-all duration-300"/>
          <span className="text-xs font-medium">Careers</span>
        </button>
      </nav>

      {/* Hero Content */}
      <div className="flex items-center justify-center h-screen px-12">
        <div className="relative z-10 text-center max-w-2xl">
          <h1 className="text-2xl md:text-4xl font-bold text-foreground mb-8 leading-tight">
            UNLEASH YOUR BUSINESS POTENTIAL{' '}
            <span className="text-black">
              <br />
              <span className="text-blue-900">
                DATA | TECHNOLOGY | EXPERTISE
              </span>
            </span>
          </h1>

          <p
            className="text-xl md:text-2xl mb-12 leading-relaxed"
            style={{ color: 'hsl(215, 47%, 24%)' }}
          >
            Crafting Tomorrow's Solutions in Analytics, Research, <br /> and
            Visualization
          </p>
        </div>

        {/* Right Content */}
        <div className="hidden md:block">
          <img
            src="/your-image-path.jpg"
            alt="Illustration"
            className="w-[500px] h-auto"
          />
        </div>
      </div>

      {/* Scroll down arrows */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center space-y-2">
        <div className="w-6 h-6 border-b-2 border-r-2 border-black rotate-45 animate-bounce-slow shadow-md shadow-black/20" />
        <div className="w-6 h-6 border-b-2 border-r-2 border-black rotate-45 animate-bounce-slower shadow-md shadow-black/20" />
      </div>

      {/* Careers Popup */}
      {showCareers && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-3xl relative">
            <button
              onClick={() => setShowCareers(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
            >
              ✕
            </button>
            <Careers />
          </div>
        </div>
      )}
    </section>
  );
};

export default HeroSection;
