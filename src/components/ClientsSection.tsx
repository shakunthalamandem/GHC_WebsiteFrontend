import React, { useState, useEffect, useRef } from "react";

const clients = [
  "$2+ Billion Hedge Fund (Boston)",
  "Top 5 Crypto Exchange (New York City / London / Singapore)",
  "$300 Million VC Fund (Boston)",
  "Fintech Business (Chicago)",
  "Macro Research & Risk Management Firm (Connecticut)",
  "Management Consulting Firm (London)",
  "Biotech Investor Relations Firm (New York City)",
  "Multi-strategy Investment Firm (Hongkong)",
];

const outerCardStyle: React.CSSProperties = {
  background: "linear-gradient(135deg, #e6f0ff 0%, #f9fbff 100%)", // soft light blue gradient background
  padding: "3rem 2rem",
  maxWidth: "1100px",
  height: "300px",
  margin: "2rem auto",
  boxShadow: "0 15px 40px rgba(0, 60, 140, 0.15)", // stronger blue tinted shadow
  borderRadius: "20px",
  color: "#1e293b",
  userSelect: "none",
  position: "relative",
  overflow: "hidden",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const sliderContainerStyle: React.CSSProperties = {
  display: "flex",
  gap: "1.25rem",
  transition: "transform 0.5s ease",
  willChange: "transform",
};

const clientCardStyle: React.CSSProperties = {
  backgroundColor: "#cce0ff", // clean light blue background
  padding: "1rem 1.5rem",
  borderRadius: "14px",
  minWidth: "280px",
  height: "180px",
  flexShrink: 0,
  fontWeight: "600",
  fontSize: "1.1rem",
  cursor: "default",
  userSelect: "none",
  textAlign: "center",
  color: "#1a3a8a", // darker blue text for contrast
  boxShadow: "0 8px 20px rgba(58, 85, 156, 0.15)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
};

const navButtonStyle: React.CSSProperties = {
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  background: "rgba(26, 58, 138, 0.15)",
  border: "none",
  borderRadius: "50%",
  width: "48px",
  height: "48px",
  cursor: "pointer",
  color: "#1a3a8a",
  fontWeight: "700",
  fontSize: "1.8rem",
  userSelect: "none",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  transition: "background 0.3s",
  zIndex: 10,
  boxShadow: "0 4px 10px rgba(26, 58, 138, 0.3)",
};

export default function ClientsAutoSliderCard() {
  const [index, setIndex] = useState(0);
  const visibleCards = 3;
  const maxIndex = clients.length - visibleCards;

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 3500);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [maxIndex]);

  const slideLeft = () => {
    setIndex((prev) => Math.max(prev - 1, 0));
    resetInterval();
  };

  const slideRight = () => {
    setIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    resetInterval();
  };

  const resetInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      setIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 3500);
  };

  return (
    <section style={{ padding: "2rem 1rem" }}>
      <h2
        style={{
          textAlign: "center",
          fontSize: "2.25rem",
          marginBottom: "2.5rem",
          fontWeight: "700",
          color: "#3b4a6b",
          userSelect: "none",
        }}
      >
        Our Clients
      </h2>

      <div style={outerCardStyle}>
        <button
          style={{ ...navButtonStyle, left: "16px" }}
          onClick={slideLeft}
          aria-label="Previous"
          disabled={index === 0}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = "rgba(26,58,138,0.3)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = "rgba(26,58,138,0.15)")
          }
        >
          &#8249;
        </button>

        <div
          style={{
            overflow: "hidden",
            flex: 1,
          }}
        >
          <div
            style={{
              ...sliderContainerStyle,
              width: `${clients.length * (280 + 20)}px`,
              transform: `translateX(-${index * (280 + 20)}px)`,
            }}
          >
            {clients.map((client, i) => (
              <div
                key={i}
                style={clientCardStyle}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.08)";
                  e.currentTarget.style.boxShadow = "0 12px 28px rgba(26, 58, 138, 0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "0 8px 20px rgba(58, 85, 156, 0.15)";
                }}
              >
                {client}
              </div>
            ))}
          </div>
        </div>

        <button
          style={{ ...navButtonStyle, right: "16px" }}
          onClick={slideRight}
          aria-label="Next"
          disabled={index === maxIndex}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = "rgba(26,58,138,0.3)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = "rgba(26,58,138,0.15)")
          }
        >
          &#8250;
        </button>
      </div>
    </section>
  );
}
