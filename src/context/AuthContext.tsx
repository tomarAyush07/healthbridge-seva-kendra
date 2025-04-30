import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useToast } from "@/hooks/use-toast";

interface AuthContextType {
  isAuthenticated: boolean;
  user: { name: string; email?: string } | null;
  login: (access: string, refresh: string, username: string, email?: string) => void;
  logout: () => void;
  // Authentication state
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  // OTP states
  otpSent: boolean;
  setOtpSent: React.Dispatch<React.SetStateAction<boolean>>;
  otp: string;
  setOtp: React.Dispatch<React.SetStateAction<string>>;
  countdown: number;
  resendDisabled: boolean;
  // Authentication methods
  handleLoginSubmit: (e: React.FormEvent, loginData: LoginData) => Promise<void>;
  handleSignupSubmit: (e: React.FormEvent, signupData: SignupData) => Promise<void>;
  handleVerifyOTP: (e: React.FormEvent, email: string) => Promise<void>;
  handleResendOTP: (email: string) => Promise<void>;
  // Helper functions
  startResendTimer: () => void;
  formatTime: (seconds: number) => string;
  getErrorMessage: (error: any) => string;
}

interface LoginData {
  username: string;
  password: string;
  remember: boolean;
}

interface SignupData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeTerms: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ name: string; email?: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [countdown, setCountdown] = useState(0);
  const [resendDisabled, setResendDisabled] = useState(false);

  // On mount, check if tokens exist
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const userInfo = localStorage.getItem('userInfo');
    setIsAuthenticated(!!token);
    if (userInfo) {
      setUser(JSON.parse(userInfo));
    }
  }, []);

  // Timer effect for countdown
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    } else if (countdown === 0 && resendDisabled) {
      setResendDisabled(false);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [countdown, resendDisabled]);

  // Function to start the countdown timer
  const startResendTimer = () => {
    setResendDisabled(true);
    setCountdown(90); // 90 seconds countdown
  };

  // Helper function to extract error message from response
  const getErrorMessage = (error: any) => {
    if (!error.response) {
      return "Network error occurred. Please try again.";
    }
    
    const { data } = error.response;
    
    // Handle string error messages
    if (typeof data === 'string') {
      return data;
    }
    
    // Handle common error field formats
    if (data.detail) {
      return data.detail;
    }
    
    // Handle field-specific errors
    if (data.username || data.email || data.password || data.non_field_errors) {
      const fieldErrors = [];
      
      if (Array.isArray(data.username)) {
        fieldErrors.push(`Username: ${data.username.join(', ')}`);
      }
      
      if (Array.isArray(data.email)) {
        fieldErrors.push(`Email: ${data.email.join(', ')}`);
      }
      
      if (Array.isArray(data.password)) {
        fieldErrors.push(`Password: ${data.password.join(', ')}`);
      }
      
      if (Array.isArray(data.non_field_errors)) {
        fieldErrors.push(data.non_field_errors.join(', '));
      }
      
      return fieldErrors.join('. ');
    }
    
    // Check if there's any other error messages in the response
    const errorMessages = [];
    Object.entries(data).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        errorMessages.push(`${key}: ${value.join(', ')}`);
      } else if (typeof value === 'string') {
        errorMessages.push(`${key}: ${value}`);
      }
    });
    
    if (errorMessages.length > 0) {
      return errorMessages.join('. ');
    }
    
    return "An error occurred. Please try again.";
  };

  const login = (access: string, refresh: string, username: string, email?: string) => {
    localStorage.setItem('accessToken', access);
    localStorage.setItem('refreshToken', refresh);
    setIsAuthenticated(true);
    const userInfo = { name: username, email };
    setUser(userInfo);
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
    navigate('/', { replace: true });
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userInfo');
    setIsAuthenticated(false);
    setUser(null);
    navigate('/login', { replace: true });
  };

  const handleLoginSubmit = async (e: React.FormEvent, loginData: LoginData) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post('https://health-backend-gjoo.onrender.com/auth/login/', {
        username: loginData.username,
        password: loginData.password,
      });

      const { access, refresh } = response.data;
      // Try to get email from backend if available (not implemented here, so just username)
      login(access, refresh, loginData.username);

      toast({
        title: "Login Successful",
        description: "You have been logged in successfully!",
      });

    } catch (error) {
      console.error(error);
      toast({
        title: "Login Failed",
        description: getErrorMessage(error),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignupSubmit = async (e: React.FormEvent, signupData: SignupData) => {
    e.preventDefault();

    if (signupData.password !== signupData.confirmPassword) {
      toast({
        title: "Passwords do not match",
        description: "Please make sure both passwords are the same.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post('https://health-backend-gjoo.onrender.com/auth/register/', {
        username: signupData.username,
        email: signupData.email,
        password: signupData.password,
        confirm_password: signupData.confirmPassword,
      });

      // Store username immediately after successful registration
      const userInfo = { name: signupData.username, email: signupData.email };
      setUser(userInfo);
      localStorage.setItem('userInfo', JSON.stringify(userInfo));

      toast({
        title: "Registration Successful",
        description: response.data.message || "Please verify your email with the OTP sent to your inbox.",
      });

      setOtpSent(true);
      startResendTimer();
    } catch (error) {
      console.error(error);
      toast({
        title: "Registration Failed",
        description: getErrorMessage(error),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent, email: string) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Verify OTP with backend
      const response = await axios.post('https://health-backend-gjoo.onrender.com/auth/verify-otp/', {
        email: email,
        otp: otp
      });

      toast({
        title: "Email Verified",
        description: response.data.message || "Your email has been verified successfully. You can now login.",
      });

      // Reset states
      setOtpSent(false);
      setOtp("");
      setResendDisabled(false);
      setCountdown(0);
      
      // Navigate to login
      navigate('/login', { replace: true, state: { activeTab: 'login' } });
    } catch (error) {
      console.error(error);
      toast({
        title: "Verification Failed",
        description: getErrorMessage(error),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async (email: string) => {
    setIsLoading(true);

    try {
      // Resend OTP to email
      const response = await axios.post('https://health-backend-gjoo.onrender.com/auth/resend-otp/', {
        email: email
      });

      toast({
        title: "OTP Resent",
        description: response.data.message || "A new verification code has been sent to your email.",
      });
      
      // Start the resend timer again
      startResendTimer();
    } catch (error) {
      console.error(error);
      toast({
        title: "Failed to Resend OTP",
        description: getErrorMessage(error),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Format seconds to MM:SS format
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      user,
      login, 
      logout,
      isLoading,
      setIsLoading, 
      otpSent,
      setOtpSent,
      otp,
      setOtp,
      countdown,
      resendDisabled,
      handleLoginSubmit,
      handleSignupSubmit,
      handleVerifyOTP,
      handleResendOTP,
      startResendTimer,
      formatTime,
      getErrorMessage
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// custom hook to consume
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
};