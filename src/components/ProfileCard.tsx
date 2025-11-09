import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, MapPin, Briefcase, GraduationCap } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ProfileCardProps {
  profile: {
    full_name: string;
    age?: number;
    location_city?: string;
    location_state?: string;
    education?: string;
    occupation?: string;
    profile_photo_url?: string;
    marital_status?: string;
    height_cm?: number;
  };
  onViewProfile?: () => void;
  onSendInterest?: () => void;
}

export const ProfileCard = ({ profile, onViewProfile, onSendInterest }: ProfileCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-medium transition-all duration-300 group">
      <CardContent className="p-0">
        {/* Profile Image */}
        <div className="relative h-64 bg-gradient-hero overflow-hidden">
          <Avatar className="w-full h-full rounded-none">
            <AvatarImage src={profile.profile_photo_url} alt={profile.full_name} className="object-cover" />
            <AvatarFallback className="rounded-none text-6xl bg-gradient-romantic">
              {profile.full_name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="absolute top-4 right-4">
            <Button
              size="icon"
              variant="secondary"
              className="rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
              onClick={onSendInterest}
            >
              <Heart className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Profile Details */}
        <div className="p-6 space-y-4">
          <div>
            <h3 className="text-xl font-semibold mb-1">{profile.full_name}</h3>
            <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
              {profile.age && <span>{profile.age} years</span>}
              {profile.height_cm && <span>• {profile.height_cm} cm</span>}
              {profile.marital_status && (
                <Badge variant="secondary" className="capitalize">
                  {profile.marital_status.replace("_", " ")}
                </Badge>
              )}
            </div>
          </div>

          <div className="space-y-2 text-sm text-muted-foreground">
            {(profile.location_city || profile.location_state) && (
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>
                  {profile.location_city}
                  {profile.location_state && `, ${profile.location_state}`}
                </span>
              </div>
            )}
            {profile.education && (
              <div className="flex items-start space-x-2">
                <GraduationCap className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>{profile.education}</span>
              </div>
            )}
            {profile.occupation && (
              <div className="flex items-start space-x-2">
                <Briefcase className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>{profile.occupation}</span>
              </div>
            )}
          </div>

          <Button
            className="w-full bg-gradient-romantic"
            onClick={onViewProfile}
          >
            View Full Profile
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
