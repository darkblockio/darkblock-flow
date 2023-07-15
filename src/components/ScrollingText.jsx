import React, { useEffect, useState } from "react";
import styled, { keyframes } from 'styled-components';

const ResponsiveText = styled.div`
  opacity: ${props => props.opacity};
  transition: opacity 0.5s;
  font-family: 'Inter', sans-serif;
  font-size: 4rem;
  font-weight: bold;
  letter-spacing: -0.05em;
  color: white;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  max-width: 750px;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;




const ScrollWheelAnimation = keyframes`
  0% {
    top: 10px;
    opacity: 1;
  }
  100% {
    top: 60px;
    opacity: 0;
  }
`;

const Mouse = styled.div`
  width: 50px;
  height: 100px;
  border: 2px solid white;
  border-radius: 30px;
  position: relative;
  margin: 0 auto;

  &:before {
    content: '';
    display: block;
    position: absolute;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: white;
    left: 50%;
    transform: translateX(-50%);
    animation: ${ScrollWheelAnimation} 2.5s infinite;
  }
`;

const ScrollDown = styled.div`
  text-align: center;
  margin-top: 10px;
  color: white;
`;

const MouseScroll = () => {
  const [opacity, setOpacity] = useState(1);
  const [display, setDisplay] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop > 0) {
        setOpacity(0);
        setTimeout(() => {
          setDisplay(false);
        }, 500); // this should match the transition duration in styles
      } else {
        setOpacity(1);
        setDisplay(true);
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    display && (
      <div style={{ position: 'fixed', bottom: '100px', width: '100%', zIndex: 2, textAlign: 'center', opacity, transition: 'opacity 0.5s' }}>
        <Mouse />
        <ScrollDown>Scroll Down</ScrollDown>
      </div>
    )
  );
};

const ScrollingText = () => {
  const timelineLength = 8000;
  const initialDelay = 500;
  const stayDelay = 2000;
  const fadeDelay = 1000;

  const texts = React.useMemo(() => [
    { text: "Meet Darkblock", start: 0, end: 2000 },
    { text: "A decentralized protocol for token-bound content", start: 2000, end: 4500 },
    { text: "Enabling next-gen content platforms", start: 5000, end: 7000 },
  ], []);

  const [opacity, setOpacity] = useState(texts.map((_) => 0));
  const [display, setDisplay] = useState(texts.map((_) => true));

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setOpacity(
        texts.map((t, i) => {
          if (scrollTop < t.start || scrollTop > t.end) return 0;
          if (scrollTop < t.start + initialDelay) return (scrollTop - t.start) / initialDelay;
          if (scrollTop > t.end - fadeDelay) return (t.end - scrollTop) / fadeDelay;
          return 1;
        })
      );

      setDisplay(
        texts.map((t, i) => {
          return !(scrollTop > t.end + fadeDelay);
        })
      );
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [initialDelay, fadeDelay, texts]);

  return (
    <>
      <div style={{ position: 'fixed', top: '50%', width: '100%', zIndex: 2, textAlign: 'center', transform: 'translateY(-50%)' }}>
        {texts.map((t, i) => (
          display[i] && (
            <ResponsiveText
              key={i}
              opacity={opacity[i]}
            >
              {t.text}
            </ResponsiveText>
          )
        ))}
      </div>
      <MouseScroll />
    </>
  );

};

export default ScrollingText;
