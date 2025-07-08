import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, Sparkles, AlertCircle, DollarSign, Target, MessageCircle } from "lucide-react";

interface ListingFormProps {
  listingTitle: string;
  setListingTitle: (value: string) => void;
  listingPrice: string;
  setListingPrice: (value: string) => void;
  maxBudget: string;
  setMaxBudget: (value: string) => void;
  platform: string;
  setPlatform: (value: string) => void;
  extraNotes: string;
  setExtraNotes: (value: string) => void;
  isLoading: boolean;
  onGenerateOffer: () => void;
  selectedCategory: string;
}

const ListingForm: React.FC<ListingFormProps> = ({
  listingTitle,
  setListingTitle,
  listingPrice,
  setListingPrice,
  maxBudget,
  setMaxBudget,
  platform,
  setPlatform,
  extraNotes,
  setExtraNotes,
  isLoading,
  onGenerateOffer,
  selectedCategory
}) => {
  const [selectedTone, setSelectedTone] = useState('polite');
  
  const budgetWarning = maxBudget && listingPrice && parseFloat(maxBudget) > parseFloat(listingPrice);
  const budgetTooLow = maxBudget && listingPrice && parseFloat(maxBudget) < parseFloat(listingPrice) * 0.5;

  const toneOptions = [
    { value: 'polite', label: 'Polite', description: 'Respectful and courteous approach' },
    { value: 'friendly', label: 'Friendly', description: 'Warm and personable tone' },
    { value: 'assertive', label: 'Assertive', description: 'Confident and direct communication' },
    { value: 'aggressive', label: 'Aggressive', description: 'Bold and demanding approach' },
    { value: 'professional', label: 'Professional', description: 'Business-like and formal' }
  ];

  return (
    <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3 text-lg">
          <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" />
          </div>
          Listing Details
        </CardTitle>
        <p className="text-gray-600 text-sm">Enter the details of the item you want to negotiate for</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {!selectedCategory && (
          <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
            <div className="flex items-center gap-2 text-amber-700">
              <AlertCircle className="w-4 h-4" />
              <span className="font-medium text-sm">Please select a category first for optimized results</span>
            </div>
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="title" className="text-sm font-medium">Listing Title or Description</Label>
          <Input
            id="title"
            placeholder={selectedCategory === 'cars' ? "e.g., 2018 Honda Civic LX, 45k miles" : 
                        selectedCategory === 'real-estate' ? "e.g., 3BR/2BA Ranch Home, Downtown" :
                        selectedCategory === 'electronics' ? "e.g., MacBook Pro 13-inch M2, Like New" :
                        "e.g., iPhone 14 Pro, 2018 Honda Civic, Vintage Couch"}
            value={listingTitle}
            onChange={(e) => setListingTitle(e.target.value)}
            className="h-10 text-sm border-2 focus:border-green-500 transition-colors"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="price" className="text-sm font-medium flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              Listing Price ($)
            </Label>
            <Input
              id="price"
              type="number"
              placeholder="Enter the asking price"
              value={listingPrice}
              onChange={(e) => setListingPrice(e.target.value)}
              className="h-10 text-sm border-2 focus:border-green-500 transition-colors"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="budget" className="text-sm font-medium flex items-center gap-2">
              <Target className="w-4 h-4" />
              Your Maximum Budget ($)
            </Label>
            <Input
              id="budget"
              type="number"
              placeholder="What's the most you'd pay?"
              value={maxBudget}
              onChange={(e) => setMaxBudget(e.target.value)}
              className="h-10 text-sm border-2 focus:border-blue-500 transition-colors"
            />
          </div>
        </div>

        {/* Budget Warnings */}
        {budgetWarning && (
          <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
            <div className="flex items-center gap-2 text-amber-700">
              <AlertCircle className="w-4 h-4" />
              <span className="font-medium text-sm">Your budget is higher than the asking price. Consider lowering it for better negotiation.</span>
            </div>
          </div>
        )}

        {budgetTooLow && (
          <div className="p-3 bg-red-50 rounded-lg border border-red-200">
            <div className="flex items-center gap-2 text-red-700">
              <AlertCircle className="w-4 h-4" />
              <span className="font-medium text-sm">Your budget might be too low for successful negotiation. Consider increasing it.</span>
            </div>
          </div>
        )}

        {maxBudget && listingPrice && !budgetWarning && !budgetTooLow && (
          <div className="p-3 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center gap-2 text-green-700">
              <Target className="w-4 h-4" />
              <span className="font-medium text-sm">
                Good budget range! You could potentially save ${parseFloat(listingPrice) - parseFloat(maxBudget)} 
                ({Math.round(((parseFloat(listingPrice) - parseFloat(maxBudget)) / parseFloat(listingPrice)) * 100)}% off)
              </span>
            </div>
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="platform" className="text-sm font-medium">Platform</Label>
          <Select onValueChange={setPlatform}>
            <SelectTrigger className="h-10 text-sm border-2 focus:border-green-500 transition-colors">
              <SelectValue placeholder="Select platform" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="Facebook">Facebook Marketplace</SelectItem>
              <SelectItem value="Craigslist">Craigslist</SelectItem>
              <SelectItem value="Zillow">Zillow</SelectItem>
              <SelectItem value="eBay">eBay</SelectItem>
              <SelectItem value="OfferUp">OfferUp</SelectItem>
              <SelectItem value="AutoTrader">AutoTrader</SelectItem>
              <SelectItem value="Cars.com">Cars.com</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Tone Selection */}
        <div className="space-y-2">
          <Label htmlFor="tone" className="text-sm font-medium flex items-center gap-2">
            <MessageCircle className="w-4 h-4" />
            Negotiation Tone
          </Label>
          <Select value={selectedTone} onValueChange={setSelectedTone}>
            <SelectTrigger className="h-10 text-sm border-2 focus:border-purple-500 transition-colors">
              <SelectValue placeholder="Select tone" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              {toneOptions.map((tone) => (
                <SelectItem key={tone.value} value={tone.value}>
                  <div className="flex flex-col">
                    <span className="font-medium">{tone.label}</span>
                    <span className="text-xs text-gray-500">{tone.description}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-xs text-gray-500">
            Choose how assertive you want your negotiation messages to be
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes" className="text-sm font-medium">Extra Notes / Seller Info (Optional)</Label>
          <Textarea
            id="notes"
            placeholder={selectedCategory === 'cars' ? "e.g., One owner, recent maintenance, clean title..." :
                        selectedCategory === 'real-estate' ? "e.g., Motivated seller, needs quick closing..." :
                        selectedCategory === 'electronics' ? "e.g., Original packaging, barely used..." :
                        "Any additional context about the item or seller..."}
            value={extraNotes}
            onChange={(e) => setExtraNotes(e.target.value)}
            className="min-h-[80px] text-sm border-2 focus:border-green-500 transition-colors resize-none"
            rows={3}
          />
        </div>

        {selectedCategory && (
          <div className="p-3 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center gap-2 text-green-700 font-medium mb-1">
              <Sparkles className="w-4 h-4" />
              Category: {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1).replace('-', ' ')}
            </div>
            <p className="text-sm text-green-600">
              Negotiation strategy will be optimized for {selectedCategory.replace('-', ' ')} deals with a {selectedTone} tone
            </p>
          </div>
        )}

        <Button 
          onClick={onGenerateOffer}
          disabled={isLoading || !selectedCategory}
          className="w-full h-12 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-sm font-medium shadow-lg hover:shadow-xl transition-all duration-300"
          size="lg"
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
              Generating Your Strategy...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 mr-2" />
              Generate Offer & Message
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ListingForm;