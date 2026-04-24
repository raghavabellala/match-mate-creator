import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ProfileCard } from "@/components/ProfileCard";
import { Heart, Search, Shield, Users, CheckCircle, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-image.jpg";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { WHATSAPP_URL } from "@/lib/contact";

const Index = () => {
  const navigate = useNavigate();
  const [featuredProfiles, setFeaturedProfiles] = useState([]);

  useEffect(() => {
    loadFeaturedProfiles();
  }, []);

  const loadFeaturedProfiles = async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("profile_status", "approved")
      .eq("is_featured", true)
      .limit(6);

    if (!error && data) {
      setFeaturedProfiles(data);
    }
  };

  const calculateAge = (dob: string) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-16 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/60" />
        </div>
        
        <div className="relative container mx-auto px-4 py-24 md:py-32">
          <div className="max-w-2xl">
            <Badge className="mb-6 bg-gradient-romantic">
              Exclusively for Munnuru Kapu Matrimony
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Find Your Perfect{" "}
              <span className="bg-gradient-romantic bg-clip-text text-transparent">
                Life Partner
              </span>
            </h1>
            <p className="text-base md:text-lg font-medium mb-3">
              Exclusively for <strong className="text-primary">Munnuru Kapu</strong> community
            </p>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of happy couples who found their soulmate through PatelsMatrimony —
              India's trusted <strong className="text-foreground">Munnuru Kapu Matrimony</strong> service.
            </p>

            {/* Quick Search */}
            <Card className="shadow-large">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="I'm looking for" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bride">Bride</SelectItem>
                      <SelectItem value="groom">Groom</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Age" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="18-25">18-25 years</SelectItem>
                      <SelectItem value="26-30">26-30 years</SelectItem>
                      <SelectItem value="31-35">31-35 years</SelectItem>
                      <SelectItem value="36-40">36-40 years</SelectItem>
                      <SelectItem value="41+">41+ years</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button className="bg-gradient-romantic" onClick={() => navigate("/search")}>
                    <Search className="mr-2 h-4 w-4" />
                    Search Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose PatelsMatrimony?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We make finding your life partner safe, simple, and successful
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto mb-4 w-16 h-16 bg-gradient-romantic rounded-full flex items-center justify-center">
                  <Shield className="h-8 w-8 text-primary-foreground" />
                </div>
                <CardTitle>100% Verified Profiles</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Every profile is manually verified by our team for authenticity and safety
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto mb-4 w-16 h-16 bg-gradient-trust rounded-full flex items-center justify-center">
                  <Users className="h-8 w-8 text-secondary-foreground" />
                </div>
                <CardTitle>Lakhs of Members</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Join our growing community of verified members from across India
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto mb-4 w-16 h-16 bg-accent rounded-full flex items-center justify-center">
                  <Heart className="h-8 w-8 text-accent-foreground" />
                </div>
                <CardTitle>Success Stories</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Thousands of couples found their perfect match through our platform
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Profiles */}
      {featuredProfiles.length > 0 && (
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Profiles</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Discover verified profiles of potential life partners
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProfiles.map((profile: any) => (
                <ProfileCard
                  key={profile.id}
                  profile={{
                    ...profile,
                    age: profile.date_of_birth ? calculateAge(profile.date_of_birth) : undefined,
                  }}
                  onViewProfile={() => navigate(`/profile/${profile.id}`)}
                  onSendInterest={() => navigate("/auth")}
                />
              ))}
            </div>

            <div className="text-center mt-12">
              <Button size="lg" onClick={() => navigate("/search")} className="bg-gradient-romantic">
                View All Profiles
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Pricing */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Choose Your Plan</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Select the perfect plan to start your journey. Contact us on WhatsApp for current pricing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Free Plan */}
            <Card>
              <CardHeader>
                <CardTitle>Free</CardTitle>
                <CardDescription className="mt-2">Perfect to get started</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>Create your profile</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>Upload 1 photo</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>Limited search</span>
                  </li>
                </ul>
                <Button className="w-full" variant="outline" asChild>
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">Contact on WhatsApp</a>
                </Button>
              </CardContent>
            </Card>

            {/* Monthly Plan */}
            <Card className="border-primary shadow-medium">
              <CardHeader>
                <Badge className="w-fit mb-2 bg-gradient-romantic">Most Popular</Badge>
                <CardTitle>Monthly</CardTitle>
                <CardDescription className="mt-2">Best for active searchers</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>Everything in Free</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>Upload up to 10 photos</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>Unlimited search & chat</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>Priority support</span>
                  </li>
                </ul>
                <Button className="w-full bg-gradient-romantic" asChild>
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">Contact on WhatsApp</a>
                </Button>
              </CardContent>
            </Card>

            {/* Yearly Plan */}
            <Card>
              <CardHeader>
                <Badge className="w-fit mb-2" variant="secondary">Best Value</Badge>
                <CardTitle>Yearly</CardTitle>
                <CardDescription className="mt-2">Premium annual plan</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>Everything in Monthly</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>Featured profile listing</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>Priority in search results</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>Dedicated support</span>
                  </li>
                </ul>
                <Button className="w-full" variant="outline" asChild>
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">Contact on WhatsApp</a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Success Stories</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Real couples, real happiness
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Priya & Raj",
                location: "Mumbai",
                text: "We found each other through PatelsMatrimony and couldn't be happier. The platform made it so easy to connect with like-minded people.",
              },
              {
                name: "Anjali & Karthik",
                location: "Bangalore",
                text: "Within 2 months of joining, we found our perfect match. The verification process gave us confidence in the profiles we were viewing.",
              },
              {
                name: "Meera & Aditya",
                location: "Delhi",
                text: "Thank you PatelsMatrimony for helping us find true love. The advanced search filters made it easy to find exactly what we were looking for.",
              },
            ].map((testimonial, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center space-x-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                  <CardDescription>{testimonial.location}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground italic">"{testimonial.text}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-romantic">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary-foreground">
            Ready to Find Your Life Partner?
          </h2>
          <p className="text-base md:text-lg text-primary-foreground/90 mb-2 font-medium">
            Exclusively for Munnuru Kapu
          </p>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Join thousands of happy members who found their soulmate
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="text-lg px-8"
            asChild
          >
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              Register for Free
            </a>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
