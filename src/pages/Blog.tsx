import { motion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  Search, ArrowRight, Calendar, Clock, User, Tag,
  Brain, Heart, Dna, Microscope, Activity, Globe
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useRef } from "react";

const Blog = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0]);

  const blogCategories = [
    { name: "AI in Healthcare", icon: Brain, color: "from-purple-500 to-indigo-500" },
    { name: "Medical Research", icon: Microscope, color: "from-blue-500 to-cyan-500" },
    { name: "Patient Care", icon: Heart, color: "from-pink-500 to-rose-500" },
    { name: "Genomics", icon: Dna, color: "from-emerald-500 to-green-500" },
    { name: "Health Tech", icon: Activity, color: "from-orange-500 to-amber-500" },
    { name: "Global Health", icon: Globe, color: "from-blue-500 to-indigo-500" }
  ];

  const featuredPosts = [
    {
      id: 1,
      title: "Revolutionary AI in Medical Diagnosis",
      excerpt: "How artificial intelligence is transforming disease detection with 99% accuracy in early-stage diagnostics.",
      category: "AI in Healthcare",
      author: "Dr. Sarah Chen",
      date: "2025-03-15",
      readTime: "8 min",
      image: "https://images.pexels.com/photos/7659564/pexels-photo-7659564.jpeg",
      tags: ["AI", "Diagnostics", "Innovation"]
    },
    {
      id: 2,
      title: "CRISPR Gene Therapy Breakthroughs",
      excerpt: "Latest developments in gene editing technology showing promising results in treating genetic disorders.",
      category: "Medical Research",
      author: "Dr. James Wilson",
      date: "2025-03-14",
      readTime: "7 min",
      image: "https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg",
      tags: ["CRISPR", "Genetics", "Research"]
    },
    {
      id: 3,
      title: "5G Revolution in Telemedicine",
      excerpt: "How 5G technology is enabling remote surgeries and transforming healthcare delivery worldwide.",
      category: "Health Tech",
      author: "Emily Roberts",
      date: "2025-03-13",
      readTime: "6 min",
      image: "https://images.pexels.com/photos/4226256/pexels-photo-4226256.jpeg",
      tags: ["5G", "Telemedicine", "Innovation"]
    },
    {
      id: 4,
      title: "Quantum Computing in Drug Discovery",
      excerpt: "Quantum algorithms accelerating drug development process from years to months with unprecedented accuracy.",
      category: "Medical Research",
      author: "Dr. Michael Chang",
      date: "2025-03-12",
      readTime: "9 min",
      image: "https://images.pexels.com/photos/8439093/pexels-photo-8439093.jpeg",
      tags: ["Quantum Computing", "Drug Development", "Research"]
    },
    {
      id: 5,
      title: "Nanotechnology in Cancer Treatment",
      excerpt: "Revolutionary nanorobots targeting cancer cells with precision, minimizing damage to healthy tissue.",
      category: "Medical Research",
      author: "Dr. Lisa Anderson",
      date: "2025-03-11",
      readTime: "8 min",
      image: "https://images.pexels.com/photos/3825527/pexels-photo-3825527.jpeg",
      tags: ["Nanotechnology", "Cancer", "Treatment"]
    },
    {
      id: 6,
      title: "Brain-Computer Interfaces in Medicine",
      excerpt: "Neural implants helping paralyzed patients regain mobility through thought-controlled prosthetics.",
      category: "Health Tech",
      author: "Dr. Robert Martinez",
      date: "2025-03-10",
      readTime: "10 min",
      image: "https://images.pexels.com/photos/8438922/pexels-photo-8438922.jpeg",
      tags: ["Neuroscience", "BCI", "Innovation"]
    }
  ];

  const recentPosts = [
    {
      id: 7,
      title: "AR/VR in Medical Training",
      category: "Health Tech",
      date: "2025-03-09",
      image: "https://images.pexels.com/photos/8441771/pexels-photo-8441771.jpeg"
    },
    {
      id: 8,
      title: "Personalized Medicine Through AI",
      category: "AI in Healthcare",
      date: "2025-03-08",
      image: "https://images.pexels.com/photos/7579831/pexels-photo-7579831.jpeg"
    },
    {
      id: 9,
      title: "Future of Robotic Surgery",
      category: "Medical Research",
      date: "2025-03-07",
      image: "https://images.pexels.com/photos/7088530/pexels-photo-7088530.jpeg"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-100 via-blue-50 to-slate-100">
      <Header />
      
      <main className="flex-1" ref={containerRef}>
        {/* Hero Section */}
        <motion.section 
          className="relative py-20 overflow-hidden"
          style={{ y, opacity }}
        >
          <div className="absolute inset-0">
            {/* Animated Grid Background */}
            <div 
              className="absolute inset-0 opacity-[0.05]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54 0h6v6h-6zM0 54h6v6H0z' fill='%234F46E5' fill-opacity='0.4'/%3E%3C/svg%3E")`,
                backgroundSize: '30px 30px'
              }}
            />
            
            {/* Gradient Orbs */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-200/30 rounded-full filter blur-3xl animate-pulse" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-200/30 rounded-full filter blur-3xl animate-pulse delay-1000" />
          </div>

          <div className="container relative z-10 px-4">
            <div className="text-center max-w-4xl mx-auto">
              <motion.h1 
                className="text-6xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                Healthcare Insights
              </motion.h1>
              <motion.p 
                className="text-xl text-gray-600 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Explore the latest breakthroughs and innovations in healthcare technology
              </motion.p>

              {/* Search Bar */}
              <motion.div 
                className="max-w-2xl mx-auto relative group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-lg blur group-hover:blur-xl transition-all duration-300" />
                <div className="relative flex gap-2">
                  <Input
                    type="text"
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white/80 border-0 text-gray-900 placeholder:text-gray-500 focus-visible:ring-2 focus-visible:ring-blue-500"
                  />
                  <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white">
                    <Search className="w-5 h-5" />
                  </Button>
                </div>
              </motion.div>
            </div>

            {/* Categories */}
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {blogCategories.map((category, index) => (
                <motion.div
                  key={category.name}
                  className="group relative"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.color} rounded-xl opacity-20 blur-sm group-hover:blur transition-all duration-300`} />
                  <div className="relative bg-white/80 backdrop-blur-xl rounded-xl p-4 border border-blue-100/20">
                    <category.icon className="w-8 h-8 mb-2 text-gray-800" />
                    <h3 className="text-gray-800 font-semibold">{category.name}</h3>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* Featured Posts */}
        <section className="py-20 relative">
          <div className="container px-4">
            <h2 className="text-4xl font-bold mb-12 text-gray-800">Featured Articles</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  className="group relative"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                  <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl overflow-hidden border border-blue-100/20">
                    <div className="aspect-[16/10] overflow-hidden">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {post.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {post.readTime}
                        </span>
                        <span className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {post.author}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 mb-4">{post.excerpt}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map(tag => (
                          <span 
                            key={tag}
                            className="flex items-center gap-1 text-sm px-3 py-1 rounded-full bg-blue-50 text-blue-600 border border-blue-100"
                          >
                            <Tag className="w-3 h-3" />
                            {tag}
                          </span>
                        ))}
                      </div>
                      <Button 
                        variant="ghost" 
                        className="group/btn text-blue-600 hover:text-blue-700"
                      >
                        Read More 
                        <ArrowRight className="w-4 h-4 ml-2 transform group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* Recent Posts */}
        <section className="py-20 relative">
          <div className="container px-4">
            <h2 className="text-4xl font-bold mb-12 text-gray-800">Recent Posts</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  className="group relative"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-xl blur-lg group-hover:blur-xl transition-all duration-300" />
                  <div className="relative bg-white/80 backdrop-blur-xl rounded-xl overflow-hidden border border-blue-100/20">
                    <div className="aspect-video overflow-hidden">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                        <Calendar className="w-4 h-4" />
                        {post.date}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                        {post.title}
                      </h3>
                      <span className="text-sm text-blue-600">{post.category}</span>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
