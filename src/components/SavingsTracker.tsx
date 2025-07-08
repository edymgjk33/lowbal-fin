import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, DollarSign, Target, Award, Activity, History } from "lucide-react";

interface SavingsTrackerProps {
  totalSavings: number;
  totalDeals: number;
  averageSavings: number;
  activeDeals?: number;
  successRate?: number;
}

const SavingsTracker: React.FC<SavingsTrackerProps> = ({
  totalSavings,
  totalDeals,
  averageSavings,
  activeDeals = 0,
  successRate = 0
}) => {
  const { nextMilestone, progress } = React.useMemo(() => {
    const milestones = [1000, 2500, 5000, 10000, 25000, 50000];
    const nextMilestone = milestones.find(m => m > totalSavings) || 100000;
    const progress = (totalSavings / nextMilestone) * 100;
    return { nextMilestone, progress };
  }, [totalSavings]);

  return (
    <div className="bg-gradient-to-r from-emerald-600 via-cyan-600 to-blue-600 py-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="absolute top-0 left-0 w-full h-full opacity-30">
        <div className="absolute top-1 left-8 w-8 h-8 bg-white/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-1 right-8 w-10 h-10 bg-white/10 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-12 h-12 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 animate-pulse delay-500"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-5 gap-3">
          <Card className="bg-white/20 backdrop-blur-md border-white/30 shadow-lg transform hover:scale-105 transition-all duration-300">
            <CardContent className="p-3 text-center">
              <div className="w-6 h-6 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                <DollarSign className="w-3 h-3 text-white" />
              </div>
              <div className="text-lg font-bold text-white mb-1">
                ${totalSavings.toLocaleString()}
              </div>
              <div className="text-white/80 font-medium text-xs">Saved</div>
            </CardContent>
          </Card>

          <Card className="bg-white/20 backdrop-blur-md border-white/30 shadow-lg transform hover:scale-105 transition-all duration-300">
            <CardContent className="p-3 text-center">
              <div className="w-6 h-6 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Activity className="w-3 h-3 text-white" />
              </div>
              <div className="text-lg font-bold text-white mb-1">
                {activeDeals}
              </div>
              <div className="text-white/80 font-medium text-xs">Active</div>
            </CardContent>
          </Card>

          <Card className="bg-white/20 backdrop-blur-md border-white/30 shadow-lg transform hover:scale-105 transition-all duration-300">
            <CardContent className="p-3 text-center">
              <div className="w-6 h-6 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                <History className="w-3 h-3 text-white" />
              </div>
              <div className="text-lg font-bold text-white mb-1">
                {totalDeals}
              </div>
              <div className="text-white/80 font-medium text-xs">Done</div>
            </CardContent>
          </Card>

          <Card className="bg-white/20 backdrop-blur-md border-white/30 shadow-lg transform hover:scale-105 transition-all duration-300">
            <CardContent className="p-3 text-center">
              <div className="w-6 h-6 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                <TrendingUp className="w-3 h-3 text-white" />
              </div>
              <div className="text-lg font-bold text-white mb-1">
                ${averageSavings}
              </div>
              <div className="text-white/80 font-medium text-xs">Average</div>
            </CardContent>
          </Card>

          <Card className="bg-white/20 backdrop-blur-md border-white/30 shadow-lg transform hover:scale-105 transition-all duration-300">
            <CardContent className="p-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 bg-white/20 rounded-lg flex items-center justify-center">
                  <Award className="w-3 h-3 text-white" />
                </div>
                <div>
                  <div className="text-white font-medium text-xs">Next Goal</div>
                  <div className="text-white/80 text-xs">${nextMilestone.toLocaleString()}</div>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-white/80">
                  <span>${totalSavings.toLocaleString()}</span>
                  <span>${nextMilestone.toLocaleString()}</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-1.5">
                  <div 
                    className="bg-white rounded-full h-1.5 transition-all duration-1000 ease-out"
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  ></div>
                </div>
                <div className="text-center text-white/80 text-xs">
                  {Math.round(progress)}% to goal
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SavingsTracker;