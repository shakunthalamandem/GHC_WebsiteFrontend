import { useEffect, useRef, useState } from 'react';
import { Globe, Cloud, TrendingUp, Activity, Rocket } from 'lucide-react';

const clients = [
  {
    name: 'Aurora Finance',
    icon: Globe,
    initials: 'AF',
    color: 'from-primary to-primary-glow',
    position: { x: 20, y: 30 },
  },
  {
    name: 'Nimbus AI',
    icon: Cloud,
    initials: 'NA',
    color: 'from-gold to-gold-light',
    position: { x: 70, y: 20 },
  },
  {
    name: 'Zenith Capital',
    icon: TrendingUp,
    initials: 'ZC',
    color: 'from-coral to-primary',
    position: { x: 80, y: 60 },
  },
  {
    name: 'Quanta MedTech',
    icon: Activity,
    initials: 'QM',
    color: 'from-primary-glow to-coral',
    position: { x: 30, y: 70 },
  },
  {
    name: 'Novaris Ventures',
    icon: Rocket,
    initials: 'NV',
    color: 'from-gold to-primary',
    position: { x: 60, y: 80 },
  },
];

const ClientOrb = ({ client, index }: { client: typeof clients[0]; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const orbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), index * 300);
        }
      },
      { threshold: 0.5 }
    );

    if (orbRef.current) {
      observer.observe(orbRef.current);
    }

    return () => observer.disconnect();
  }, [index]);

  const { name, icon: Icon, initials, color, position } = client;

  return (
    <div
      ref={orbRef}
      className="absolute group cursor-pointer"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: 'translate(-50%, -50%)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Orb */}
      <div
        className={`relative w-24 h-24 transition-all duration-700 ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
        } ${isHovered ? 'scale-125' : ''}`}
      >
        {/* Main Orb */}
        <div
          className={`w-full h-full rounded-full bg-gradient-to-br ${color} flex items-center justify-center shadow-glow transition-all duration-500 float-animation`}
          style={{ animationDelay: `${index * 0.5}s` }}
        >
          <span className="text-white font-bold text-lg">{initials}</span>
        </div>

        {/* Glow Effect */}
        <div
          className={`absolute inset-0 rounded-full bg-gradient-to-br ${color} blur-xl opacity-30 transition-opacity duration-500 ${
            isHovered ? 'opacity-60' : ''
          }`}
        />

        {/* Pulse Ring */}
        <div
          className={`absolute inset-0 rounded-full border-2 border-white/30 transition-all duration-1000 ${
            isHovered ? 'scale-150 opacity-0' : 'scale-100 opacity-100'
          }`}
        />
      </div>

      {/* Tooltip */}
      <div
        className={`absolute bottom-full left-1/2 transform -translate-x-1/2 mb-4 transition-all duration-300 ${
          isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
        }`}
      >
        <div className="bg-white/90 backdrop-blur-md rounded-lg px-4 py-2 shadow-elegant">
          <div className="flex items-center space-x-2">
            <Icon className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground whitespace-nowrap">
              {name}
            </span>
          </div>
          {/* Tooltip Arrow */}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white/90 rotate-45" />
        </div>
      </div>
    </div>
  );
};

const ClientsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 px-6 bg-gradient-to-br from-background to-card/50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-foreground mb-6">
            Trusted by{' '}
            <span className="bg-gradient-sky-gold bg-clip-text text-transparent">
              Visionaries
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Leading organizations choose Golden Hills India to accelerate their digital transformation
          </p>
        </div>

        {/* Celestial Sky */}
        <div className="relative h-96 rounded-3xl overflow-hidden bg-gradient-to-br from-primary/5 via-background to-gold/5 border border-border/20">
          {/* Background Stars */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-primary/30 rounded-full animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                }}
              />
            ))}
          </div>

          {/* Client Orbs */}
          {clients.map((client, index) => (
            <ClientOrb key={client.name} client={client} index={index} />
          ))}

          {/* Ambient Glow */}
          <div className="absolute inset-0 bg-gradient-radial from-primary/10 via-transparent to-transparent opacity-50" />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">50+</div>
            <div className="text-muted-foreground">Successful Projects</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-gold mb-2">15+</div>
            <div className="text-muted-foreground">Years Experience</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-coral mb-2">100%</div>
            <div className="text-muted-foreground">Client Satisfaction</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;