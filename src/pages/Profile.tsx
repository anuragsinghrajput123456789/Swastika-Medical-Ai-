
import ProfileSettings from "@/components/ProfileSettings";

const Profile = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Your Profile</h1>
        <ProfileSettings />
      </div>
    </div>
  );
};

export default Profile;
