import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
// import main from '../assets/10 Ways Technology is Shaping The Renewable Energy Industry In Australia.jfif';
import main from '@/assets/mainimg.png';
import main2 from '@/assets/main2.jpg';

import pic1 from '@/assets/image.png';
import pic2 from '@/assets/pic2.jpg';
import pic3 from '@/assets/pic3.jpg';
import pic4 from '@/assets/pic44.png';
import pic5 from '@/assets/pic5.jpg';
import pic6 from '@/assets/pic6.jpg';
import pic21 from '@/assets/pic21.png'
import pic22 from '@/assets/pic22.png'
import pic23 from '@/assets/pic23.jpg'
import pic24 from '@/assets/pic24.jpg'
import pic25 from '@/assets/pic25.jpg'
import main4 from '@/assets/main4.jpg'
import pic41 from '@/assets/pic41.jpg'
import pic42 from '@/assets/pic42.jpg' 
import pic43 from '@/assets/pic43.jpg'
import main5 from '@/assets/main41.jpg'


import Footer from '../Footer';
import LAT4 from '@/assets/generated-image.png'

const expertiseDetails1: Record<
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
  image: main,
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
    'Investment teams often struggle to detect subtle movements in economic indicators or sentiment shifts. GHC AI models scan multiple data streams—news, trading activity, macroeconomic stats—to signal emerging opportunities or risks. This gives your team the edge to rebalance portfolios proactively, leading to higher returns and reduced exposure.',
  sections: [
    {
      title: 'End-to-end portfolio building and performance analysis',
      image: pic1,
      content: `
        <p>Helps build, analyze, and optimize investment portfolios from start to finish. Provides insights into performance, risk, and asset allocation for smarter investment decisions. Targeted at retail investors, financial advisors, and portfolio managers.</p>
      `,
    },
    {
      title: 'Custom dashboard design for data visualization and insights',
      image: pic2,
      content: `
        <p>Designs tailored dashboards that visualize complex data clearly and interactively. Enables faster, data-driven decisions through intuitive, insight-rich visual interfaces. Targeted for business analysts, financial professionals, product teams, and decision-makers.</p>
      `,
    },
    {
      title: 'Comprehensive stock screener for market analysis and insights',
      image: pic3,
      content: `
        <p>Screens stocks using customizable filters like price, volume, ratios, and technical indicators. Enables faster, data-driven stock discovery and better-informed market decisions. Ideal for traders, retail investors, and investment analysts.</p>
      `,
    },
    {
      title: 'Visualize and analyze the crypto market through custom dashboards',
      image: pic4,
      content: `
        <p>Offers custom dashboards to track, visualize, and analyze real-time crypto market data. Enables better trading decisions through clear insights into price movements, trends, and portfolio performance. Perfect for crypto traders, analysts, DeFi investors, and fintech platforms.</p>
      `,
    },
    {
      title: 'Forecasting market trends with predictive models for better investing',
      image: pic5,
      content: `
        <p>Uses predictive models to forecast market trends and asset movements. Enables data-driven investment decisions, reduces uncertainty, and improves timing and strategy for traders, analysts, and fintech platforms.</p>
      `,
    },
    {
      title: 'Comprehensive exit return analysis to evaluate investment performance',
      image: pic6,
      content: `
        <p>Analyzes returns at the point of investment exit to assess overall performance. Provides clarity on ROI, identifies winning strategies, and supports future investment decisions for VCs, private equity firms, and angel investors.</p>
      `,
    },
  ],
},

'data-analytics': {
  title: 'Data Analytics and Engineering Solutions',
  tagline:
    'Bring data under control and drive true insight from every transaction, client interaction, and portfolio update. GoldenHills expertise lies in building the robust data infrastructure financial organizations need for clarity and compliance.',
  image: main2,
  whatWeDo: [
    'Integration of data from disparate and legacy systems into centralized cloud (or on-premises) warehouses.',
    'Automated data pipelines for continuous, error-free data ingestion.',
    'User-friendly dashboards that put curated, real-time information at your fingertips.',
    'Rigorous processes for data quality, governance, and security.',
  ],
  benefits: [
    'Empower advisors with a holistic, up-to-date view—no more reconciling scattered spreadsheets.',
    'Accelerate regulatory and client reporting with confidence in the underlying numbers.',
    'Enable self-service analytics so business users can explore data without IT bottlenecks.',
  ],
  useCase:
    'Wealth managers frequently need to combine data from various platforms to serve their clients. By consolidating these sources, GoldenHills enables firms to deliver real-time, accurate portfolio insights during client meetings, transforming trust and decision velocity.',
  sections: [
    {
      title: 'Global IPO & FO Data Tracking, Structuring, and Documentation',
      image: pic21,
      content: `
        <p>Delivers reliable, organized market intelligence for analysis, reporting, and informed investment decisions. Tracks and updates IPO & FO data from global exchanges, structures the information, and maintains accurate documentation. Intended for Investment banks, equity research teams, and financial data providers.</p>
      `,
    },
    {
      title: 'Evaluate Multifamily Opportunities with Market and Feasibility Insights',
      image: pic22,
      content: `
        <p>Enables data-driven decisions, reduces investment risk, and identifies high-potential multifamily projects. Provides preliminary market studies and feasibility analysis for development or acquisition opportunities. Intended for Real estate developers, investors, and acquisition teams in the multifamily sector.</p>
      `,
    },
    {
      title: 'Research on Market Trends, Property Performance, and Rental Comparables',
      image: pic23,
      content: `
        <p>Supports smarter acquisition decisions, maximizes returns, and identifies competitive market opportunities. Research market trends, property performance, and rental comparables for targeted investments. Intended for Apartment investors, real estate developers, and acquisition teams.</p>
      `,
    },
    {
      title: 'Building and Maintaining Robust Financial Models',
      image: pic24,
      content: `
        <p>Delivers accurate, data-driven insights to guide strategic planning and investment decisions. Builds and updates financial models to forecast performance, value assets, and evaluate scenarios. Intended for Investors, financial analysts, corporate finance teams, and business owners.</p>
      `,
    },
    {
      title: 'P&L Calculation and Revenue Tracking for OTC Options',
      image: pic25,
      content: `
        <p>Ensures accurate financial reporting, supports risk assessment, and enables informed trading decisions. Calculates and shares P&L for OTC options and updates OTC spot revenue segments in operating models. Intended for Trading desks, risk management teams, and financial controllers handling OTC derivatives.</p>
      `,
    },
  ],
},

'fintech-digital': {
  title: 'FinTech & Digital Transformation',
  tagline:
    'Modern finance moves at digital speed. GOLDENHILLS helps you leave manual, error-prone processes in the past with powerful, compliant digital solutions built for today’s regulatory and operational demands.',
  image: main,
  whatWeDo: [
    'Automation of planning, forecasting, and reconciliation workflows.',
    'Seamless digital client onboarding with KYC and secure document management.',
    'RegTech solutions for effortless, real-time compliance.',
    'Scalable transaction platforms tailored for growth.',
  ],
  benefits: [
    'Fewer errors and delays from manual intervention.',
    'Rapid response to changing rules and reporting requirements.',
    'Freed staff can focus their skills where they make the biggest impact.',
  ],
  useCase:
    'Manual reconciliation often slows financial teams down and exposes organizations to errors. GOLDENHILLS automates these processes, resulting in days saved each month and audit readiness at the push of a button.',
  sections: [
    {
      title: 'Financial Planning & Analysis (FP&A)',
      image: pic1,
      content: `
        <p>At Golden Hills, we help financial institutions modernize their FP&A capabilities, moving beyond static spreadsheets and siloed reporting into a future-ready, data-driven function.</p>
        <p>By combining deep financial expertise with advanced analytics, automation, and modern technology stacks, we deliver real-time visibility, agile forecasting, and strategic financial control.</p>
        <p>We work with banks, fintechs, asset managers, and CFO teams to unify data, streamline reporting, and generate actionable insights that support confident decision-making and long-term value creation.</p>

        <p><strong>How We Help:</strong></p>
        <ul>
          <li>Build Centralized Data Foundations Integrate financial, operational, and external data into unified models.</li>
          <li>Automate Forecasting & Budgeting Cycles Replace static spreadsheets with rolling forecasts that adapt to change.</li>
          <li>Enhance Profitability & Cost Analytics  Gain deep insights into revenue streams and cost drivers.</li>
          <li>Enable Real-Time KPI Monitoring  Deploy dashboards for instant performance tracking.</li>
          <li>Simplify Management & Board Reporting  Deliver automated, presentation-ready reports.</li>
          <li>Support Strategic Planning with Scenario Modeling Evaluate market shifts and investment strategies.</li>
        </ul>

        <p><em>Illustrative use case:</em> A leading crypto exchange engaged Golden Hills to upgrade its FP&A capabilities amid rapid growth and data fragmentation. We unified financial and trading data, automated rolling forecasts, and built real-time dashboards, resulting in 60% faster planning cycles and sharper financial control.</p>
      `,
    },
    {
      title: 'Data Management & Accounting',
      image: main,
      content: `
        <p>At Golden Hills, we help businesses strengthen their financial foundation through intelligent data management and modern accounting practices. Our solutions reduce manual effort, increase accuracy, and ensure that every financial process—from payments to reporting—is efficient, compliant, and built for scale.</p>

        <p><strong>How We Help:</strong></p>
        <ul>
          <li>Strengthen Core Finance Processes  Automate payables, payroll, and ledger management.</li>
          <li>Enhance Data Accuracy & Integrity  Ensure clean and reliable financial data.</li>
          <li>Improve Cash Visibility & Control  Real-time tracking of cash position.</li>
          <li>Simplify Multi-Entity Accounting  Seamless intercompany transactions and consolidated reporting.</li>
          <li>Accelerate Period-End Close  Shorten month-end timelines with automation.</li>
          <li>Ensure Compliance & Audit Readiness  Build audit-ready processes with embedded controls.</li>
        </ul>

        <p><em>Illustrative use case:</em> A scaling enterprise enhanced core finance operations with Golden Hills. Automated workflows improved accuracy and reduced manual intervention, delivering real-time cash visibility and a fully audit-ready finance function with a 50% reduction in close timelines.</p>
      `,
    },
    {
      title: 'Virtual CFO Services',
      image: main,
      content: `
        <p>At Golden Hills, we provide virtual CFO support tailored for businesses that need strategic financial leadership without a full in-house team. Our experts help you scale sustainably, manage complexity, and meet compliance and investor expectations.</p>

        <p><strong>How We Help:</strong></p>
        <ul>
          <li>Guide Tech-Integrated Finance Operations  Modernize processes and integrate systems.</li>
          <li>Strengthen Cash Flow & Forecasting  Optimize working capital and funding strategies.</li>
          <li>Ensure Compliance & Audit Preparedness  Maintain disciplined controls and accurate documentation.</li>
          <li>Streamline Multi-Entity Operations  Consistent reporting across jurisdictions.</li>
          <li>Deliver Clear, Actionable Financial Reporting  Timely, investor-ready reports.</li>
          <li>Drive Strategic Planning & KPI Monitoring Robust budgeting and performance reviews.</li>
        </ul>

        <p><em>Illustrative use case:</em> A digital asset platform expanding across jurisdictions relies on Golden Hills’s Virtual CFO support for real-time cash flow forecasting, cross-border operations management, and investor-grade reporting, ensuring compliance and strategic financial oversight during rapid growth.</p>
      `,
    },
  ],
},
'software-web': {
  title: 'Custom Software and Web Application Development',
  tagline:
    'We design, build, and maintain tailored software and web-based solutions that fit your business needs perfectly—far beyond what off-the-shelf tools can deliver.',
  image: main4,
  whatWeDo: [
    'Web Based Tools',
    'Hosted Web Based Applications',
    'Custom Technology Platforms',
  ],
  benefits: [
    'Perfectly aligned with business goals and existing systems.',
    'Improved efficiency and automation of manual tasks.',
    'Enhanced security and long-term scalability.',
  ],
  useCase:
    'Our service supports businesses of all sizes—especially those with unique needs that generic software cannot address. From planning and interface design to building, testing, and launching, we deliver solutions that digitize processes, create new platforms, and integrate seamlessly. Clients also benefit from ongoing support, ensuring efficiency and growth over time.',
  sections: [
    {
      title: 'Web Based Tools',
      image: pic41,
      content: `
        <p>Online applications accessible via browser, tailored for investment operations and client interactions.</p>
        <p><strong>Use Cases:</strong></p>
        <ul>
          <li>Portfolio Analysis Dashboards – Enable portfolio managers and clients to visualize real-time performance, sector allocation, risk metrics, and benchmarks.</li>
          <li>Investment Simulation Tools – Let clients or advisors model investment strategies and potential outcomes under different scenarios.</li>
        </ul>
        <p><strong>Benefits:</strong></p>
        <ul>
          <li>On-demand access by both staff and clients.</li>
          <li>Accurate, up-to-date analytics for decisions.</li>
          <li>Streamlines compliance and reporting processes.</li>
        </ul>
      `,
    },
    {
      title: 'Hosted Web Based Applications',
      image: pic42,
      content: `
        <p>Comprehensive, cloud-based investment management solutions that users access securely online.</p>
        <p><strong>Use Cases:</strong></p>
        <ul>
          <li>Investor Portals – Secure platforms where investors can track holdings, submit service requests, access documents, receive announcements, and initiate transactions.</li>
          <li>Deal Pipeline Management – For private equity/venture firms, track deal sourcing, due diligence, notes, and deal status collaboratively across teams.</li>
        </ul>
        <p><strong>Benefits:</strong></p>
        <ul>
          <li>High security for sensitive financial data.</li>
          <li>Scalable for growing client bases or assets under management.</li>
          <li>Reduces manual work for back office; improves client satisfaction.</li>
        </ul>
      `,
    },
    {
      title: 'Custom Technology Platforms',
      image: pic43,
      content: `
        <p>End-to-end digital ecosystems built for complex, multi-faceted investment business needs.</p>
        <p><strong>Use Cases:</strong></p>
        <ul>
          <li>Automated Trading Platforms – Enable algorithmic or rules-based trading across multiple asset classes with audit logging and compliance monitoring.</li>
          <li>Alternative Investment Platforms – Manage investor subscriptions, NAV calculations, capital calls/distributions, and waterfall reporting for private equity or hedge funds.</li>
        </ul>
        <p><strong>Benefits:</strong></p>
        <ul>
          <li>Entirely customizable features and integrations (data feeds, custodians, CRM, etc.).</li>
          <li>Reduces operational and compliance risks.</li>
          <li>Enables service innovation and a competitive edge.</li>
        </ul>
      `,
    },
  ],
},

'cloud-deployment': {
  title: 'Cloud Computing and Deployment',
  tagline:
    'Financial organizations need rock-solid, flexible infrastructure to stay secure and competitive. Goldenhills guides every step of your cloud transformation, enhancing agility while maintaining compliance. It enables businesses to deploy websites efficiently, scale resources dynamically based on demand, and access advanced computing power and tools without heavy upfront investments in hardware.',
  image: main,
  whatWeDo: [
    'Provide scalable cloud infrastructure tailored for financial services.',
    'Support rapid deployment and updates of websites and applications.',
    'Enable cost-efficient pay-as-you-go resource management.',
    'Enhance security with robust cloud protocols and continuous updates.',
    'Facilitate remote collaboration and integrated development workflows.',
  ],
  benefits: [
    'Scalability: Automatically adjust resources to match website traffic demands.',
    'Cost Efficiency: Pay-as-you-go model reduces the need for large upfront IT investments.',
    'Faster Deployment: Quick setup and update cycles accelerate time to market for websites.',
    'Global Accessibility: Hosting on international data centers improves load times worldwide.',
    'Enhanced Security: Advanced protection against cyber threats and continuous updates.',
    'Collaboration: Enables remote teams to work simultaneously on website projects.',
    'Disaster Recovery: Data backups and redundancy safeguard against data loss and downtime.',
    'Flexibility: Supports integration with various development tools and platforms.',
  ],
  useCase:
'Cloud platforms provide flexible, scalable infrastructure that handles traffic spikes smoothly, reduces costs by paying for only used resources, improves global user experience, ensures security against cyber threats, and accelerates design and deployment through integrated collaboration tools.  ',
sections: [
    {
      title: 'Scalability & Cost Efficiency',
      image: pic1,
      content: `
        <p>Automatically adjust computing resources to match website traffic demands with a pay-as-you-go pricing model. This approach reduces upfront IT costs and ensures your infrastructure scales seamlessly to support business growth.</p>
      `,
    },
    {
      title: 'Security & Disaster Recovery',
      content: `
        <p>Robust cloud security protocols, including encryption and multi-factor authentication, protect your web applications from cyber threats.</p>
        <p>Automated backups and redundancy provide disaster recovery, safeguarding your data and ensuring reliable uptime.</p>
      `,
    },
    {
      title: 'Collaboration & Flexibility',
      content: `
        <p>Cloud computing supports collaboration among remote development teams with integrated tools, enabling simultaneous work on projects.</p>
        <p>It also offers flexibility by integrating with various development platforms and tools, speeding up deployment and update cycles.</p>
      `,
    },
  ],
},

'risk-analytics': {
  title: 'Risk Analytics and Portfolio Optimization',
  tagline:
    'Anticipate threats and optimize returns with quantitative rigor. GoldenHills crafts risk and portfolio solutions giving you clarity even in unpredictable markets.',
  image: main5,
  whatWeDo: [
    'Real-time dashboards to monitor risk and stress-test allocations.',
    'Sophisticated portfolio optimization engines to balance risk and reward.',
    'Tools for regulatory compliance and automated checks.',
    'Detailed risk and exposure reporting for all stakeholders.',
  ],
  benefits: [
    'Prevent costly surprises through continuous oversight.',
    'Optimize portfolios to better weather volatilities and meet objectives.',
    'Empower compliance teams to stay a step ahead of new regulations.',
  ],
  useCase:
    'Facing growing market volatility, an investment firm works with GoldenHills to adopt live risk analytics and automatic stress testing, making confident allocation decisions no matter the market environment.',
  sections: [
    {
      title: 'Real-Time Risk Monitoring and Reporting',
      image: pic1,
      content: `
        <p>Continuously monitor and evaluate portfolio exposures, market risks, and compliance constraints through automated, real-time dashboards. This delivers up-to-the-minute visibility into critical risk metrics such as Value at Risk (VaR), sector concentration, and stress scenarios—enabling timely, informed responses.</p>
        <p>Targeted at portfolio managers, risk officers, compliance teams, and asset management firms.</p>
      `,
    },
    {
      title: 'Scenario Analysis & Stress Testing',
      content: `
        <p>Simulate market shocks, regulatory shifts, and macroeconomic events to proactively assess portfolio resilience. This tool provides actionable insights for pre-emptive adjustments, targeting institutional investors, risk managers, and investment committees.</p>
      `,
    },
    {
      title: 'Portfolio Optimization Engine',
      content: `
        <p>Optimize asset allocation using advanced quantitative models balancing return objectives, risk tolerances, and regulatory requirements. Tailors portfolio rebalancing strategies to market dynamics, aimed at asset managers, financial advisors, and private wealth offices.</p>
      `,
    },
    {
      title: 'Automated Regulatory Risk & Compliance Checks',
      content: `
        <p>Automatically map portfolios against regulatory standards—including capital adequacy, liquidity, and exposure thresholds—to catch potential breaches and generate audit-ready reports. Targeted at compliance teams, audit professionals, and regulatory reporting departments.</p>
      `,
    },
    {
      title: 'Custom Risk Analytics for Strategy Development',
      content: `
        <p>Leverage customized analytics like factor modeling, risk attribution, and downside quantification to shape differentiated investment strategies aligned with mandates. Designed for quantitative research teams, investment strategists, and senior decision-makers.</p>
      `,
    },
    {
      title: 'Exposure Reporting & Transparency Tools',
      content: `
        <p>Deliver clear, detailed visual reports on exposures, sector weights, counterparty risk, and concentration limits to enhance transparency and trust for investor relations teams, institutional clients, and board members.</p>
      `,
    },
  ],
},

'business-intel': {
  title: 'Business Intelligence and Visualization',
  tagline:
    'Transform your raw data into stories that drive performance. GOLDENHILLS’s business intelligence solutions make it easy to see where you stand and where you should go next.',
  image: main,
  whatWeDo: [
    'Custom dashboards that provide both real-time overview and drill-down exploration.',
    'Visualizations simplifying complex metrics for quick decision-making.',
    'Reporting solutions crafted for executives, compliance teams, and field personnel.',
    'Accessible interfaces—via desktop and mobile—that work wherever your team is.',
  ],
  benefits: [
    'Rapidly identify top performers and areas needing attention.',
    'Empower teams to make better decisions with less delay.',
    'Communicate results and strategies more effectively internally and externally.',
  ],
  useCase:
    'A financial services firm with many branches needs to see which regions are thriving. GOLDENHILLS’s dashboards enable leadership to act on data rather than intuition, targeting underperformance and replicating success stories.',
  sections: [
    {
      title: 'Visualization Insights and Dashboards',
      image: pic1,
      content: `
        <p>Unified Dashboards That Drive Real-Time Clarity and Operational Confidence</p>

        <p>At Golden Hills, we help organizations transform raw data into clear, actionable intelligence through dynamic, real-time dashboards. Our business intelligence solutions are designed to give internal teams the visibility they need to operate with confidence, accuracy, and agility across time zones, shifts, and business functions.</p>

        <p>By aligning dashboard design with your key performance indicators (KPIs) and operational goals, we enable faster decision-making, better risk oversight, and improved continuity across teams.</p>

        <p><strong>How we Help</strong></p>
        <ul>
          <li><strong>Custom-built dashboards aligned to business KPIs:</strong> Dashboards are tailored to track key metrics like entity-level assets, liabilities, and liquidity. Designed with your internal objectives in mind, they provide clarity for strategic and daily decision-making.</li>
          <li><strong>Real-time performance tracking for faster decision-making:</strong> Get up-to-date visibility into key metrics through live dashboards that reflect ongoing business activity. This helps teams make quick, informed decisions based on the latest available data.</li>
          <li><strong>Alerts and trends to monitor operational risks and opportunities:</strong> Automated alerts flag inconsistencies, gaps, or trends across data points like pricing, balances, or reports.</li>
        </ul>

        <p><strong>Illustrative Use Case:</strong> A multi-entity trading firm struggled with fragmented visibility across geographies and products. Golden Hills delivered custom dashboards showing real-time liquidity, asset exposure, and profitability by desk. Automated alerts flagged anomalies instantly—enabling the firm’s finance and ops teams to respond swiftly, reduce risk, and make decisions with confidence.</p>
      `,
    },
    {
      title: 'Visualization Tools',
      image: pic1,
      content: `
        <p>Powerful Data Infrastructure and Custom Visuals Built for Scalable Decision Intelligence</p>

        <p>At Golden Hills, we build robust visualization systems that go far beyond standard BI tools. Our solutions are interactive, customized, and designed to turn complex data into meaningful, real-time insights that empower teams to act with clarity and speed.</p>

        <p><strong>How we Help</strong></p>
        <ul>
          <li><strong>Dashboard & BI Platforms:</strong> We go beyond tools like Tableau and FactSet—delivering intuitive, web-based dashboards that are fully customized, interactive, and aligned with your decision-making needs.</li>
          <li><strong>Data Processing & Scripting:</strong> Using Excel Power Query, Python (Pandas, Dash), and SQL, we handle data wrangling, transformation, and backend logic with precision, scalability, and transparency.</li>
          <li><strong>Automation & Integration Tools:</strong> We leverage Python, Selenium, and UiPath to automate repetitive workflows and integrate seamlessly with APIs and cloud databases—creating end-to-end data pipelines.</li>
          <li><strong>Cloud & Database Support:</strong> Our team supports scalable, real-time architecture using PostgreSQL and Microsoft SQL Server to manage large datasets and keep dashboards current and reliable.</li>
          <li><strong>Custom Visual Libraries:</strong> When off-the-shelf charts aren't enough, we build bespoke visualizations using MUI, Chart.js, and Highcharts—ensuring every dashboard delivers insight and impact.</li>
        </ul>
      `,
    },
  ],
},

'quant-research': {
  title: 'Custom Quantitative Research & Financial Modelling',
  tagline:
    'Power your investment and transaction decisions with rock-solid analysis. GoldenHills designs and delivers models and research suited to your most complex and high-value questions.',
  image: main,
  whatWeDo: [
    'Robust company, deal, and asset valuation models, including cross-border and multi-currency scenarios.',
    'Scenario-based financial forecasts for planning across best- and worst-case situations.',
    'Automated deal tracking for capital markets and private transactions.',
    'Interactive tools equipped with clear documentation for your team’s use.',
  ],
  benefits: [
    'Make high-stakes decisions supported by transparent, thorough analytics.',
    'Present defensible, data-driven valuations to investors and stakeholders.',
    'Understand and mitigate risks unique to acquisitions, mergers, or new market entries.',
  ],
  useCase:
    'A private equity client preparing for a transnational acquisition uses GoldenHills’s custom modelling—factoring in multiple currencies and future market risks—to negotiate with confidence and achieve a fair, evidence-based investment valuation.',
  sections: [
    {
      title: 'Bespoke Financial Valuation Models',
      image: pic1,
      content: `
        <p>Develop robust valuation frameworks for companies, assets, or projects using tailored methodologies, including discounted cash flow, market comparables, and precedent transactions. These models enable accurate, defensible decisions for acquisitions, investments, or funding rounds, targeted at investment teams, private equity firms, and corporate finance professionals.</p>
      `,
    },
    {
      title: 'Scenario-Based Financial Forecasting',
      content: `
        <p>Build dynamic forecasts that stress-test business plans and evaluate future financial performance under various market, macroeconomic, or regulatory scenarios. This approach helps anticipate risks, assess upside potential, and plan with greater confidence, targeted at CFOs, corporate strategists, and portfolio managers.</p>
      `,
    },
    {
      title: 'Equity Capital Market Deal Tracking & Analytics',
      content: `
        <p>Track, analyze, and visualize capital market transactions—such as IPOs, secondary offerings, or private placements—through bespoke deal-tracking tools. This comprehensive view of market activity supports more agile opportunity sourcing and due diligence, targeted at corporate development teams, investment bankers, and institutional investors.</p>
      `,
    },
    {
      title: 'Performance Attribution Modelling',
      content: `
        <p>Develop analytical models that break down portfolio or investment performance into its key drivers—such as sector allocation, security selection, timing, and currency effects. This approach helps organizations clearly understand what’s adding value (or detracting from it) at every level, targeted at asset managers, performance analysts, and investment consultants.</p>
      `,
    },
    {
      title: 'Deal Structuring and Waterfall Analysis',
      content: `
        <p>Create detailed financial models that map out complex deal structures, funding rounds, and cash flow waterfalls. These models clarify how proceeds and profits are distributed across various classes, investors, and stakeholders under different scenarios, targeted at private equity teams, fund managers, and legal advisors involved in transaction structuring.</p>
      `,
    },
    {
      title: 'Real-Time KPI and Benchmark Tracking Models',
      content: `
        <p>Build real-time tracking systems for critical financial and operational KPIs, benchmarking performance against industry standards or peer groups. This enables timely course correction and opportunity spotting, targeted at CFOs, operational teams, and executive leadership.</p>
      `,
    },
  ],
},


};

const Section1 = () => {
  const { id } = useParams();
  const expertise = expertiseDetails1[id ?? ''];
  const navigate = useNavigate();  // <--- Add this

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
      {/* BACK BUTTON */}
      <div className="fixed top-4 left-4 z-50 cursor-pointer text-white bg-black/50 rounded-full p-2 hover:bg-black transition">
        <button
          onClick={() => navigate(-1)}
          aria-label="Go back"
          className="flex items-center space-x-2 text-lg font-semibold"
        >
          <span className="text-2xl">{'←'}</span>
          <span className="hidden sm:inline">Back</span>
        </button>
      </div>
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
      <section className="h-screen snap-start px-10 py-10 flex flex-col items-center justify-center text-center bg-[#a0c1bd] text-white shadow-lg">
        <div className="max-w-4xl space-y-8 overflow-y-auto scrollbar-thin scrollbar-thumb-white/30 scrollbar-track-white/10 pr-4">
          <h2 className="text-4xl font-bold text-[#030943]">
    What We Deliver
          </h2>
          <ul className="list-disc list-inside text-lg space-y-2 text-black text-left mx-auto">
            {expertise.whatWeDo.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
          <h3 className="text-3xl font-semibold text-[#030943] mt-8">
            Key Benefits
          </h3>
          <ul className="list-disc list-inside text-lg space-y-2 text-black text-left mx-auto">
            {expertise.benefits.map((benefit, index) => (
              <li key={index}>{benefit}</li>
            ))}
          </ul>
          <h3 className="text-3xl font-semibold text-[#030943] mt-8">
            Illustrative Use Case
          </h3>
          <p className="text-lg text-black leading-relaxed">
            {expertise.useCase}
          </p>
        </div>
      </section>

      {/* DETAILED SECTION */}
      {/* DETAILED SECTION */}
      <section className="h-screen snap-start bg-gradient-to-b from-[#c8cce1] via-[#a0c1bd] to-[#c8cce1] px-8 py-16 text-black">
        <div className="max-w-7xl mx-auto bg-white/20 rounded-2xl shadow-2xl border border-white/30 p-8 flex flex-col md:flex-row gap-10 items-start">

          {/* Sidebar */}
          <div className="md:w-1/4 space-y-4">
            {expertise.sections.map((section, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-full text-left px-4 py-3 rounded-lg font-medium text-sm md:text-base shadow-md transition-all duration-300 transform
    ${activeIndex === index
                    ? ' border-l-4 border-b-4 border-purple-400 scale-105 shadow-lg font-semibold'
                    : 'bg-white/40 border-l-4 border-b-4 border-transparent hover:border-purple-400 hover:shadow-lg hover:scale-105'
                  }`}
              >
                {section.title}
              </button>

            ))}
          </div>

          {/* Right pane */}
          <div className="md:w-3/4 flex justify-center items-start">
            <div className="max-w-4xl h-[650px] w-full p-8 bg-blue/80 rounded-2xl shadow-2xl border border-white/50 overflow-y-auto scrollbar-thin scrollbar-thumb-purple-400/40 scrollbar-track-transparent">

              <h3 className="text-2xl font-bold mb-6 border-b border-black-300 pb-3">
                {expertise.sections[activeIndex].title}
              </h3>

              <div className="flex flex-col md:flex-row gap-6">


                {/* Text Section */}
<div
  className="text-lg leading-relaxed text-gray-800"
  dangerouslySetInnerHTML={{ __html: expertise.sections[activeIndex].content }}
/>

                                {/* Image Section */}
                <div className="flex-shrink-0 md:w-1/3">
                  <img
                    src={expertise.sections[activeIndex].image}
                    alt={expertise.sections[activeIndex].title}
                    className="w-full h-auto rounded-lg shadow-md object-cover"
                  />
                </div>
              </div>

            </div>
          </div>


        </div>
      </section>

      {/* FOOTER SECTION */}
      <section className="snap-start ">
        <Footer />
      </section>

    </div>

  );
};

export default Section1;
