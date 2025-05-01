import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { Activity, Heart, Brain, Stethoscope, Calendar, User, Mail, Phone, MapPin, Clock, Shield, FileText, AlertCircle, Loader2 } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import HealthAssessmentReview from "./HealthAssessmentReview";

// Configure axios defaults
axios.defaults.baseURL = 'https://health-backend-gjoo.onrender.com';
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.withCredentials = false; // Disable credentials for CORS

// Add authentication interceptor
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for handling 401 errors
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('userInfo');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

interface FormData {
  id?: string;  // Add optional id field
  name: string;
  email: string;
  age: number;
  gender: string;
  state: string;
  contact_details: string;
  chronic_conditions: string;
  past_surgeries: string;
  allergies: string;
  medications: string;
  symptoms: string;
  symptom_severity: string;
  symptom_duration: string;
  mental_health_stress: boolean;
  mental_health_anxiety: boolean;
  mental_health_depression: boolean;
  vaccination_history: string;
  accessibility_needs: string;
  pregnancy_status: string;
  health_insurance_provider: string;
  health_insurance_policy: string;
  preferred_language: string;
  research_participation: boolean;
  emergency_contact: {
    name: string;
    relationship: string;
    number: string;
  };
}

interface FormErrors {
  name?: string;
  email?: string;
  age?: string;
  gender?: string;
  state?: string;
  contact_details?: string;
  chronic_conditions?: string;
  past_surgeries?: string;
  allergies?: string;
  medications?: string;
  symptoms?: string;
  symptom_severity?: string;
  symptom_duration?: string;
  mental_health_stress?: string;
  mental_health_anxiety?: string;
  mental_health_depression?: string;
  vaccination_history?: string;
  accessibility_needs?: string;
  pregnancy_status?: string;
  health_insurance_provider?: string;
  health_insurance_policy?: string;
  preferred_language?: string;
  research_participation?: string;
  emergency_contact?: {
    name?: string;
    relationship?: string;
    number?: string;
  };
}

// Add Indian states constant
const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry"
];

interface ExistingFormData extends FormData {
  id: string;
  created_at?: string;
  updated_at?: string;
}

const HealthAssessment = () => {
  const { t } = useLanguage();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("personal");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isBackendAvailable, setIsBackendAvailable] = useState(false);
  const [existingForm, setExistingForm] = useState<ExistingFormData | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Add form navigation state
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = 5;

  // Initialize form data with empty values
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    age: 0,
    gender: '',
    state: '',
    contact_details: '',
    chronic_conditions: '',
    past_surgeries: '',
    allergies: '',
    medications: '',
    symptoms: '',
    symptom_severity: '',
    symptom_duration: '',
    mental_health_stress: false,
    mental_health_anxiety: false,
    mental_health_depression: false,
    vaccination_history: '',
    accessibility_needs: '',
    pregnancy_status: '',
    health_insurance_provider: '',
    health_insurance_policy: '',
    preferred_language: '',
    research_participation: false,
    emergency_contact: {
      name: '',
      relationship: '',
      number: ''
    }
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else if (name === 'age') {
      setFormData(prev => ({
        ...prev,
        [name]: parseInt(value) || 0
      }));
    } else if (name.startsWith('emergency_contact.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        emergency_contact: {
          ...prev.emergency_contact,
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(prev => prev + 1);
      const tabs = ['personal', 'medical', 'mental', 'insurance', 'review'];
      setActiveTab(tabs[currentStep + 1]);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      const tabs = ['personal', 'medical', 'mental', 'insurance', 'review'];
      setActiveTab(tabs[currentStep - 1]);
    }
  };

  const handleCancel = () => {
    const isConfirmed = window.confirm(
      "⚠️ Leave Form?\n\n" +
      "You are about to leave the health assessment form.\n" +
      "Any information you've entered will not be saved.\n\n" +
      "• Click 'OK' to leave\n" +
      "• Click 'Cancel' to continue filling the form"
    );
    if (isConfirmed) {
      navigate("/account-dashboard");
    }
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};
    
    // Required fields validation
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.age) newErrors.age = "Age is required";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.state) newErrors.state = "State is required";
    if (!formData.contact_details) newErrors.contact_details = "Contact details are required";
    
    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    
    // Age validation
    const ageNum = parseInt(formData.age.toString());
    if (formData.age && (isNaN(ageNum) || ageNum <= 0 || ageNum > 120)) {
      newErrors.age = "Age must be a valid number between 1 and 120";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (currentStep !== 4) {
      return;
    }
    
    if (!validateForm()) {
      toast.error("Please fill in all required fields correctly");
      return;
    }
    
    if (!isBackendAvailable) {
      toast.error('Backend server is not available. Please try again later.');
      return;
    }

    setIsSubmitting(true);

    try {
      console.log('Submitting form data:', formData);
      const response = await axios.post('/healthcare/form/submit/', formData);
      console.log('Submission response:', response.data);
      toast.success('Health Assessment Submitted Successfully! 🎉', {
        duration: 5000,
        description: "Thank you for completing your health assessment. Your information will help us serve you better. You'll be redirected to the home page."
      });
      
      setTimeout(() => {
        navigate("/");
      }, 2000);
      
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.code === 'ERR_NETWORK') {
          toast.error('Network error: Unable to connect to the server.');
        } else if (error.response) {
          const errorData = error.response.data;
          if (error.response.status === 400 && errorData) {
            const fieldErrors = {};
            for (const [key, value] of Object.entries(errorData)) {
              fieldErrors[key] = Array.isArray(value) ? value[0] : value;
            }
            setErrors(fieldErrors);
            toast.error('Please correct the errors in the form');
          } else {
            toast.error(`Server error: ${error.response.status} - ${errorData?.message || 'Unknown error'}`);
          }
        } else {
          toast.error('An unexpected error occurred. Please try again later.');
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Check backend availability and fetch existing form data on component mount
  useEffect(() => {
    const checkBackendAndFetchForm = async () => {
      // Check if user is authenticated
      if (!isAuthenticated) {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          navigate('/login');
          return;
        }
      }

      try {
        // Check if backend is available
        await axios.get('/');
        setIsBackendAvailable(true);
        
        try {
          // Fetch existing form data
          const response = await axios.get('/healthcare/form/me/');
          if (response.data) {
            setExistingForm(response.data);
            setCurrentStep(4); // Set to review step
            setActiveTab('review');
            setShowSuccessMessage(true);
            // Populate form with existing data
            console.log('API Response Data:', response.data);
            const updatedFormData = {
              ...response.data,
              emergency_contact: {
                name: response.data.emergency_contact?.name || '',
                relationship: response.data.emergency_contact?.relationship || '',
                number: response.data.emergency_contact?.number || ''
              }
            };
            console.log('Updated Form Data:', updatedFormData);
            setFormData(updatedFormData);
          } else {
            // If no form exists, show the form
            setExistingForm(null);
            setShowSuccessMessage(false);
            setCurrentStep(0);
            setActiveTab('personal');
          }
        } catch (error) {
          if (axios.isAxiosError(error)) {
            if (error.response?.status === 401) {
              console.log('Token expired or invalid');
              localStorage.removeItem('accessToken');
              localStorage.removeItem('refreshToken');
              localStorage.removeItem('userInfo');
              navigate('/login');
            } else if (error.response?.status === 404) {
              console.log('No existing form found - this is normal for new users');
              setExistingForm(null);
              setShowSuccessMessage(false);
              setCurrentStep(0);
              setActiveTab('personal');
            } else {
              console.log('Error fetching form data:', error.message);
            }
          }
        }
      } catch (error) {
        setIsBackendAvailable(false);
        console.error('Backend health check failed:', error);
        toast.error('Unable to connect to the backend server. Please ensure it is running and accessible.');
      } finally {
        setIsLoading(false);
      }
    };

    checkBackendAndFetchForm();
  }, [user, isAuthenticated, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-4 sm:py-10 px-2 sm:px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center justify-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          </div>
        </div>
      </div>
    );
  }

  // If there's an existing form, show the review component
  if (existingForm) {
    return <HealthAssessmentReview formData={formData} showSuccessMessage={showSuccessMessage} />;
  }

  // Show the form for new users
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-4 sm:py-10 px-2 sm:px-4">
      <div className="container mx-auto max-w-4xl">
        <Card className="shadow-lg border-blue-100">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-xl sm:text-2xl font-bold text-blue-800 flex items-center gap-2">
              <Stethoscope className="h-5 w-5 sm:h-6 sm:w-6" />
              Health Assessment Form
            </CardTitle>
            <CardDescription className="space-y-2 mt-2 sm:mt-4">
              {!isBackendAvailable && (
                <div className="text-red-500 text-xs sm:text-sm">
                  <AlertCircle className="h-4 w-4 inline mr-2" />
                  Warning: Backend server is not available. Form submission will not work.
                </div>
              )}
              <div className="text-gray-600 text-xs sm:text-sm">
                Please fill out this comprehensive health assessment form to help us better understand your health needs.
              </div>
              <div className="flex items-center justify-center gap-2 mt-2 sm:mt-4">
                {Array.from({ length: totalSteps }).map((_, index) => (
                  <div
                    key={index}
                    className={`h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full ${
                      index === currentStep
                        ? 'bg-blue-600'
                        : index < currentStep
                        ? 'bg-green-500'
                        : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <form onSubmit={handleSubmit}>
              <Tabs value={activeTab} onValueChange={(value) => {
                const tabs = ['personal', 'medical', 'mental', 'insurance', 'review'];
                const newStep = tabs.indexOf(value);
                setCurrentStep(newStep);
                setActiveTab(value);
              }} className="w-full">
                <TabsList className={`grid w-full grid-cols-5 bg-blue-50 p-1`}>
                  <TabsTrigger 
                    value="personal" 
                    className={`flex items-center gap-1 sm:gap-2 text-xs sm:text-sm ${
                      currentStep === 0 ? 'bg-blue-600 text-white' : 'hover:bg-blue-100'
                    }`}
                  >
                    <User className="h-3 w-3 sm:h-4 sm:w-4" />
                    Personal
                  </TabsTrigger>
                  <TabsTrigger 
                    value="medical" 
                    className={`flex items-center gap-1 sm:gap-2 text-xs sm:text-sm ${
                      currentStep === 1 ? 'bg-blue-600 text-white' : 'hover:bg-blue-100'
                    }`}
                    disabled={currentStep < 1}
                  >
                    <Heart className="h-3 w-3 sm:h-4 sm:w-4" />
                    Medical
                  </TabsTrigger>
                  <TabsTrigger 
                    value="mental" 
                    className={`flex items-center gap-1 sm:gap-2 text-xs sm:text-sm ${
                      currentStep === 2 ? 'bg-blue-600 text-white' : 'hover:bg-blue-100'
                    }`}
                    disabled={currentStep < 2}
                  >
                    <Brain className="h-3 w-3 sm:h-4 sm:w-4" />
                    Mental
                  </TabsTrigger>
                  <TabsTrigger 
                    value="insurance" 
                    className={`flex items-center gap-1 sm:gap-2 text-xs sm:text-sm ${
                      currentStep === 3 ? 'bg-blue-600 text-white' : 'hover:bg-blue-100'
                    }`}
                    disabled={currentStep < 3}
                  >
                    <Shield className="h-3 w-3 sm:h-4 sm:w-4" />
                    Insurance
                  </TabsTrigger>
                  <TabsTrigger 
                    value="review" 
                    className={`flex items-center gap-1 sm:gap-2 text-xs sm:text-sm ${
                      currentStep === 4 ? 'bg-blue-600 text-white' : 'hover:bg-blue-100'
                    }`}
                    disabled={currentStep < 4}
                  >
                    <FileText className="h-3 w-3 sm:h-4 sm:w-4" />
                    Review
                  </TabsTrigger>
                </TabsList>

                {/* Personal Information Tab */}
                <TabsContent value="personal" className="space-y-4 mt-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-xs sm:text-sm">Full Name <span className="text-red-500">*</span></Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        className={errors.name ? "border-red-500 text-sm" : "text-sm"}
                      />
                      {errors.name && <p className="text-red-500 text-xs sm:text-sm">{errors.name}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-xs sm:text-sm">Email <span className="text-red-500">*</span></Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                        className={errors.email ? "border-red-500 text-sm" : "text-sm"}
                      />
                      {errors.email && <p className="text-red-500 text-xs sm:text-sm">{errors.email}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="age" className="text-xs sm:text-sm">Age <span className="text-red-500">*</span></Label>
                      <Input
                        id="age"
                        name="age"
                        type="number"
                        value={formData.age}
                        onChange={handleInputChange}
                        placeholder="Enter your age"
                        className={errors.age ? "border-red-500 text-sm" : "text-sm"}
                      />
                      {errors.age && <p className="text-red-500 text-xs sm:text-sm">{errors.age}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="gender" className="text-xs sm:text-sm">Gender <span className="text-red-500">*</span></Label>
                      <Select
                        name="gender"
                        value={formData.gender}
                        onValueChange={(value) => handleInputChange({ target: { name: 'gender', value } } as React.ChangeEvent<HTMLSelectElement>)}
                      >
                        <SelectTrigger className={errors.gender ? "border-red-500 text-sm" : "text-sm"}>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Male" className="text-sm">Male</SelectItem>
                          <SelectItem value="Female" className="text-sm">Female</SelectItem>
                          <SelectItem value="Other" className="text-sm">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.gender && <p className="text-red-500 text-xs sm:text-sm">{errors.gender}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state" className="text-xs sm:text-sm">State <span className="text-red-500">*</span></Label>
                      <Select
                        name="state"
                        value={formData.state}
                        onValueChange={(value) => handleInputChange({ target: { name: 'state', value } } as React.ChangeEvent<HTMLSelectElement>)}
                      >
                        <SelectTrigger className={errors.state ? "border-red-500 text-sm" : "text-sm"}>
                          <SelectValue placeholder="Select your state" />
                        </SelectTrigger>
                        <SelectContent>
                          {INDIAN_STATES.map((state) => (
                            <SelectItem key={state} value={state} className="text-sm">
                              {state}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.state && <p className="text-red-500 text-xs sm:text-sm">{errors.state}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contact_details" className="text-xs sm:text-sm">Contact Details <span className="text-red-500">*</span></Label>
                      <Input
                        id="contact_details"
                        name="contact_details"
                        value={formData.contact_details}
                        onChange={handleInputChange}
                        placeholder="Enter your contact details"
                        className={errors.contact_details ? "border-red-500 text-sm" : "text-sm"}
                      />
                      {errors.contact_details && <p className="text-red-500 text-xs sm:text-sm">{errors.contact_details}</p>}
                    </div>
                  </div>
                </TabsContent>

                {/* Medical Information Tab */}
                <TabsContent value="medical" className="space-y-4 mt-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="chronic_conditions" className="text-xs sm:text-sm">Chronic Conditions</Label>
                      <Textarea
                        id="chronic_conditions"
                        name="chronic_conditions"
                        value={formData.chronic_conditions}
                        onChange={handleInputChange}
                        placeholder="List any chronic conditions"
                        className="text-sm min-h-[100px]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="past_surgeries" className="text-xs sm:text-sm">Past Surgeries</Label>
                      <Textarea
                        id="past_surgeries"
                        name="past_surgeries"
                        value={formData.past_surgeries}
                        onChange={handleInputChange}
                        placeholder="List any past surgeries"
                        className="text-sm min-h-[100px]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="allergies" className="text-xs sm:text-sm">Allergies</Label>
                      <Textarea
                        id="allergies"
                        name="allergies"
                        value={formData.allergies}
                        onChange={handleInputChange}
                        placeholder="List any allergies"
                        className="text-sm min-h-[100px]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="medications" className="text-xs sm:text-sm">Current Medications</Label>
                      <Textarea
                        id="medications"
                        name="medications"
                        value={formData.medications}
                        onChange={handleInputChange}
                        placeholder="List any current medications"
                        className="text-sm min-h-[100px]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="symptoms" className="text-xs sm:text-sm">Symptoms</Label>
                      <Textarea
                        id="symptoms"
                        name="symptoms"
                        value={formData.symptoms}
                        onChange={handleInputChange}
                        placeholder="Describe your symptoms"
                        className="text-sm min-h-[100px]"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="symptom_severity" className="text-xs sm:text-sm">Symptom Severity</Label>
                        <Select
                          name="symptom_severity"
                          value={formData.symptom_severity}
                          onValueChange={(value) => handleInputChange({ target: { name: 'symptom_severity', value } } as React.ChangeEvent<HTMLSelectElement>)}
                        >
                          <SelectTrigger className="text-sm">
                            <SelectValue placeholder="Select severity" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Mild" className="text-sm">Mild</SelectItem>
                            <SelectItem value="Moderate" className="text-sm">Moderate</SelectItem>
                            <SelectItem value="Severe" className="text-sm">Severe</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="symptom_duration" className="text-xs sm:text-sm">Symptom Duration</Label>
                        <Select
                          name="symptom_duration"
                          value={formData.symptom_duration}
                          onValueChange={(value) => handleInputChange({ target: { name: 'symptom_duration', value } } as React.ChangeEvent<HTMLSelectElement>)}
                        >
                          <SelectTrigger className="text-sm">
                            <SelectValue placeholder="Select duration" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Less than a day" className="text-sm">Less than a day</SelectItem>
                            <SelectItem value="1-3 days" className="text-sm">1-3 days</SelectItem>
                            <SelectItem value="4-7 days" className="text-sm">4-7 days</SelectItem>
                            <SelectItem value="More than a week" className="text-sm">More than a week</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                {/* Mental Health Tab */}
                <TabsContent value="mental" className="space-y-4 mt-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <Label className="text-xs sm:text-sm">Mental Health Conditions</Label>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="mental_health_stress"
                            name="mental_health_stress"
                            checked={formData.mental_health_stress}
                            onCheckedChange={(checked) => {
                              setFormData(prev => ({
                                ...prev,
                                mental_health_stress: checked as boolean
                              }));
                            }}
                          />
                          <Label htmlFor="mental_health_stress" className="text-xs sm:text-sm">Stress</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="mental_health_anxiety"
                            name="mental_health_anxiety"
                            checked={formData.mental_health_anxiety}
                            onCheckedChange={(checked) => {
                              setFormData(prev => ({
                                ...prev,
                                mental_health_anxiety: checked as boolean
                              }));
                            }}
                          />
                          <Label htmlFor="mental_health_anxiety" className="text-xs sm:text-sm">Anxiety</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="mental_health_depression"
                            name="mental_health_depression"
                            checked={formData.mental_health_depression}
                            onCheckedChange={(checked) => {
                              setFormData(prev => ({
                                ...prev,
                                mental_health_depression: checked as boolean
                              }));
                            }}
                          />
                          <Label htmlFor="mental_health_depression" className="text-xs sm:text-sm">Depression</Label>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="vaccination_history" className="text-xs sm:text-sm">Vaccination History</Label>
                      <Textarea
                        id="vaccination_history"
                        name="vaccination_history"
                        value={formData.vaccination_history}
                        onChange={handleInputChange}
                        placeholder="List your vaccination history"
                        className="text-sm min-h-[100px]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="accessibility_needs" className="text-xs sm:text-sm">Accessibility Needs</Label>
                      <Textarea
                        id="accessibility_needs"
                        name="accessibility_needs"
                        value={formData.accessibility_needs}
                        onChange={handleInputChange}
                        placeholder="List any accessibility needs"
                        className="text-sm min-h-[100px]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pregnancy_status" className="text-xs sm:text-sm">Pregnancy Status</Label>
                      <Select
                        name="pregnancy_status"
                        value={formData.pregnancy_status}
                        onValueChange={(value) => handleInputChange({ target: { name: 'pregnancy_status', value } } as React.ChangeEvent<HTMLSelectElement>)}
                      >
                        <SelectTrigger className="text-sm">
                          <SelectValue placeholder="Select pregnancy status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Not Pregnant" className="text-sm">Not Pregnant</SelectItem>
                          <SelectItem value="Pregnant" className="text-sm">Pregnant</SelectItem>
                          <SelectItem value="Planning Pregnancy" className="text-sm">Planning Pregnancy</SelectItem>
                          <SelectItem value="Not Applicable" className="text-sm">Not Applicable</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </TabsContent>

                {/* Insurance Tab */}
                <TabsContent value="insurance" className="space-y-4 mt-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="health_insurance_provider" className="text-xs sm:text-sm">Health Insurance Provider</Label>
                      <Input
                        id="health_insurance_provider"
                        name="health_insurance_provider"
                        value={formData.health_insurance_provider}
                        onChange={handleInputChange}
                        placeholder="Enter your health insurance provider"
                        className="text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="health_insurance_policy" className="text-xs sm:text-sm">Health Insurance Policy Number</Label>
                      <Input
                        id="health_insurance_policy"
                        name="health_insurance_policy"
                        value={formData.health_insurance_policy}
                        onChange={handleInputChange}
                        placeholder="Enter your health insurance policy number"
                        className="text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="preferred_language" className="text-xs sm:text-sm">Preferred Language</Label>
                      <Select
                        name="preferred_language"
                        value={formData.preferred_language}
                        onValueChange={(value) => handleInputChange({ target: { name: 'preferred_language', value } } as React.ChangeEvent<HTMLSelectElement>)}
                      >
                        <SelectTrigger className="text-sm">
                          <SelectValue placeholder="Select preferred language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="English" className="text-sm">English</SelectItem>
                          <SelectItem value="Hindi" className="text-sm">Hindi</SelectItem>
                          <SelectItem value="Telugu" className="text-sm">Telugu</SelectItem>
                          <SelectItem value="Tamil" className="text-sm">Tamil</SelectItem>
                          <SelectItem value="Kannada" className="text-sm">Kannada</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs sm:text-sm">Emergency Contact Information</Label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="emergency_contact_name" className="text-xs sm:text-sm">Name</Label>
                          <Input
                            id="emergency_contact_name"
                            name="emergency_contact.name"
                            value={formData.emergency_contact.name}
                            onChange={handleInputChange}
                            placeholder="Emergency contact name"
                            className="text-sm"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="emergency_contact_relationship" className="text-xs sm:text-sm">Relationship</Label>
                          <Input
                            id="emergency_contact_relationship"
                            name="emergency_contact.relationship"
                            value={formData.emergency_contact.relationship}
                            onChange={handleInputChange}
                            placeholder="Relationship to you"
                            className="text-sm"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="emergency_contact_number" className="text-xs sm:text-sm">Phone Number</Label>
                          <Input
                            id="emergency_contact_number"
                            name="emergency_contact.number"
                            value={formData.emergency_contact.number}
                            onChange={handleInputChange}
                            placeholder="Emergency contact phone number"
                            className="text-sm"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="research_participation"
                        name="research_participation"
                        checked={formData.research_participation}
                        onCheckedChange={(checked) => handleInputChange({ target: { name: 'research_participation', checked } } as React.ChangeEvent<HTMLInputElement>)}
                      />
                      <Label htmlFor="research_participation" className="text-xs sm:text-sm">I agree to participate in health research studies</Label>
                    </div>
                  </div>
                </TabsContent>

                {/* Review Tab */}
                <TabsContent value="review" className="space-y-6 mt-4">
                  <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm">
                    <h3 className="text-lg sm:text-xl font-semibold text-blue-800 mb-4 sm:mb-6 flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Your Health Assessment
                    </h3>
                    
                    {/* Personal Information Review */}
                    <div className="mb-6 sm:mb-8">
                      <h4 className="text-base sm:text-lg font-medium text-gray-700 mb-3 sm:mb-4 flex items-center gap-2">
                        <User className="h-4 w-4" />
                        Personal Information
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                        <div className="space-y-1 sm:space-y-2">
                          <p className="text-xs sm:text-sm text-gray-500">Full Name</p>
                          <p className="text-sm sm:text-base font-medium text-gray-900">{formData.name}</p>
                        </div>
                        <div className="space-y-1 sm:space-y-2">
                          <p className="text-xs sm:text-sm text-gray-500">Email</p>
                          <p className="text-sm sm:text-base font-medium text-gray-900">{formData.email}</p>
                        </div>
                        <div className="space-y-1 sm:space-y-2">
                          <p className="text-xs sm:text-sm text-gray-500">Age</p>
                          <p className="text-sm sm:text-base font-medium text-gray-900">{formData.age}</p>
                        </div>
                        <div className="space-y-1 sm:space-y-2">
                          <p className="text-xs sm:text-sm text-gray-500">Gender</p>
                          <p className="text-sm sm:text-base font-medium text-gray-900">{formData.gender}</p>
                        </div>
                        <div className="space-y-1 sm:space-y-2">
                          <p className="text-xs sm:text-sm text-gray-500">State</p>
                          <p className="text-sm sm:text-base font-medium text-gray-900">{formData.state}</p>
                        </div>
                        <div className="space-y-1 sm:space-y-2">
                          <p className="text-xs sm:text-sm text-gray-500">Contact Details</p>
                          <p className="text-sm sm:text-base font-medium text-gray-900">{formData.contact_details}</p>
                        </div>
                      </div>
                    </div>

                    {/* Medical Information Review */}
                    <div className="mb-6 sm:mb-8">
                      <h4 className="text-base sm:text-lg font-medium text-gray-700 mb-3 sm:mb-4 flex items-center gap-2">
                        <Heart className="h-4 w-4" />
                        Medical Information
                      </h4>
                      <div className="space-y-4 sm:space-y-6">
                        <div className="space-y-1 sm:space-y-2">
                          <p className="text-xs sm:text-sm text-gray-500">Chronic Conditions</p>
                          <p className="text-sm sm:text-base font-medium text-gray-900">{formData.chronic_conditions || 'None'}</p>
                        </div>
                        <div className="space-y-1 sm:space-y-2">
                          <p className="text-xs sm:text-sm text-gray-500">Past Surgeries</p>
                          <p className="text-sm sm:text-base font-medium text-gray-900">{formData.past_surgeries || 'None'}</p>
                        </div>
                        <div className="space-y-1 sm:space-y-2">
                          <p className="text-xs sm:text-sm text-gray-500">Allergies</p>
                          <p className="text-sm sm:text-base font-medium text-gray-900">{formData.allergies || 'None'}</p>
                        </div>
                        <div className="space-y-1 sm:space-y-2">
                          <p className="text-xs sm:text-sm text-gray-500">Current Medications</p>
                          <p className="text-sm sm:text-base font-medium text-gray-900">{formData.medications || 'None'}</p>
                        </div>
                        <div className="space-y-1 sm:space-y-2">
                          <p className="text-xs sm:text-sm text-gray-500">Symptoms</p>
                          <p className="text-sm sm:text-base font-medium text-gray-900">{formData.symptoms || 'None'}</p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                          <div className="space-y-1 sm:space-y-2">
                            <p className="text-xs sm:text-sm text-gray-500">Symptom Severity</p>
                            <p className="text-sm sm:text-base font-medium text-gray-900">{formData.symptom_severity || 'Not specified'}</p>
                          </div>
                          <div className="space-y-1 sm:space-y-2">
                            <p className="text-xs sm:text-sm text-gray-500">Symptom Duration</p>
                            <p className="text-sm sm:text-base font-medium text-gray-900">{formData.symptom_duration || 'Not specified'}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Mental Health Review */}
                    <div className="mb-6 sm:mb-8">
                      <h4 className="text-base sm:text-lg font-medium text-gray-700 mb-3 sm:mb-4 flex items-center gap-2">
                        <Brain className="h-4 w-4" />
                        Mental Health
                      </h4>
                      <div className="space-y-3 sm:space-y-4">
                        <div className="flex items-center space-x-2">
                          <Checkbox checked={formData.mental_health_stress} disabled />
                          <Label className="text-sm sm:text-base text-gray-900">Stress</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox checked={formData.mental_health_anxiety} disabled />
                          <Label className="text-sm sm:text-base text-gray-900">Anxiety</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox checked={formData.mental_health_depression} disabled />
                          <Label className="text-sm sm:text-base text-gray-900">Depression</Label>
                        </div>
                      </div>
                    </div>

                    {/* Insurance Information Review */}
                    <div className="mb-6 sm:mb-8">
                      <h4 className="text-base sm:text-lg font-medium text-gray-700 mb-3 sm:mb-4 flex items-center gap-2">
                        <Shield className="h-4 w-4" />
                        Insurance Information
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                        <div className="space-y-1 sm:space-y-2">
                          <p className="text-xs sm:text-sm text-gray-500">Insurance Provider</p>
                          <p className="text-sm sm:text-base font-medium text-gray-900">{formData.health_insurance_provider || 'Not provided'}</p>
                        </div>
                        <div className="space-y-1 sm:space-y-2">
                          <p className="text-xs sm:text-sm text-gray-500">Policy Number</p>
                          <p className="text-sm sm:text-base font-medium text-gray-900">{formData.health_insurance_policy || 'Not provided'}</p>
                        </div>
                      </div>
                    </div>

                    {/* Emergency Contact Review */}
                    <div>
                      <h4 className="text-base sm:text-lg font-medium text-gray-700 mb-3 sm:mb-4 flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        Emergency Contact
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                        <div className="space-y-1 sm:space-y-2">
                          <p className="text-xs sm:text-sm text-gray-500">Name</p>
                          <p className="text-sm sm:text-base font-medium text-gray-900">{formData.emergency_contact.name}</p>
                        </div>
                        <div className="space-y-1 sm:space-y-2">
                          <p className="text-xs sm:text-sm text-gray-500">Relationship</p>
                          <p className="text-sm sm:text-base font-medium text-gray-900">{formData.emergency_contact.relationship}</p>
                        </div>
                        <div className="space-y-1 sm:space-y-2">
                          <p className="text-xs sm:text-sm text-gray-500">Phone Number</p>
                          <p className="text-sm sm:text-base font-medium text-gray-900">{formData.emergency_contact.number}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="flex flex-col sm:flex-row justify-between gap-4 mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentStep === 0 || isSubmitting}
                  className="hover:bg-blue-50 hover:text-blue-600 text-xs sm:text-sm"
                >
                  Previous
                </Button>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCancel}
                    disabled={isSubmitting}
                    className="hover:bg-blue-50 hover:text-blue-600 text-xs sm:text-sm"
                  >
                    Cancel
                  </Button>
                  {currentStep === totalSteps - 1 ? (
                    <Button 
                      type="submit" 
                      className="bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-3 w-3 sm:h-4 sm:w-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        'Submit Assessment'
                      )}
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      className="bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm"
                      onClick={(e) => {
                        e.preventDefault();
                        handleNext();
                      }}
                    >
                      Next
                    </Button>
                  )}
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HealthAssessment;