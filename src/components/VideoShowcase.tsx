import { useEffect, useRef, useState } from 'react';
import { Play, Pause } from 'lucide-react';

const VideoShowcase = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      if (isVisible) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  }, [isVisible]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section ref={sectionRef} className="py-24 px-6 bg-card/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-foreground mb-6">
            See Our{' '}
            <span className="bg-gradient-sky-gold bg-clip-text text-transparent">
              Intelligence
            </span>{' '}
            in Action
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
Experience the Power of Our Next-Gen AI Assistant in Action          </p>
        </div>

        <div
          className={`relative group transition-all duration-1000 ${
            isVisible ? 'animate-scale-in opacity-100' : 'opacity-0 scale-95'
          }`}
        >
          {/* Video Container */}
          <div className="relative rounded-3xl overflow-hidden shadow-elegant hover:shadow-glow transition-all duration-500 bg-gradient-glass">
            <div className="relative aspect-video bg-gradient-to-br from-primary/10 to-gold/10 flex items-center justify-center">
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                poster="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwMCIgaGVpZ2h0PSI2NzUiIHZpZXdCb3g9IjAgMCAxMjAwIDY3NSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGRlZnM+CjxsaW5lYXJHcmFkaWVudCBpZD0iZ3JhZGllbnQiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPgo8c3RvcCBvZmZzZXQ9IjAlIiBzdHlsZT0ic3RvcC1jb2xvcjojMDBCRkZGO3N0b3Atb3BhY2l0eTowLjEiIC8+CjxzdG9wIG9mZnNldD0iMTAwJSIgc3R5bGU9InN0b3AtY29sb3I6I0ZGRDcwMDtzdG9wLW9wYWNpdHk6MC4xIiAvPgo8L2xpbmVhckdyYWRpZW50Pgo8L2RlZnM+CjxyZWN0IHdpZHRoPSIxMjAwIiBoZWlnaHQ9IjY3NSIgZmlsbD0idXJsKCNncmFkaWVudCkiLz4KPHN2ZyB4PSI1NzUiIHk9IjMxMiIgd2lkdGg9IjUwIiBoZWlnaHQ9IjUwIiBmaWxsPSIjMDBCRkZGIj4KPHA+CjwvcD4KPC9zdmc+Cjx0ZXh0IHg9IjYwMCIgeT0iMzUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjMDBCRkZGIiBmb250LWZhbWlseT0iSW50ZXIiIGZvbnQtc2l6ZT0iMjQiPkRlbW8gVmlkZW88L3RleHQ+Cjwvc3ZnPg=="
                muted
                playsInline
                onEnded={() => setIsPlaying(false)}
              >
                <source src="/public/video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              {/* Play/Pause Overlay */}
              {!isPlaying && (
  <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/30 transition-colors duration-100">
    <button
      onClick={togglePlay}
      className="w-20 h-20 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all duration-300 btn-glow"
    >
      {isPlaying ? (
        <Pause className="w-8 h-8 text-primary ml-1" />
      ) : (
        <Play className="w-8 h-8 text-primary ml-1" />
      )}
    </button>
  </div>
)}


              {/* Demo Text Overlay */}
              <div className="absolute bottom-6 left-6 bg-white/90 rounded-lg px-4 py-2">
                <p className="text-sm font-medium text-primary">
                  Interactive Demo: AI Assistant 
                </p>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute top-4 right-4 bg-gradient-sky-gold rounded-full p-3 float-animation">
              <div className="w-4 h-4 bg-white rounded-full" />
            </div>
          </div>

          {/* Caption */}
          {/* <div className="text-center mt-8">
            <p className="text-lg text-muted-foreground">
              Real-time data visualization and predictive analytics in action
            </p>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default VideoShowcase;
