import { useEffect, useRef, useState } from 'react';
import { Code, BarChart3, Eye, TrendingUp } from 'lucide-react';

const expertiseData = [
  {
    icon: Code,
    title: 'Custom Software',
    description: 'Tailored platforms that evolve with your business goals.',
    gradient: 'from-primary to-primary-glow',
  },
  {
    icon: BarChart3,
    title: 'Advanced Analytics',
    description: 'Harness structured insights for smarter decisions, in real-time.',
    gradient: 'from-gold to-gold-light',
  },
  {
    icon: Eye,
    title: 'Data Visualization',
    description: 'Reveal hidden patterns through beautiful, intuitive visuals.',
    gradient: 'from-coral to-primary',
  },
  {
    icon: TrendingUp,
    title: 'Financial Research',
    description: 'Precise, data-backed intelligence for capital and strategic growth.',
    gradient: 'from-primary-glow to-gold',
  },
];

const ExpertiseCard = ({ expertise, index }: { expertise: typeof expertiseData[0]; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), index * 200);
        }
      },
      { threshold: 0.5 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [index]);

  const { icon: Icon, title, description, gradient } = expertise;

  return (
    <div
      ref={cardRef}
      className={`relative group transition-all duration-700 ${
        isVisible ? 'animate-fade-in opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`relative h-80 glass-morphism rounded-3xl p-8 transition-all duration-500 float-animation hover:shadow-glow ${
          isHovered ? 'scale-105 shadow-elegant' : ''
        }`}
        style={{ animationDelay: `${index * 0.5}s` }}
      >
        {/* Gradient Background */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl`}
        />

        {/* Icon */}
        <div className="relative z-10 mb-6">
          <div
            className={`w-16 h-16 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center shadow-glow transition-transform duration-500 ${
              isHovered ? 'scale-110 rotate-6' : ''
            }`}
          >
            <Icon className="w-8 h-8 text-white" />
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10">
          <h3
            className={`text-2xl font-bold text-foreground mb-4 transition-all duration-500 ${
              isHovered ? 'text-primary' : ''
            }`}
          >
            {title}
          </h3>
          <p className="text-muted-foreground leading-relaxed text-lg">
            {description}
          </p>
        </div>

        {/* Hover Effect Border */}
        <div
          className={`absolute inset-0 rounded-3xl border-2 border-transparent transition-all duration-500 ${
            isHovered ? `border-primary shadow-glow` : ''
          }`}
        />
      </div>
    </div>
  );
};

const ExpertiseSection = () => {
  return (
    <section className="py-24 px-6">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold text-foreground mb-6">
            Our{' '}
            <span className="bg-gradient-sky-gold bg-clip-text text-transparent">
              Expertise
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Four pillars of intelligence that drive transformational outcomes for forward-thinking organizations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {expertiseData.map((expertise, index) => (
            <ExpertiseCard
              key={expertise.title}
              expertise={expertise}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExpertiseSection;