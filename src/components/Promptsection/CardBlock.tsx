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

// Lighter, brighter background colors
const bgColors = [
  'bg-yellow-100',
  'bg-green-100',
  'bg-blue-100',
  'bg-pink-100',
  'bg-purple-100',
  'bg-orange-100'
];

const CardBlock: React.FC<CardBlockProps> = ({ title, subtitle, description, icon }) => {
  const Icon = icon && icons[icon] ? icons[icon] : Briefcase;

  const bgColor = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * bgColors.length);
    return bgColors[randomIndex];
  }, []);

  return (
    <div className={`p-5 ${bgColor} rounded-xl shadow-md border border-black/10`}>
      <div className="flex items-center gap-3 mb-3">
        <Icon className="w-6 h-6 text-black" />
        <h3 className="text-xl font-semibold text-black">{title}</h3>
      </div>
      {subtitle && <p className="text-sm text-gray-800 mb-2">{subtitle}</p>}
      <p className="text-gray-900">{description}</p>
    </div>
  );
};

export default CardBlock;
