
import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

const schemes = {
  national: [
    {
      id: 1,
      title: "Ayushman Bharat",
      description: "Health insurance coverage of ₹5 lakh per family per year for secondary and tertiary care hospitalization.",
      eligibility: "Low income and vulnerable families as per SECC database.",
      link: "#"
    },
    {
      id: 2,
      title: "PM Jan Arogya Yojana",
      description: "Provides cashless health insurance cover of up to ₹5 lakhs per family per year.",
      eligibility: "Poor and vulnerable families as per the SECC database.",
      link: "#"
    },
    {
      id: 3,
      title: "National Health Mission",
      description: "Aims to provide accessible, affordable, and quality healthcare services to the rural population.",
      eligibility: "All citizens residing in rural areas.",
      link: "#"
    }
  ],
  state: [
    {
      id: 4,
      title: "Aarogyasri (Telangana)",
      description: "Health insurance scheme to provide quality healthcare to BPL families.",
      eligibility: "Below Poverty Line families in Telangana.",
      link: "#"
    },
    {
      id: 5,
      title: "Mahatma Jyotiba Phule Jan Arogya Yojana (Maharashtra)",
      description: "Provides free medical treatment to low-income families.",
      eligibility: "Yellow and orange ration card holders in Maharashtra.",
      link: "#"
    },
    {
      id: 6,
      title: "Chief Minister's Comprehensive Health Insurance (Tamil Nadu)",
      description: "Provides coverage for hospitalization, diagnosis, and surgical procedures.",
      eligibility: "Families with annual income less than ₹72,000 in Tamil Nadu.",
      link: "#"
    }
  ],
  special: [
    {
      id: 7,
      title: "Janani Suraksha Yojana",
      description: "Cash assistance program for pregnant women to encourage institutional delivery.",
      eligibility: "Below Poverty Line pregnant women who deliver in a government health facility.",
      link: "#"
    },
    {
      id: 8,
      title: "Rashtriya Bal Swasthya Karyakram",
      description: "Child health screening and early intervention services.",
      eligibility: "All children from birth to 18 years of age.",
      link: "#"
    },
    {
      id: 9,
      title: "National Programme for Healthcare of the Elderly",
      description: "Provides dedicated healthcare facilities for senior citizens.",
      eligibility: "All senior citizens above 60 years of age.",
      link: "#"
    }
  ]
};

const SchemePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-12 px-4">
        <div className="container mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center font-display">
            <span className="text-gradient">Health Schemes</span>
          </h1>
          <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
            Explore various government health schemes available for citizens across India. 
            Find the right healthcare support for you and your family.
          </p>
          
          <Tabs defaultValue="national" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="national">National Schemes</TabsTrigger>
              <TabsTrigger value="state">State Schemes</TabsTrigger>
              <TabsTrigger value="special">Special Categories</TabsTrigger>
            </TabsList>
            
            {Object.entries(schemes).map(([category, schemeList]) => (
              <TabsContent key={category} value={category} className="space-y-6">
                {schemeList.map(scheme => (
                  <Card key={scheme.id} className="border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-healthbridge-blue">{scheme.title}</CardTitle>
                      <CardDescription>{scheme.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-healthbridge-light rounded-md p-4">
                        <p className="font-medium text-sm text-gray-700 mb-1">Eligibility:</p>
                        <p className="text-gray-600">{scheme.eligibility}</p>
                      </div>
                    </CardContent>
                    <CardFooter className="justify-end">
                      <Button variant="outline" size="sm" className="gap-2">
                        Learn More <ExternalLink className="h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SchemePage;
