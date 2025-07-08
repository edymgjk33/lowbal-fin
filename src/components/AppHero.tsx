import React from 'react';
import { Sparkles, TrendingDown } from 'lucide-react';

const AppHero = () => {
  return (
    <div className="text-center mb-16">
      <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-100 to-blue-100 text-green-700 px-6 py-3 rounded-full text-sm font-medium mb-6">
        <Sparkles className="w-4 h-4" />
        AI-Powered Negotiation Engine
      </div>
      <h2 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
        Negotiate Smarter with
        <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent"> AI</span>
      </h2>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
        Get AI-powered counter-offers and persuasive messages to help you secure better deals on any platform. 
        Save money on every purchase with proven negotiation strategies.
      </p>
      
      <div className="flex items-center justify-center gap-8 mt-8">
        <div className="flex items-center gap-2 text-green-600">
          <TrendingDown className="w-5 h-5" />
          <span className="font-medium">Average 23% savings</span>
        </div>
        <div className="w-px h-6 bg-gray-300"></div>
        <div className="text-gray-600">
          <span className="font-medium">73% success rate</span>
        </div>
      </div>
    </div>
  );
};

export default AppHero;