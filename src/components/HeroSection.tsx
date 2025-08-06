import { useEffect, useRef } from 'react';
// import heroImage from '@/assets/ai-hero.jpg';
import heroImage from '@/assets/generated-image.png';

const HeroSection = () => {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        parallaxRef.current.style.transform = `translateY(${rate}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden particle-bg">
      {/* Parallax Background */}
      <div
        ref={parallaxRef}
        className="absolute inset-0 parallax-container"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          transform: 'scale(1.1)', // Slight scale to prevent white edges during parallax
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-background/20" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <h1 className="text-6xl md:text-8xl font-bold text-foreground mb-8 leading-tight">
          Empowering industries with{' '}
          <span className="bg-gradient-sky-gold bg-clip-text text-transparent">
            fluid intelligence
          </span>{' '}
          and precision.
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
          Next-generation AI solutions that transform your business vision into reality
        </p>

        {/* Floating CTA */}
        <button className="btn-glow bg-primary text-primary-foreground px-12 py-4 rounded-full text-lg font-semibold hover:bg-primary-glow transition-all duration-500 float-animation">
          Discover Our Intelligence
        </button>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 pulse-glow" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;