import {
  Code,
  BarChart3,
  Cloud,
  LineChart,
  Brain,
  Bot,
  Globe,
  LayoutDashboard,
} from 'lucide-react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Variants } from "framer-motion";
const gradients = [
  'from-primary to-primary-glow',   // main brand gradient
  'from-gold to-gold-light',        // gold tone
  'from-blue-600 to-cyan-400',      // cool tone
];

const expertiseData = [
  { icon: Bot, title: 'AI-Driven Decision Intelligence', path: '/expertise/ai-decision-intelligence', gradient: gradients[0] },
  { icon: BarChart3, title: 'Data Analytics and Engineering', path: '/expertise/data-analytics', gradient: gradients[1] },
  { icon: Globe, title: 'Financial Technology & Digital Transformation', path: '/expertise/fintech-digital', gradient: gradients[2] },
  { icon: Code, title: 'Custom Software & Web App Development', path: '/expertise/software-web', gradient: gradients[1] },
  { icon: Cloud, title: 'Cloud Computing and Deployment', path: '/expertise/cloud-deployment', gradient: gradients[1] },
  { icon: LineChart, title: 'Risk Analytics & Portfolio Optimization', path: '/expertise/risk-analytics', gradient: gradients[2] },
  { icon: LayoutDashboard, title: 'Business Intelligence & Visualization', path: '/expertise/business-intel', gradient: gradients[1] },
  { icon: Brain, title: 'Quantitative Research & Financial Modeling', path: '/expertise/quant-research', gradient: gradients[0] },
];


const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut" as const // <-- force literal type
    }
  }
};
const ExpertiseCard = ({ expertise }: { expertise: typeof expertiseData[0] }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const { icon: Icon, title, gradient, path } = expertise;

  // Motion values for tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-50, 50], [4, -4]);
  const rotateY = useTransform(x, [-50, 50], [-4, 4]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  return (
    <motion.div
      variants={cardVariants}
      style={{ rotateX, rotateY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
        setIsHovered(false);
      }}
      onMouseEnter={() => setIsHovered(true)}
      className="relative group cursor-pointer"
      onClick={() => navigate(path)}
    >
      <div
        className={`relative w-full h-40 flex flex-row items-center glass-morphism rounded-xl p-4 transition-all duration-500 ${
          isHovered ? 'scale-[1.05] shadow-elegant ring-2 ring-primary/40' : ''
        }`}
      >
        {/* Background Glow */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-xl`}
        />
        
        {/* Shine Effect */}
        <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
          <div
            className={`absolute top-0 left-[-75%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 ${
              isHovered ? 'animate-shine-fast' : ''
            }`}
          />
        </div>

        {/* Icon */}
        <div className="relative z-10 mr-3">
          <div
            className={`w-14 h-14 bg-gradient-to-br ${gradient} rounded-lg flex items-center justify-center shadow-glow transition-transform duration-500 ${
              isHovered ? 'scale-125 rotate-6 animate-iconPulse' : ''
            }`}
          >
            <Icon className="w-7 h-7 text-white" />
          </div>
        </div>

        {/* Title + Call to Action */}
        <div className="relative z-10 flex flex-col">
       <h3
  className={`text-lg font-bold transition-all duration-500 ${
    isHovered ? 'text-[#1e3a8a]' : 'text-foreground'
  }`}
>

            {title}
          </h3>
<span
  className={`text-sm flex items-center gap-1 transition-all duration-300 ${
    isHovered
      ? 'opacity-100 translate-x-0 text-black'
      : 'opacity-0 -translate-x-2 text-muted-foreground'
  }`}
>
  Explore{' '}
  <motion.span
    initial={{ x: -5 }}
    animate={{ x: isHovered ? 0 : -5 }}
    transition={{ duration: 0.3 }}
  >
    →
  </motion.span>
</span>

        </div>

        {/* Hover Border */}
<div
  className={`absolute inset-0 rounded-xl border-2 transition-all duration-500 ${
    isHovered
      ? 'border-[#1e3a8a] shadow-[0_0_20px_rgba(30,58,138,0.6)]'
      : 'border-transparent shadow-none'
  }`}
/>

      </div>
    </motion.div>
  );
};

const ExpertiseSection = () => {
  return (
    <section id='expertise' className="py-24 px-6">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-foreground mb-4">
            Our<span className="text-blue-900">    Expertise</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Empowering Organizations with Intelligent Solutions
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
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
