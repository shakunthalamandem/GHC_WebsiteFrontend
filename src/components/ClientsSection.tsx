import React from 'react';
import {
  Building2,
  TrendingUp,
  Briefcase,
  Globe,
  PieChart,
  Users,
  FlaskConical,
  BarChart3
} from 'lucide-react';

const CLIENTS = [
  { description: "$2+ Billion Hedge Fund", location: "Boston", icon: TrendingUp, industry: "Hedge Fund" },
  { description: "Top 5 Crypto Exchange", location: "New York City / London / Singapore", icon: Globe, industry: "Cryptocurrency" },
  { description: "$300 Million VC Fund", location: "Boston", icon: PieChart, industry: "Venture Capital" },
  { description: "Fintech Business", location: "Chicago", icon: Briefcase, industry: "Financial Technology" },
  { description: "Macro Research & Risk Management Firm", location: "Connecticut", icon: BarChart3, industry: "Risk Management" },
  { description: "Management Consulting Firm", location: "London", icon: Users, industry: "Consulting" },
  { description: "Biotech Investor Relations Firm", location: "New York City", icon: FlaskConical, industry: "Biotechnology" },
  { description: "Multi-strategy Investment Firm", location: "Hong Kong", icon: Building2, industry: "Investment Management" },
];

function ClientSection() {
  return (
    <div className="bg-[#c6c9df]">
      <section id="clients" className="py-6 px-6 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-slate-800 mb-2">
              Our Trusted<span className="text-blue-900"> Clients</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {CLIENTS.map((client, index) => {
              const IconComponent = client.icon;
              return (
                <div
                  key={index}
                  className="group relative bg-white rounded-xl p-5 shadow-sm border border-slate-200/50 
                             hover:shadow-xl hover:shadow-blue-500/30 hover:border-blue-300/30 
                             transition-all duration-500 hover:-translate-y-1 overflow-hidden"
                >
                  {/* Full background shine overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 to-purple-50/0 opacity-0 
                                  group-hover:from-blue-100/40 group-hover:to-purple-100/40 
                                  group-hover:opacity-100 transition-all duration-700" />

                  <div className="flex flex-col items-center text-center space-y-3 relative z-10">
                    <div className="p-2 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg 
                                    group-hover:from-blue-100 group-hover:to-purple-100 
                                    transition-all duration-300 shadow-sm group-hover:shadow-blue-300/40">
                      <IconComponent className="h-6 w-6 text-blue-600 group-hover:text-purple-600 transition-colors duration-300" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-bold text-slate-800 text-base leading-snug 
                                     group-hover:text-blue-700 transition-colors duration-300">
                        {client.description}
                      </h3>
                      <div className="text-xs text-slate-500 space-y-1 transition-colors duration-300 group-hover:text-slate-700">
                        <p className="font-medium">{client.location}</p>
                        <p className="text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full inline-block 
                                       group-hover:bg-blue-100 group-hover:text-blue-700 transition-colors duration-300">
                          {client.industry}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Stats Section */}
          <div className="mt-8 bg-[#1e3a8a] rounded-xl p-6 text-white">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="space-y-0.5">
                <div className="text-2xl font-bold">12+</div>
                <div className="text-blue-100 text-xs">Years of Experience</div>
              </div>
              <div className="space-y-0.5">
                <div className="text-2xl font-bold">50+</div>
                <div className="text-blue-100 text-xs">Projects</div>
              </div>
              <div className="space-y-0.5">
                <div className="text-2xl font-bold">98%</div>
                <div className="text-blue-100 text-xs">Client Satisfaction</div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}

export default ClientSection;
