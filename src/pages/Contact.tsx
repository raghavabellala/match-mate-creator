import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, User, Building2 } from "lucide-react";
import { CONTACT } from "@/lib/contact";

const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            Contact <span className="bg-gradient-romantic bg-clip-text text-transparent">Us</span>
          </h1>
          <p className="text-muted-foreground text-center mb-10">
            Reach out to us directly — we're here to help.
          </p>

          <Card className="shadow-medium">
            <CardContent className="p-8 space-y-6">
              <div className="flex items-start space-x-4">
                <User className="h-6 w-6 text-primary mt-1" />
                <div>
                  <div className="text-sm text-muted-foreground">Name</div>
                  <div className="text-lg font-semibold">{CONTACT.name}</div>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Building2 className="h-6 w-6 text-primary mt-1" />
                <div>
                  <div className="text-sm text-muted-foreground">Organization</div>
                  <div className="text-lg font-semibold">{CONTACT.organization}</div>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Phone className="h-6 w-6 text-primary mt-1" />
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Phone</div>
                  <ul className="space-y-1">
                    {CONTACT.phones.map((phone) => (
                      <li key={phone}>
                        <a
                          href={`tel:${phone.replace(/\s+/g, "")}`}
                          className="text-lg font-semibold text-primary hover:underline"
                        >
                          {phone}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
