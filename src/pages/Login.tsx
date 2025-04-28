import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Mail, Lock, User, Phone, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

const API_BASE_URL = "https://health-backend-gjoo.onrender.com";

// Helper function to make API calls with retry logic
const makeApiCall = async (endpoint: string, method: string, body?: any, retries = 3) => {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: method.toUpperCase(),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: body ? JSON.stringify(body) : undefined,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      if (i === retries - 1) {
        console.error(`API call to ${endpoint} failed after ${retries} attempts:`, error);
        throw error;
      }
      // Wait for 1 second before retrying
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
};

const LoginPage = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const [signupStep, setSignupStep] = useState(1);
  const [existingEmails, setExistingEmails] = useState<string[]>([]);
  const location = useLocation();
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    remember: false
  });

  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
    otp: ""
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get('tab');
    if (tab === 'signup') {
      setActiveTab('signup');
    }
  }, [location.search]);

  const validatePassword = (password: string) => {
    const errors = [];
    if (password.length < 8) errors.push("Password must be at least 8 characters long");
    if (!/[A-Z]/.test(password)) errors.push("Password must contain at least one uppercase letter");
    if (!/[a-z]/.test(password)) errors.push("Password must contain at least one lowercase letter");
    if (!/[0-9]/.test(password)) errors.push("Password must contain at least one number");
    if (!/[!@#$%^&*]/.test(password)) errors.push("Password must contain at least one special character (!@#$%^&*)");
    return errors;
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const data = await makeApiCall('/user/login', 'POST', {
        email: loginData.email,
        password: loginData.password
      });

      // Store token if remember me is checked
      if (loginData.remember) {
        localStorage.setItem('token', data.token);
      } else {
        sessionStorage.setItem('token', data.token);
      }

      toast({
        title: "Login Successful",
        description: "You have been logged in successfully!",
      });

      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Login Failed",
        description: error instanceof Error ? error.message : "An error occurred during login. Please check your credentials and try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignupStep1 = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if email already exists
    if (existingEmails.includes(signupData.email)) {
      toast({
        title: "Email already exists",
        description: "This email is already registered. Please use a different email or login.",
        variant: "destructive"
      });
      return;
    }

    // Validate password
    const passwordErrors = validatePassword(signupData.password);
    if (passwordErrors.length > 0) {
      toast({
        title: "Password requirements not met",
        description: passwordErrors.join("\n"),
        variant: "destructive"
      });
      return;
    }
    
    if (signupData.password !== signupData.confirmPassword) {
      toast({
        title: "Passwords do not match",
        description: "Please make sure both passwords are the same.",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // First register the user
      const registerResponse = await makeApiCall('/api/users/register', 'POST', {
        name: signupData.name,
        email: signupData.email,
        phone: signupData.phone,
        password: signupData.password
      });

      // Then request OTP
      await makeApiCall('/api/users/send-otp', 'POST', {
        email: signupData.email
      });

      toast({
        title: "OTP Sent",
        description: "Please check your email for the verification code.",
      });
      
      setSignupStep(2);
    } catch (error) {
      console.error('Signup error:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create account. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignupStep2 = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (signupData.otp.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter a valid 6-digit OTP.",
        variant: "destructive"
      });
      return;
    }
  
    setIsLoading(true);
  
    try {
      // Verify OTP
      const verifyResponse = await makeApiCall('/api/users/verify-otp', 'POST', {
        email: signupData.email,
        otp: signupData.otp
      });

      if (verifyResponse.success) {
        toast({
          title: "Email Verified",
          description: "Your email has been verified successfully. Please login.",
        });
        
        setActiveTab("login");
      } else {
        throw new Error(verifyResponse.message || "OTP verification failed");
      }
    } catch (error) {
      console.error('OTP verification error:', error);
      toast({
        title: "Verification Failed",
        description: error instanceof Error ? error.message : "Failed to verify OTP. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    try {
      const response = await makeApiCall('/api/users/resend-otp', 'POST', {
        email: signupData.email
      });

      if (response.success) {
        toast({
          title: "OTP Resent",
          description: "Please check your email for the new verification code.",
        });
      } else {
        throw new Error(response.message || "Failed to resend OTP");
      }
    } catch (error) {
      console.error('Resend OTP error:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to resend OTP. Please try again.",
        variant: "destructive"
      });
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="container px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="max-w-md mx-auto bg-white rounded-2xl shadow-lg overflow-hidden"
          >
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
              className="bg-gradient-to-r from-healthbridge-blue to-healthbridge-teal p-6 text-center"
            >
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-healthbridge-blue font-bold">
                  HB
                </div>
              </div>
              <h1 className="text-2xl font-bold text-white">Welcome to HealthBridge</h1>
              <p className="text-white/80 text-sm mt-2">Access quality healthcare services</p>
            </motion.div>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="p-6">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login">
                <motion.form 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
                  onSubmit={handleLoginSubmit} 
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <Input 
                        id="email"
                        type="email"
                        placeholder="your.email@example.com"
                        className="pl-10"
                        value={loginData.email}
                        onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label htmlFor="password" className="text-sm font-medium">Password</label>
                      <Link to="/forgot-password" className="text-xs text-healthbridge-blue hover:underline">
                        Forgot password?
                      </Link>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <Input 
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="pl-10 pr-10"
                        value={loginData.password}
                        onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                        required
                      />
                      <button 
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="remember" 
                      checked={loginData.remember}
                      onCheckedChange={(checked) => 
                        setLoginData({...loginData, remember: checked === true})
                      }
                    />
                    <label
                      htmlFor="remember"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Remember me
                    </label>
                  </div>
              
                  <Button 
                    type="submit" 
                    className="w-full bg-healthbridge-blue hover:bg-healthbridge-blue/90"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Logging in...' : 'Login'}
                  </Button>
                </motion.form>
              </TabsContent>
              
              <TabsContent value="signup">
                {signupStep === 1 ? (
                  <motion.form 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
                    onSubmit={handleSignupStep1} 
                    className="space-y-4"
                  >
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <Input 
                          id="name"
                          type="text"
                          placeholder="Your Name"
                          className="pl-10"
                          value={signupData.name}
                          onChange={(e) => setSignupData({...signupData, name: e.target.value})}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="signup-email" className="text-sm font-medium">Email</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <Input 
                          id="signup-email"
                          type="email"
                          placeholder="your.email@example.com"
                          className="pl-10"
                          value={signupData.email}
                          onChange={(e) => setSignupData({...signupData, email: e.target.value})}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-sm font-medium">Phone</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <Input 
                          id="phone"
                          type="tel"
                          placeholder="9876543210"
                          className="pl-10"
                          value={signupData.phone}
                          onChange={(e) => setSignupData({...signupData, phone: e.target.value})}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="signup-password" className="text-sm font-medium">Password</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <Input 
                          id="signup-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          className="pl-10 pr-10"
                          value={signupData.password}
                          onChange={(e) => setSignupData({...signupData, password: e.target.value})}
                          required
                        />
                        <button 
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                      <div className="text-xs text-gray-500">
                        Password must contain:
                        <ul className="list-disc list-inside mt-1">
                          <li>At least 8 characters</li>
                          <li>One uppercase letter</li>
                          <li>One lowercase letter</li>
                          <li>One number</li>
                          <li>One special character (!@#$%^&*)</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="confirm-password" className="text-sm font-medium">Confirm Password</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <Input 
                          id="confirm-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          className="pl-10"
                          value={signupData.confirmPassword}
                          onChange={(e) => setSignupData({...signupData, confirmPassword: e.target.value})}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="terms" 
                        checked={signupData.agreeTerms}
                        onCheckedChange={(checked) => 
                          setSignupData({...signupData, agreeTerms: checked === true})
                        }
                        required
                      />
                      <label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        I agree to the <a href="#" className="text-healthbridge-blue hover:underline">terms and conditions</a>
                      </label>
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-healthbridge-blue hover:bg-healthbridge-blue/90"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Sending OTP...' : 'Continue'}
                    </Button>
                  </motion.form>
                ) : (
                  <motion.form 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
                    onSubmit={handleSignupStep2} 
                    className="space-y-4"
                  >
                    <div className="flex items-center mb-4">
                      <button
                        type="button"
                        onClick={() => setSignupStep(1)}
                        className="text-healthbridge-blue hover:text-healthbridge-blue/80 flex items-center"
                      >
                        <ArrowLeft size={16} className="mr-1" />
                        Back
                      </button>
                    </div>
                    
                    <div className="text-center mb-6">
                      <h3 className="text-lg font-semibold">Verify Your Email</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        We've sent a 6-digit code to {signupData.email}
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="otp" className="text-sm font-medium">Enter OTP</label>
                      <Input 
                        id="otp"
                        type="text"
                        placeholder="Enter 6-digit code"
                        maxLength={6}
                        value={signupData.otp}
                        onChange={(e) => setSignupData({...signupData, otp: e.target.value})}
                        required
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-healthbridge-blue hover:bg-healthbridge-blue/90"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Verifying...' : 'Verify & Create Account'}
                    </Button>
                    
                    <div className="text-center mt-4">
                      <p className="text-sm text-gray-500">
                        Didn't receive the code?{' '}
                        <button
                          type="button"
                          className="text-healthbridge-blue hover:underline"
                          onClick={handleResendOTP}
                        >
                          Resend OTP
                        </button>
                      </p>
                    </div>
                  </motion.form>
                )}
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default LoginPage;
