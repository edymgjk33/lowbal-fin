import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare, Zap, Target, ArrowRight, CheckCircle, TrendingDown, Users, Star, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import BackgroundLayout from '../components/shared/BackgroundLayout';
import Logo from '../components/shared/Logo';
import StatsCard from '../components/shared/StatsCard';

const Landing = () => {
  const features = [
    {
      icon: Target,
      title: "1. Input Listing Details",
      description: "Paste the item title, price, and platform. Add any extra context about the seller or condition.",
      gradient: "from-emerald-500 to-cyan-500",
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=250&fit=crop&auto=format"
    },
    {
      icon: Zap,
      title: "2. AI Calculates Strategy",
      description: "Our algorithm analyzes market data, platform patterns, and pricing psychology to determine the optimal offer.",
      gradient: "from-cyan-500 to-blue-500",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop&auto=format"
    },
    {
      icon: MessageSquare,
      title: "3. Send Perfect Message",
      description: "Copy our AI-crafted message that's proven to get positive responses and close deals at lower prices.",
      gradient: "from-blue-500 to-purple-500",
      image: "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=400&h=250&fit=crop&auto=format"
    }
  ];

  const platforms = [
    { name: 'Facebook', icon: 'f', color: 'from-blue-500 to-blue-600' },
    { name: 'Craigslist', icon: 'CL', color: 'from-purple-500 to-purple-600' },
    { name: 'eBay', icon: 'e', color: 'from-yellow-500 to-orange-500' },
    { name: 'Zillow', icon: 'Z', color: 'from-blue-600 to-blue-700' },
    { name: 'OfferUp', icon: 'O', color: 'from-green-500 to-emerald-600' }
  ];

  return (
    <BackgroundLayout>
      <div className="bg-black/20 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Logo />
            <div className="flex items-center gap-4">
              <Link to="/login">
                <Button variant="ghost" className="text-white hover:text-white hover:bg-white/20 transition-all duration-300 font-bold text-lg px-6 py-3 rounded-xl border border-white/20">
                  Sign In
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500 hover:from-emerald-600 hover:via-cyan-600 hover:to-blue-600 text-white font-black px-8 py-3 rounded-2xl shadow-2xl hover:shadow-emerald-500/25 transform hover:scale-105 transition-all duration-300 border-0 text-lg">
                  Try Lowbal Free
                  <Sparkles className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 backdrop-blur-xl text-emerald-300 px-6 py-3 rounded-full text-sm font-bold border border-emerald-500/30">
              <Star className="w-5 h-5 text-yellow-400" />
              Trusted by 50,000+ smart shoppers
            </div>
            <h2 className="text-7xl font-black text-white leading-tight">
              Never Pay
              <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent"> Full Price </span>
              Again
            </h2>
            <p className="text-2xl text-gray-300 leading-relaxed font-medium">
              Lowbal uses advanced AI to craft perfect negotiation messages and calculate optimal counter-offers for any online marketplace.
            </p>
            
            <div className="grid grid-cols-3 gap-8 py-8">
              <StatsCard 
                icon={Target} 
                value="73%" 
                label="Success Rate" 
                gradient="from-emerald-500/10 to-cyan-500/10"
                textColor="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent"
              />
              <StatsCard 
                icon={TrendingDown} 
                value="$1,247" 
                label="Avg. Savings" 
                gradient="from-cyan-500/10 to-blue-500/10"
                textColor="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent"
              />
              <StatsCard 
                icon={Users} 
                value="2.3M" 
                label="Deals Closed" 
                gradient="from-blue-500/10 to-purple-500/10"
                textColor="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-6">
              <Link to="/signup">
                <Button size="lg" className="bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500 hover:from-emerald-600 hover:via-cyan-600 hover:to-blue-600 text-white font-black text-xl px-12 py-6 rounded-2xl shadow-2xl hover:shadow-emerald-500/25 transform hover:scale-105 transition-all duration-300 border-0 w-full sm:w-auto">
                  Start Negotiating Now
                  <Zap className="w-6 h-6 ml-3" />
                </Button>
              </Link>
              <Link to="/demo">
                <Button size="lg" variant="outline" className="w-full sm:w-auto text-xl px-12 py-6 rounded-2xl border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-xl font-black transition-all duration-300 hover:scale-105 bg-white/5">
                  Watch Demo
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20">
              <img 
                src="https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&h=400&fit=crop&auto=format"
                alt="Negotiation success"
                className="w-full h-64 object-cover rounded-2xl mb-6 shadow-2xl"
              />
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white/10 backdrop-blur-xl rounded-xl border border-white/20">
                  <span className="text-gray-200 font-bold">Original Price:</span>
                  <span className="font-black text-white line-through text-xl">$1,200</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 backdrop-blur-xl rounded-xl border border-emerald-500/30">
                  <span className="text-emerald-200 font-black">Your Offer:</span>
                  <span className="text-3xl font-black text-emerald-300">$850</span>
                </div>
                <div className="text-center p-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-xl font-black text-lg shadow-xl">
                  💰 You saved $350 (29% off)!
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-black/30 backdrop-blur-xl py-20 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-black text-white mb-6">Works on All Major Platforms</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center justify-items-center">
            {platforms.map((platform, index) => (
              <div key={index} className="flex flex-col items-center gap-4 p-6 rounded-2xl hover:bg-white/10 transition-all duration-300 transform hover:scale-110">
                <div className={`w-20 h-20 bg-gradient-to-br ${platform.color} rounded-2xl flex items-center justify-center shadow-2xl`}>
                  <span className="text-white font-black text-2xl">{platform.icon}</span>
                </div>
                <span className="text-sm font-black text-white">{platform.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <h3 className="text-6xl font-black text-white mb-8">How Lowbal Works</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-2xl hover:shadow-emerald-500/25 transition-all duration-500 group bg-white/95 backdrop-blur-xl transform hover:scale-105">
                <CardContent className="p-10 text-center">
                  <div className={`w-24 h-24 bg-gradient-to-br ${feature.gradient} rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-500 shadow-2xl`}>
                    <feature.icon className="w-12 h-12 text-white" />
                  </div>
                  <img 
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-48 object-cover rounded-2xl mb-8 shadow-2xl"
                  />
                  <h4 className="text-2xl font-black text-gray-900 mb-4">{feature.title}</h4>
                  <p className="text-gray-800 text-lg leading-relaxed font-bold">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-emerald-600 via-cyan-600 to-blue-600 py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h3 className="text-6xl font-black text-white mb-10">
            Ready to Save Money on Your Next Purchase?
          </h3>
          <Link to="/signup">
            <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 text-2xl px-16 py-8 rounded-2xl shadow-2xl hover:shadow-white/25 transition-all duration-300 transform hover:scale-105 font-black">
              Start Negotiating Free
              <ArrowRight className="w-8 h-8 ml-4" />
            </Button>
          </Link>
          <p className="text-white mt-8 text-xl font-bold">
            No signup required • Works instantly • Free forever
          </p>
        </div>
      </div>

      <div className="bg-black/50 backdrop-blur-xl py-16 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-center gap-6 mb-8">
            <Logo size="sm" />
          </div>
          <p className="text-center text-gray-200 text-xl font-bold">
            © 2024 Lowbal. AI-powered negotiation made simple.
          </p>
        </div>
      </div>
    </BackgroundLayout>
  );
};

export default Landing;