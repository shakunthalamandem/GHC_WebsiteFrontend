import { useEffect, useRef, useState } from 'react';
import { MessageCircle, Briefcase, Mail, Users } from 'lucide-react';
import heroVideo from '@/assets/videos/GHC.mp4';


import Careers from '@/components/Careers';
import ContactUs from "@/components/ContactUs";

const HeroSection = () => {
  const parallaxRef = useRef<HTMLVideoElement>(null);
  const [showCareers, setShowCareers] = useState(false);
  const [showContact, setShowContact] = useState(false);

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

      {/* Sidebar Navigation */}
      <nav className="absolute top-1/3 left-3 sm:left-6 flex flex-col gap-4 sm:gap-6 z-20">
        {[
          { icon: MessageCircle, label: "Ask our AI", action: () => scrollToSection('ask-ai') },
          { icon: Briefcase, label: "Expertise", action: () => scrollToSection('expertise') },
          { icon: Mail, label: "Contact Us", action: () => setShowContact(true) },
          { icon: Users, label: "Careers", action: () => setShowCareers(true) }
        ].map(({ icon: Icon, label, action }) => (
          <button
            key={label}
            onClick={action}
            className="flex flex-col items-center text-gray-800 hover:text-blue-900 transition-colors"
          >
            <Icon className="w-10 h-10 sm:w-12 sm:h-12 mb-1 p-2 rounded-full bg-blue-100 text-blue-700
                 hover:bg-blue-500 hover:text-white hover:shadow-[0_0_12px_rgba(59,130,246,0.8)]
                 transition-all duration-300" />
            <span className="text-[10px] sm:text-xs font-medium">{label}</span>
          </button>
        ))}
      </nav>

      {/* Hero Content */}
      <div className="flex items-center justify-center h-screen px-4 sm:px-12">
        <div className="relative z-10 text-center max-w-lg sm:max-w-2xl">
          <h1 className="text-xl sm:text-2xl md:text-4xl font-bold text-foreground mb-4 sm:mb-8 leading-tight">
            UNLEASH YOUR BUSINESS POTENTIAL{' '}
            <span className="text-black block">
              <span className="text-blue-900">
                DATA | TECHNOLOGY | EXPERTISE
              </span>
            </span>
          </h1>
          <p
            className="text-base sm:text-xl md:text-2xl mb-6 sm:mb-12 leading-relaxed"
            style={{ color: 'hsl(215, 47%, 24%)' }}
          >
            Crafting Tomorrow&apos;s Solutions in Analytics, Research, <br className="hidden sm:block" /> and
            Visualization
          </p>
        </div>
      </div>

      {/* Scroll Down Arrows */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center space-y-1 sm:space-y-2">
        <div className="w-5 h-5 sm:w-6 sm:h-6 border-b-2 border-r-2 border-black rotate-45 animate-bounce-slow shadow-md shadow-black/20" />
        <div className="w-5 h-5 sm:w-6 sm:h-6 border-b-2 border-r-2 border-black rotate-45 animate-bounce-slower shadow-md shadow-black/20" />
      </div>

      {/* Contact Popup */}
      {showContact && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="rounded-lg w-full max-w-3xl relative overflow-hidden bg-[#0a1e38] text-white">
            <button
              onClick={() => setShowContact(false)}
              className="absolute top-3 right-3 text-white hover:text-gray-300 z-10"
            >
              ✕
            </button>
            <ContactUs onClose={() => setShowContact(false)} />
          </div>
        </div>
      )}

      {/* Careers Popup */}
      {showCareers && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="relative w-full max-w-4xl">
            <Careers onClose={() => setShowCareers(false)} />
          </div>
        </div>
      )}
    </section>
  );
};

export default HeroSection;
