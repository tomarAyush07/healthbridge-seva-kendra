import { useLanguage } from "@/context/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  Search, ArrowRight, Calendar, Clock, User, Tag,
  Brain, Heart, Dna, Microscope, Activity, Globe
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Blog = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

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

  const handlePostClick = (postId: number) => {
    navigate(`/blog/${postId}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-100 via-blue-50 to-slate-100">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              Healthcare Insights
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Explore the latest breakthroughs and innovations in healthcare technology
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
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
            </div>
          </div>

          {/* Categories */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-16">
            {blogCategories.map((category) => (
              <div key={category.name} className="group relative">
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} rounded-xl opacity-20`} />
                <div className="relative bg-white/80 rounded-xl p-4 border border-blue-100/20">
                  <category.icon className="w-8 h-8 mb-2 text-gray-800" />
                  <h3 className="text-gray-800 font-semibold">{category.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Posts */}
        <section>
          <div className="container px-4">
            <h2 className="text-4xl font-bold mb-12 text-gray-800">Featured Articles</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredPosts.map((post) => (
                <article 
                  key={post.id} 
                  className="group relative cursor-pointer"
                  onClick={() => handlePostClick(post.id)}
                >
                  <div className="relative bg-white/80 rounded-2xl overflow-hidden border border-blue-100/20">
                    <div className="aspect-[16/10] overflow-hidden">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-full object-cover"
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
                      <h3 className="text-xl font-bold text-gray-800 mb-2">
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
                        className="text-blue-600 hover:text-blue-700"
                      >
                        Read More 
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Recent Posts */}
        <section>
          <div className="container px-4">
            <h2 className="text-4xl font-bold mb-12 text-gray-800">Recent Posts</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentPosts.map((post) => (
                <article 
                  key={post.id} 
                  className="group relative cursor-pointer"
                  onClick={() => handlePostClick(post.id)}
                >
                  <div className="relative bg-white/80 rounded-xl overflow-hidden border border-blue-100/20">
                    <div className="aspect-video overflow-hidden">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                        <Calendar className="w-4 h-4" />
                        {post.date}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {post.title}
                      </h3>
                      <span className="text-sm text-blue-600">{post.category}</span>
                    </div>
                  </div>
                </article>
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
