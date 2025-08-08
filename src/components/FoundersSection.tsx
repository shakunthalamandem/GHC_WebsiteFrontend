import { useEffect, useRef, useState } from 'react';
import { Linkedin } from 'lucide-react';
import suresh from '@/assets/suresh.jfif';
import teamPhoto from '@/assets/generated-image.png'; // <-- Add your team photo here

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
      name: 'Suresh Raju',
      title: 'Founder & Director',
      description:
        'Suresh Raju, Founder of Golden Hills, has 15+ years of experience in investment management, capital markets, and corporate finance. He has worked with TVS Capital, Deutsche Bank (US), and ABAQUS, and is a member of IAN and TiE. Suresh holds an MBA from Chicago Booth, an M.S. from Ohio State, and a B.Tech from IIT Madras.',
      image: suresh,
      gradient: 'from-primary to-primary-glow',
      linkedin: 'https://www.linkedin.com/in/tsureshraju/',
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-24 px-6 relative overflow-hidden bg-gradient-to-br from-background via-card/30 to-background"
    >
      {/* Light Streams Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className={`absolute left-1/4 top-0 w-2 h-full bg-gradient-to-b from-gold via-gold/50 to-transparent transition-all duration-2000 ${
            streamAnimation ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'
          }`}
          style={{ transformOrigin: 'top' }}
        />
        <div
          className={`absolute right-1/4 top-0 w-2 h-full bg-gradient-to-b from-primary via-primary/50 to-transparent transition-all duration-2000 delay-500 ${
            streamAnimation ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'
          }`}
          style={{ transformOrigin: 'top' }}
        />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold text-foreground mb-6">
            Meet Our <span className="text-blue-900">Team</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            The pioneering minds behind Golden Hills India's revolutionary approach to intelligent business solutions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Founder Card */}
          {founders.map((founder, index) => (
            <div
              key={founder.name}
              className={`relative transition-all duration-1000 delay-${index * 500} ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="relative group text-center md:text-left">
                <div className="glass-morphism rounded-3xl p-8 hover:shadow-glow transition-all duration-500 group-hover:scale-105">
                  <div className="mb-6 flex justify-center md:justify-start">
                    <div
                      className={`w-32 h-32 bg-gradient-to-br ${founder.gradient} rounded-2xl flex items-center justify-center shadow-glow float-animation relative overflow-hidden`}
                    >
                      <img
                        src={founder.image}
                        alt={founder.name}
                        className="w-full h-full object-cover rounded-2xl"
                      />
                      <div className="absolute inset-0 rounded-2xl animate-pulse bg-primary/10 group-hover:bg-primary/20 transition duration-500" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-3xl font-bold text-foreground">{founder.name}</h3>
                    <p className="text-lg font-semibold text-primary">{founder.title}</p>
                    <p className="text-muted-foreground leading-relaxed text-lg">{founder.description}</p>
                    <div className="flex space-x-4 pt-4 justify-center md:justify-start">
                      <a
                        href={founder.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 bg-gradient-to-br from-primary/10 to-primary/20 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 btn-glow"
                      >
                        <Linkedin className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Team Photo */}
          <div
            className={`relative transition-all duration-1000 delay-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="rounded-3xl overflow-hidden shadow-lg hover:shadow-glow transition-all duration-500">
              <img src={teamPhoto} alt="Our Team" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        {/* Quote Section */}
        <div className="text-center mt-20">
          <blockquote className="text-2xl italic text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            "Golden Hills India harnesses the power of data to deliver strategic insights that drive innovation and impact. We are committed to partnering with clients to unlock new opportunities for growth and success."
          </blockquote>
          <div className="mt-6 text-lg font-semibold text-primary">— Golden Hills India Leadership Team</div>
        </div>
      </div>
    </section>
  );
};

export default FoundersSection;
