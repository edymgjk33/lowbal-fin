import React from 'react';
import { ArrowLeft, User, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const AppHeader = () => {
  return (
    <div className="bg-black/20 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-gray-300 hover:text-white transition-colors">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <div className="flex items-center gap-4">
              {/* Enhanced Creative Logo */}
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 via-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center shadow-2xl transform rotate-12 hover:rotate-0 transition-transform duration-500">
                  <div className="w-10 h-10 bg-gradient-to-br from-white/90 to-white/70 rounded-xl flex items-center justify-center">
                    <div className="text-transparent bg-gradient-to-br from-emerald-600 to-blue-600 bg-clip-text font-black text-xl">L</div>
                  </div>
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-bounce"></div>
              </div>
              <div>
                <h1 className="text-3xl font-black bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">Lowbal</h1>
                <p className="text-sm text-gray-300 font-medium">AI-Powered Negotiation Assistant</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Link to="/account">
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold px-6 py-3 rounded-xl shadow-xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105">
                <User className="w-5 h-5 mr-2" />
                Account
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppHeader;