import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  icon: LucideIcon;
  value: string | number;
  label: string;
  gradient: string;
  textColor?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ 
  icon: Icon, 
  value, 
  label, 
  gradient, 
  textColor = 'text-white' 
}) => {
  return (
    <div className={`text-center bg-gradient-to-br ${gradient} backdrop-blur-xl rounded-3xl p-6 border border-white/20 shadow-2xl`}>
      <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div className={`text-3xl font-bold ${textColor} mb-1`}>
        {value}
      </div>
      <div className="text-white/80 font-medium">{label}</div>
    </div>
  );
};

export default StatsCard;