import React from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, MessageSquare, TrendingDown, CheckCircle, Target } from "lucide-react";

interface NegotiationResultsProps {
  counterOffer: string;
  negotiationMessage: string;
  listingPrice: string;
  onCopyToClipboard: (text: string) => void;
  selectedCategory: string;
}

const NegotiationResults: React.FC<NegotiationResultsProps> = ({
  counterOffer,
  negotiationMessage,
  listingPrice,
  onCopyToClipboard,
  selectedCategory
}) => {
  const savingsPercentage = counterOffer && listingPrice 
    ? Math.round(((parseFloat(listingPrice) - parseFloat(counterOffer)) / parseFloat(listingPrice)) * 100)
    : 0;

  const getCategoryTips = (category: string) => {
    const tips = {
      'cars': [
        'Mention you have financing pre-approved',
        'Ask about maintenance records',
        'Suggest a quick inspection',
        'Emphasize cash payment if applicable'
      ],
      'real-estate': [
        'Mention pre-approval letter',
        'Offer flexible closing date',
        'Consider waiving contingencies',
        'Show you\'re a serious buyer'
      ],
      'electronics': [
        'Offer to pick up immediately',
        'Mention you\'re buying for specific use',
        'Ask about original accessories',
        'Emphasize cash payment'
      ],
      'furniture': [
        'Offer to handle pickup/moving',
        'Mention you have immediate need',
        'Ask about delivery options',
        'Show flexibility on timing'
      ],
      'gadgets': [
        'Ask about warranty/protection',
        'Mention immediate pickup',
        'Show knowledge of the product',
        'Offer cash payment'
      ],
      'motorcycles': [
        'Ask about maintenance history',
        'Mention you have proper license',
        'Suggest test ride if appropriate',
        'Show enthusiasm for the model'
      ]
    };
    return tips[category as keyof typeof tips] || tips.electronics;
  };

  return (
    <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader className="pb-6">
        <CardTitle className="flex items-center gap-3 text-2xl">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
            <MessageSquare className="w-6 h-6 text-white" />
          </div>
          AI-Generated Strategy
        </CardTitle>
        <p className="text-gray-600">Your personalized negotiation approach</p>
      </CardHeader>
      <CardContent className="space-y-8">
        {counterOffer && negotiationMessage ? (
          <>
            <div className="space-y-4">
              <Label className="text-lg font-semibold text-gray-900">
                AI-Suggested Counter Offer
              </Label>
              <div className="p-6 bg-gradient-to-r from-green-50 to-green-100 rounded-2xl border-2 border-green-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-4xl font-bold text-green-800">
                    ${counterOffer}
                  </div>
                  <div className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-full">
                    <TrendingDown className="w-4 h-4" />
                    <span className="font-medium">{savingsPercentage}% off</span>
                  </div>
                </div>
                {listingPrice && (
                  <div className="text-sm text-green-700">
                    You'll save ${parseFloat(listingPrice) - parseFloat(counterOffer)} from the original price of ${listingPrice}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-lg font-semibold text-gray-900">
                  Negotiation Message
                </Label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onCopyToClipboard(negotiationMessage)}
                  className="text-green-600 border-green-200 hover:bg-green-50 transition-colors"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Message
                </Button>
              </div>
              <div className="p-6 bg-gray-50 rounded-2xl border-2 border-gray-200">
                <p className="text-gray-800 leading-relaxed text-base">
                  {negotiationMessage}
                </p>
              </div>
            </div>

            {selectedCategory && (
              <div className="space-y-4">
                <Label className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Target className="w-5 h-5 text-blue-600" />
                  Category-Specific Tips
                </Label>
                <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <h4 className="font-medium text-blue-800 mb-3">
                    {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1).replace('-', ' ')} Negotiation Tips:
                  </h4>
                  <ul className="space-y-2">
                    {getCategoryTips(selectedCategory).map((tip, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-blue-700">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
              
            <div className="bg-green-50 p-4 rounded-xl border border-green-200">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-green-800">
                  <strong>Pro Tip:</strong> Send this message within 24 hours of the listing being posted for the best response rate. 
                  {selectedCategory === 'cars' && ' For vehicles, mention you can inspect it this week.'}
                  {selectedCategory === 'real-estate' && ' For real estate, attach your pre-approval letter.'}
                  {selectedCategory === 'electronics' && ' For electronics, offer immediate pickup.'}
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-16 text-gray-500">
            <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <MessageSquare className="w-10 h-10 text-gray-300" />
            </div>
            <h3 className="text-xl font-medium text-gray-700 mb-2">Ready to Generate Your Strategy</h3>
            <p className="text-gray-500 max-w-sm mx-auto">
              Select a category and fill out the form to see your AI-powered negotiation strategy
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default NegotiationResults;