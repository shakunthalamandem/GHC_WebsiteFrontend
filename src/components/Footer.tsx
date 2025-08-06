import { useState } from 'react';
import { MapPin, Shield, FileText, Users, X } from 'lucide-react';

const Footer = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const footerLinks = [
    {
      id: 'privacy',
      icon: Shield,
      label: 'Privacy Policy',
      content: {
        title: 'Privacy Policy',
        body: `At Golden Hills India, we are committed to protecting your privacy and ensuring the security of your personal information. This policy outlines how we collect, use, and safeguard your data.

Data Collection: We collect information you provide directly to us, such as when you contact us or request our services.

Data Usage: Your information is used solely to provide and improve our services, communicate with you, and comply with legal obligations.

Data Protection: We implement industry-standard security measures to protect your personal information from unauthorized access, disclosure, or misuse.

Third Parties: We do not sell, trade, or rent your personal information to third parties without your explicit consent.

Contact us at privacy@goldenhillsindia.com for any privacy-related questions.`,
      },
    },
    {
      id: 'terms',
      icon: FileText,
      label: 'Terms of Use',
      content: {
        title: 'Terms of Use',
        body: `Welcome to Golden Hills India. By accessing our website and services, you agree to comply with these terms and conditions.

Service Usage: Our services are provided for business purposes only. You agree to use them in accordance with applicable laws and regulations.

Intellectual Property: All content, software, and materials on our platform are protected by intellectual property rights.

Limitation of Liability: Golden Hills India shall not be liable for any indirect, incidental, or consequential damages arising from the use of our services.

Modifications: We reserve the right to modify these terms at any time. Continued use of our services constitutes acceptance of any changes.

For questions regarding these terms, contact legal@goldenhillsindia.com.`,
      },
    },
    {
      id: 'about',
      icon: Users,
      label: 'About Us',
      content: {
        title: 'About Golden Hills India',
        body: `Golden Hills India is a pioneering technology and analytics firm dedicated to empowering industries with fluid intelligence and precision.

Our Mission: To transform complex data challenges into strategic opportunities through innovative AI solutions and advanced analytics.

Our Vision: To be the global leader in intelligent business transformation, helping organizations unlock their full potential through data-driven insights.

Our Values:
• Innovation: Continuously pushing the boundaries of what's possible with AI and analytics
• Excellence: Delivering exceptional quality in every project and solution
• Integrity: Building trust through transparent and ethical business practices
• Collaboration: Working closely with clients to achieve shared success

Founded by visionary leaders with decades of experience in financial technology and data architecture, we bring together cutting-edge technology with deep industry expertise.`,
      },
    },
    {
      id: 'address',
      icon: MapPin,
      label: 'Address',
      content: {
        title: 'Our Location',
        body: `Golden Hills India
Innovation District, Tech Tower
Bangalore, Karnataka 560001
India

Phone: +91 80 4567 8900
Email: contact@goldenhillsindia.com

Business Hours:
Monday - Friday: 9:00 AM - 6:00 PM IST
Saturday: 10:00 AM - 2:00 PM IST
Sunday: Closed

For urgent inquiries outside business hours, please email us and we'll respond within 24 hours.`,
        isAddress: true,
      },
    },
  ];

  const openModal = (linkId: string) => {
    setActiveModal(linkId);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setActiveModal(null);
    document.body.style.overflow = 'unset';
  };

  const activeContent = footerLinks.find(link => link.id === activeModal)?.content;

  return (
    <>
      <footer className="relative py-24 px-6 overflow-hidden">
        {/* Liquid Gold Background */}
        <div className="absolute inset-0 liquid-gold opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Ready to Transform Your{' '}
              <span className="bg-gradient-sky-gold bg-clip-text text-transparent">
                Business?
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Let's discuss how our intelligent solutions can accelerate your growth
            </p>
          </div>

          {/* Floating Orbs Navigation */}
          <div className="flex justify-center items-center space-x-12 mb-16">
            {footerLinks.map((link, index) => (
              <button
                key={link.id}
                onClick={() => openModal(link.id)}
                className="group relative"
              >
                {/* Main Orb */}
                <div className="w-20 h-20 bg-gradient-gold-coral rounded-full flex items-center justify-center shadow-gold hover:shadow-glow transition-all duration-500 hover:scale-110 float-animation"
                     style={{ animationDelay: `${index * 0.3}s` }}>
                  <link.icon className="w-8 h-8 text-white" />
                </div>

                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-4 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                  <div className="bg-white/90 backdrop-blur-md rounded-lg px-3 py-2 shadow-elegant whitespace-nowrap">
                    <span className="text-sm font-medium text-foreground">
                      {link.label}
                    </span>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white/90 rotate-45" />
                  </div>
                </div>

                {/* Pulse Ring */}
                <div className="absolute inset-0 rounded-full border-2 border-gold/30 group-hover:scale-150 group-hover:opacity-0 transition-all duration-1000" />
              </button>
            ))}
          </div>

          {/* Company Info */}
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-sky-gold rounded-full flex items-center justify-center shadow-glow">
                <span className="text-white font-bold text-lg">GH</span>
              </div>
              <h3 className="text-2xl font-bold text-foreground">
                Golden Hills India
              </h3>
            </div>
            <p className="text-muted-foreground text-lg mb-6">
              Empowering industries with fluid intelligence and precision
            </p>
            <div className="text-sm text-muted-foreground">
              © 2024 Golden Hills India. All rights reserved.
            </div>
          </div>
        </div>
      </footer>

      {/* Modal */}
      {activeModal && activeContent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
            onClick={closeModal}
          />

          {/* Modal Content */}
          <div className="relative w-full max-w-4xl max-h-[80vh] bg-white rounded-3xl shadow-elegant animate-scale-in overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-sky-gold p-6 text-white">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold">{activeContent.title}</h2>
                <button
                  onClick={closeModal}
                  className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors duration-200"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="p-8 overflow-y-auto max-h-[60vh]">
              {activeContent.isAddress ? (
                <div className="space-y-6">
                  <div className="prose prose-lg max-w-none">
                    <div className="whitespace-pre-line text-muted-foreground leading-relaxed">
                      {activeContent.body}
                    </div>
                  </div>
                  
                  {/* Embedded Map Placeholder */}
                  <div className="w-full h-64 bg-card rounded-2xl flex items-center justify-center border-2 border-dashed border-border">
                    <div className="text-center">
                      <MapPin className="w-12 h-12 text-primary mx-auto mb-4" />
                      <p className="text-muted-foreground">Interactive Map</p>
                      <p className="text-sm text-muted-foreground">
                        Click to view location on Google Maps
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="prose prose-lg max-w-none">
                  <div className="whitespace-pre-line text-muted-foreground leading-relaxed">
                    {activeContent.body}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;