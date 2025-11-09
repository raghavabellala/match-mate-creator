import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search as SearchIcon, SlidersHorizontal } from "lucide-react";
import { ProfileCard } from "@/components/ProfileCard";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Search = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    loadProfiles();
  }, []);

  const loadProfiles = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("profile_status", "approved")
      .limit(12);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to load profiles",
        variant: "destructive",
      });
    } else {
      setProfiles(data || []);
    }
    setLoading(false);
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
      
      <div className="flex-1 pt-20 pb-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Search Profiles</h1>
            <p className="text-muted-foreground">
              Find your perfect match from thousands of verified profiles
            </p>
          </div>

          {/* Search and Filters */}
          <Card className="mb-8 shadow-soft">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <Input
                      placeholder="Search by name, location, profession..."
                      className="w-full"
                    />
                  </div>
                  <Button className="bg-gradient-romantic">
                    <SearchIcon className="h-4 w-4 mr-2" />
                    Search
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                </div>

                {showFilters && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
                    <div className="space-y-2">
                      <Label>Gender</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Age Range</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select age" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="18-25">18-25 years</SelectItem>
                          <SelectItem value="26-30">26-30 years</SelectItem>
                          <SelectItem value="31-35">31-35 years</SelectItem>
                          <SelectItem value="36-40">36-40 years</SelectItem>
                          <SelectItem value="41+">41+ years</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Religion</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select religion" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hindu">Hindu</SelectItem>
                          <SelectItem value="muslim">Muslim</SelectItem>
                          <SelectItem value="christian">Christian</SelectItem>
                          <SelectItem value="sikh">Sikh</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Marital Status</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="never_married">Never Married</SelectItem>
                          <SelectItem value="divorced">Divorced</SelectItem>
                          <SelectItem value="widowed">Widowed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Location</Label>
                      <Input placeholder="City, State" />
                    </div>

                    <div className="space-y-2">
                      <Label>Education</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select education" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bachelors">Bachelor's Degree</SelectItem>
                          <SelectItem value="masters">Master's Degree</SelectItem>
                          <SelectItem value="doctorate">Doctorate</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-muted-foreground">Loading profiles...</p>
            </div>
          ) : profiles.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No profiles found</p>
            </div>
          ) : (
            <>
              <div className="mb-4 text-sm text-muted-foreground">
                Found {profiles.length} profiles
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {profiles.map((profile: any) => (
                  <ProfileCard
                    key={profile.id}
                    profile={{
                      ...profile,
                      age: profile.date_of_birth ? calculateAge(profile.date_of_birth) : undefined,
                    }}
                    onViewProfile={() => navigate(`/profile/${profile.id}`)}
                    onSendInterest={() => {
                      toast({
                        title: "Please login",
                        description: "You need to be logged in to send interest",
                      });
                      navigate("/auth");
                    }}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Search;
