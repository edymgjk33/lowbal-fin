import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star, MessageSquare } from "lucide-react";

const ReviewsTab = () => {
  const [newReview, setNewReview] = useState('');
  const [newRating, setNewRating] = useState(5);

  const renderStars = (rating: number, interactive = false, onRate?: (rating: number) => void) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 ${
              star <= rating 
                ? 'text-yellow-400 fill-yellow-400' 
                : 'text-gray-300'
            } ${interactive ? 'cursor-pointer hover:text-yellow-400' : ''}`}
            onClick={() => interactive && onRate && onRate(star)}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Write Review Section */}
      <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            Share Your Success Story
          </CardTitle>
          <p className="text-gray-600">Help others by sharing your negotiation experience</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Rating
            </label>
            {renderStars(newRating, true, setNewRating)}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Review
            </label>
            <Textarea
              placeholder="Tell us about your experience with Lowbal. How much did you save? What category was it? Any tips for other users?"
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
              className="min-h-[120px] border-2 focus:border-green-500 transition-colors bg-white text-gray-900"
            />
          </div>
          
          <Button className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold h-12">
            Submit Review
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReviewsTab;