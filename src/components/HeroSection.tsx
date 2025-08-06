import { useEffect, useRef } from 'react';
import heroVideo from '@/assets/mainsection.mp4';

const HeroSection = () => {
  const parallaxRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.3; // Adjust parallax speed here
        parallaxRef.current.style.transform = `translateY(${rate}px) scale(1.1)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden particle-bg">
      {/* Video Background with Parallax */}
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

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <h1 className="text-2xl md:text-4xl font-bold text-foreground mb-8 leading-tight">
          UNLEASH YOUR BUSINESS POTENTIAL{' '}
<span className="bg-gradient-to-r from-[#6a0cbc] via-[#bd9e1d] to-[#118e21] bg-clip-text text-transparent">
         <br/> DATA | TECHNOLOGY | EXPERTISE
          </span>{' '}
         
        </h1>

<p
  className="text-xl md:text-2xl mb-12 max-w-2xl mx-auto leading-relaxed"
  style={{ color: 'hsl(215, 47%, 24%)' }}
>
  Crafting Tomorrow's Solutions in Analytics, Research, and Visualization
</p>

        {/* Floating CTA */}
<button className="btn-glow bg-primary text-black-foreground px-12 py-4 rounded-full text-lg font-semibold hover:bg-primary-glow transition-all duration-500 float-animation mt-10">
          Discover Our Intelligence
        </button>
      </div>

   <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center space-y-2">
  {/* First V */}
  <div className="w-6 h-6 border-b-2 border-r-2 border-black rotate-45 animate-bounce-slow shadow-md shadow-black/20" />
  
  {/* Second V */}
  <div className="w-6 h-6 border-b-2 border-r-2 border-black rotate-45 animate-bounce-slower shadow-md shadow-black/20" />
</div>


    </section>
  );
};

export default HeroSection;
