import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AIPromptSection from '@/components/AIPromptSection';
import VideoShowcase from '@/components/VideoShowcase';
import ExpertiseSection from '@/components/ExpertiseSection';
import ClientsSection from '@/components/ClientsSection';
import FoundersSection from '@/components/FoundersSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <AIPromptSection />
      <VideoShowcase />
      <ExpertiseSection />
      <ClientsSection />
      <FoundersSection />
      <Footer />
    </div>
  );
};

export default Index;
