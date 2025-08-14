import { useEffect, useRef, useState } from 'react';
import { Linkedin } from 'lucide-react';
import suresh from '@/assets/suresh.jfif';
import teamPhoto1 from '@/assets/IMG-20250808-WA0035.jpg';
import teamPhoto2 from '@/assets/IMG-20250213-WA0155.jpg';
import teamPhoto3 from '@/assets/IMG-20250812-WA0060.jpg';
import teamphoto4 from '@/assets/IMG-20250812-WA0072.jpg';
import teamphoto5 from '@/assets/IMG-20250812-WA0073.jpg';
import teamphoto6 from '@/assets/IMG-20250812-WA0081.jpg';
import teamphoto7 from '@/assets/IMG-20250812-WA0082.jpg';

const founders = [
  {
    name: 'Suresh Raju',
    title: 'Founder & Director',
    description:
      'Suresh Raju, Founder of Golden Hills, has 15+ years of experience in investment management, capital markets, and corporate finance. He has worked with TVS Capital, Deutsche Bank (US), and ABAQUS, and is a member of IAN and TiE. Suresh holds an MBA from Chicago Booth, an M.S. from Ohio State, and a B.Tech from IIT Madras.',
    image: suresh,
    linkedin: 'https://www.linkedin.com/in/tsureshraju/',
    gradient: 'from-primary to-black',
  },
];

const teamPhotos = [
  teamPhoto1,
  teamPhoto2,
  teamPhoto3,
  teamphoto4,
  teamphoto5,
  teamphoto6,
  teamphoto7,
];

export default function FoundersSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Duplicate photos for seamless looping
  const extendedPhotos = [...teamPhotos, ...teamPhotos];
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Infinite scrolling effect
  useEffect(() => {
    const scrollStep = 1; // pixels per frame
    const delay = 16; // ~60fps

    const scrollContainer = carouselRef.current;
    if (!scrollContainer) return;

    let scrollX = 0;
    const totalScrollWidth = teamPhotos.length * 360; // one full set width

    const tick = () => {
      scrollX += scrollStep;
      if (scrollX >= totalScrollWidth) {
        scrollX = 0; // reset without visible jump
      }
      scrollContainer.style.transform = `translateX(-${scrollX}px)`;
    };

    const interval = setInterval(tick, delay);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 px-6 relative overflow-hidden bg-gradient-to-br from-background via-card/30 to-background"
    >
      {/* Light streams */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className={`absolute left-1/4 top-0 w-2 h-full bg-gradient-to-b from-gold via-gold/50 to-transparent transition-all duration-2000 ${
            isVisible ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'
          }`}
          style={{ transformOrigin: 'top' }}
        />
        <div
          className={`absolute right-1/4 top-0 w-2 h-full bg-gradient-to-b from-primary via-primary/50 to-transparent transition-all duration-2000 delay-500 ${
            isVisible ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'
          }`}
          style={{ transformOrigin: 'top' }}
        />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Title */}
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold text-foreground mb-6">
            Meet Our <span className="text-blue-900">Team</span>
          </h2>
        </div>

        {/* Founder Card */}
        {founders.map((founder) => (
          <div
            key={founder.name}
            className={`flex flex-col md:flex-row bg-white bg-opacity-70 backdrop-blur-md rounded-3xl shadow-lg overflow-hidden mb-16 transition-all duration-1000 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
            style={{ minHeight: '280px' }}
          >
            <div
              className={`md:w-1/3 flex flex-col items-center justify-center p-8 text-white bg-gradient-to-br ${founder.gradient}`}
            >
              <div className="w-36 h-36 rounded-2xl overflow-hidden shadow-lg mb-6">
                <img
                  src={founder.image}
                  alt={founder.name}
                  className="object-cover w-full h-full"
                />
              </div>
              <h3 className="text-2xl font-bold">{founder.name}</h3>
              <p className="text-lg mt-1">{founder.title}</p>
              <a
                href={founder.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center space-x-2 text-white hover:text-gray-200 transition"
              >
                <Linkedin className="w-6 h-6" />
                <span className="underline">LinkedIn</span>
              </a>
            </div>
            <div className="md:w-2/3 p-8 flex items-center text-gray-900 leading-relaxed text-lg">
              <p>{founder.description}</p>
            </div>
          </div>
        ))}

        {/* Team Carousel */}
        <div
          className={`space-y-6 transition-all duration-1000 ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-2xl font-bold text-center text-gray-900">
            Team Members
          </h2>
          <div className="relative max-w-[1000px] mx-auto overflow-hidden rounded-2xl shadow-lg">
            <div
              ref={carouselRef}
              className="flex transition-none"
              style={{
                width: `${extendedPhotos.length * 360}px`,
                transform: 'translateX(0)',
              }}
            >
              {extendedPhotos.map((photo, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 w-[360px] p-3 cursor-pointer"
                  title={`Team member ${(i % teamPhotos.length) + 1}`}
                >
                  <img
                    src={photo}
                    alt={`Team member ${(i % teamPhotos.length) + 1}`}
                    className="w-full h-48 object-cover rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quote */}
        <div className="text-center mt-20">
          <blockquote className="text-2xl italic text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            "Golden Hills India harnesses the power of data to deliver
            strategic insights that drive innovation and impact. We are
            committed to partnering with clients to unlock new opportunities
            for growth and success."
          </blockquote>
          <div className="mt-6 text-lg font-semibold text-primary">
            — Golden Hills India Leadership Team
          </div>
        </div>
      </div>
    </section>
  );
}
