import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Send, Bot, User, Copy, Mic, MicOff, Image, Upload, Sparkles, Volume2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ConversationalAIProps {
  selectedCategory: string;
  negotiationData: {
    title: string;
    originalPrice: number;
    currentOffer?: number;
    maxBudget?: number;
    platform: string;
  };
  messages: Array<{
    id: string;
    type: 'user' | 'ai' | 'seller';
    content: string;
    timestamp: Date;
    isAudio?: boolean;
    hasImage?: boolean;
  }>;
  onUpdateMessages: (messages: any[]) => void;
}

const ConversationalAI: React.FC<ConversationalAIProps> = ({
  selectedCategory,
  negotiationData,
  messages,
  onUpdateMessages
}) => {
  const [inputMessage, setInputMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleSendMessage = async () => {
    if (!inputMessage.trim() && !uploadedImage) return;

    const userMessage = {
      id: Date.now().toString(),
      type: 'user' as const,
      content: inputMessage || 'Shared an image',
      timestamp: new Date(),
      hasImage: !!uploadedImage
    };

    const updatedMessages = [...messages, userMessage];
    onUpdateMessages(updatedMessages);

    setIsLoading(true);
    setInputMessage('');
    setUploadedImage(null);

    try {
      // Simulate AI processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      const aiResponse = generateAIResponse(inputMessage, negotiationData, selectedCategory);
      
      const aiMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai' as const,
        content: aiResponse,
        timestamp: new Date()
      };

      onUpdateMessages([...updatedMessages, aiMessage]);

      toast({
        title: "AI Response Generated",
        description: "Your negotiation assistant has provided guidance.",
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

  const generateAIResponse = (userInput: string, data: any, category: string) => {
    const responses = [
      `Based on your ${category} negotiation for "${data.title}", I recommend emphasizing the quick transaction and your serious buyer status. Here's a strategic approach: mention you're ready to move forward immediately and highlight any competitive advantages you have.`,
      
      `For this ${category} deal, consider the seller's perspective. They want a smooth, reliable transaction. I suggest positioning your offer as a win-win by mentioning your flexibility on timing and your commitment to the purchase.`,
      
      `Looking at the current market for ${category} items like "${data.title}", your approach should focus on building rapport first. Ask about the item's history or condition to show genuine interest before presenting your offer.`,
      
      `Given the ${data.platform} platform dynamics, sellers often appreciate direct communication. I recommend being upfront about your budget constraints while showing enthusiasm for the specific item.`,
      
      `For this negotiation, timing is key. Since you're dealing with a ${category} purchase, consider mentioning any urgency on your end (moving, gift, etc.) to create a natural reason for your offer timeline.`
    ];

    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleVoiceRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      // Simulate voice processing
      setTimeout(() => {
        setInputMessage("I'm interested in negotiating the price. What's your best advice?");
        toast({
          title: "Voice Recorded",
          description: "Your voice message has been converted to text.",
        });
      }, 1000);
    } else {
      setIsRecording(true);
      toast({
        title: "Recording Started",
        description: "Speak your message now...",
      });
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
        toast({
          title: "Image Uploaded",
          description: "Image ready to send with your message.",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const speakMessage = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    } else {
      toast({
        title: "Speech Not Supported",
        description: "Your browser doesn't support text-to-speech.",
        variant: "destructive"
      });
    }
  };

  return (
    <Card className="shadow-2xl border-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden h-[600px] flex flex-col">
      <CardHeader className="pb-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10">
        <CardTitle className="flex items-center gap-3 text-2xl">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
            <Bot className="w-6 h-6 text-white" />
          </div>
          AI Negotiation Assistant
        </CardTitle>
        <p className="text-gray-600">Have a conversation with your AI negotiation expert</p>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-6">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto mb-6 space-y-4">
          {messages.length === 0 ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-700 mb-2">Start Your Conversation</h3>
              <p className="text-gray-500">Ask me anything about your negotiation strategy!</p>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  message.type === 'ai' 
                    ? 'bg-gradient-to-br from-blue-500 to-purple-600' 
                    : 'bg-gradient-to-br from-gray-500 to-gray-600'
                }`}>
                  {message.type === 'ai' ? (
                    <Bot className="w-5 h-5 text-white" />
                  ) : (
                    <User className="w-5 h-5 text-white" />
                  )}
                </div>
                
                <div className={`flex-1 ${message.type === 'user' ? 'text-right' : 'text-left'}`}>
                  <div className={`inline-block p-4 rounded-2xl max-w-[85%] ${
                    message.type === 'ai'
                      ? 'bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 text-blue-900'
                      : 'bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 text-gray-900'
                  }`}>
                    <p className="text-sm leading-relaxed">{message.content}</p>
                    {message.hasImage && (
                      <div className="mt-2 text-xs text-gray-500 italic">📷 Image attached</div>
                    )}
                    {message.isAudio && (
                      <div className="mt-2 text-xs text-gray-500 italic">🎤 Voice message</div>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs text-gray-500">
                      {message.timestamp.toLocaleTimeString()}
                    </span>
                    {message.type === 'ai' && (
                      <>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            navigator.clipboard.writeText(message.content);
                            toast({ title: "Copied!", description: "Message copied to clipboard." });
                          }}
                          className="h-6 px-2 text-xs"
                        >
                          <Copy className="w-3 h-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => speakMessage(message.content)}
                          className="h-6 px-2 text-xs"
                        >
                          <Volume2 className="w-3 h-3" />
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
          
          {isLoading && (
            <div className="flex gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-200"></div>
                  <span className="text-sm text-blue-700 ml-2">AI is thinking...</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Image Preview */}
        {uploadedImage && (
          <div className="mb-4 p-3 bg-gray-50 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Image className="w-4 h-4 text-gray-600" />
                <span className="text-sm text-gray-600">Image ready to send</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setUploadedImage(null)}
                className="h-6 w-6 p-0"
              >
                ×
              </Button>
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="space-y-3">
          <Textarea
            placeholder="Ask me about negotiation strategies, market insights, or get help crafting your next message..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            className="min-h-[80px] border-2 focus:border-blue-500 transition-colors resize-none"
            onKeyPress={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          />
          
          <div className="flex items-center gap-2">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              className="flex-shrink-0"
            >
              <Upload className="w-4 h-4 mr-2" />
              Image
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleVoiceRecording}
              className={`flex-shrink-0 ${isRecording ? 'bg-red-100 border-red-300 text-red-700' : ''}`}
            >
              {isRecording ? <MicOff className="w-4 h-4 mr-2" /> : <Mic className="w-4 h-4 mr-2" />}
              {isRecording ? 'Stop' : 'Voice'}
            </Button>
            
            <Button
              onClick={handleSendMessage}
              disabled={isLoading || (!inputMessage.trim() && !uploadedImage)}
              className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
              ) : (
                <Send className="w-4 h-4 mr-2" />
              )}
              Send
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConversationalAI;