import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, User, Crown, Star, Check, Edit2, Save, Mail, Phone, MapPin, MessageSquare, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import BackgroundLayout from '../components/shared/BackgroundLayout';
import Logo from '../components/shared/Logo';

const Account = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: 'John Smith',
    email: 'john.smith@email.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA'
  });
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    deals: true
  });
  const [reviewData, setReviewData] = useState({
    rating: 5,
    title: '',
    content: '',
    category: '',
    savings: ''
  });
  const { toast } = useToast();
  const navigate = useNavigate();

  const subscriptionTiers = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      features: ['5 negotiations per month', 'Basic AI responses', 'Standard support'],
      current: true,
      color: 'from-gray-500 to-gray-600'
    },
    {
      name: 'Pro',
      price: '$9.99',
      period: 'month',
      features: ['Unlimited negotiations', 'Advanced AI responses', 'Voice & image support', 'Priority support'],
      popular: true,
      color: 'from-blue-500 to-purple-600'
    },
    {
      name: 'Premium',
      price: '$19.99',
      period: 'month',
      features: ['Everything in Pro', 'Market analysis', 'Deal suggestions', 'Custom templates', '24/7 support'],
      color: 'from-purple-500 to-pink-600'
    }
  ];

  const handleSaveProfile = () => {
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved successfully.",
    });
  };

  const handleUpgrade = (tier: string) => {
    toast({
      title: "Upgrade Initiated",
      description: `Upgrading to ${tier} plan. Redirecting to payment...`,
    });
  };

  const handleSubmitReview = () => {
    if (!reviewData.title || !reviewData.content) {
      toast({
        title: "Missing Information",
        description: "Please fill in the title and review content.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Review Submitted! ⭐",
      description: "Thank you for sharing your experience with Lowbal!",
    });

    setReviewData({
      rating: 5,
      title: '',
      content: '',
      category: '',
      savings: ''
    });
  };

  const handleSignOut = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('hasCompletedOnboarding');
    localStorage.removeItem('userOnboardingData');
    toast({
      title: "Signed Out Successfully",
      description: "You have been logged out of your account.",
    });
    navigate('/');
  };

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
            } ${interactive ? 'cursor-pointer hover:text-yellow-400 transition-colors' : ''}`}
            onClick={() => interactive && onRate && onRate(star)}
          />
        ))}
      </div>
    );
  };

  return (
    <BackgroundLayout>
      <div className="bg-black/20 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link to="/app" className="text-gray-300 hover:text-white transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <Logo size="sm" />
              <h1 className="text-xl font-black text-white">Account Settings</h1>
            </div>
            <Button
              onClick={handleSignOut}
              className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold px-4 py-2 rounded-xl shadow-lg hover:shadow-red-500/25 transition-all duration-300 text-sm"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 bg-black/20 backdrop-blur-xl shadow-2xl rounded-2xl p-3 h-14 border border-white/20">
            <TabsTrigger 
              value="profile" 
              className="text-sm font-black h-10 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-xl transition-all duration-300 text-gray-300 hover:text-white"
            >
              <User className="w-4 h-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger 
              value="subscription" 
              className="text-sm font-black h-10 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-600 data-[state=active]:text-white data-[state=active]:shadow-xl transition-all duration-300 text-gray-300 hover:text-white"
            >
              <Crown className="w-4 h-4 mr-2" />
              Subscription
            </TabsTrigger>
            <TabsTrigger 
              value="review" 
              className="text-sm font-black h-10 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-cyan-600 data-[state=active]:text-white data-[state=active]:shadow-xl transition-all duration-300 text-gray-300 hover:text-white"
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Leave Review
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card className="shadow-2xl border-0 bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-xl">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl font-black text-gray-900">Profile Information</CardTitle>
                  <Button
                    onClick={isEditing ? handleSaveProfile : () => setIsEditing(true)}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-black px-6 py-3 rounded-xl text-sm"
                  >
                    {isEditing ? <Save className="w-4 h-4 mr-2" /> : <Edit2 className="w-4 h-4 mr-2" />}
                    {isEditing ? 'Save Changes' : 'Edit Profile'}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label htmlFor="name" className="text-sm font-black text-gray-800">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <Input
                        id="name"
                        value={userInfo.name}
                        onChange={(e) => setUserInfo({...userInfo, name: e.target.value})}
                        disabled={!isEditing}
                        className="pl-10 h-12 text-sm border-2 bg-white text-gray-900 font-bold rounded-xl"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <Label htmlFor="email" className="text-sm font-black text-gray-800">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <Input
                        id="email"
                        type="email"
                        value={userInfo.email}
                        onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}
                        disabled={!isEditing}
                        className="pl-10 h-12 text-sm border-2 bg-white text-gray-900 font-bold rounded-xl"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <Label htmlFor="phone" className="text-sm font-black text-gray-800">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <Input
                        id="phone"
                        value={userInfo.phone}
                        onChange={(e) => setUserInfo({...userInfo, phone: e.target.value})}
                        disabled={!isEditing}
                        className="pl-10 h-12 text-sm border-2 bg-white text-gray-900 font-bold rounded-xl"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <Label htmlFor="location" className="text-sm font-black text-gray-800">Location</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <Input
                        id="location"
                        value={userInfo.location}
                        onChange={(e) => setUserInfo({...userInfo, location: e.target.value})}
                        disabled={!isEditing}
                        className="pl-10 h-12 text-sm border-2 bg-white text-gray-900 font-bold rounded-xl"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-200">
                  <h3 className="text-xl font-black text-gray-900 mb-6">Account Statistics</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-6 bg-gradient-to-r from-green-50 to-green-100 rounded-2xl border-2 border-green-200 shadow-lg">
                      <div className="text-2xl font-black text-green-800 mb-1">$3,247</div>
                      <div className="text-sm text-green-600 font-bold">Total Saved</div>
                    </div>
                    <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl border-2 border-blue-200 shadow-lg">
                      <div className="text-2xl font-black text-blue-800 mb-1">23</div>
                      <div className="text-sm text-blue-600 font-bold">Deals Closed</div>
                    </div>
                    <div className="text-center p-6 bg-gradient-to-r from-purple-50 to-purple-100 rounded-2xl border-2 border-purple-200 shadow-lg">
                      <div className="text-2xl font-black text-purple-800 mb-1">78%</div>
                      <div className="text-sm text-purple-600 font-bold">Success Rate</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="subscription">
            <div className="space-y-8">
              <Card className="shadow-2xl border-0 bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="text-2xl font-black text-gray-900">Current Plan</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl border-2 border-gray-200 shadow-lg">
                    <div>
                      <h3 className="text-xl font-black text-gray-900 mb-1">Free Plan</h3>
                      <p className="text-sm text-gray-600 font-bold">5 negotiations remaining this month</p>
                    </div>
                    <Badge className="bg-gray-100 text-gray-800 font-black text-sm px-4 py-2">Current</Badge>
                  </div>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-3 gap-6">
                {subscriptionTiers.map((tier, index) => (
                  <Card key={index} className={`shadow-2xl border-0 bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-xl relative transform hover:scale-105 transition-all duration-300 ${tier.popular ? 'ring-4 ring-blue-500' : ''}`}>
                    {tier.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-black px-4 py-1 text-sm">
                          <Star className="w-3 h-3 mr-1" />
                          Most Popular
                        </Badge>
                      </div>
                    )}
                    <CardHeader className="text-center">
                      <CardTitle className="text-xl font-black text-gray-900">{tier.name}</CardTitle>
                      <div className="text-3xl font-black text-gray-900">
                        {tier.price}
                        <span className="text-sm text-gray-600 font-normal">/{tier.period}</span>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <ul className="space-y-2">
                        {tier.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-gray-700">
                            <Check className="w-4 h-4 text-green-600" />
                            <span className="text-sm font-bold">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button
                        onClick={() => handleUpgrade(tier.name)}
                        disabled={tier.current}
                        className={`w-full h-12 font-black text-sm rounded-xl ${
                          tier.current 
                            ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                            : `bg-gradient-to-r ${tier.color} hover:opacity-90 text-white shadow-2xl hover:scale-105 transition-all duration-300`
                        }`}
                      >
                        {tier.current ? 'Current Plan' : `Upgrade to ${tier.name}`}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="review">
            <Card className="shadow-2xl border-0 bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-2xl font-black text-gray-900">Share Your Success Story</CardTitle>
                <p className="text-sm text-gray-600 font-bold">Help others by sharing your negotiation experience with Lowbal</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label className="text-sm font-black text-gray-800">Your Rating</Label>
                    {renderStars(reviewData.rating, true, (rating) => setReviewData({...reviewData, rating}))}
                  </div>
                  
                  <div className="space-y-3">
                    <Label htmlFor="category" className="text-sm font-black text-gray-800">Category (Optional)</Label>
                    <Input
                      id="category"
                      placeholder="e.g., Cars, Electronics, Real Estate"
                      value={reviewData.category}
                      onChange={(e) => setReviewData({...reviewData, category: e.target.value})}
                      className="h-12 text-sm border-2 bg-white text-gray-900 font-bold rounded-xl"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label htmlFor="title" className="text-sm font-black text-gray-800">Review Title</Label>
                    <Input
                      id="title"
                      placeholder="e.g., Saved $500 on my car purchase!"
                      value={reviewData.title}
                      onChange={(e) => setReviewData({...reviewData, title: e.target.value})}
                      className="h-12 text-sm border-2 bg-white text-gray-900 font-bold rounded-xl"
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <Label htmlFor="savings" className="text-sm font-black text-gray-800">Amount Saved (Optional)</Label>
                    <Input
                      id="savings"
                      placeholder="e.g., $500"
                      value={reviewData.savings}
                      onChange={(e) => setReviewData({...reviewData, savings: e.target.value})}
                      className="h-12 text-sm border-2 bg-white text-gray-900 font-bold rounded-xl"
                    />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="content" className="text-sm font-black text-gray-800">Your Review</Label>
                  <Textarea
                    id="content"
                    placeholder="Tell us about your experience with Lowbal. How did it help you? What category was it? Any tips for other users?"
                    value={reviewData.content}
                    onChange={(e) => setReviewData({...reviewData, content: e.target.value})}
                    className="min-h-[120px] text-sm border-2 bg-white text-gray-900 font-bold rounded-xl resize-none"
                    rows={5}
                  />
                </div>
                
                <Button 
                  onClick={handleSubmitReview}
                  className="w-full h-12 bg-gradient-to-r from-green-500 to-cyan-600 hover:from-green-600 hover:to-cyan-700 text-white font-black text-sm rounded-xl shadow-2xl hover:shadow-green-500/25 transition-all duration-300 hover:scale-105"
                >
                  <Star className="w-4 h-4 mr-2" />
                  Submit Review
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </BackgroundLayout>
  );
};

export default Account;