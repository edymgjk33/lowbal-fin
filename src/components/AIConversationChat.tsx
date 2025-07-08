import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Send, Bot, User, Copy, Sparkles, Zap, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AIConversationChatProps {
  selectedCategory: string;
}

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  isSellerMessage?: boolean;
}

const AIConversationChat: React.FC<AIConversationChatProps> = ({ selectedCategory }) => {
  const [sellerMessage, setSellerMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const generateAIResponse = async (userMessage: string) => {
    setIsLoading(true);
    
    try {
      // Simulate AI processing time
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      const responses = {
        'real-estate': [
          "Thank you for your interest in the property. I understand you're looking for the right home, and I appreciate you taking the time to reach out. Based on current market conditions in this area and recent comparable sales, I'd like to discuss a fair offer. I'm pre-approved for financing and can close within 30 days. Would you consider $X for a smooth, quick transaction?",
          "I really appreciate you getting back to me so quickly. I've been pre-approved for financing and have done extensive research on properties in this neighborhood. Your home has exactly what I'm looking for. Given the current market trends and my ability to close quickly, would you be open to discussing an offer of $X?",
          "Thank you for the additional details about the property. I can see you've taken excellent care of it, and that's exactly what I'm looking for as a buyer. I have my financing arranged and can be flexible on the closing timeline to work with your needs. Based on recent sales in the area, would $X be something we could discuss?"
        ],
        'cars': [
          "Thanks for the quick response! I really appreciate the transparency about the vehicle's condition and maintenance history. I've been looking for exactly this model and year. I have financing pre-approved and can complete the purchase this week. Based on current market values for similar vehicles with this mileage, would you consider $X?",
          "I appreciate you taking the time to answer my questions about the car. The maintenance records you mentioned are exactly what I was hoping to see from a responsible owner. I'm ready to purchase immediately and can arrange financing or pay cash. Given the condition and current market, would $X work for you?",
          "Thank you for the detailed information about the vehicle. I can tell you've taken great care of it, which is important to me as a buyer. I'm pre-approved for financing and can complete the transaction quickly. Based on similar vehicles in the area and the condition you've described, would you be open to $X?"
        ],
        'electronics': [
          "Thanks for the details about the condition! I really appreciate that you've kept the original packaging and accessories - that shows how well you've cared for it. I understand you might have other interested buyers, but I'm ready to purchase today with cash and can pick it up immediately. Would you consider $X for a quick, hassle-free transaction?",
          "I appreciate you getting back to me so quickly. The fact that it's barely used and includes everything is exactly what I was looking for. I'm ready to buy today and can pick it up at your convenience. Based on current retail prices and the excellent condition, would $X work for you?",
          "Thank you for the information about the item's condition. I can see you've taken excellent care of it, and I'm very interested. I have cash ready and can pick it up today if that works for you. Given the current market prices for this model, would you consider accepting $X?"
        ],
        'furniture': [
          "Thank you for the details about the furniture! I really appreciate your honesty about the condition - that kind of transparency tells me you're a trustworthy seller. I understand you're moving and need to sell quickly, and I'd love to help make that process easier for you. I have a truck and can handle pickup this week. Given your timeline and the condition, would $X work?",
          "I appreciate you getting back to me about the furniture. The fact that it's from a smoke-free home is important to me, and I can tell you've taken good care of it. I understand you need to sell due to your move, and I can definitely work with your timeline. Would you consider $X? I can arrange pickup whenever is convenient for you.",
          "Thanks for the information about the furniture set. I can see you've maintained it well, and I'm very interested. I have moving equipment and can handle pickup to make this easy for you. Given that you're moving and need a quick sale, would $X be acceptable? I can come get it this weekend."
        ],
        'motorcycles': [
          "Thanks for the details about the bike! I really appreciate the information about the maintenance and any modifications. I'm an experienced rider and have been looking for exactly this model. I have cash ready and can complete the purchase quickly. Based on current market values and the condition you've described, would you consider $X?",
          "I appreciate you taking the time to answer my questions about the motorcycle. The maintenance history you mentioned is exactly what I want to see. I'm a serious rider with proper licensing and insurance ready. Given the current market for this model and year, would $X work for you?",
          "Thank you for the detailed information about the motorcycle. I can tell you're a responsible owner, which is important when buying used. I'm ready to purchase and have financing arranged if needed. Based on similar bikes in the area, would you be open to discussing $X?"
        ],
        'gadgets': [
          "Thanks for the quick response about the gadget! I appreciate that you've kept it in such good condition with the original accessories. I understand these hold their value well, and I'm ready to purchase today. Based on current market prices and the excellent condition, would you consider $X? I can pick it up immediately.",
          "I really appreciate the details about the condition and usage. The fact that you have the original packaging shows how well you've cared for it. I'm very interested and can pay cash today. Given the current retail prices and condition, would $X be something we could work with?",
          "Thank you for the information about the gadget. I can see you've maintained it perfectly, which is exactly what I'm looking for. I'm ready to purchase immediately and can arrange pickup at your convenience. Based on similar items currently available, would you consider accepting $X?"
        ]
      };

      const categoryResponses = responses[selectedCategory as keyof typeof responses] || responses.electronics;
      const randomResponse = categoryResponses[Math.floor(Math.random() * categoryResponses.length)];
      
      const aiMessage: Message = {
        id: Date.now().toString() + '-ai',
        type: 'ai',
        content: randomResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
      
      toast({
        title: "AI Response Generated! 🤖",
        description: "Your personalized negotiation response is ready to use.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate AI response. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = () => {
    if (!sellerMessage.trim()) {
      toast({
        title: "Message Required",
        description: "Please enter the seller's message first.",
        variant: "destructive"
      });
      return;
    }

    if (!selectedCategory) {
      toast({
        title: "Category Required",
        description: "Please select a category first to get specialized responses.",
        variant: "destructive"
      });
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: sellerMessage,
      timestamp: new Date(),
      isSellerMessage: true
    };

    setMessages(prev => [...prev, userMessage]);
    generateAIResponse(sellerMessage);
    setSellerMessage('');
  };

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
    toast({
      title: "Copied! 📋",
      description: "Message copied to clipboard.",
    });
  };

  const clearConversation = () => {
    setMessages([]);
    setSellerMessage('');
    toast({
      title: "Conversation Cleared",
      description: "Ready for a new conversation thread.",
    });
  };

  const exampleMessages = {
    'cars': "Hi, thanks for your interest in my 2019 Honda Civic. The car is in excellent condition with 45k miles. I'm asking $15,000 but I'm open to reasonable offers. It has a clean title and recent maintenance records. Let me know if you'd like to see it!",
    'electronics': "Hello! Thanks for asking about the MacBook Pro. It's barely used, maybe 6 months old. Still has warranty and original packaging. I'm asking $1,200. I have a few other people interested, so let me know soon if you want it.",
    'furniture': "Hi there! The dining set is from a smoke-free home and in great condition. There's some minor wear on the table but nothing major. I'm moving next month so need to sell quickly. Asking $600 but willing to negotiate for quick sale.",
    'real-estate': "Thank you for your interest in our home. We've recently updated the kitchen and bathrooms. The house has been well-maintained and we're looking for serious buyers. We're asking $285,000 and are open to qualified offers.",
    'motorcycles': "Hey! Thanks for the interest in my Yamaha. It's a 2020 with only 8k miles. Always garaged, never dropped. Recent service and new tires. Asking $8,500. I have all maintenance records if you're serious.",
    'gadgets': "Hi! The iPhone is in excellent condition, barely used. Still has 10 months of warranty left. Comes with original box and charger. I'm asking $750 but might consider reasonable offers for quick sale."
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Enhanced Input Section */}
      <Card className="shadow-2xl border-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full -translate-y-16 translate-x-16"></div>
        
        <CardHeader className="pb-8 relative z-10">
          <CardTitle className="flex items-center gap-4 text-3xl">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl">
              <MessageSquare className="w-8 h-8 text-white" />
            </div>
            <div>
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AI Chat Assistant
              </div>
              <p className="text-lg text-gray-700 font-normal">Paste seller messages and get AI-powered responses</p>
            </div>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-8 relative z-10">
          <div className="space-y-6">
            <Label htmlFor="seller-message" className="text-lg font-semibold text-gray-800">
              Seller's Message from Platform
            </Label>
            <Textarea
              id="seller-message"
              placeholder={selectedCategory ? exampleMessages[selectedCategory as keyof typeof exampleMessages] : "Paste the seller's message here..."}
              value={sellerMessage}
              onChange={(e) => setSellerMessage(e.target.value)}
              className="min-h-[150px] text-base border-2 focus:border-blue-500 transition-all duration-300 resize-none bg-white/80 backdrop-blur-sm text-gray-800 placeholder:text-gray-500"
              rows={6}
            />
          </div>

          {selectedCategory && (
            <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border-2 border-blue-200">
              <div className="flex items-center gap-3 text-blue-700 font-semibold mb-2">
                <Sparkles className="w-5 h-5" />
                Category: {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1).replace('-', ' ')}
              </div>
              <p className="text-blue-600 font-medium">
                AI responses will be optimized for {selectedCategory.replace('-', ' ')} negotiations with specialized language and tactics
              </p>
            </div>
          )}

          <div className="flex gap-4">
            <Button 
              onClick={handleSendMessage}
              disabled={isLoading || !sellerMessage.trim()}
              className="flex-1 h-14 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 text-white"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3"></div>
                  Generating...
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5 mr-3" />
                  Get AI Response
                </>
              )}
            </Button>
            
            {messages.length > 0 && (
              <Button 
                onClick={clearConversation}
                variant="outline"
                className="h-14 px-6 border-2 hover:bg-gray-50 text-gray-700 border-gray-300"
              >
                <RefreshCw className="w-5 h-5" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Conversation Section */}
      <Card className="shadow-2xl border-0 bg-gradient-to-br from-green-50 via-white to-blue-50 overflow-hidden">
        <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-green-200/30 to-blue-200/30 rounded-full -translate-y-12 -translate-x-12"></div>
        
        <CardHeader className="pb-8 relative z-10">
          <CardTitle className="flex items-center gap-4 text-3xl">
            <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-xl">
              <Bot className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Conversation Thread
              </div>
              <p className="text-lg text-gray-700 font-normal">Your negotiation conversation with AI assistance</p>
            </div>
            {messages.length > 0 && (
              <div className="flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                {messages.length} messages
              </div>
            )}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="relative z-10">
          {messages.length === 0 ? (
            <div className="text-center py-16 text-gray-500">
              <div className="w-20 h-20 bg-gray-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <MessageSquare className="w-10 h-10 text-gray-300" />
              </div>
              <h3 className="text-2xl font-bold text-gray-700 mb-4">Start Your Conversation</h3>
              <p className="text-lg text-gray-500 max-w-md mx-auto leading-relaxed">
                Paste a seller's message to get AI-powered negotiation responses tailored to your category
              </p>
            </div>
          ) : (
            <div className="space-y-6 max-h-96 overflow-y-auto">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-4 ${message.type === 'ai' ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg ${
                    message.type === 'ai' 
                      ? 'bg-gradient-to-br from-blue-500 to-blue-600' 
                      : 'bg-gradient-to-br from-orange-500 to-orange-600'
                  }`}>
                    {message.type === 'ai' ? (
                      <Bot className="w-6 h-6 text-white" />
                    ) : (
                      <User className="w-6 h-6 text-white" />
                    )}
                  </div>
                  <div className={`flex-1 ${message.type === 'ai' ? 'text-left' : 'text-right'}`}>
                    <div className={`inline-block p-6 rounded-2xl max-w-[90%] shadow-lg ${
                      message.type === 'ai'
                        ? 'bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 text-blue-900'
                        : 'bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-200 text-orange-900'
                    }`}>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-semibold text-sm">
                          {message.type === 'ai' ? 'AI Assistant' : 'Seller Message'}
                        </span>
                        {message.isSellerMessage && (
                          <span className="bg-orange-200 text-orange-700 px-2 py-1 rounded-full text-xs font-medium">
                            From Platform
                          </span>
                        )}
                      </div>
                      <p className="text-base leading-relaxed font-medium">{message.content}</p>
                      {message.type === 'ai' && (
                        <div className="flex gap-2 mt-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyMessage(message.content)}
                            className="text-blue-600 hover:text-blue-700 hover:bg-blue-100 font-medium"
                          >
                            <Copy className="w-4 h-4 mr-2" />
                            Copy
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => generateAIResponse(messages.find(m => m.isSellerMessage)?.content || '')}
                            className="text-blue-600 hover:text-blue-700 hover:bg-blue-100 font-medium"
                          >
                            <RefreshCw className="w-4 h-4 mr-2" />
                            Regenerate
                          </Button>
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 mt-2 font-medium">
                      {message.timestamp.toLocaleTimeString()} • {message.timestamp.toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AIConversationChat;