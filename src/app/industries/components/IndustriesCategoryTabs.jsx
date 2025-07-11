'use client'
import React from 'react';
import * as styles from '../css/categoryTabs.module.css';

const IndustriesCategoryTabs = ({industries}) => {
  const {types} = industries || {};

  
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    section && section.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="container">
      <div className={styles.tabsWrapper}>
        <button 
          onClick={() => scrollToSection('media')} 
          className={`${styles.tab} ${styles.mediaTab}`}
          style={{ backgroundImage: `url(${types[0].bgImg.link})` }}
        >
          <span className={styles.overlay}></span>
          <span className={styles.tabText}>{types[0].heading}</span>
        </button>
        <button 
          onClick={() => scrollToSection('fashion')} 
          className={`${styles.tab} ${styles.fashionTab}`}
           style={{ backgroundImage: `url(${types[1].bgImg.link})` }}
        >
          <span className={styles.overlay}></span>
          <span className={styles.tabText}>{types[1].heading}</span>
        </button>
        <button 
          onClick={() => scrollToSection('fmcg')} 
          className={`${styles.tab} ${styles.fmcgTab}`}
           style={{ backgroundImage: `url(${types[2].bgImg.link})` }}
        >
          <span className={styles.overlay}></span>
          <span className={styles.tabText}>{types[2].heading}</span>
        </button>
      </div>
    </div>
  );
};

export default IndustriesCategoryTabs;
