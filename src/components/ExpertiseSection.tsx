import { useState } from 'react';
import { Code, BarChart3, Eye, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

const expertiseData = [
  {
    icon: Code,
    title: 'Software Development',
    description:
      'Expertise in Python, Java, .Net, Django, Angular, and cloud-native solutions tailored to your business goals.',
    gradient: 'from-primary to-primary-glow',
  },
  {
    icon: BarChart3,
    title: 'Data Science & AI-ML',
    description:
      'Advanced machine learning models, NLP solutions, and scalable deployment for data-driven transformation.',
    gradient: 'from-gold to-gold-light',
  },
  {
    icon: Eye,
    title: 'Data Visualization',
    description:
      'Crafting interactive dashboards with Tableau, Looker, D3.js, and custom visualizations for actionable insights.',
    gradient: 'from-coral to-primary',
  },
  {
    icon: TrendingUp,
    title: 'Research & Consulting',
    description:
      'Market research, financial modeling, risk management, and opportunity analysis for strategic growth.',
    gradient: 'from-primary-glow to-gold',
  },
];

// Animation Variants
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3, // Cards will appear one by one
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, rotate: -2 },
  visible: { opacity: 1, y: 0, rotate: 0, transition: { duration: 0.8, ease: 'easeOut' as const } },
};

const ExpertiseCard = ({ expertise }: { expertise: typeof expertiseData[0] }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { icon: Icon, title, description, gradient } = expertise;

  return (
    <motion.div
      variants={cardVariants}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group"
    >
      <div
        className={`relative h-90 glass-morphism rounded-3xl p-8 transition-all duration-500 hover:shadow-glow ${
          isHovered ? 'scale-105 shadow-elegant float-animation' : ''
        }`}
      >
        {/* Gradient Background Pulse */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl ${
            isHovered ? 'animate-glowPulse' : ''
          }`}
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
          <p className="text-muted-foreground leading-relaxed text-lg">{description}</p>
        </div>

        {/* Hover Effect Border */}
        <div
          className={`absolute inset-0 rounded-3xl border-2 border-transparent transition-all duration-500 ${
            isHovered ? 'border-primary shadow-glow' : ''
          }`}
        />
      </div>
    </motion.div>
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
            Empowering Organizations with Intelligent Solutions
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {expertiseData.map((expertise) => (
            <ExpertiseCard key={expertise.title} expertise={expertise} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ExpertiseSection;
