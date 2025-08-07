import React, { useMemo } from 'react';
import { LucideIcon, Briefcase, DollarSign, Users, BarChart } from 'lucide-react';

interface CardBlockProps {
  title: string;
  subtitle?: string;
  description: string;
  icon?: string;
}

const icons: Record<string, LucideIcon> = {
  briefcase: Briefcase,
  dollar: DollarSign,
  users: Users,
  chart: BarChart
};

const bgColors = [
  'bg-sky-900/30',
  'bg-indigo-900/30',
  'bg-purple-900/30',
  'bg-emerald-900/30',
  'bg-pink-900/30',
  'bg-yellow-900/30'
];

const CardBlock: React.FC<CardBlockProps> = ({ title, subtitle, description, icon }) => {
  const Icon = icon && icons[icon] ? icons[icon] : Briefcase;

  // Memoize the color so it doesn’t change on every re-render
  const bgColor = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * bgColors.length);
    return bgColors[randomIndex];
  }, []);

  return (
    <div className={`p-5 ${bgColor} rounded-xl shadow border border-white/10`}>
      <div className="flex items-center gap-3 mb-3">
        <Icon className="w-6 h-6 text-sky-400" />
        <h3 className="text-xl font-semibold text-white">{title}</h3>
      </div>
      {subtitle && <p className="text-sm text-sky-200 mb-2">{subtitle}</p>}
      <p className="text-gray-300">{description}</p>
    </div>
  );
};

export default CardBlock;
