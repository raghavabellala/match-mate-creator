import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Users, Award } from "lucide-react";

const Highlight = ({ children }: { children: React.ReactNode }) => (
  <strong className="font-bold text-primary">{children}</strong>
);

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
            About <span className="bg-gradient-romantic bg-clip-text text-transparent">PatelsMatrimony</span>
          </h1>
          <p className="text-lg text-muted-foreground text-center mb-12">
            A trusted matrimony service exclusively for the <Highlight>Munnuru Kapu</Highlight> community.
          </p>

          <Card className="mb-8 shadow-medium">
            <CardContent className="p-8 space-y-6 text-base md:text-lg leading-relaxed">
              <p>
                Patels Matrimony is a dedicated matrimony service exclusively for the{" "}
                <Highlight>Munnuru Kapu</Highlight> community. It is founded and managed by{" "}
                <strong>Sri Kola Janardhan Patel</strong>, a senior journalist in Telangana and the
                publisher of the <Highlight>Munnuru Kapu</Highlight> Magazine for over 20 years.
              </p>
              <p>
                With a strong legacy of community service, Patels Matrimony has successfully
                facilitated <strong>1000+ marriages</strong> within the{" "}
                <Highlight>Munnuru Kapu</Highlight> community.
              </p>
            </CardContent>
          </Card>

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
