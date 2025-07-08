import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { History, Search, Filter, TrendingDown, Calendar, DollarSign, Tag } from "lucide-react";
import { CompletedDeal } from '../pages/App';

interface OrderHistoryProps {
  deals: CompletedDeal[];
}

const OrderHistory: React.FC<OrderHistoryProps> = ({ deals }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  const filteredDeals = deals
    .filter(deal => 
      deal.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterCategory === 'all' || deal.category === filterCategory)
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'savings':
          return b.savings - a.savings;
        case 'percentage':
          return b.savingsPercentage - a.savingsPercentage;
        case 'price':
          return b.originalPrice - a.originalPrice;
        default:
          return b.completedAt.getTime() - a.completedAt.getTime();
      }
    });

  const totalSavings = deals.reduce((sum, deal) => sum + deal.savings, 0);
  const averageSavings = deals.length > 0 ? Math.round(totalSavings / deals.length) : 0;
  const bestDeal = deals.reduce((best, deal) => 
    deal.savingsPercentage > best.savingsPercentage ? deal : best, deals[0]
  );

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

  const getCategoryColor = (category: string) => {
    const colors = {
      'cars': 'bg-red-100 text-red-700',
      'electronics': 'bg-green-100 text-green-700',
      'furniture': 'bg-indigo-100 text-indigo-700',
      'real-estate': 'bg-blue-100 text-blue-700',
      'motorcycles': 'bg-orange-100 text-orange-700',
      'gadgets': 'bg-purple-100 text-purple-700'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="space-y-8">
      {/* Summary Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 shadow-xl">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mx-auto mb-4">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <div className="text-3xl font-bold text-green-800 mb-1">
              ${totalSavings.toLocaleString()}
            </div>
            <div className="text-green-700 font-medium">Total Saved</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 shadow-xl">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4">
              <History className="w-6 h-6 text-white" />
            </div>
            <div className="text-3xl font-bold text-blue-800 mb-1">
              {deals.length}
            </div>
            <div className="text-blue-700 font-medium">Deals Completed</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 shadow-xl">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4">
              <TrendingDown className="w-6 h-6 text-white" />
            </div>
            <div className="text-3xl font-bold text-purple-800 mb-1">
              ${averageSavings}
            </div>
            <div className="text-purple-700 font-medium">Avg. Savings</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200 shadow-xl">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Tag className="w-6 h-6 text-white" />
            </div>
            <div className="text-3xl font-bold text-orange-800 mb-1">
              {bestDeal?.savingsPercentage || 0}%
            </div>
            <div className="text-orange-700 font-medium">Best Deal</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-gray-500 to-gray-600 rounded-lg flex items-center justify-center">
              <Filter className="w-4 h-4 text-white" />
            </div>
            Filter & Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search deals..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-2 focus:border-blue-500 transition-colors"
              />
            </div>
            
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="border-2 focus:border-blue-500 transition-colors">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="cars">Cars</SelectItem>
                <SelectItem value="electronics">Electronics</SelectItem>
                <SelectItem value="furniture">Furniture</SelectItem>
                <SelectItem value="real-estate">Real Estate</SelectItem>
                <SelectItem value="motorcycles">Motorcycles</SelectItem>
                <SelectItem value="gadgets">Gadgets</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="border-2 focus:border-blue-500 transition-colors">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="date">Date</SelectItem>
                <SelectItem value="savings">Savings Amount</SelectItem>
                <SelectItem value="percentage">Savings %</SelectItem>
                <SelectItem value="price">Original Price</SelectItem>
              </SelectContent>
            </Select>
            
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm('');
                setFilterCategory('all');
                setSortBy('date');
              }}
              className="border-2 hover:bg-gray-50"
            >
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Deals List */}
      <div className="space-y-4">
        {filteredDeals.length === 0 ? (
          <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
            <CardContent className="p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <History className="w-8 h-8 text-gray-300" />
              </div>
              <h3 className="text-xl font-bold text-gray-700 mb-2">No deals found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </CardContent>
          </Card>
        ) : (
          filteredDeals.map((deal) => (
            <Card key={deal.id} className="shadow-xl border-0 bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-3xl">
                      {getCategoryIcon(deal.category)}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">
                        {deal.title}
                      </h3>
                      <div className="flex items-center gap-3">
                        <Badge className={getCategoryColor(deal.category)}>
                          {deal.category.replace('-', ' ')}
                        </Badge>
                        <span className="text-sm text-gray-500">
                          {deal.platform}
                        </span>
                        <span className="text-sm text-gray-500">
                          {deal.completedAt.toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center gap-4 mb-2">
                      <div className="text-right">
                        <div className="text-sm text-gray-500">Original</div>
                        <div className="text-lg font-semibold text-gray-700 line-through">
                          ${deal.originalPrice.toLocaleString()}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-500">Final</div>
                        <div className="text-lg font-semibold text-green-600">
                          ${deal.finalPrice.toLocaleString()}
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-green-100 text-green-700 px-4 py-2 rounded-full">
                      <div className="font-bold">
                        ${deal.savings.toLocaleString()} saved
                      </div>
                      <div className="text-sm">
                        {deal.savingsPercentage}% off
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default OrderHistory;