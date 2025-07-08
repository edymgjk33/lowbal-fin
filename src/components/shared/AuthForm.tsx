import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, Mail, Lock, User, Sparkles } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import Logo from './Logo';

interface AuthFormProps {
  type: 'login' | 'signup';
}

const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const isSignup = type === 'signup';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (isSignup) {
      if (password !== confirmPassword) {
        toast({
          title: "Passwords Don't Match",
          description: "Please make sure both passwords are the same.",
          variant: "destructive"
        });
        setIsLoading(false);
        return;
      }

      if (password.length < 6) {
        toast({
          title: "Password Too Short",
          description: "Password must be at least 6 characters long.",
          variant: "destructive"
        });
        setIsLoading(false);
        return;
      }
    }

    try {
      if (email && password) {
        localStorage.setItem('isAuthenticated', 'true');
        
        if (isSignup) {
          // Clear any existing onboarding data for new signups
          localStorage.removeItem('hasCompletedOnboarding');
          localStorage.removeItem('userOnboardingData');
        }
        
        toast({
          title: isSignup ? "Account Created" : "Login Successful",
          description: isSignup ? "Welcome to Lowbal!" : "Welcome back to Lowbal!",
        });
        navigate('/app');
      } else {
        toast({
          title: isSignup ? "Signup Failed" : "Login Failed",
          description: "Please fill in all required fields.",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden flex items-center justify-center p-4">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-green-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1920&h=1080&fit=crop&auto=format"
            alt="Background"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-8">
            <Logo size="lg" />
          </div>
          <p className="text-gray-200 text-xl font-bold">
            {isSignup ? "Join thousands of smart shoppers" : "Welcome back! Sign in to your account"}
          </p>
        </div>

        <Card className="border-0 shadow-2xl bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-xl border border-white/20">
          <CardHeader className="pb-8">
            <CardTitle className="text-4xl text-center font-black text-gray-900">
              {isSignup ? "Create Account" : "Sign In"}
            </CardTitle>
            {isSignup && <p className="text-center text-gray-700 mt-3 text-lg font-bold">Start saving money today</p>}
          </CardHeader>
          <CardContent className="px-8 pb-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-4">
                <Label htmlFor="email" className="text-lg font-black text-gray-900">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-500" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-16 pl-14 text-lg border-2 border-gray-300 bg-white text-gray-900 placeholder:text-gray-500 focus:border-emerald-500 transition-all duration-300 rounded-2xl font-bold shadow-lg"
                    required
                  />
                </div>
              </div>

              <div className="space-y-4">
                <Label htmlFor="password" className="text-lg font-black text-gray-900">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-500" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder={isSignup ? "Create a password" : "Enter your password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-16 pl-14 pr-14 text-lg border-2 border-gray-300 bg-white text-gray-900 placeholder:text-gray-500 focus:border-emerald-500 transition-all duration-300 rounded-2xl font-bold shadow-lg"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-12 w-12 text-gray-500 hover:text-gray-700"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
                  </Button>
                </div>
              </div>

              {isSignup && (
                <div className="space-y-4">
                  <Label htmlFor="confirmPassword" className="text-lg font-black text-gray-900">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-500" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="h-16 pl-14 pr-14 text-lg border-2 border-gray-300 bg-white text-gray-900 placeholder:text-gray-500 focus:border-emerald-500 transition-all duration-300 rounded-2xl font-bold shadow-lg"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 -translate-y-1/2 h-12 w-12 text-gray-500 hover:text-gray-700"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
                    </Button>
                  </div>
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full h-16 bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500 hover:from-emerald-600 hover:via-cyan-600 hover:to-blue-600 text-white font-black text-xl rounded-2xl shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300 transform hover:scale-105 border-0" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin mr-4"></div>
                    {isSignup ? "Creating Account..." : "Signing In..."}
                  </>
                ) : (
                  <>
                    {isSignup ? <User className="w-6 h-6 mr-4" /> : <Sparkles className="w-6 h-6 mr-4" />}
                    {isSignup ? "Create Account" : "Sign In"}
                  </>
                )}
              </Button>
            </form>

            <div className="mt-10 text-center space-y-6">
              <p className="text-lg text-gray-700 font-bold">
                {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
                <Link 
                  to={isSignup ? "/login" : "/signup"} 
                  className="text-emerald-600 hover:text-emerald-700 font-black transition-colors"
                >
                  {isSignup ? "Sign in" : "Sign up for free"}
                </Link>
              </p>
              <Link to="/" className="text-gray-600 hover:text-gray-800 transition-colors font-bold">
                ← Back to home
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AuthForm;