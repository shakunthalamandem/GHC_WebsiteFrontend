import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import LAT3 from '../assets/10 Ways Technology is Shaping The Renewable Energy Industry In Australia.jfif';

const expertiseDetails: Record<
  string,
  {
    title: string;
    tagline: string;
    image: string;
    whatWeDo: string[];
    benefits: string[];
    useCase: string;
    sections: {
      title: string;
      image?: string;
      content: string;
    }[];
  }
> = {
  'ai-decision-intelligence': {
    title: 'AI-Driven Decision Intelligence',
    tagline:
      'Unlock the power of artificial intelligence to move ahead of market changes and make truly informed decisions. GoldenHills specializes in deploying advanced AI tools that continuously analyze complex datasets, revealing hidden patterns and empowering your teams to act faster with confidence.',
    image: LAT3,
    whatWeDo: [
      'Design and implement tailored machine learning and generative AI solutions.',
      'Deploy predictive analytics that identify trends and anomalies in real time.',
      'Automate the assessment of customer behaviour and portfolio dynamics.',
      'Deliver continuous improvement as AI models adapt to new data.',
    ],
    benefits: [
      'Gain early warnings.',
      'Reduce manual workload for business analysts and managers.',
      'Personalize communications and offerings to clients based on data insights.',
    ],
    useCase:
      'Investment teams often struggle to detect subtle movements in economic indicators or sentiment shifts. GHC’s AI models scan multiple data streams—news, trading activity, macroeconomic stats—to signal emerging opportunities or risks. This gives your team the edge to rebalance portfolios proactively, leading to higher returns and reduced exposure.',
    sections: [
      {
        title: 'End-to-end portfolio building and performance analysis',
        content:
          'Helps build, analyze, and optimize investment portfolios from start to finish. Provides insights into performance, risk, and asset allocation for smarter investment decisions. Targeted at retail investors, financial advisors, and portfolio managers.',
      },
      {
        title: 'Custom dashboard design for data visualization and insights',
        content:
          'Designs tailored dashboards that visualize complex data clearly and interactively. Enables faster, data-driven decisions through intuitive, insight-rich visual interfaces. Targeted for business analysts, financial professionals, product teams, and decision-makers.',
      },
      {
        title: 'Comprehensive stock screener for market analysis and insights',
        content:
          'Screens stocks using customizable filters like price, volume, ratios, and technical indicators. Enables faster, data-driven stock discovery and better-informed market decisions. Ideal for traders, retail investors, and investment analysts.',
      },
      {
        title: 'Visualize and analyze the crypto market through custom dashboards',
        content:
          'Offers custom dashboards to track, visualize, and analyze real-time crypto market data. Enables better trading decisions through clear insights into price movements, trends, and portfolio performance. Perfect for crypto traders, analysts, DeFi investors, and fintech platforms.',
      },
      {
        title: 'Forecasting market trends with predictive models for better investing',
        content:
          'Uses predictive models to forecast market trends and asset movements. Enables data-driven investment decisions, reduces uncertainty, and improves timing and strategy for traders, analysts, and fintech platforms.',
      },
      {
        title: 'Comprehensive exit return analysis to evaluate investment performance',
        content:
          'Analyzes returns at the point of investment exit to assess overall performance. Provides clarity on ROI, identifies winning strategies, and supports future investment decisions for VCs, private equity firms, and angel investors.',
      },
    ],
  },
};

const ExpertiseDetail = () => {
  const { id } = useParams();
  const expertise = expertiseDetails[id ?? ''];
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!expertise) {
    return (
      <p className="text-center mt-20 text-red-500">Expertise not found.</p>
    );
  }

  return (
    <div className="w-full h-screen snap-y snap-mandatory overflow-y-scroll scroll-smooth">
      {/* HERO SECTION */}
      <section className="h-screen snap-start relative">
        <img
          src={expertise.image}
          alt="hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 flex flex-col justify-center h-full px-12 mt-60 text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {expertise.title}
          </h1>
          <p className="text-lg md:text-xl max-w-4xl leading-relaxed">
            {expertise.tagline}
          </p>
        </div>
      </section>

      {/* WHAT WE DO SECTION */}
      <section className="h-screen snap-start px-10 py-10 flex flex-col items-center justify-center text-center bg-[#0d3257] text-white shadow-lg">
        <div className="max-w-4xl space-y-8 overflow-y-auto scrollbar-thin scrollbar-thumb-white/30 scrollbar-track-white/10 pr-4">
          <h2 className="text-4xl font-bold text-primary-foreground">
            What We Do / How We Help
          </h2>
          <ul className="list-disc list-inside text-lg space-y-2 text-blue-100 text-left mx-auto">
            {expertise.whatWeDo.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
          <h3 className="text-3xl font-semibold text-primary-foreground mt-8">
            Key Benefits
          </h3>
          <ul className="list-disc list-inside text-lg space-y-2 text-blue-100 text-left mx-auto">
            {expertise.benefits.map((benefit, index) => (
              <li key={index}>{benefit}</li>
            ))}
          </ul>
          <h3 className="text-3xl font-semibold text-primary-foreground mt-8">
            Illustrative Use Case
          </h3>
          <p className="text-lg text-blue-100 leading-relaxed">
            {expertise.useCase}
          </p>
        </div>
      </section>

      {/* DETAILED SECTION */}
      <section className="h-screen snap-start bg-gradient-to-b from-[#081a2f] to-[#0f2c4d] px-8 py-16 text-white">
        <div className="flex flex-col md:flex-row max-w-7xl mx-auto gap-10 h-full">
          {/* Sidebar */}
          <div className="md:w-1/4 space-y-4 sticky top-20 h-fit">
            {expertise.sections.map((section, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 font-medium text-sm md:text-base shadow-sm hover:bg-blue-800/60 ${
                  activeIndex === index
                    ? 'bg-blue-700 font-semibold text-white'
                    : 'bg-white/10 text-blue-100'
                }`}
              >
                {section.title}
              </button>
            ))}
          </div>

          {/* Right pane */}
          <div className="md:w-3/4 p-6 bg-white/5 rounded-2xl shadow-xl border border-white/10 overflow-y-auto scrollbar-thin scrollbar-thumb-white/30 scrollbar-track-white/10">
            <h3 className="text-2xl font-bold mb-4 border-b border-white/20 pb-2">
              {expertise.sections[activeIndex].title}
            </h3>
            <p className="text-lg text-blue-100 leading-relaxed">
              {expertise.sections[activeIndex].content}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ExpertiseDetail;
