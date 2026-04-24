import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Users, Award, BadgeCheck } from "lucide-react";
import { FOUNDER } from "@/lib/contact";

const Highlight = ({ children }: { children: React.ReactNode }) => (
  <strong className="font-bold text-primary">{children}</strong>
);

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-3 text-center">
            About <span className="bg-gradient-romantic bg-clip-text text-transparent">PatelsMatrimony</span>
          </h1>
          <p className="text-center text-sm md:text-base font-medium text-primary mb-4">
            Exclusively for Munnuru Kapu
          </p>
          <p className="text-lg text-muted-foreground text-center mb-12">
            A trusted <Highlight>Munnuru Kapu Matrimony</Highlight> service dedicated to the community.
          </p>

          <Card className="mb-8 shadow-medium">
            <CardContent className="p-8 space-y-6 text-base md:text-lg leading-relaxed">
              <p>
                Patels Matrimony is a dedicated <Highlight>Munnuru Kapu Matrimony</Highlight> service
                exclusively for the <Highlight>Munnuru Kapu</Highlight> community. It is founded and
                managed by <strong>Sri Kola Janardhan Patel</strong>, a senior journalist in Telangana
                and the publisher of the <Highlight>Munnuru Kapu</Highlight> Magazine for over 20 years.
              </p>
              <p>
                With a strong legacy of community service, Patels Matrimony has successfully
                facilitated <strong>1000+ marriages</strong> within the{" "}
                <Highlight>Munnuru Kapu</Highlight> community.
              </p>
            </CardContent>
          </Card>

          {/* Founder Section */}
          <section className="mb-12" aria-labelledby="founder-heading">
            <h2 id="founder-heading" className="text-2xl md:text-3xl font-bold text-center mb-6">
              Meet Our Founder
            </h2>
            <Card className="shadow-medium overflow-hidden">
              <CardContent className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
                  <img
                    src={FOUNDER.photo}
                    alt={`${FOUNDER.name} — ${FOUNDER.role}`}
                    onContextMenu={(e) => e.preventDefault()}
                    draggable={false}
                    className="w-40 h-40 md:w-48 md:h-48 rounded-full object-cover border-4 border-primary/20 shadow-large select-none"
                  />
                  <div className="text-center md:text-left flex-1">
                    <h3 className="text-2xl font-bold mb-1">{FOUNDER.name}</h3>
                    <p className="text-primary font-semibold mb-3">{FOUNDER.role}</p>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                      <BadgeCheck className="h-4 w-4" />
                      {FOUNDER.label}
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      Senior journalist in Telangana and publisher of the{" "}
                      <Highlight>Munnuru Kapu</Highlight> Magazine for over 20 years —
                      committed to serving the community through trusted matrimonial connections.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <Card className="text-center">
              <CardContent className="p-6">
                <Users className="h-10 w-10 text-primary mx-auto mb-3" />
                <div className="text-2xl font-bold">1000+</div>
                <p className="text-sm text-muted-foreground">Successful Marriages</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <Award className="h-10 w-10 text-primary mx-auto mb-3" />
                <div className="text-2xl font-bold">20+ Years</div>
                <p className="text-sm text-muted-foreground">Community Service</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <Heart className="h-10 w-10 text-primary mx-auto mb-3" />
                <div className="text-2xl font-bold">Munnuru Kapu</div>
                <p className="text-sm text-muted-foreground">Community Exclusive</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
