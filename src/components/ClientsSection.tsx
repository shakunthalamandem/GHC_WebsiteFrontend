import React, { useEffect, useRef, useState } from "react";

/**
 * ClientsSlider.tsx
 *
 * Single-file React component (TypeScript) — no external libs.
 * - Responsive visible cards
 * - Autoplay with pause on hover/focus
 * - Keyboard & touch navigation
 * - Small location badges and numeric "index" badges
 * - Decorative gradient blobs (pure CSS / SVG)
 */

const CLIENTS = [
  "$2+ Billion Hedge Fund (Boston)",
  "Top 5 Crypto Exchange (New York City / London / Singapore)",
  "$300 Million VC Fund (Boston)",
  "Fintech Business (Chicago)",
  "Macro Research & Risk Management Firm (Connecticut)",
  "Management Consulting Firm (London)",
  "Biotech Investor Relations Firm (New York City)",
  "Multi-strategy Investment Firm (Hongkong)",
];

type StepRef = ReturnType<typeof setInterval> | null;

export default function ClientsSlider() {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const autoplayRef = useRef<StepRef>(null);

  const [index, setIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);
  const [stepPx, setStepPx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  // gap between cards in px (kept in sync with CSS below)
  const GAP = 18;
  const AUTOPLAY_MS = 2000; // faster autoplay interval (2 seconds)

  // 1) parse client string into {title, location}
  const parseClient = (raw: string) => {
    const match = raw.match(/^(.*?)(?:\s*\((.+)\))?$/);
    const title = match?.[1].trim() ?? raw;
    const location = match?.[2]?.trim() ?? "";
    return { title, location };
  };

  // 2) compute responsive visibleCards based on viewport width
  useEffect(() => {
    const compute = () => {
      const w = viewportRef.current?.offsetWidth ?? window.innerWidth;
      // breakpoints (tweak as desired)
      const newVisible =
        w >= 1400 ? 4 : w >= 1024 ? 3 : w >= 700 ? 2 : 1;
      setVisibleCards(newVisible);
    };
    compute();
    const o = () => compute();
    window.addEventListener("resize", o);
    return () => window.removeEventListener("resize", o);
  }, []);

  // 3) compute pixel step (width of one card + gap) after render
  useEffect(() => {
    const calcStep = () => {
      if (!sliderRef.current) return;
      const first = sliderRef.current.querySelector<HTMLElement>(".cs-card");
      if (first) {
        const w = first.offsetWidth;
        setStepPx(w + GAP);
      } else {
        setStepPx(320 + GAP); // fallback
      }
    };
    // compute on next paint to allow layout to settle
    const id = requestAnimationFrame(calcStep);
    // also recalc on resize
    window.addEventListener("resize", calcStep);
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("resize", calcStep);
    };
  }, [visibleCards, CLIENTS.length]);

  // 4) clamp index when visibleCards changes
  useEffect(() => {
    const maxIndex = Math.max(0, CLIENTS.length - visibleCards);
    setIndex((prev) => Math.min(prev, maxIndex));
  }, [visibleCards]);

  // AUTOPLAY control (start/stop and reset)
  useEffect(() => {
    const maxIndex = Math.max(0, CLIENTS.length - visibleCards);

    // Clear any existing interval before starting a new one
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }

    if (isPlaying) {
      autoplayRef.current = setInterval(() => {
        setIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
      }, AUTOPLAY_MS);
    }

    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
        autoplayRef.current = null;
      }
    };
  }, [isPlaying, visibleCards]);

  // keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        prev();
        setIsPlaying(false);
      } else if (e.key === "ArrowRight") {
        next();
        setIsPlaying(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [visibleCards, index]);

  // helpers
  const maxIndex = Math.max(0, CLIENTS.length - visibleCards);
  const prev = () => setIndex((p) => Math.max(0, p - 1));
  const next = () => setIndex((p) => (p >= maxIndex ? 0 : p + 1));

  // touch interactions (simple swipe)
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
    setIsPlaying(false);
  };
  const onTouchMove = (e: React.TouchEvent) => {
    // prevent vertical scroll only when horizontal movement significant
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX == null) return;
    const endX = e.changedTouches[0].clientX;
    const dx = endX - touchStartX;
    const threshold = 40;
    if (dx > threshold) prev();
    else if (dx < -threshold) next();
    setTouchStartX(null);
  };

  // accessibility: announce current visible window (aria-live)
  const visibleRangeStart = index + 1;
  const visibleRangeEnd = Math.min(CLIENTS.length, index + visibleCards);

  // reduced motion: if user requested reduced motion, shorten animations
  const prefersReducedMotion = typeof window !== "undefined" && window.matchMedia
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false;

  return (
    <section className="cs-root" aria-label="Trusted clients">
      <style>{`
        /* Scoped classes prefixed with cs- */
        .cs-root {
          padding: 40px 18px;
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
          color: #0f172a;
        }

        .cs-heading {
          text-align: center;
          font-weight: 800;
          font-size: 28px;
          margin-bottom: 20px;
          letter-spacing: -0.02em;
          color: #0b2447;
          user-select: none;
        }

        .cs-outer {
          max-width: 1100px;
          margin: 0 auto;
          position: relative;
          border-radius: 18px;
          padding: 28px;
          background: linear-gradient(180deg, rgba(245,250,255,0.9), rgba(235,243,255,0.6));
          box-shadow: 0 18px 40px rgba(12,40,80,0.08);
          overflow: visible;
        }

        /* decorative blobs */
        .cs-blob {
          position: absolute;
          filter: blur(36px);
          opacity: 0.35;
          pointer-events: none;
        }
        .cs-blob--left {
          width: 220px;
          height: 220px;
          left: -50px;
          top: -50px;
          background: radial-gradient(circle at 30% 30%, #bfe0ff, #8fbfff 60%, transparent 80%);
        }
        .cs-blob--right {
          width: 260px;
          height: 260px;
          right: -60px;
          bottom: -40px;
          background: radial-gradient(circle at 70% 70%, #ffd6e0, #ffc9d6 35%, transparent 70%);
        }

        .cs-viewport {
          overflow: hidden;
          width: 100%;
        }

        .cs-slider {
          display: flex;
          gap: ${GAP}px;
          align-items: stretch;
          transition: transform ${prefersReducedMotion ? 0 : 250}ms cubic-bezier(.2,.9,.3,1);
          will-change: transform;
        }

        .cs-card {
          flex: 0 0 calc((100% - ${GAP * (visibleCards - 1)}px) / ${visibleCards});
          min-height: 140px;
          border-radius: 12px;
          background: linear-gradient(180deg, rgba(255,255,255,0.9), rgba(247,251,255,0.85));
          box-shadow: 0 8px 18px rgba(20,48,100,0.06);
          padding: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          font-weight: 700;
          font-size: 1rem;
          color: #0b2a66;
          position: relative;
          transition: transform 260ms ease, box-shadow 260ms ease;
          border: 1px solid rgba(11,37,89,0.035);
          backdrop-filter: blur(3px);
        }

        .cs-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 14px 36px rgba(12,40,80,0.12);
        }

        .cs-badge-index {
          position: absolute;
          left: 14px;
          top: 14px;
          width: 34px;
          height: 34px;
          display: inline-grid;
          place-items: center;
          border-radius: 10px;
          background: linear-gradient(180deg,#1f3a8a,#17407a);
          color: white;
          font-weight: 700;
          font-size: 13px;
          box-shadow: 0 6px 18px rgba(12,40,80,0.15);
        }

        .cs-location {
          position: absolute;
          right: 12px;
          bottom: 12px;
          background: rgba(11,37,89,0.06);
          padding: 6px 9px;
          border-radius: 999px;
          font-weight: 600;
          font-size: 12px;
          color: #08263b;
          border: 1px solid rgba(11,37,89,0.04);
        }

        .cs-card-title {
          padding: 6px 26px;
          line-height: 1.18;
        }

        /* nav buttons */
        .cs-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 44px;
          height: 44px;
          border-radius: 50%;
          display: grid;
          place-items: center;
          background: rgba(15,38,96,0.06);
          border: none;
          cursor: pointer;
          transition: transform 160ms ease, background 160ms;
          box-shadow: 0 6px 14px rgba(12,40,80,0.08);
          color: #08263b;
        }
        .cs-nav:hover { transform: translateY(-50%) scale(1.05); background: rgba(15,38,96,0.12); }
        .cs-nav:disabled { opacity: 0.45; cursor: not-allowed; transform: translateY(-50%); }

        .cs-prev { left: 12px; }
        .cs-next { right: 12px; }

        /* indicators */
        .cs-dots {
          display:flex;
          gap:10px;
          justify-content:center;
          margin-top: 18px;
        }
        .cs-dot {
          width:10px;height:10px;border-radius:50%;background:rgba(11,37,89,0.12);cursor:pointer;
        }
        .cs-dot.active { background: linear-gradient(90deg,#1f3a8a,#17407a); box-shadow: 0 6px 12px rgba(12,40,80,0.12); }

        .cs-footer {
          display:flex;
          justify-content:space-between;
          align-items:center;
          margin-top: 14px;
          gap:12px;
          color: #274060;
          font-weight:600;
          font-size:13px;
        }

        @media (max-width:700px) {
          .cs-heading { font-size: 20px; }
        }
      `}</style>

      <h3 className="cs-heading">Trusted by leading institutions</h3>

      <div
        className="cs-outer"
        onMouseEnter={() => setIsPlaying(false)}
        onMouseLeave={() => setIsPlaying(true)}
      >
        <div className="cs-blob cs-blob--left" aria-hidden />
        <div className="cs-blob cs-blob--right" aria-hidden />

        <div
          ref={viewportRef}
          className="cs-viewport"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {/* slider */}
          <div
            ref={sliderRef}
            className="cs-slider"
            style={{
              transform: `translateX(-${index * stepPx}px)`,
            }}
            role="list"
            aria-live="polite"
            aria-label={`Showing clients ${visibleRangeStart} to ${visibleRangeEnd} of ${CLIENTS.length}`}
          >
            {CLIENTS.map((raw, i) => {
              const { title, location } = parseClient(raw);
              return (
                <article
                  key={i}
                  className="cs-card"
                  role="listitem"
                  tabIndex={0}
                  aria-label={title + (location ? ", " + location : "")}
                >
                  <div className="cs-badge-index" aria-hidden>
                    {String(i + 1).padStart(2, "0")}
                  </div>

                  <div className="cs-card-title">{title}</div>

                  {location ? (
                    <div className="cs-location">{location}</div>
                  ) : null}
                </article>
              );
            })}
          </div>
        </div>

        {/* navigation buttons */}
        <button
          className="cs-nav cs-prev"
          onClick={() => {
            prev();
            setIsPlaying(false);
          }}
          aria-label="Previous"
          disabled={index === 0}
        >
          ‹
        </button>

        <button
          className="cs-nav cs-next"
          onClick={() => {
            next();
            setIsPlaying(false);
          }}
          aria-label="Next"
          disabled={index === maxIndex}
        >
          ›
        </button>

        <div className="cs-footer">
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <strong style={{ color: "#08263b" }}>
              {visibleRangeStart}-{visibleRangeEnd}
            </strong>
            <span style={{ opacity: 0.8 }}>of {CLIENTS.length} clients</span>
          </div>

          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <button
              onClick={() => {
                setIndex(0);
                setIsPlaying(false);
              }}
              aria-label="Show first"
              style={{
                padding: "8px 10px",
                borderRadius: 10,
                border: "1px solid rgba(11,37,89,0.04)",
                background: "white",
                cursor: "pointer",
                fontWeight: 700,
              }}
            >
              First
            </button>
{/* 
            <button
              onClick={() => {
                setIsPlaying((p) => !p);
              }}
              aria-pressed={isPlaying}
              aria-label={isPlaying ? "Pause autoplay" : "Resume autoplay"}
              style={{
                padding: "8px 12px",
                borderRadius: 10,
                border: "none",
                background: isPlaying ? "linear-gradient(90deg,#1f3a8a,#17407a)" : "#eef3fb",
                color: isPlaying ? "white" : "#0b2a66",
                cursor: "pointer",
                fontWeight: 700,
              }}
            >
              {isPlaying ? "Pause" : "Play"}
            </button> */}

          </div>
        </div>
      </div>

      {/* dots (one per index position) */}
      <div className="cs-dots" role="tablist" aria-label="Jump to client">
        {Array.from({ length: maxIndex + 1 }).map((_, i) => (
          <div
            key={i}
            role="tab"
            aria-selected={i === index}
            tabIndex={0}
            className={`cs-dot ${i === index ? "active" : ""}`}
            onClick={() => {
              setIndex(i);
              setIsPlaying(false);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                setIndex(i);
                setIsPlaying(false);
              }
            }}
            title={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
