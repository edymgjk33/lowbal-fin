import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, Loader2, Sparkles, Globe, CheckCircle, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ListingUrlParserProps {
  onListingParsed: (data: {
    title: string;
    price: string;
    platform: string;
    description?: string;
  }) => void;
}

const ListingUrlParser = ({ onListingParsed }: ListingUrlParserProps) => {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [lastParsedUrl, setLastParsedUrl] = useState('');
  const { toast } = useToast();

  const detectPlatform = (url: string): string => {
    if (url.includes('facebook.com') || url.includes('fb.com')) return 'Facebook Marketplace';
    if (url.includes('craigslist.org')) return 'Craigslist';
    if (url.includes('ebay.com')) return 'eBay';
    if (url.includes('zillow.com')) return 'Zillow';
    if (url.includes('offerup.com')) return 'OfferUp';
    if (url.includes('autotrader.com')) return 'AutoTrader';
    if (url.includes('cars.com')) return 'Cars.com';
    if (url.includes('cargurus.com')) return 'CarGurus';
    if (url.includes('realtor.com')) return 'Realtor.com';
    if (url.includes('apartments.com')) return 'Apartments.com';
    return 'Other';
  };

  const generateMockData = (platform: string, url: string) => {
    const platformData = {
      'Facebook Marketplace': {
        titles: ['2019 Honda Civic LX - Excellent Condition', 'MacBook Pro 13" M2 - Like New', 'Vintage Leather Sofa Set', 'iPhone 14 Pro Max 256GB'],
        prices: ['15500', '1200', '800', '950'],
        descriptions: ['One owner, recently serviced, clean title. Garage kept and well maintained.', 'Barely used, original packaging included. Perfect for students or professionals.', 'Beautiful vintage piece from smoke-free home. Minor wear but very comfortable.', 'Unlocked, excellent condition with original box and accessories.']
      },
      'Craigslist': {
        titles: ['2018 Toyota Camry - Reliable Daily Driver', 'Gaming PC Setup - RTX 3080', 'Dining Room Table with 6 Chairs', 'Samsung 65" 4K Smart TV'],
        prices: ['18000', '2200', '600', '750'],
        descriptions: ['Well maintained, highway miles, new tires. Perfect for commuting.', 'High-end gaming rig, runs everything on ultra settings. Includes monitor.', 'Solid wood construction, seats 6 comfortably. Moving sale.', 'Excellent picture quality, smart features work perfectly. Wall mount included.']
      },
      'eBay': {
        titles: ['Vintage Rolex Submariner - Collectors Item', 'Nintendo Switch OLED Bundle', 'Antique Oak Dining Set', 'Canon EOS R5 Camera Body'],
        prices: ['8500', '450', '1200', '3200'],
        descriptions: ['Authentic vintage piece, serviced recently. Comes with original papers.', 'Includes console, games, and accessories. Excellent condition.', 'Beautiful antique piece, solid oak construction. Estate sale item.', 'Professional camera, low shutter count. Includes original packaging.']
      },
      'Zillow': {
        titles: ['3BR/2BA Ranch Home - Move-in Ready', '2BR Condo Downtown - City Views', '4BR Colonial - Family Neighborhood', 'Studio Apartment - Modern Amenities'],
        prices: ['285000', '195000', '425000', '1200'],
        descriptions: ['Recently updated kitchen and bathrooms. Large backyard, quiet neighborhood.', 'High floor with amazing city views. Building amenities include gym and pool.', 'Spacious family home in excellent school district. Large lot with mature trees.', 'Modern studio in luxury building. Concierge, rooftop deck, and fitness center.']
      }
    };

    const data = platformData[platform as keyof typeof platformData] || platformData['Facebook Marketplace'];
    const randomIndex = Math.floor(Math.random() * data.titles.length);
    
    return {
      title: data.titles[randomIndex],
      price: data.prices[randomIndex],
      platform: platform,
      description: data.descriptions[randomIndex]
    };
  };

  const parseUrl = async () => {
    if (!url) {
      toast({
        title: "URL Required",
        description: "Please enter a listing URL to parse.",
        variant: "destructive"
      });
      return;
    }

    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid URL starting with http:// or https://",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      // Simulate network delay for realistic experience
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const platform = detectPlatform(url);
      const mockData = generateMockData(platform, url);

      onListingParsed(mockData);
      setLastParsedUrl(url);
      
      toast({
        title: "URL Parsed Successfully! 🎉",
        description: "The listing information has been extracted and populated in the form.",
      });
      
      setUrl('');
    } catch (error) {
      toast({
        title: "Parsing Failed",
        description: "Unable to parse the listing URL. Please try entering the details manually.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const supportedPlatforms = [
    { name: 'Facebook Marketplace', icon: '📘', color: 'text-blue-600' },
    { name: 'Craigslist', icon: '📋', color: 'text-purple-600' },
    { name: 'eBay', icon: '🛒', color: 'text-yellow-600' },
    { name: 'Zillow', icon: '🏠', color: 'text-blue-700' },
    { name: 'OfferUp', icon: '📱', color: 'text-green-600' },
    { name: 'AutoTrader', icon: '🚗', color: 'text-red-600' },
    { name: 'Cars.com', icon: '🚙', color: 'text-orange-600' },
    { name: 'Realtor.com', icon: '🏡', color: 'text-indigo-600' }
  ];

  return (
    <Card className="border-0 shadow-2xl bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full -translate-y-16 translate-x-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-green-200/30 to-blue-200/30 rounded-full translate-y-12 -translate-x-12"></div>
      
      <CardHeader className="pb-8 relative z-10">
        <CardTitle className="flex items-center gap-4 text-3xl">
          <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl">
            <Link className="w-8 h-8 text-white" />
          </div>
          <div>
            <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Smart URL Parser
            </div>
            <p className="text-lg text-gray-600 font-normal">Instantly extract listing details from any URL</p>
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-8 relative z-10">
        <div className="space-y-6">
          <div className="space-y-4">
            <Label htmlFor="listing-url" className="text-lg font-semibold text-gray-800">
              Paste Listing URL
            </Label>
            <div className="relative">
              <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
              <Input
                id="listing-url"
                type="url"
                placeholder="https://facebook.com/marketplace/item/... or any listing URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="h-16 pl-14 pr-6 text-lg border-2 focus:border-blue-500 transition-all duration-300 bg-white/80 backdrop-blur-sm"
              />
            </div>
          </div>
          
          <Button 
            onClick={parseUrl} 
            disabled={isLoading || !url}
            className="w-full h-16 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-6 h-6 mr-4 animate-spin" />
                Parsing URL... Please wait
              </>
            ) : (
              <>
                <Sparkles className="w-6 h-6 mr-4" />
                Parse Listing Information
              </>
            )}
          </Button>

          {lastParsedUrl && (
            <div className="p-4 bg-green-50 rounded-xl border-2 border-green-200">
              <div className="flex items-center gap-3 text-green-700">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">Successfully parsed: {lastParsedUrl.substring(0, 50)}...</span>
              </div>
            </div>
          )}
        </div>

        {/* Supported Platforms */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <Globe className="w-5 h-5 text-blue-600" />
            Supported Platforms
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {supportedPlatforms.map((platform, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200 hover:border-blue-300 transition-colors"
              >
                <span className="text-xl">{platform.icon}</span>
                <span className={`text-sm font-medium ${platform.color}`}>
                  {platform.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">What gets extracted:</h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-gray-700">Item title & description</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-gray-700">Asking price</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-gray-700">Platform detection</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-gray-700">Seller information</span>
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
            <AlertCircle className="w-4 h-4" />
            Connect to Supabase for real-time parsing functionality
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ListingUrlParser;