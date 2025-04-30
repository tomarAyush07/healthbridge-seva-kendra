import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bot, Send, ArrowLeft, Brain, Shield, Heart, Zap, Sparkles, Cpu, Network, Activity, Menu, X, Plus, Trash2, User, MessageSquare, Stethoscope, Mic, MicOff, Volume2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

const AIChat = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: `Hello ${user?.name || 'there'}! 👋 I'm your HealthBridge AI assistant. How can I help you with your health concerns today?`,
      timestamp: new Date(),
      animation: true
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [robotAnimation, setRobotAnimation] = useState("idle");
  const [conversations, setConversations] = useState([
    { id: 1, title: "Health Checkup", date: new Date(), preview: "Initial health assessment..." },
    { id: 2, title: "Symptom Analysis", date: new Date(Date.now() - 86400000), preview: "Analyzing symptoms..." },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Voice recognition setup
  useEffect(() => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) return;
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = false;
    recognitionRef.current.interimResults = false;
    recognitionRef.current.lang = 'en-US';

    recognitionRef.current.onstart = () => setIsListening(true);
    recognitionRef.current.onend = () => setIsListening(false);
    recognitionRef.current.onerror = () => setIsListening(false);
    recognitionRef.current.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      setIsListening(false);
    };
  }, []);

  const handleMicClick = () => {
    if (!recognitionRef.current) return;
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setRobotAnimation("typing");
    const userMessage = {
      role: "user",
      content: input,
      timestamp: new Date(),
      animation: false
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);
    setIsProcessing(true);

    // Simulate AI processing
    setTimeout(() => {
      setIsProcessing(false);
      setRobotAnimation("thinking");
      const aiResponse = {
        role: "assistant",
        content: "I'm analyzing your query. Please provide more details about your symptoms or health concern.",
        timestamp: new Date(),
        animation: true
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
      setRobotAnimation("idle");

      // Update conversations
      setConversations(prev => [{
        id: Date.now(),
        title: input.slice(0, 30) + (input.length > 30 ? "..." : ""),
        date: new Date(),
        preview: aiResponse.content.slice(0, 50) + "..."
      }, ...prev]);
    }, 2000);
  };

  const features = [
    {
      icon: <Brain className="h-6 w-6" />,
      title: "Neural Analysis",
      description: "Advanced AI processing your health data"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Quantum Security",
      description: "Military-grade encryption for your data"
    },
    {
      icon: <Heart className="h-6 w-6" />,
      title: "Bio-Sync",
      description: "Real-time health monitoring"
    }
  ];

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new window.SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 1;
      utterance.pitch = 1.1;
      utterance.volume = 1;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Whenever conversations change, persist to localStorage
  useEffect(() => {
    localStorage.setItem('ai_recent_conversations', JSON.stringify(conversations));
  }, [conversations]);

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-healthbridge-light to-white">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
        <div className="absolute inset-0 bg-gradient-to-br from-healthbridge-blue/5 to-healthbridge-teal/5" />
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              'radial-gradient(circle at 20% 20%, rgba(11, 83, 148, 0.05) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 80%, rgba(0, 163, 163, 0.05) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 20%, rgba(11, 83, 148, 0.05) 0%, transparent 50%)',
            ],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </div>

      {/* Header */}
      <header className="relative bg-white/90 backdrop-blur-md border-b border-healthbridge-blue/10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-healthbridge-blue hover:text-healthbridge-blue/80 hover:bg-healthbridge-light"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Home</span>
          </Button>
          <div className="flex items-center gap-2">
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              className="relative"
            >
              <Stethoscope className="h-8 w-8 text-healthbridge-blue" />
            </motion.div>
            <h1 className="text-xl font-bold text-healthbridge-blue">
              HealthBridge AI
            </h1>
          </div>
          <div className="w-24" />
        </div>
      </header>

      {/* Main Chat Area */}
      <div className="flex-1 overflow-hidden relative">
        <div className="h-full flex">
          {/* Robot Doctor Character */}
          <motion.div
            className="hidden md:block fixed bottom-36 right-10 z-30 group"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            style={{ pointerEvents: 'none' }}
          >
            {/* Enhanced Glow Effect */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              style={{ zIndex: 1 }}
              animate={{
                opacity: [0.4, 0.6, 0.4],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
            >
              <div className="w-40 h-40 rounded-full bg-gradient-to-br from-healthbridge-blue/20 to-healthbridge-teal/20 blur-xl" />
            </motion.div>

            <motion.div
              className="relative w-32 h-32 rounded-full flex items-center justify-center overflow-visible border-2 border-healthbridge-blue/40 shadow-lg backdrop-blur-sm"
              style={{
                background: 'rgba(255, 255, 255, 0.95)',
                zIndex: 3,
                pointerEvents: 'auto',
              }}
              whileTap={{ scale: 0.98 }}
            >
              <img
                src="/lovable-uploads/doc.webp"
                alt="Cute Robot Doctor"
                className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105 filter drop-shadow-lg"
                onError={(e) => {
                  e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%230B5394'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-9h10v2H7z'/%3E%3C/svg%3E";
                }}
              />
              {/* Enhanced Pulse Effect */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-healthbridge-blue/30"
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.6, 0.8, 0.6],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              />
              {/* Additional Glow Ring */}
              <motion.div
                className="absolute inset-0 rounded-full border border-healthbridge-teal/30"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  delay: 0.5,
                }}
              />
            </motion.div>

            {/* Enhanced Typing Indicator */}
            <AnimatePresence>
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute -top-12 right-0 rounded-lg px-3 py-2 shadow-lg border border-healthbridge-blue/20 bg-white/95 backdrop-blur-sm text-sm text-healthbridge-blue"
                >
                  <div className="flex gap-1 items-center">
                    <span>Doc. AI is typing</span>
                    <motion.div
                      className="w-1.5 h-1.5 bg-gradient-to-r from-healthbridge-blue to-healthbridge-teal rounded-full"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 0.6,
                        repeat: Infinity,
                      }}
                    />
                    <motion.div
                      className="w-1.5 h-1.5 bg-gradient-to-r from-healthbridge-blue to-healthbridge-teal rounded-full"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 0.6,
                        repeat: Infinity,
                        delay: 0.2,
                      }}
                    />
                    <motion.div
                      className="w-1.5 h-1.5 bg-gradient-to-r from-healthbridge-blue to-healthbridge-teal rounded-full"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 0.6,
                        repeat: Infinity,
                        delay: 0.4,
                      }}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Conversations Sidebar */}
          <AnimatePresence>
            {isSidebarOpen && (
              <motion.div
                initial={{ x: -320, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -320, opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="fixed md:static top-0 left-0 h-full w-full md:w-[300px] z-40 bg-white/95 backdrop-blur-md border-r border-healthbridge-blue/10 shadow-lg overflow-hidden flex flex-col md:relative md:z-auto md:translate-x-0"
              >
                <div className="p-4 flex flex-col gap-4 flex-1">
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-2 text-healthbridge-blue hover:text-healthbridge-blue/80 hover:bg-healthbridge-light rounded-lg transition-all duration-200 border border-healthbridge-blue/20 hover:border-healthbridge-blue/30 shadow-sm"
                    onClick={() => {
                      setMessages([{ role: 'assistant', content: `Hello ${user?.name || 'there'}! 👋 I'm your HealthBridge AI assistant. How can I help you with your health concerns today?`, timestamp: new Date(), animation: true }]);
                      if (window.innerWidth < 768) setIsSidebarOpen(false);
                    }}
                  >
                    <Plus className="h-5 w-5 text-healthbridge-blue" />
                    <span>New Chat</span>
                  </Button>
                  <h2 className="px-2 text-base font-semibold text-healthbridge-blue mb-2 flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Recent Chats
                  </h2>
                  <div className="space-y-3 flex-1 overflow-y-auto custom-scrollbar">
                    {conversations.map((conversation, idx) => (
                      <motion.div
                        key={conversation.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="group relative"
                      >
                        <Button
                          variant="ghost"
                          className="w-full justify-between px-4 py-4 text-base text-healthbridge-blue hover:text-healthbridge-blue/80 hover:bg-healthbridge-light rounded-lg border border-healthbridge-blue/20 hover:border-healthbridge-blue/30 transition-all duration-200 flex items-center group-hover:shadow-sm"
                        >
                          <div className="flex-1 text-left truncate">
                            <div className="font-medium truncate text-healthbridge-blue group-hover:text-healthbridge-blue/80 flex items-center gap-2">
                              <Stethoscope className="h-4 w-4" />
                              {conversation.title}
                            </div>
                            <div className="text-sm text-healthbridge-blue/60 truncate mt-1">{conversation.preview}</div>
                          </div>
                          <Trash2 className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity text-healthbridge-blue/60 hover:text-red-500" />
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  className="absolute top-4 right-4 md:hidden flex items-center justify-center rounded-full hover:bg-healthbridge-light p-2 z-50"
                  onClick={() => setIsSidebarOpen(false)}
                  aria-label="Close sidebar"
                >
                  <X className="h-6 w-6 text-healthbridge-blue" />
                </Button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Toggle Sidebar Button */}
          <Button
            variant="ghost"
            className="fixed top-4 left-4 z-50 h-10 w-10 p-0 bg-white shadow-sm border border-healthbridge-blue/20 rounded-full flex items-center justify-center transition-all duration-200 hover:bg-healthbridge-light hover:border-healthbridge-blue/30 md:top-6 md:left-6 md:h-12 md:w-12"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            aria-label="Toggle sidebar"
          >
            {isSidebarOpen ? (
              <X className="h-6 w-6 md:h-7 md:w-7 text-healthbridge-blue" />
            ) : (
              <Menu className="h-6 w-6 md:h-7 md:w-7 text-healthbridge-blue" />
            )}
          </Button>

          {/* Chat Messages */}
          <div className="flex-1 flex flex-col min-h-0">
            <div className="flex-1 overflow-y-auto p-2 sm:p-4 space-y-4 pr-0 md:pr-56" style={{ minHeight: 0 }}>
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-4 ${
                      message.role === 'user'
                        ? 'bg-healthbridge-light border border-healthbridge-blue/20 shadow-sm'
                        : 'bg-white border border-healthbridge-blue/20 shadow-sm'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      {message.role === 'assistant' ? (
                        <motion.div
                          animate={message.animation ? {
                            scale: [1, 1.05, 1],
                          } : {}}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatType: "reverse"
                          }}
                          className="relative"
                        >
                          <Bot className="h-5 w-5 text-healthbridge-blue" />
                        </motion.div>
                      ) : (
                        <motion.div
                          animate={{
                            scale: [1, 1.05, 1],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatType: "reverse"
                          }}
                          className="relative"
                        >
                          <User className="h-5 w-5 text-healthbridge-teal" />
                        </motion.div>
                      )}
                      <span className="text-sm font-medium text-healthbridge-blue">
                        {message.role === 'user' ? 'You' : 'HealthBridge AI'}
                      </span>
                      <span className="text-xs text-healthbridge-blue/60">
                        {message.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                    <motion.p 
                      className="whitespace-pre-wrap text-healthbridge-blue"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      {message.content}
                    </motion.p>
                    {message.role === 'assistant' && (
                      <button
                        type="button"
                        onClick={() => speak(message.content)}
                        className="ml-2 p-1 rounded-full hover:bg-healthbridge-light transition"
                        aria-label="Replay AI voice"
                      >
                        <Volume2 className="h-4 w-4 text-healthbridge-blue/60" />
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-white border border-healthbridge-blue/20 rounded-lg p-4 shadow-sm">
                    <div className="flex items-center gap-2">
                      <motion.div
                        animate={{
                          scale: [1, 1.05, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatType: "reverse"
                        }}
                        className="relative"
                      >
                        <Bot className="h-5 w-5 text-healthbridge-blue" />
                      </motion.div>
                      <span className="text-sm font-medium text-healthbridge-blue">HealthBridge AI</span>
                      <div className="flex gap-1">
                        <motion.div
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.5, 1, 0.5],
                          }}
                          transition={{
                            duration: 0.6,
                            repeat: Infinity,
                          }}
                          className="w-2 h-2 bg-healthbridge-blue rounded-full"
                        />
                        <motion.div
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.5, 1, 0.5],
                          }}
                          transition={{
                            duration: 0.6,
                            repeat: Infinity,
                            delay: 0.2,
                          }}
                          className="w-2 h-2 bg-healthbridge-blue rounded-full"
                        />
                        <motion.div
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.5, 1, 0.5],
                          }}
                          transition={{
                            duration: 0.6,
                            repeat: Infinity,
                            delay: 0.4,
                          }}
                          className="w-2 h-2 bg-healthbridge-blue rounded-full"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t border-healthbridge-blue/10 bg-white p-2 sm:p-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4 rounded-b-2xl sticky bottom-0 z-40 shadow-sm">
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your health concern..."
                  className="flex-1 bg-healthbridge-light border-healthbridge-blue/20 text-healthbridge-blue placeholder-healthbridge-blue/40 focus:border-healthbridge-blue focus:ring-1 focus:ring-healthbridge-blue rounded-lg shadow-sm"
                  aria-label="Type your health concern"
                />
                <div className="flex flex-row gap-2 sm:gap-4">
                  <Button 
                    type="button"
                    onClick={handleMicClick}
                    className={`rounded-full p-0 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center border ${
                      isListening ? 'border-healthbridge-blue bg-healthbridge-blue/10' : 'border-healthbridge-blue/20 bg-white hover:bg-healthbridge-light'
                    }`}
                    aria-label={isListening ? 'Stop listening' : 'Start voice input'}
                    title={isListening ? 'Stop listening' : 'Start voice input'}
                  >
                    {isListening ? <MicOff className="h-6 w-6 text-healthbridge-blue" /> : <Mic className="h-6 w-6 text-healthbridge-blue/60" />}
                  </Button>
                  <Button 
                    type="submit" 
                    className="bg-healthbridge-blue hover:bg-healthbridge-blue/90 text-white shadow-sm rounded-lg px-4 py-2 sm:px-6 sm:py-2 font-medium text-base border border-healthbridge-blue"
                    disabled={isProcessing}
                    aria-label="Send message"
                    title="Send message"
                  >
                    {isProcessing ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <Activity className="h-5 w-5" />
                      </motion.div>
                    ) : (
                      <Send className="h-5 w-5" />
                    )}
                  </Button>
                </div>
              </form>
            </div>
            {/* Professional Health Disclaimer */}
            <div className="w-full px-4 py-3 bg-healthbridge-light text-healthbridge-blue/80 text-xs text-center rounded-b-2xl border-t border-healthbridge-blue/10">
              <strong>Disclaimer:</strong> Doc. AI is an informational assistant and not a substitute for professional medical advice, diagnosis, or treatment. Always consult a qualified healthcare provider with any questions you may have regarding a medical condition.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChat; 