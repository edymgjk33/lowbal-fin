import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, TrendingDown, Star, Clock, MapPin, Sparkles } from "lucide-react";

interface Deal {
  id: string;
  title: string;
  price: number;
  originalPrice: number;
  platform: string;
  location: string;
  rating: number;
  timeLeft?: string;
  image: string;
  savings: number;
  savingsPercentage: number;
}

interface BetterDealsProps {
  searchQuery: string;
  category: string;
  currentPrice: number;
}

const BetterDeals: React.FC<BetterDealsProps> = ({ searchQuery, category, currentPrice }) => {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (searchQuery && category) {
      findBetterDeals();
    }
  }, [searchQuery, category, currentPrice]);

  const findBetterDeals = async () => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate mock deals based on category and search query
    const mockDeals = generateMockDeals(searchQuery, category, currentPrice);
    setDeals(mockDeals);
    setIsLoading(false);
  };

  const generateMockDeals = (query: string, cat: string, price: number): Deal[] => {
    const platforms = ['eBay', 'Amazon', 'Facebook Marketplace', 'Craigslist', 'OfferUp'];
    const locations = ['San Francisco, CA', 'Los Angeles, CA', 'New York, NY', 'Chicago, IL', 'Austin, TX'];
    
    const dealTemplates = {
      cars: [
        { title: '2019 Honda Civic LX - Low Miles', image: 'https://images.unsplash.com/photo-1549924231-f129b911e442?w=300&h=200&fit=crop' },
        { title: '2020 Toyota Camry SE - Excellent Condition', image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=300&h=200&fit=crop' },
        { title: '2018 Nissan Altima - One Owner', image: 'https://images.unsplash.com/photo-1494976688153-ca3ce0b3e985?w=300&h=200&fit=crop' }
      ],
      electronics: [
        { title: 'MacBook Pro 13" M2 - Like New', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&h=200&fit=crop' },
        { title: 'iPad Pro 12.9" - Barely Used', image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300&h=200&fit=crop' },
        { title: 'iPhone 14 Pro Max - Unlocked', image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=200&fit=crop' }
      ],
      furniture: [
        { title: 'Modern Sectional Sofa - Gray', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop' },
        { title: 'Dining Table Set - 6 Chairs', image: 'https://images.unsplash.com/photo-1549497538-303791108f95?w=300&h=200&fit=crop' },
        { title: 'Queen Bed Frame - Solid Wood', image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=300&h=200&fit=crop' }
      ]
    };

    const templates = dealTemplates[cat as keyof typeof dealTemplates] || dealTemplates.electronics;
    
    return templates.map((template, index) => {
      const discountPercentage = Math.random() * 0.4 + 0.1; // 10-50% discount
      const dealPrice = Math.round(price * (1 - discountPercentage));
      const savings = price - dealPrice;
      const savingsPercentage = Math.round((savings / price) * 100);
      
      return {
        id: `deal-${index}`,
        title: template.title,
        price: dealPrice,
        originalPrice: price,
        platform: platforms[Math.floor(Math.random() * platforms.length)],
        location: locations[Math.floor(Math.random() * locations.length)],
        rating: Math.round((Math.random() * 2 + 3) * 10) / 10, // 3.0-5.0 rating
        timeLeft: Math.random() > 0.5 ? `${Math.floor(Math.random() * 24) + 1}h left` : undefined,
        image: template.image,
        savings,
        savingsPercentage
      };
    });
  };

  if (!searchQuery || !category) {
    return (
      <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-xl">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-8 h-8 text-gray-300" />
          </div>
          <h3 className="text-xl font-bold text-gray-700 mb-2">Better Deals Finder</h3>
          <p className="text-gray-500">Enter item details to find better deals online</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-2xl">
          <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
            <TrendingDown className="w-6 h-6 text-white" />
          </div>
          Better Deals Found
        </CardTitle>
        <p className="text-gray-600">We found {deals.length} better deals for similar items</p>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="flex gap-4 p-4 bg-gray-100 rounded-xl">
                  <div className="w-20 h-20 bg-gray-200 rounded-lg"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {deals.map((deal) => (
              <div key={deal.id} className="flex gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <img 
                  src={deal.image} 
                  alt={deal.title}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-bold text-gray-900 text-sm leading-tight">{deal.title}</h4>
                    <Badge className="bg-green-100 text-green-700 font-bold ml-2">
                      {deal.savingsPercentage}% off
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg font-bold text-green-600">${deal.price.toLocaleString()}</span>
                    <span className="text-sm text-gray-500 line-through">${deal.originalPrice.toLocaleString()}</span>
                    <span className="text-sm text-green-600 font-medium">Save ${deal.savings}</span>
                  </div>
                  
                  <div className="flex items-center gap-4 text-xs text-gray-600">
                    <span className="font-medium">{deal.platform}</span>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {deal.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-500" />
                      {deal.rating}
                    </div>
                    {deal.timeLeft && (
                      <div className="flex items-center gap-1 text-red-600">
                        <Clock className="w-3 h-3" />
                        {deal.timeLeft}
                      </div>
                    )}
                  </div>
                </div>
                
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white font-bold">
                  <ExternalLink className="w-3 h-3 mr-1" />
                  View
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BetterDeals;