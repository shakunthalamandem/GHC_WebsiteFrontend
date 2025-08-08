import { useEffect, useRef, useState } from 'react';
import { Globe, Cloud, TrendingUp, Activity, Rocket } from 'lucide-react';

const clients = [
  {
  
    icon: Globe,
    initials: 'Monashee',
    color: 'from-primary to-primary-glow',
    position: { x: 20, y: 30 },
  },
  {

    icon: Cloud,
    initials: 'BlockChain',
    color: 'from-gold to-gold-light',
    position: { x: 70, y: 20 },
  },
  {

    icon: TrendingUp,
    initials: 'Hedgeye',
    color: 'from-coral to-primary',
    position: { x: 80, y: 60 },
  },
  {
 
    icon: Activity,
    initials: 'CMG',
    color: 'from-primary-glow to-coral',
    position: { x: 30, y: 70 },
  },
  {

    icon: Rocket,
    initials: 'wave',
    color: 'from-gold to-primary',
    position: { x: 60, y: 80 },
  },
];

const ClientOrb = ({ client, index }: { client: typeof clients[0]; index: number }) => {
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

  const {  icon: Icon, initials, color, position } = client;

  return (
    <div
      ref={orbRef}
      className="absolute group cursor-pointer animate-bob"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: 'translate(-50%, -50%)',
      }}
    >
      {/* Orb (Balloon) */}
      <div
        className={`relative w-24 h-24 transition-all duration-700 ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
        }`}
      >
        <div
          className={`w-full h-full rounded-full bg-gradient-to-br ${color} flex items-center justify-center shadow-glow transition-all duration-500`}
          style={{ animationDelay: `${index * 1}s` }}
        >
          <span className="text-black font-bold text-lg">{initials}</span>
        </div>

        {/* Glow Effect */}
        <div
          className={`absolute inset-0 rounded-full bg-gradient-to-br ${color} blur-xl opacity-30`}
        />

        {/* Pulse Ring */}
        <div
          className={`absolute inset-0 rounded-full border-2 border-white/30 transition-all duration-1000`}
        />
      </div>

      {/* Thread (String) */}
      <div className="absolute top-full left-1/2 w-px h-16 bg-border transform -translate-x-1/2" />

      {/* Balloon Label */}
  
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
            Our {' '}
<span className="text-blue-900">              Clients 
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

       {clients.map((client, index) => (
  <ClientOrb key={index} client={client} index={index} />
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
            <div className="text-4xl font-bold text-primary mb-2">12+</div>
            <div className="text-muted-foreground">Years Experience</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">95%</div>
            <div className="text-muted-foreground">Client Satisfaction</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
