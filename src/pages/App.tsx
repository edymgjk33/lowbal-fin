import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useToast } from "@/hooks/use-toast";
import AppHeader from '../components/AppHeader';
import NegotiationTabs from '../components/NegotiationTabs';
import ActiveNegotiations from '../components/ActiveNegotiations';
import OrderHistory from '../components/OrderHistory';
import SavingsTracker from '../components/SavingsTracker';
import Onboarding from '../components/Onboarding';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, Activity, History, TrendingUp, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import BackgroundLayout from '../components/shared/BackgroundLayout';

export interface NegotiationTab {
  id: string;
  title: string;
  category: string;
  platform: string;
  originalPrice: number;
  maxBudget?: number;
  currentOffer?: number;
  status: 'active' | 'completed' | 'closed';
  createdAt: Date;
  lastActivity: Date;
  progress: number;
  messages: Array<{
    id: string;
    type: 'user' | 'ai' | 'seller';
    content: string;
    timestamp: Date;
    isAudio?: boolean;
    hasImage?: boolean;
  }>;
}

export interface CompletedDeal {
  id: string;
  title: string;
  category: string;
  platform: string;
  originalPrice: number;
  finalPrice: number;
  savings: number;
  savingsPercentage: number;
  completedAt: Date;
  dealClosed: boolean;
}

const AppPage = () => {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [activeMainTab, setActiveMainTab] = useState('negotiate');
  const [negotiationTabs, setNegotiationTabs] = useState<NegotiationTab[]>([]);
  const [completedDeals, setCompletedDeals] = useState<CompletedDeal[]>([]);
  const [showDealDialog, setShowDealDialog] = useState(false);
  const [closingTabId, setClosingTabId] = useState('');
  const [dealClosed, setDealClosed] = useState(false);
  const [finalPrice, setFinalPrice] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    const hasCompletedOnboarding = localStorage.getItem('hasCompletedOnboarding');
    if (!hasCompletedOnboarding) {
      setShowOnboarding(true);
    }
  }, []);

  const handleOnboardingComplete = useCallback((userData: any) => {
    localStorage.setItem('hasCompletedOnboarding', 'true');
    localStorage.setItem('userOnboardingData', JSON.stringify(userData));
    setShowOnboarding(false);
    
    toast({
      title: `Welcome to Lowbal! 🎉`,
      description: `Your ${userData.userType} profile is ready. Let's start saving money!`,
    });
  }, [toast]);

  const createNewNegotiation = useCallback(() => {
    const newTab: NegotiationTab = {
      id: Date.now().toString(),
      title: '',
      category: '',
      platform: '',
      originalPrice: 0,
      status: 'active',
      createdAt: new Date(),
      lastActivity: new Date(),
      progress: 0,
      messages: []
    };
    
    setNegotiationTabs(prev => [...prev, newTab]);
    setActiveMainTab('negotiate');
    
    toast({
      title: "New Negotiation Started",
      description: "A new negotiation tab has been created.",
    });
  }, [toast]);

  const updateNegotiationTab = useCallback((tabId: string, updates: Partial<NegotiationTab>) => {
    setNegotiationTabs(prev => 
      prev.map(tab => 
        tab.id === tabId ? { ...tab, ...updates, lastActivity: new Date() } : tab
      )
    );
  }, []);

  const closeNegotiationTab = useCallback((tabId: string) => {
    const tab = negotiationTabs.find(t => t.id === tabId);
    if (!tab) return;
    setClosingTabId(tabId);
    setShowDealDialog(true);
  }, [negotiationTabs]);

  const handleContinueNegotiation = useCallback((negotiationId: string) => {
    setActiveMainTab('negotiate');
  }, []);

  const handleDealCompletion = useCallback(() => {
    const tab = negotiationTabs.find(t => t.id === closingTabId);
    if (!tab) return;

    if (dealClosed && finalPrice) {
      const finalPriceNum = parseFloat(finalPrice);
      if (finalPriceNum && finalPriceNum < tab.originalPrice) {
        const savings = tab.originalPrice - finalPriceNum;
        const savingsPercentage = Math.round((savings / tab.originalPrice) * 100);
        
        const completedDeal: CompletedDeal = {
          id: closingTabId,
          title: tab.title,
          category: tab.category,
          platform: tab.platform,
          originalPrice: tab.originalPrice,
          finalPrice: finalPriceNum,
          savings,
          savingsPercentage,
          completedAt: new Date(),
          dealClosed: true
        };
        
        setCompletedDeals(prev => [completedDeal, ...prev]);
        
        toast({
          title: "Deal Completed! 🎉",
          description: `You saved $${savings} (${savingsPercentage}% off)!`,
        });
      }
    }
    
    setNegotiationTabs(prev => prev.filter(t => t.id !== closingTabId));
    setShowDealDialog(false);
    setClosingTabId('');
    setDealClosed(false);
    setFinalPrice('');
  }, [negotiationTabs, closingTabId, dealClosed, finalPrice, toast]);

  const stats = useMemo(() => {
    const totalSavings = completedDeals.reduce((sum, deal) => sum + deal.savings, 0);
    const totalDeals = completedDeals.length;
    const averageSavings = totalDeals > 0 ? Math.round(totalSavings / totalDeals) : 0;
    const activeNegotiationsCount = negotiationTabs.filter(tab => tab.status === 'active').length;
    const successRate = totalDeals > 0 ? Math.round((completedDeals.filter(deal => deal.dealClosed).length / totalDeals) * 100) : 0;
    
    return { totalSavings, totalDeals, averageSavings, activeNegotiationsCount, successRate };
  }, [completedDeals, negotiationTabs]);

  const tabsConfig = useMemo(() => [
    { value: 'negotiate', label: 'Negotiate', icon: MessageSquare, count: negotiationTabs.length, gradient: 'from-emerald-500 to-cyan-500' },
    { value: 'active', label: 'Active Deals', icon: Activity, count: stats.activeNegotiationsCount, gradient: 'from-cyan-500 to-blue-500' },
    { value: 'history', label: 'History', icon: History, count: stats.totalDeals, gradient: 'from-blue-500 to-purple-500' },
    { value: 'analytics', label: 'Analytics', icon: TrendingUp, gradient: 'from-purple-500 to-pink-500' }
  ], [negotiationTabs.length, stats.activeNegotiationsCount, stats.totalDeals]);

  if (showOnboarding) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  return (
    <BackgroundLayout>
      <AppHeader />

      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={createNewNegotiation}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500 hover:from-emerald-600 hover:via-cyan-600 hover:to-blue-600 shadow-xl hover:shadow-emerald-500/25 transition-all duration-300 hover:scale-110 border-0 group"
        >
          <Plus className="w-6 h-6 text-white group-hover:rotate-90 transition-transform duration-300" />
        </Button>
      </div>

      <SavingsTracker {...stats} />

      <div className="max-w-7xl mx-auto px-4 py-6">
        <Tabs value={activeMainTab} onValueChange={setActiveMainTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6 bg-black/20 backdrop-blur-xl shadow-xl rounded-2xl p-2 h-12 border border-white/20">
            {tabsConfig.map((tab) => (
              <TabsTrigger 
                key={tab.value}
                value={tab.value} 
                className={`text-xs font-semibold h-8 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:${tab.gradient} data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 text-gray-300 hover:text-white flex items-center gap-2 hover:scale-105`}
              >
                <tab.icon className="w-3 h-3" />
                <div className="flex items-center gap-1">
                  {tab.label}
                  {tab.count !== undefined && (
                    <span className="bg-white/20 text-xs px-1.5 py-0.5 rounded-full font-semibold">
                      {tab.count}
                    </span>
                  )}
                </div>
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="negotiate" className="space-y-4">
            <NegotiationTabs
              tabs={negotiationTabs}
              onUpdateTab={updateNegotiationTab}
              onCloseTab={closeNegotiationTab}
              onCreateNew={createNewNegotiation}
            />
          </TabsContent>

          <TabsContent value="active">
            <ActiveNegotiations 
              negotiations={negotiationTabs.filter(tab => tab.status === 'active')}
              onUpdateNegotiation={updateNegotiationTab}
              onContinueNegotiation={handleContinueNegotiation}
            />
          </TabsContent>

          <TabsContent value="history">
            <OrderHistory deals={completedDeals} />
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20">
                <h3 className="text-xl font-bold text-white mb-6">Savings Analytics</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 backdrop-blur-xl rounded-xl border border-emerald-500/30">
                    <span className="text-emerald-300 font-semibold text-sm">Total Saved</span>
                    <span className="text-xl font-bold text-emerald-400">${stats.totalSavings.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-xl rounded-xl border border-cyan-500/30">
                    <span className="text-cyan-300 font-semibold text-sm">Deals Completed</span>
                    <span className="text-xl font-bold text-cyan-400">{stats.totalDeals}</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-xl rounded-xl border border-blue-500/30">
                    <span className="text-blue-300 font-semibold text-sm">Average Savings</span>
                    <span className="text-xl font-bold text-blue-400">${stats.averageSavings}</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-xl rounded-xl border border-purple-500/30">
                    <span className="text-purple-300 font-semibold text-sm">Success Rate</span>
                    <span className="text-xl font-bold text-purple-400">{stats.successRate}%</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20">
                <h3 className="text-xl font-bold text-white mb-6">Category Breakdown</h3>
                <div className="space-y-3">
                  {['cars', 'electronics', 'furniture', 'real-estate', 'gadgets', 'motorcycles'].map(category => {
                    const categoryDeals = completedDeals.filter(deal => deal.category === category);
                    const categorySavings = categoryDeals.reduce((sum, deal) => sum + deal.savings, 0);
                    const categoryAvgSavings = categoryDeals.length > 0 ? Math.round(categorySavings / categoryDeals.length) : 0;
                    
                    if (categoryDeals.length === 0) return null;
                    
                    return (
                      <div key={category} className="flex items-center justify-between p-3 bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 hover:bg-white/15 transition-all duration-300">
                        <span className="capitalize font-semibold text-white text-sm">{category.replace('-', ' ')}</span>
                        <div className="text-right">
                          <div className="font-bold text-emerald-400 text-sm">${categorySavings.toLocaleString()}</div>
                          <div className="text-xs text-gray-300">{categoryDeals.length} deals • ${categoryAvgSavings} avg</div>
                        </div>
                      </div>
                    );
                  })}
                  {completedDeals.length === 0 && (
                    <div className="text-center py-6 text-gray-400">
                      <p className="text-sm">No completed deals yet. Start negotiating to see your analytics!</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Dialog open={showDealDialog} onOpenChange={setShowDealDialog}>
        <DialogContent className="bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-xl border border-white/20 shadow-xl rounded-2xl max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-gray-900 mb-2">
              Deal Completion
            </DialogTitle>
            <DialogDescription className="text-gray-700 font-medium text-sm">
              Did you successfully close this deal?
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 pt-3">
            <div className="flex gap-3">
              <Button
                onClick={() => setDealClosed(true)}
                className={`flex-1 h-10 rounded-xl font-semibold transition-all duration-300 text-sm ${
                  dealClosed 
                    ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg scale-105' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Yes, Deal Closed! 🎉
              </Button>
              <Button
                onClick={() => setDealClosed(false)}
                className={`flex-1 h-10 rounded-xl font-semibold transition-all duration-300 text-sm ${
                  !dealClosed 
                    ? 'bg-gradient-to-r from-gray-500 to-gray-600 text-white shadow-lg scale-105' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                No, Just Closing
              </Button>
            </div>

            {dealClosed && (
              <div className="space-y-3 p-3 bg-green-50 rounded-xl border border-green-200">
                <Label htmlFor="finalPrice" className="text-sm font-semibold text-green-800">
                  What was the final price?
                </Label>
                <Input
                  id="finalPrice"
                  type="number"
                  placeholder="Enter final price"
                  value={finalPrice}
                  onChange={(e) => setFinalPrice(e.target.value)}
                  className="h-10 border-2 border-green-300 focus:border-green-500 bg-white text-gray-900 font-medium rounded-lg text-sm"
                />
              </div>
            )}

            <div className="flex gap-3 pt-3">
              <Button
                onClick={() => setShowDealDialog(false)}
                variant="outline"
                className="flex-1 h-10 rounded-xl font-semibold border-2 border-gray-300 text-gray-700 hover:bg-gray-50 text-sm"
              >
                Cancel
              </Button>
              <Button
                onClick={handleDealCompletion}
                className="flex-1 h-10 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg transition-all duration-300 text-sm"
              >
                Confirm
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </BackgroundLayout>
  );
};

export default AppPage;