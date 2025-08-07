import {
  Code,
  BarChart3,
  Eye,
  TrendingUp,
  Cloud,
  Database,
  LineChart,
  Settings,
  Brain,
  Bot,
  CreditCard,
  Wallet,
  Network,
  Globe,
  LayoutDashboard,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const expertiseData = [
  { icon: Bot, title: 'AI-Driven Decision Intelligence', path: '/expertise/ai-decision-intelligence', gradient: 'from-primary to-primary-glow' },
  { icon: BarChart3, title: 'Data Analytics and Engineering', path: '/expertise/data-analytics', gradient: 'from-gold to-gold-light' },
  { icon: Globe, title: 'Financial Technology & Digital Transformation', path: '/expertise/fintech-digital', gradient: 'from-coral to-primary' },
  { icon: Code, title: 'Custom Software & Web App Development', path: '/expertise/software-web', gradient: 'from-primary-glow to-gold' },
  { icon: Cloud, title: 'Cloud Computing and Deployment', path: '/expertise/cloud-deployment', gradient: 'from-green-400 to-blue-500' },
  { icon: LineChart, title: 'Risk Analytics & Portfolio Optimization', path: '/expertise/risk-analytics', gradient: 'from-indigo-400 to-pink-400' },
  { icon: LayoutDashboard, title: 'Business Intelligence & Visualization', path: '/expertise/business-intel', gradient: 'from-green-500 to-red-300' },
  { icon: Brain, title: 'Quantitative Research & Financial Modeling', path: '/expertise/quant-research', gradient: 'from-blue-600 to-cyan-400' },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, rotate: -2 },
  visible: { opacity: 1, y: 0, rotate: 0, transition: { duration: 0.8, ease: 'easeOut' as const } },
};

const ExpertiseCard = ({ expertise }: { expertise: typeof expertiseData[0] }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const { icon: Icon, title, gradient, path } = expertise;

  return (
    <motion.div
      variants={cardVariants}
      className="relative group cursor-pointer"
      onClick={() => navigate(path)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`relative w-full h-[380px] glass-morphism rounded-3xl p-8 transition-all duration-500 hover:shadow-glow flex flex-col justify-between ${
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
        <div className="relative z-10 mb-4">
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
            Our <span className="bg-gradient-sky-gold bg-clip-text text-transparent">Expertise</span>
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
