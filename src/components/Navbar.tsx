import { Heart, Menu, User, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();
  const [user, setUser] = useState(null);

  // Check auth state
  supabase.auth.onAuthStateChange((event, session) => {
    setUser(session?.user ?? null);
  });

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Error",
        description: "Failed to logout",
        variant: "destructive",
      });
    } else {
      navigate("/");
      toast({
        title: "Logged out",
        description: "You have been successfully logged out",
      });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-primary fill-primary" />
            <span className="text-xl font-bold bg-gradient-romantic bg-clip-text text-transparent">
              PatelsMatrimony
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/search" className="text-foreground hover:text-primary transition-colors">
              Search
            </Link>
            <Link to="/pricing" className="text-foreground hover:text-primary transition-colors">
              Pricing
            </Link>
            <Link to="/about" className="text-foreground hover:text-primary transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-foreground hover:text-primary transition-colors">
              Contact
            </Link>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            {user ? (
              <>
                <Button variant="outline" onClick={() => navigate("/dashboard")}>
                  <User className="h-4 w-4 mr-2" />
                  Dashboard
                </Button>
                <Button variant="ghost" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" onClick={() => navigate("/auth")}>
                  Login
                </Button>
                <Button onClick={() => navigate("/auth")} className="bg-gradient-romantic">
                  Register Free
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            <Link
              to="/search"
              className="block text-foreground hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Search
            </Link>
            <Link
              to="/pricing"
              className="block text-foreground hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link
              to="/about"
              className="block text-foreground hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/contact"
              className="block text-foreground hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="pt-4 border-t border-border space-y-2">
              {user ? (
                <>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      navigate("/dashboard");
                      setMobileMenuOpen(false);
                    }}
                  >
                    Dashboard
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full"
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      navigate("/auth");
                      setMobileMenuOpen(false);
                    }}
                  >
                    Login
                  </Button>
                  <Button
                    className="w-full bg-gradient-romantic"
                    onClick={() => {
                      navigate("/auth");
                      setMobileMenuOpen(false);
                    }}
                  >
                    Register Free
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
