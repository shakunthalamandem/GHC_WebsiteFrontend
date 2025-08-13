import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Info, ExternalLink, Shield, Lock, CheckCircle, Users } from 'lucide-react';
import isoBadge from '@/assets/iso.webp';
import isoCertificate from '@/assets/iso_certificate.jfif';

const ISO27001Section = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="w-full py-16 px-4 bg-[#cfdff3]">
      <div className="max-w-6xl mx-auto">
        {/* Main white card container */}
        <div className="bg-white rounded-2xl shadow-professional border border-border/50 overflow-hidden">
          <div className="p-8 md:p-12">
            
            {/* Two-column grid */}
            <div className="grid grid-cols-1  lg:grid-cols-2 gap-8 items-center">

              {/* Left Content */}
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                    We Are ISO 27001 Certified
                  </h2>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-5 w-5 text-professional-blue cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <p>ISO 27001 is an international standard that outlines best practices for information security management systems.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>

                <p className="text-lg text-muted-foreground leading-relaxed">
                  Our ISO 27001 certification demonstrates our commitment to maintaining the highest standards 
                  of information security, ensuring your data is protected with enterprise-grade security controls 
                  and continuous monitoring.
                </p>

                <div className="flex flex-wrap gap-3">
                  <Badge variant="secondary" className="px-4 py-2">
                    <Shield className="h-4 w-4 mr-2" />
                    Enterprise Security
                  </Badge>
                  <Badge variant="secondary" className="px-4 py-2">
                    <Lock className="h-4 w-4 mr-2" />
                    Data Protection
                  </Badge>
                  <Badge variant="secondary" className="px-4 py-2">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Compliance Ready
                  </Badge>
                </div>

                <div className="pt-4">
                  <Button 
                    onClick={() => setIsModalOpen(true)}
                    className="bg-trust-primary hover:bg-professional-blue text-white px-6 py-3 rounded-lg transition-all duration-300 shadow-card hover:shadow-elevated"
                  >
                    View Certification Details
                    <ExternalLink className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>

              {/* Right Content - Visual Elements */}
              <div className="flex flex-col sm:flex-row gap-6 items-center">

                {/* ISO Badge */}
                <Card 
                  className="p-6 cursor-pointer hover:shadow-elevated transition-all duration-300 transform hover:-translate-y-1 bg-card border-border/50 backdrop-blur-sm"
                  onClick={() => setIsModalOpen(true)}
                >
                  <div className="text-center space-y-3">
                    <img 
                      src={isoBadge} 
                      alt="ISO 27001 Certification Badge" 
                      className="w-24 h-24 mx-auto object-contain"
                    />
                    <p className="text-sm font-medium text-professional-blue">
                      Certified
                    </p>
                  </div>
                </Card>

                {/* Certificate Preview */}
                <Card 
                  className="p-4 cursor-pointer hover:shadow-elevated transition-all duration-300 transform hover:-translate-y-1 bg-card border-border/50 backdrop-blur-sm"
                  onClick={() => setIsModalOpen(true)}
                >
                  <div className="space-y-3">
                    <img 
                      src={isoCertificate} 
                      alt="ISO 27001 Certificate Preview" 
                      className="w-48 h-36 object-cover rounded-lg border border-border/50"
                    />
                    <p className="text-xs text-center text-muted-foreground">
                      Click to view details
                    </p>
                  </div>
                </Card>

              </div>

            </div> {/* End two-column grid */}

            {/* Trust Indicators - full width below the grid */}
<div className="pt-4 border-t border-gray-200 w-full">
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-3">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">Annual Audits</h3>
                  <p className="text-sm text-gray-600">Rigorous assessments ensure ongoing compliance</p>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                    <Lock className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">Data Security</h3>
                  <p className="text-sm text-gray-600">Your information is protected by industry-leading controls</p>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
                    <Users className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">Team Training</h3>
                  <p className="text-sm text-gray-600">All staff are certified in security best practices</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl bg-gray-50">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3 text-2xl">
              <img src={isoBadge} alt="ISO 27001 Badge" className="w-8 h-8" />
              ISO/IEC 27001:2022
            </DialogTitle>
            <DialogDescription>
              Information Security Management System Certification
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <img 
                  src={isoCertificate} 
                  alt="ISO 27001 Certificate" 
                  className="w-full rounded-lg border border-border/50 shadow-card"
                />
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">What is ISO 27001?</h4>
                  <p className="text-sm text-muted-foreground">
                    ISO 27001 is the international standard that describes best practices for 
                    an information security management system (ISMS). It provides a framework 
                    for managing and protecting sensitive information.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Our Commitment</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Continuous security monitoring</li>
                    <li>• Regular risk assessments</li>
                    <li>• Employee security training</li>
                    <li>• Incident response procedures</li>
                    <li>• Third-party security audits</li>
                  </ul>
                </div>

                <div className="pt-4">
                  <Badge className="bg-security-green text-white">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Annually Audited
                  </Badge>
                </div>
              </div>
            </div>
            
            <div className="border-t border-border pt-4">
              <p className="text-xs text-muted-foreground">
                Certificate Number:  ISO/IEC 27001:2022 | Valid until: December 2026 | 
                Audited by: Independent Security Auditors Ltd.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ISO27001Section;
