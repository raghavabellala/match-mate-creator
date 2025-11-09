import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Heart, Settings, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Session } from "@supabase/supabase-js";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      navigate("/auth");
      return;
    }

    setSession(session);
    loadProfile(session.user.id);
  };

  const loadProfile = async (userId: string) => {
    setLoading(true);
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (error) {
      console.error("Error loading profile:", error);
    } else {
      setProfile(data);
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 pt-20 pb-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">My Dashboard</h1>
              <p className="text-muted-foreground">
                Manage your profile and find your perfect match
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Sidebar */}
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-romantic rounded-full flex items-center justify-center">
                        <User className="h-6 w-6 text-primary-foreground" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">
                          {profile?.full_name || "Complete Profile"}
                        </CardTitle>
                        <CardDescription className="text-sm">
                          {session?.user?.email}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                      onClick={() => navigate("/profile/edit")}
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                      onClick={handleLogout}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Main Content */}
              <div className="lg:col-span-3">
                <Tabs defaultValue="overview" className="space-y-4">
                  <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="matches">Matches</TabsTrigger>
                    <TabsTrigger value="interests">Interests</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Profile Status</CardTitle>
                        <CardDescription>
                          Your profile verification status
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        {profile?.full_name ? (
                          <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                              <div>
                                <p className="font-medium">Profile Status</p>
                                <p className="text-sm text-muted-foreground capitalize">
                                  {profile.profile_status}
                                </p>
                              </div>
                              <div className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium capitalize">
                                {profile.profile_status}
                              </div>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                              <div>
                                <p className="font-medium">Subscription Plan</p>
                                <p className="text-sm text-muted-foreground capitalize">
                                  {profile.subscription_plan}
                                </p>
                              </div>
                              <Button
                                variant="outline"
                                onClick={() => navigate("/pricing")}
                              >
                                Upgrade
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="text-center py-8">
                            <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                            <h3 className="text-lg font-semibold mb-2">
                              Complete Your Profile
                            </h3>
                            <p className="text-muted-foreground mb-4">
                              Start your journey by creating your profile
                            </p>
                            <Button
                              className="bg-gradient-romantic"
                              onClick={() => navigate("/profile/edit")}
                            >
                              Create Profile
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="matches">
                    <Card>
                      <CardHeader>
                        <CardTitle>Your Matches</CardTitle>
                        <CardDescription>
                          Profiles that match your preferences
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="text-center py-8">
                          <p className="text-muted-foreground">
                            Complete your profile to see matches
                          </p>
                          <Button
                            variant="outline"
                            className="mt-4"
                            onClick={() => navigate("/search")}
                          >
                            Browse Profiles
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="interests">
                    <Card>
                      <CardHeader>
                        <CardTitle>Interests</CardTitle>
                        <CardDescription>
                          Profiles you've shown interest in
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="text-center py-8">
                          <p className="text-muted-foreground">
                            No interests yet
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
