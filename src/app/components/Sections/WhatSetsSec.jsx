"use client"
import React, { useEffect, useRef, useState } from "react";
import styles from "../Components.module.css";
import Image from "next/image";
import { HelmetModel as Model } from "../Models/HelmetModel";
import { Canvas } from "@react-three/fiber";
import { Center, OrbitControls } from "@react-three/drei";
import { useInView } from 'react-intersection-observer';

const WhatsetsSection = ({video, data ,Bgclrpink,arCardShow,ModelComponent,showRotaion,NoneBgclr}) => {
  const [showCard, setShowCard] = useState(false);
  const sectionRef = useRef(null); 
  const { ref: canvasRef, inView } = useInView({ threshold: 0.1 });
  const toggleCard = () => {
    setShowCard(!showCard);
  };
  const toggleClose = () => {
    setShowCard(false);
  };
 const playVideoOnIntersection = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const video = entry.target.querySelector("video");
      if (video) {
        // "Playing video..."
        video.play(); 
      }
    }
  });
};
function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < breakpoint);
    checkMobile(); // initial check
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [breakpoint]);

  return isMobile;
}
const isMobile = useIsMobile(1024);
useEffect(() => {
  const observer = new IntersectionObserver(playVideoOnIntersection, {
    root: null,
    rootMargin: "0px",
    threshold: 0.1, 
  });

  if (sectionRef.current) {
    observer.observe(sectionRef.current);
  }

    // Cleanup observer on component unmount
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div className={styles.resultRow} ref={sectionRef}>
      <div className={styles.resultCardWrap}>
        {data.map((item, index) => (
          <div key={index} className={styles.resultCard}>
            {/* <div
              className={styles.resultCardIcon}
              dangerouslySetInnerHTML={{ __html: item.svg }}
            /> */}
            <Image
            width={48}
            height={48}
            src={item.image.url || " "}
            alt={item.image.alt || "Result Icon"}
            />
            <div className={styles.resultCardContent}>
              <h3 className="text-3 text-3-md text-1-sm">{item.title}</h3>
              <p className={`${styles.resultCardDesc} text-4 text-4-md text-4-sm`}>{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.productWrap}>
        <div onClick={toggleCard} className={`${styles.arWrap} ${arCardShow? styles.arCardShow :""}`} >
        <svg xmlns="http://www.w3.org/2000/svg" width="43" height="27" viewBox="0 0 43 27" fill="none">
            <path d="M30.3987 4.69922L21.8125 8.73125V18.7533L30.3987 14.7358V4.69922Z" fill="#2D348C"/>
            <path d="M29.7467 3.93051L21.3201 0L12.8789 3.93051L21.3201 7.87551L29.7467 3.93051Z" fill="#2D348C"/>
            <path d="M20.8261 8.71563L12.2109 4.68359V14.7347L20.8261 18.7522V8.71563Z" fill="#2D348C"/>
            <path d="M34.1124 15.5614C33.8513 15.5178 33.6048 15.6919 33.5613 15.953C33.5178 16.214 33.7063 16.4606 33.9529 16.5041C40.0009 17.4903 41.6253 18.8537 41.6253 19.5209C41.6253 20.8262 36.2735 22.9727 24.83 23.3788C24.569 23.3934 24.3514 23.6109 24.3659 23.872C24.3804 24.133 24.598 24.3361 24.8445 24.3361H24.859C29.6743 24.162 34.0834 23.6254 37.2742 22.8277C40.8131 21.943 42.5971 20.8262 42.5971 19.5064C42.5971 17.3743 37.9849 16.185 34.1124 15.5614Z" fill="#2D348C"/>
            <path d="M21.5525 23.4937L19.3189 21.4777C19.1159 21.3037 18.8113 21.3037 18.6373 21.5067C18.4632 21.7098 18.4632 22.0144 18.6663 22.1884L20.0151 23.4067C14.9823 23.3342 10.2831 22.8991 6.68621 22.1449C2.48013 21.2602 0.971749 20.1579 0.971749 19.5052C0.971749 18.867 2.59616 17.4892 8.65871 16.4884C8.91978 16.4449 9.10833 16.1984 9.05031 15.9373C9.0068 15.6762 8.76024 15.4877 8.49917 15.5457C4.64119 16.1839 0 17.3877 0 19.5052C0 20.9701 2.17556 22.1739 6.46865 23.0876C10.1381 23.8563 14.9098 24.3204 20.0296 24.3785L18.6373 25.6403C18.4342 25.8143 18.4342 26.1189 18.6083 26.322C18.7098 26.438 18.8403 26.4815 18.9708 26.4815C19.0869 26.4815 19.2029 26.438 19.3044 26.351L21.6105 24.2769C21.654 24.2334 21.683 24.2044 21.712 24.1319C21.7266 24.1174 21.7266 24.1174 21.7266 24.0884C21.7266 24.0884 21.7266 24.0884 21.7266 24.0739C21.7556 24.0159 21.7701 23.9578 21.7701 23.8853C21.7991 23.7403 21.6975 23.5808 21.5525 23.4937Z" fill="#2D348C"/>
        </svg>
        </div>
        {ModelComponent && (
          <div className={styles?.productCanvas} ref={canvasRef}>
            <Canvas
              style={{ pointerEvents: isMobile ? 'none' : 'auto' }}
              frameloop={inView ? 'always' : 'never'}
            >
              <ambientLight />
              {/* <axesHelper args={[5]} /> */}
              <directionalLight position={[0, 0, 5]} intensity={1} />
              <directionalLight position={[0, -3, 0]} intensity={5} />
              <pointLight />
              <OrbitControls enableZoom={false}  enableRotate={!isMobile} autoRotate={isMobile}  />
              <group>
                  <Center>
                    <ModelComponent />
                  </Center>
              </group>
            </Canvas>
            </div>
          )}
         
        <div className={`${styles.product} ${Bgclrpink ? styles.Bgclrpink : ""} ${NoneBgclr? styles.NoneBgclr : ""}`}>
        {video && (
              // <div className={styles.productImg} dangerouslySetInnerHTML={{ __html: data[3]?.model }} />
              <video  className={styles.productImg}  src={video.url} loop autoPlay playsInline muted />
          )}
        
        </div>
        {showCard && (
          <div className={`${styles.arCard} ${styles.showCard}`}>
           
            <p className="text-3-md">Augmented Reality</p>
            <Image src="/assets/qrcode.png" width={180} height={180}/>
            <div>
              <p className={`${styles?.arCardDesc} text-6-md tac`}>Point your camera at the QR code.Tap the banner that appears on your screen.</p>
              <div className={styles?.closeBtn} onClick={toggleClose}>Close</div>
            </div>
          </div>
        )}
        <div className={`${styles?.rotateSvg} ${showRotaion? styles.showRotation :''}`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="43" height="27" viewBox="0 0 43 27" fill="none">
            <path d="M30.3987 4.69922L21.8125 8.73125V18.7533L30.3987 14.7358V4.69922Z" fill="#2D348C"/>
            <path d="M29.7467 3.93051L21.3201 0L12.8789 3.93051L21.3201 7.87551L29.7467 3.93051Z" fill="#2D348C"/>
            <path d="M20.8261 8.71563L12.2109 4.68359V14.7347L20.8261 18.7522V8.71563Z" fill="#2D348C"/>
            <path d="M34.1124 15.5614C33.8513 15.5178 33.6048 15.6919 33.5613 15.953C33.5178 16.214 33.7063 16.4606 33.9529 16.5041C40.0009 17.4903 41.6253 18.8537 41.6253 19.5209C41.6253 20.8262 36.2735 22.9727 24.83 23.3788C24.569 23.3934 24.3514 23.6109 24.3659 23.872C24.3804 24.133 24.598 24.3361 24.8445 24.3361H24.859C29.6743 24.162 34.0834 23.6254 37.2742 22.8277C40.8131 21.943 42.5971 20.8262 42.5971 19.5064C42.5971 17.3743 37.9849 16.185 34.1124 15.5614Z" fill="#2D348C"/>
            <path d="M21.5525 23.4937L19.3189 21.4777C19.1159 21.3037 18.8113 21.3037 18.6373 21.5067C18.4632 21.7098 18.4632 22.0144 18.6663 22.1884L20.0151 23.4067C14.9823 23.3342 10.2831 22.8991 6.68621 22.1449C2.48013 21.2602 0.971749 20.1579 0.971749 19.5052C0.971749 18.867 2.59616 17.4892 8.65871 16.4884C8.91978 16.4449 9.10833 16.1984 9.05031 15.9373C9.0068 15.6762 8.76024 15.4877 8.49917 15.5457C4.64119 16.1839 0 17.3877 0 19.5052C0 20.9701 2.17556 22.1739 6.46865 23.0876C10.1381 23.8563 14.9098 24.3204 20.0296 24.3785L18.6373 25.6403C18.4342 25.8143 18.4342 26.1189 18.6083 26.322C18.7098 26.438 18.8403 26.4815 18.9708 26.4815C19.0869 26.4815 19.2029 26.438 19.3044 26.351L21.6105 24.2769C21.654 24.2334 21.683 24.2044 21.712 24.1319C21.7266 24.1174 21.7266 24.1174 21.7266 24.0884C21.7266 24.0884 21.7266 24.0884 21.7266 24.0739C21.7556 24.0159 21.7701 23.9578 21.7701 23.8853C21.7991 23.7403 21.6975 23.5808 21.5525 23.4937Z" fill="#2D348C"/>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default WhatsetsSection;
