import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { MessageSquare, Clock, TrendingDown, Activity, Calendar, DollarSign, ArrowRight } from "lucide-react";
import { NegotiationTab } from '../pages/App';
import { useToast } from "@/hooks/use-toast";

interface ActiveNegotiationsProps {
  negotiations: NegotiationTab[];
  onUpdateNegotiation: (tabId: string, updates: Partial<NegotiationTab>) => void;
  onContinueNegotiation: (negotiationId: string) => void;
}

const ActiveNegotiations: React.FC<ActiveNegotiationsProps> = ({ 
  negotiations, 
  onUpdateNegotiation,
  onContinueNegotiation
}) => {
  const { toast } = useToast();

  const getProgressColor = (progress: number) => {
    if (progress < 30) return 'bg-gradient-to-r from-red-400 to-red-500';
    if (progress < 70) return 'bg-gradient-to-r from-yellow-400 to-orange-500';
    return 'bg-gradient-to-r from-green-400 to-green-500';
  };

  const getProgressLabel = (progress: number) => {
    if (progress < 30) return 'Early Stage';
    if (progress < 70) return 'In Progress';
    return 'Near Completion';
  };

  const getCategoryIcon = (category: string) => {
    const icons = {
      'cars': '🚗',
      'electronics': '💻',
      'furniture': '🪑',
      'real-estate': '🏠',
      'motorcycles': '🏍️',
      'gadgets': '📱'
    };
    return icons[category as keyof typeof icons] || '📦';
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  const handleContinueNegotiation = (negotiationId: string) => {
    onContinueNegotiation(negotiationId);
    toast({
      title: "Continuing Negotiation",
      description: "Opening your negotiation where you left off.",
    });
  };

  if (negotiations.length === 0) {
    return (
      <Card className="shadow-xl border-0 bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-xl">
        <CardContent className="p-12 text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-xl rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl border border-blue-500/30">
            <Activity className="w-12 h-12 text-blue-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">No Active Negotiations</h3>
          <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto leading-relaxed">
            Start a new negotiation to see your active deals here. Track progress, manage conversations, 
            and close deals with AI-powered assistance.
          </p>
          <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold px-8 py-4 rounded-xl text-lg shadow-xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105">
            <MessageSquare className="w-5 h-5 mr-2" />
            Start New Negotiation
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">Active Negotiations</h2>
        <p className="text-lg text-gray-300 font-medium">Track your ongoing deals and their progress</p>
      </div>

      <div className="grid gap-6">
        {negotiations.map((negotiation) => (
          <Card key={negotiation.id} className="shadow-xl border-0 bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] group">
            <CardContent className="p-8">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-start gap-4">
                  <div className="text-3xl transform group-hover:scale-110 transition-transform duration-300">
                    {getCategoryIcon(negotiation.category)}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {negotiation.title}
                    </h3>
                    <div className="flex items-center gap-3 mb-3">
                      <Badge className="bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold px-3 py-1 text-xs">
                        {negotiation.platform}
                      </Badge>
                      <Badge className="bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold px-3 py-1 text-xs capitalize">
                        {negotiation.category.replace('-', ' ')}
                      </Badge>
                      <Badge className={`font-semibold text-white px-3 py-1 text-xs ${
                        negotiation.progress < 30 ? 'bg-gradient-to-r from-red-500 to-red-600' :
                        negotiation.progress < 70 ? 'bg-gradient-to-r from-yellow-500 to-orange-500' : 
                        'bg-gradient-to-r from-green-500 to-green-600'
                      }`}>
                        {getProgressLabel(negotiation.progress)}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-6 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span className="font-medium">Started {formatTimeAgo(negotiation.createdAt)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span className="font-medium">Last activity {formatTimeAgo(negotiation.lastActivity)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MessageSquare className="w-4 h-4" />
                        <span className="font-medium">{negotiation.messages.length} messages</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-xs text-gray-500 mb-1 font-medium">Original Price</div>
                  <div className="text-lg font-bold text-gray-700 line-through mb-3">
                    ${negotiation.originalPrice.toLocaleString()}
                  </div>
                  {negotiation.currentOffer && (
                    <>
                      <div className="text-xs text-green-600 mb-1 font-medium">Current Offer</div>
                      <div className="text-2xl font-bold text-green-600 mb-3">
                        ${negotiation.currentOffer.toLocaleString()}
                      </div>
                    </>
                  )}
                  {negotiation.maxBudget && (
                    <>
                      <div className="text-xs text-blue-600 mb-1 font-medium">Max Budget</div>
                      <div className="text-lg font-bold text-blue-600">
                        ${negotiation.maxBudget.toLocaleString()}
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Enhanced Progress Bar */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-gray-800">Negotiation Progress</span>
                  <span className="text-sm font-bold text-gray-900">{negotiation.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
                  <div 
                    className={`h-3 rounded-full transition-all duration-1000 ease-out shadow-lg ${getProgressColor(negotiation.progress)}`}
                    style={{ width: `${negotiation.progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Enhanced Savings Calculation */}
              {negotiation.currentOffer && (
                <div className="bg-gradient-to-r from-green-50 via-green-100 to-emerald-50 rounded-xl p-4 mb-6 border border-green-200 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center shadow-lg">
                        <TrendingDown className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-green-800">Potential Savings</div>
                        <div className="text-xs text-green-600 font-medium">If deal closes at current offer</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-green-600">
                        ${(negotiation.originalPrice - negotiation.currentOffer).toLocaleString()}
                      </div>
                      <div className="text-sm text-green-600 font-semibold">
                        {Math.round(((negotiation.originalPrice - negotiation.currentOffer) / negotiation.originalPrice) * 100)}% off
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Enhanced Latest Message Preview */}
              {negotiation.messages.length > 0 && (
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4 mb-6 border border-gray-200 shadow-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <MessageSquare className="w-4 h-4 text-gray-600" />
                    <div className="text-sm font-semibold text-gray-800">Latest Message</div>
                    <Badge className="bg-blue-100 text-blue-700 font-medium text-xs">
                      {negotiation.messages[negotiation.messages.length - 1].type === 'ai' ? 'AI' : 
                       negotiation.messages[negotiation.messages.length - 1].type === 'seller' ? 'Seller' : 'You'}
                    </Badge>
                  </div>
                  <div className="text-gray-800 text-sm leading-relaxed font-medium">
                    {negotiation.messages[negotiation.messages.length - 1].content.substring(0,150)}
                    {negotiation.messages[negotiation.messages.length - 1].content.length > 150 && '...'}
                  </div>
                  <div className="text-xs text-gray-500 mt-2 font-medium">
                    {formatTimeAgo(negotiation.messages[negotiation.messages.length - 1].timestamp)}
                  </div>
                </div>
              )}

              {/* Enhanced Action Buttons */}
              <div className="flex gap-4">
                <Button 
                  className="flex-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-600 hover:from-blue-600 hover:via-purple-600 hover:to-blue-700 text-white font-semibold h-12 rounded-xl text-sm shadow-xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105"
                  onClick={() => handleContinueNegotiation(negotiation.id)}
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Continue Negotiation
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button 
                  variant="outline"
                  className="px-6 h-12 rounded-xl border-2 border-gray-300 font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 text-sm"
                  onClick={() => {
                    onUpdateNegotiation(negotiation.id, { 
                      progress: Math.min(negotiation.progress + 15, 100) 
                    });
                    toast({
                      title: "Progress Updated",
                      description: "Negotiation progress has been updated.",
                    });
                  }}
                >
                  Update Progress
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ActiveNegotiations;