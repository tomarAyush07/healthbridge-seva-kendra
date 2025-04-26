
import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Calendar, User, ChevronRight } from "lucide-react";

const blogPosts = [
  {
    id: 1,
    title: "Understanding the Importance of Maternal Health in Rural India",
    excerpt: "Maternal health in rural India faces unique challenges due to limited access to healthcare facilities and skilled professionals.",
    image: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=2670&h=2000",
    date: "April 15, 2023",
    author: "Dr. Anjali Desai",
    category: "Maternal Health"
  },
  {
    id: 2,
    title: "Common Monsoon Diseases and Prevention Tips",
    excerpt: "Monsoon season in India brings relief from the summer heat but also increases the risk of various seasonal diseases that can affect communities.",
    image: "https://images.unsplash.com/photo-1493612276216-ee3925520721?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=2670&h=2000",
    date: "June 22, 2023",
    author: "Dr. Rajesh Kumar",
    category: "Seasonal Health"
  },
  {
    id: 3,
    title: "The Role of Telemedicine in Rural Healthcare",
    excerpt: "Telemedicine is revolutionizing healthcare delivery in remote areas by connecting patients with specialists regardless of geographical barriers.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=2670&h=2000",
    date: "July 5, 2023",
    author: "Dr. Meenakshi Sharma",
    category: "Technology in Healthcare"
  },
  {
    id: 4,
    title: "Nutritional Guidelines for Preventing Anemia",
    excerpt: "Anemia remains a significant health concern in India, particularly among women and children. Learn about proper nutrition to prevent it.",
    image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=2670&h=2000",
    date: "August 18, 2023",
    author: "Priya Nair, Nutritionist",
    category: "Nutrition"
  },
  {
    id: 5,
    title: "Mental Health Awareness in Rural Communities",
    excerpt: "Mental health issues often go unaddressed in rural areas due to stigma and lack of awareness. Let's change the conversation.",
    image: "https://images.unsplash.com/photo-1527137342181-19aab11a8ee8?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=2670&h=2000",
    date: "September 10, 2023",
    author: "Dr. Sanjay Verma",
    category: "Mental Health"
  },
  {
    id: 6,
    title: "Understanding Government Health Insurance Schemes",
    excerpt: "Navigate the various health insurance schemes offered by the government and understand how to make the most of these benefits.",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=2670&h=2000",
    date: "October 3, 2023",
    author: "Vikram Singh",
    category: "Health Policy"
  },
];

const categories = [
  "All Categories",
  "Maternal Health",
  "Child Health",
  "Nutrition",
  "Mental Health",
  "Seasonal Health",
  "Health Policy",
  "Technology in Healthcare",
];

const BlogPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === "All Categories" || 
                            post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="container px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center font-display">
            <span className="text-gradient">Health Blog</span>
          </h1>
          <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
            Stay informed with the latest health tips, news, and stories from our expert team of healthcare professionals.
          </p>
          
          {/* Search and filter section */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input 
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <select 
                className="border rounded-md p-2 bg-white"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Blog post grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredPosts.map((post) => (
              <div key={post.id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <img 
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-5">
                  <div className="flex justify-between items-center mb-2 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User size={14} />
                      <span>{post.author.split(',')[0]}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-2 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-medium px-3 py-1 bg-healthbridge-light text-healthbridge-blue rounded-full">
                      {post.category}
                    </span>
                    <Button variant="ghost" size="sm" className="text-healthbridge-blue hover:text-healthbridge-blue/80 p-0">
                      Read More <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Pagination */}
          <div className="flex justify-center">
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>Previous</Button>
              <Button variant="outline" size="sm" className="bg-healthbridge-blue text-white">1</Button>
              <Button variant="outline" size="sm">2</Button>
              <Button variant="outline" size="sm">3</Button>
              <Button variant="outline" size="sm">Next</Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogPage;
