import { Heart, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { CONTACT, DEVELOPER } from "@/lib/contact";

export const Footer = () => {
  return (
    <footer className="bg-muted border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Heart className="h-6 w-6 text-primary fill-primary" />
              <span className="text-lg font-bold bg-gradient-romantic bg-clip-text text-transparent">
                PatelsMatrimony
              </span>
            </div>
            <p className="text-sm font-medium">
              Exclusively for <strong className="text-primary">Munnuru Kapu</strong>
            </p>
            <p className="text-sm text-muted-foreground">
              Find your perfect life partner from thousands of verified Munnuru Kapu Matrimony profiles.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/search" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Search Profiles
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="font-medium text-foreground">{CONTACT.name}</li>
              <li>{CONTACT.organization}</li>
              {CONTACT.phones.map((phone) => (
                <li key={phone} className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <a
                    href={`tel:${phone.replace(/\s+/g, "")}`}
                    className="hover:text-primary transition-colors"
                  >
                    {phone}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>
            © 2026 PatelsMatrimony.com — Developed by{" "}
            <a
              href={DEVELOPER.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium"
            >
              {DEVELOPER.name}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};
