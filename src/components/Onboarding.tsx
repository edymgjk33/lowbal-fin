import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ArrowLeft, CheckCircle, Users, ShoppingCart, Store, Globe, TrendingUp, MessageSquare, Search, Zap, Target } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import BackgroundLayout from './shared/BackgroundLayout';
import Logo from './shared/Logo';

interface OnboardingProps {
  onComplete: (userData: OnboardingData) => void;
}

interface OnboardingData {
  userType: 'buyer' | 'seller';
  country?: string;
  platform?: string;
  useCase?: string;
  category?: string;
  transactionVolume?: string;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [userType, setUserType] = useState<'buyer' | 'seller' | null>(null);
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({
    userType: 'buyer'
  });
  const { toast } = useToast();

  const countries = [
    'United States', 'Canada', 'United Kingdom', 'Australia', 'Germany', 
    'France', 'Spain', 'Italy', 'Netherlands', 'Sweden', 'Norway', 'Denmark',
    'Japan', 'South Korea', 'Singapore', 'New Zealand', 'Switzerland', 'Austria'
  ];

  const platforms = [
    'Facebook Marketplace', 'Craigslist', 'eBay', 'Amazon', 'Zillow', 'Realtor.com',
    'AutoTrader', 'Cars.com', 'OfferUp', 'Mercari', 'Poshmark', 'Depop', 'Vinted'
  ];

  const useCases = [
    { value: 'finding-deals', label: 'Finding Better Deals', description: 'Discover cheaper alternatives and better prices' },
    { value: 'negotiating', label: 'Negotiating Prices', description: 'Get AI help to negotiate lower prices' },
    { value: 'auto-messages', label: 'Automatic Message Follow-up', description: 'Automate responses and follow-ups' }
  ];

  const categories = [
    { value: 'real-estate', label: 'Real Estate', icon: '🏠' },
    { value: 'cars', label: 'Cars & Vehicles', icon: '🚗' },
    { value: 'electronics', label: 'Electronics', icon: '💻' },
    { value: 'furniture', label: 'Furniture', icon: '🪑' },
    { value: 'fashion', label: 'Fashion & Clothing', icon: '👕' },
    { value: 'collectibles', label: 'Collectibles', icon: '🎨' }
  ];

  const transactionVolumes = [
    { value: 'low', label: '1-5 transactions/month', description: 'Occasional seller' },
    { value: 'medium', label: '6-20 transactions/month', description: 'Regular seller' },
    { value: 'high', label: '21-50 transactions/month', description: 'Active seller' },
    { value: 'very-high', label: '50+ transactions/month', description: 'Professional seller' }
  ];

  const handleUserTypeSelect = (type: 'buyer' | 'seller') => {
    setUserType(type);
    setOnboardingData({ ...onboardingData, userType: type });
    setCurrentStep(1);
  };

  const handleNext = () => {
    if (currentStep < (userType === 'buyer' ? 3 : 3)) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    // Validate required fields
    if (userType === 'buyer') {
      if (!onboardingData.country || !onboardingData.platform || !onboardingData.useCase) {
        toast({
          title: "Please Complete All Steps",
          description: "Fill in all required information to continue.",
          variant: "destructive"
        });
        return;
      }
    } else {
      if (!onboardingData.category || !onboardingData.platform || !onboardingData.transactionVolume) {
        toast({
          title: "Please Complete All Steps",
          description: "Fill in all required information to continue.",
          variant: "destructive"
        });
        return;
      }
    }

    toast({
      title: "Welcome to Lowbal! 🎉",
      description: `Your ${userType} profile has been set up successfully.`,
    });

    onComplete(onboardingData);
  };

  const renderUserTypeSelection = () => (
    <div className="text-center space-y-8">
      <div className="space-y-4">
        <h2 className="text-4xl font-black text-white mb-4">Welcome to Lowbal!</h2>
        <p className="text-xl text-gray-300 font-medium max-w-2xl mx-auto">
          Let's personalize your experience. Are you primarily a buyer or seller?
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <Card 
          className="cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-2xl border-0 bg-gradient-to-br from-blue-50 via-white to-cyan-50 hover:shadow-blue-500/25 group"
          onClick={() => handleUserTypeSelect('buyer')}
        >
          <CardContent className="p-8 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-xl">
              <ShoppingCart className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-black text-gray-900 mb-4">I'm a Buyer</h3>
            <p className="text-gray-700 font-medium leading-relaxed mb-6">
              I want to find better deals, negotiate prices, and save money on purchases
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-blue-700 font-medium">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm">AI-powered price negotiation</span>
              </div>
              <div className="flex items-center gap-2 text-blue-700 font-medium">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm">Better deal discovery</span>
              </div>
              <div className="flex items-center gap-2 text-blue-700 font-medium">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm">Smart message templates</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card 
          className="cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-2xl border-0 bg-gradient-to-br from-green-50 via-white to-emerald-50 hover:shadow-green-500/25 group"
          onClick={() => handleUserTypeSelect('seller')}
        >
          <CardContent className="p-8 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-xl">
              <Store className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-black text-gray-900 mb-4">I'm a Seller</h3>
            <p className="text-gray-700 font-medium leading-relaxed mb-6">
              I want to optimize my listings, handle negotiations, and maximize my sales
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-green-700 font-medium">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm">Automated buyer responses</span>
              </div>
              <div className="flex items-center gap-2 text-green-700 font-medium">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm">Price optimization</span>
              </div>
              <div className="flex items-center gap-2 text-green-700 font-medium">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm">Sales analytics</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderBuyerStep1 = () => (
    <div className="max-w-2xl mx-auto">
      <Card className="shadow-2xl border-0 bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-xl">
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-2xl font-black text-gray-900 mb-2">
            Where are you located?
          </CardTitle>
          <p className="text-gray-600 font-medium">
            This helps us provide region-specific pricing insights and platform recommendations
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <label className="text-sm font-black text-gray-800">Select Your Country</label>
            <Select 
              value={onboardingData.country} 
              onValueChange={(value) => setOnboardingData({...onboardingData, country: value})}
            >
              <SelectTrigger className="h-12 border-2 focus:border-blue-500 bg-white text-gray-900 font-medium rounded-xl">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-gray-500" />
                  <SelectValue placeholder="Choose your country" />
                </div>
              </SelectTrigger>
              <SelectContent className="bg-white">
                {countries.map((country) => (
                  <SelectItem key={country} value={country} className="font-medium">
                    {country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {onboardingData.country && (
            <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
              <div className="flex items-center gap-2 text-blue-700 font-semibold mb-1">
                <CheckCircle className="w-4 h-4" />
                Great choice!
              </div>
              <p className="text-blue-600 text-sm font-medium">
                We'll customize pricing strategies and platform recommendations for {onboardingData.country}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );

  const renderBuyerStep2 = () => (
    <div className="max-w-2xl mx-auto">
      <Card className="shadow-2xl border-0 bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-xl">
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-2xl font-black text-gray-900 mb-2">
            Which platform do you use most?
          </CardTitle>
          <p className="text-gray-600 font-medium">
            We'll optimize our negotiation strategies for your preferred marketplace
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <label className="text-sm font-black text-gray-800">Primary Shopping Platform</label>
            <Select 
              value={onboardingData.platform} 
              onValueChange={(value) => setOnboardingData({...onboardingData, platform: value})}
            >
              <SelectTrigger className="h-12 border-2 focus:border-blue-500 bg-white text-gray-900 font-medium rounded-xl">
                <div className="flex items-center gap-2">
                  <Store className="w-4 h-4 text-gray-500" />
                  <SelectValue placeholder="Choose your main platform" />
                </div>
              </SelectTrigger>
              <SelectContent className="bg-white">
                {platforms.map((platform) => (
                  <SelectItem key={platform} value={platform} className="font-medium">
                    {platform}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {onboardingData.platform && (
            <div className="p-4 bg-green-50 rounded-xl border border-green-200">
              <div className="flex items-center gap-2 text-green-700 font-semibold mb-1">
                <CheckCircle className="w-4 h-4" />
                Perfect!
              </div>
              <p className="text-green-600 text-sm font-medium">
                Our AI will use {onboardingData.platform}-specific negotiation tactics and pricing data
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );

  const renderBuyerStep3 = () => (
    <div className="max-w-3xl mx-auto">
      <Card className="shadow-2xl border-0 bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-xl">
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-2xl font-black text-gray-900 mb-2">
            What's your main use case?
          </CardTitle>
          <p className="text-gray-600 font-medium">
            This helps us prioritize the features most relevant to your needs
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4">
            {useCases.map((useCase) => (
              <div
                key={useCase.value}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                  onboardingData.useCase === useCase.value
                    ? 'border-blue-500 bg-blue-50 shadow-lg scale-105'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50/50'
                }`}
                onClick={() => setOnboardingData({...onboardingData, useCase: useCase.value})}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    onboardingData.useCase === useCase.value
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {useCase.value === 'finding-deals' && <Search className="w-5 h-5" />}
                    {useCase.value === 'negotiating' && <Target className="w-5 h-5" />}
                    {useCase.value === 'auto-messages' && <Zap className="w-5 h-5" />}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-black text-gray-900 mb-1">{useCase.label}</h3>
                    <p className="text-gray-600 text-sm font-medium">{useCase.description}</p>
                  </div>
                  {onboardingData.useCase === useCase.value && (
                    <CheckCircle className="w-5 h-5 text-blue-500" />
                  )}
                </div>
              </div>
            ))}
          </div>

          {onboardingData.useCase && (
            <div className="p-4 bg-purple-50 rounded-xl border border-purple-200">
              <div className="flex items-center gap-2 text-purple-700 font-semibold mb-1">
                <CheckCircle className="w-4 h-4" />
                Excellent choice!
              </div>
              <p className="text-purple-600 text-sm font-medium">
                We'll customize your dashboard and AI recommendations for {useCases.find(u => u.value === onboardingData.useCase)?.label.toLowerCase()}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );

  const renderSellerStep1 = () => (
    <div className="max-w-3xl mx-auto">
      <Card className="shadow-2xl border-0 bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-xl">
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-2xl font-black text-gray-900 mb-2">
            What category do you primarily sell in?
          </CardTitle>
          <p className="text-gray-600 font-medium">
            This helps us provide category-specific pricing and negotiation strategies
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            {categories.map((category) => (
              <div
                key={category.value}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                  onboardingData.category === category.value
                    ? 'border-green-500 bg-green-50 shadow-lg scale-105'
                    : 'border-gray-200 hover:border-green-300 hover:bg-green-50/50'
                }`}
                onClick={() => setOnboardingData({...onboardingData, category: category.value})}
              >
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{category.icon}</div>
                  <div className="flex-1">
                    <h3 className="font-black text-gray-900">{category.label}</h3>
                  </div>
                  {onboardingData.category === category.value && (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  )}
                </div>
              </div>
            ))}
          </div>

          {onboardingData.category && (
            <div className="p-4 bg-green-50 rounded-xl border border-green-200">
              <div className="flex items-center gap-2 text-green-700 font-semibold mb-1">
                <CheckCircle className="w-4 h-4" />
                Great selection!
              </div>
              <p className="text-green-600 text-sm font-medium">
                We'll provide specialized tools and insights for {categories.find(c => c.value === onboardingData.category)?.label} sales
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );

  const renderSellerStep2 = () => (
    <div className="max-w-2xl mx-auto">
      <Card className="shadow-2xl border-0 bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-xl">
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-2xl font-black text-gray-900 mb-2">
            Which platform do you sell on most?
          </CardTitle>
          <p className="text-gray-600 font-medium">
            We'll optimize our seller tools for your primary marketplace
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <label className="text-sm font-black text-gray-800">Primary Selling Platform</label>
            <Select 
              value={onboardingData.platform} 
              onValueChange={(value) => setOnboardingData({...onboardingData, platform: value})}
            >
              <SelectTrigger className="h-12 border-2 focus:border-green-500 bg-white text-gray-900 font-medium rounded-xl">
                <div className="flex items-center gap-2">
                  <Store className="w-4 h-4 text-gray-500" />
                  <SelectValue placeholder="Choose your main selling platform" />
                </div>
              </SelectTrigger>
              <SelectContent className="bg-white">
                {platforms.map((platform) => (
                  <SelectItem key={platform} value={platform} className="font-medium">
                    {platform}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {onboardingData.platform && (
            <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
              <div className="flex items-center gap-2 text-blue-700 font-semibold mb-1">
                <CheckCircle className="w-4 h-4" />
                Perfect!
              </div>
              <p className="text-blue-600 text-sm font-medium">
                Our seller tools will be optimized for {onboardingData.platform} marketplace dynamics
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );

  const renderSellerStep3 = () => (
    <div className="max-w-3xl mx-auto">
      <Card className="shadow-2xl border-0 bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-xl">
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-2xl font-black text-gray-900 mb-2">
            What's your monthly transaction volume?
          </CardTitle>
          <p className="text-gray-600 font-medium">
            This helps us recommend the right features and pricing tier for your business
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4">
            {transactionVolumes.map((volume) => (
              <div
                key={volume.value}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                  onboardingData.transactionVolume === volume.value
                    ? 'border-purple-500 bg-purple-50 shadow-lg scale-105'
                    : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50/50'
                }`}
                onClick={() => setOnboardingData({...onboardingData, transactionVolume: volume.value})}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    onboardingData.transactionVolume === volume.value
                      ? 'bg-purple-500 text-white'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-black text-gray-900 mb-1">{volume.label}</h3>
                    <p className="text-gray-600 text-sm font-medium">{volume.description}</p>
                  </div>
                  {onboardingData.transactionVolume === volume.value && (
                    <CheckCircle className="w-5 h-5 text-purple-500" />
                  )}
                </div>
              </div>
            ))}
          </div>

          {onboardingData.transactionVolume && (
            <div className="p-4 bg-orange-50 rounded-xl border border-orange-200">
              <div className="flex items-center gap-2 text-orange-700 font-semibold mb-1">
                <CheckCircle className="w-4 h-4" />
                Perfect fit!
              </div>
              <p className="text-orange-600 text-sm font-medium">
                We'll recommend features and tools suited for {transactionVolumes.find(v => v.value === onboardingData.transactionVolume)?.description.toLowerCase()}s
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );

  const getStepContent = () => {
    if (currentStep === 0) return renderUserTypeSelection();
    
    if (userType === 'buyer') {
      switch (currentStep) {
        case 1: return renderBuyerStep1();
        case 2: return renderBuyerStep2();
        case 3: return renderBuyerStep3();
        default: return renderUserTypeSelection();
      }
    } else {
      switch (currentStep) {
        case 1: return renderSellerStep1();
        case 2: return renderSellerStep2();
        case 3: return renderSellerStep3();
        default: return renderUserTypeSelection();
      }
    }
  };

  const getProgressPercentage = () => {
    if (currentStep === 0) return 0;
    const totalSteps = 3;
    return (currentStep / totalSteps) * 100;
  };

  return (
    <BackgroundLayout>
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Logo />
            <div className="flex items-center gap-4">
              {currentStep > 0 && (
                <Badge className="bg-white/20 text-white font-bold px-4 py-2 text-sm">
                  Step {currentStep} of 3
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      {currentStep > 0 && (
        <div className="bg-black/10 backdrop-blur-xl py-4">
          <div className="max-w-4xl mx-auto px-4">
            <div className="w-full bg-white/20 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-emerald-400 to-cyan-400 h-2 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${getProgressPercentage()}%` }}
              ></div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {getStepContent()}

        {/* Navigation Buttons */}
        {currentStep > 0 && (
          <div className="flex justify-between items-center mt-12 max-w-2xl mx-auto">
            <Button
              onClick={handleBack}
              variant="outline"
              className="bg-white/20 border-white/40 text-white hover:bg-white/30 hover:border-white/60 font-semibold px-6 py-3 rounded-xl backdrop-blur-sm"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>

            <Button
              onClick={handleNext}
              disabled={
                (currentStep === 1 && userType === 'buyer' && !onboardingData.country) ||
                (currentStep === 2 && userType === 'buyer' && !onboardingData.platform) ||
                (currentStep === 3 && userType === 'buyer' && !onboardingData.useCase) ||
                (currentStep === 1 && userType === 'seller' && !onboardingData.category) ||
                (currentStep === 2 && userType === 'seller' && !onboardingData.platform) ||
                (currentStep === 3 && userType === 'seller' && !onboardingData.transactionVolume)
              }
              className="bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500 hover:from-emerald-600 hover:via-cyan-600 hover:to-blue-600 text-white font-black px-8 py-3 rounded-xl shadow-xl hover:shadow-emerald-500/25 transition-all duration-300 hover:scale-105 border-0"
            >
              {currentStep === 3 ? 'Complete Setup' : 'Continue'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}
      </div>
    </BackgroundLayout>
  );
};

export default Onboarding;