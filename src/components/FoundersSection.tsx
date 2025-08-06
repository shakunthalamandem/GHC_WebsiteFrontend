import { useEffect, useRef, useState } from 'react';
import { Linkedin, Twitter, Brain, Database } from 'lucide-react';

const FoundersSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [streamAnimation, setStreamAnimation] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setTimeout(() => setStreamAnimation(true), 1000);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const founders = [
    {
      name: 'Anirudh K. Rao',
      title: 'Co-Founder & CEO',
      description: 'AI Futurist with 15+ years in financial tech',
      icon: Brain,
      gradient: 'from-primary to-primary-glow',
      streamPosition: 'left',
    },
    {
      name: 'Ritika Sharma',
      title: 'Co-Founder & CTO',
      description: 'Architect of scalable data platforms for fintech',
      icon: Database,
      gradient: 'from-gold to-coral',
      streamPosition: 'right',
    },
  ];

  return (
    <section ref={sectionRef} className="py-24 px-6 relative overflow-hidden bg-gradient-to-br from-background via-card/30 to-background">
      {/* Light Streams Background */}
      <div className="absolute inset-0">
        {/* Left Stream */}
        <div
          className={`absolute left-1/4 top-0 w-2 h-full bg-gradient-to-b from-gold via-gold/50 to-transparent transition-all duration-2000 ${
            streamAnimation ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'
          }`}
          style={{ transformOrigin: 'top' }}
        />
        
        {/* Right Stream */}
        <div
          className={`absolute right-1/4 top-0 w-2 h-full bg-gradient-to-b from-primary via-primary/50 to-transparent transition-all duration-2000 delay-500 ${
            streamAnimation ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'
          }`}
          style={{ transformOrigin: 'top' }}
        />

        {/* Particle Explosion at Center */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          {streamAnimation && (
            <div className="relative">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-3 h-3 bg-gradient-gold-coral rounded-full animate-ping"
                  style={{
                    left: `${Math.cos((i * 30 * Math.PI) / 180) * 100}px`,
                    top: `${Math.sin((i * 30 * Math.PI) / 180) * 100}px`,
                    animationDelay: `${i * 0.1}s`,
                    animationDuration: '2s',
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold text-foreground mb-6">
            Meet Our{' '}
            <span className="bg-gradient-sky-gold bg-clip-text text-transparent">
              Visionaries
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            The pioneering minds behind Golden Hills India's revolutionary approach to intelligent business solutions
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {founders.map((founder, index) => (
            <div
              key={founder.name}
              className={`relative transition-all duration-1000 delay-${index * 500} ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              {/* Founder Card */}
              <div className="relative group">
                {/* Main Card */}
                <div className="glass-morphism rounded-3xl p-8 hover:shadow-glow transition-all duration-500 group-hover:scale-105">
                  {/* Icon */}
                  <div className="mb-6">
                    <div
                      className={`w-20 h-20 bg-gradient-to-br ${founder.gradient} rounded-2xl flex items-center justify-center shadow-glow float-animation`}
                      style={{ animationDelay: `${index * 0.5}s` }}
                    >
                      <founder.icon className="w-10 h-10 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-4">
                    <h3 className="text-3xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                      {founder.name}
                    </h3>
                    <p className="text-lg font-semibold text-primary">
                      {founder.title}
                    </p>
                    <p className="text-muted-foreground leading-relaxed text-lg">
                      {founder.description}
                    </p>

                    {/* Social Links */}
                    <div className="flex space-x-4 pt-4">
                      <button className="w-12 h-12 bg-gradient-to-br from-primary/10 to-primary/20 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 btn-glow">
                        <Linkedin className="w-5 h-5" />
                      </button>
                      <button className="w-12 h-12 bg-gradient-to-br from-primary/10 to-primary/20 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 btn-glow">
                        <Twitter className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Background Glow */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${founder.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-3xl`}
                  />
                </div>

                {/* Floating Particles */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-gold-coral rounded-full opacity-60 float-animation" />
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-sky-gold rounded-full opacity-40 float-animation" style={{ animationDelay: '1s' }} />
              </div>
            </div>
          ))}
        </div>

        {/* Quote Section */}
        <div className="text-center mt-20">
          <blockquote className="text-2xl italic text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            "We believe that the future belongs to organizations that can harness the power of intelligent data. 
            Our mission is to make that future accessible, scalable, and transformative for every business we touch."
          </blockquote>
          <div className="mt-6 text-lg font-semibold text-primary">
            — Golden Hills India Leadership Team
          </div>
        </div>
      </div>
    </section>
  );
};

export default FoundersSection;