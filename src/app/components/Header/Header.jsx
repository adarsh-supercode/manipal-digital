'use client';
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import * as styles from './header.module.css';
import Link from 'next/link';
import PrimaryButton from '../Buttons/PrimaryButton';
import MegaMenu from './MegaMenu';

export default function Header({ generalSettings }) {
  if (!generalSettings || !generalSettings.header) {
    return null;
  }

  const headerData = generalSettings?.header || {};
  const [openDropdown, setOpenDropdown] = useState(null);
  const [scrollingDown, setScrollingDown] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [headerActive, setHeaderActive] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const pathname = usePathname();
const headerData1 = [
  {
    menu: {
      title: "About",
      url: "/about",
      target: ""
    },
    sub_menu: false,
    submenu: false
  },
  {
    menu: {
      title: "Industries",
      url: "/industries",
      target: ""
    },
    sub_menu: false,
    submenu: false
  },
  {
    menu: {
      title: "Services",
      url: "/",
      target: ""
    },
    sub_menu: [
      {
        title: "Packaging",
        description: "Innovative packaging that enhances your brand’s presence.",
        image: "https://backend.manipal.digital/wp-content/uploads/featured-img.jpg",
        link: "/services/packaging"
      },
      {
        title: "CGI",
        description: "Photorealistic 3D renders for impactful storytelling.",
        image: "https://backend.manipal.digital/wp-content/uploads/packing-1.webp",
        link: "/services/cgi"
      },
      {
        title: "AudioVisual",
        description: "Engaging sound and visuals that elevate your brand.",
        image: "https://backend.manipal.digital/wp-content/uploads/av-submenu.png",
        link: "/services/audiovisual"
      },
      {
        title: "Image Production",
        description: "High-quality visuals tailored to your marketing strategy.",
        image: "https://backend.manipal.digital/wp-content/uploads/beverage.webp",
        link: "/services/image-production"
      },
      {
        title: "Audio Production",
        description: "High-quality visuals tailored to your marketing strategy.",
        image: "https://backend.manipal.digital/wp-content/uploads/beverage.webp",
        link: "/services/audio-production"
      }
    ],
    submenu: true
  },
  {
    menu: {
      title: "Portfolio",
      url: "/our-portfolio",
      target: ""
    },
    sub_menu: false,
    submenu: false
  }
];

  // Detect viewport width and handle mobile view state
  const handleResize = () => {
    setIsMobileView(window.innerWidth <= 991);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Scroll behavior
  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    setHeaderActive(currentScrollY > 2);

    if (Math.abs(currentScrollY - lastScrollY) < 50) return;

    setScrollingDown(currentScrollY > lastScrollY);
    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Toggle dropdown
  const toggleDropdown = (id) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setMenuOpen(!menuOpen);
  };

  // Path-based conditions
  const isNotHomeOrAbout =
    pathname !== '/about/' &&
    pathname !== '/industries/' &&
    pathname !== '/services/imaging/' &&
    pathname !== '/services/audiovisual/' &&
    pathname !== '/services/packaging/' &&
    pathname !== '/services/cgi/'&&
    pathname !== '/services/audio-production/';

  const logoWhite =
    pathname === '/services/audiovisual/' ||
    pathname === '/services/audio-production/' ||
    pathname === '/about/' ||
    pathname === '/services/packaging/' ||
    pathname === '/services/imaging/' ||
    pathname === '/services/cgi/';

  const isAboutOrIndustriesPage = pathname.includes('about') || pathname.includes('industries') || pathname.includes('image-production');

  return (
    <>
      <nav
        className={`${styles.headerNav}
          ${openDropdown !== null ? styles.headerActive : ''}
          ${scrollingDown ? styles.headerActive : headerActive ? styles.headerActive : ''}
          ${isNotHomeOrAbout ? styles.commonHeader : ''}
          ${logoWhite ? styles.logoWhite : ''}
          ${menuOpen ? styles.menuOpen : ''}
        `}
      >
        <div className={pathname === '/' ? styles.headerOverlay : ''}></div>
        <div className="container">
          <div className={styles?.headerMenuWrap}>
            {headerData?.logo && (
              <Link href="/">
                <div
                  className={styles.logo}
                  dangerouslySetInnerHTML={{ __html: headerData?.logo }}
                  data-cursor="logoCursor"
                />
              </Link>
            )}

            {!isMobileView && (
              <ul className={styles.headermenuList}>
                {headerData?.menu?.map((item, index) => (
                  <li
                    key={index}
                    className={`${styles.menuItem} ${item?.sub_menu ? styles.dropdownbtn : ''} text-2`}
                  >
                    <Link
                      className={`${pathname !== '/' ? styles.LinkClrWhite : ''}`}
                      href={item?.menu?.url || '#'}
                      target={item?.menu?.target || '_self'}
                      onClick={(e) => {
                        if (item?.sub_menu) {
                          e.preventDefault();
                          toggleDropdown(index);
                        }
                      }}
                      data-cursor="bigCursor"
                    >
                      {item?.menu?.title}
                      {item?.sub_menu && (
                        <svg
                          className={`${openDropdown === index ? styles.rotateSvg : styles.dropdownSvg}`}
                          xmlns="http://www.w3.org/2000/svg"
                          width="17"
                          height="16"
                          viewBox="0 0 17 16"
                          fill="none"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M2.99099 5.67461C3.1707 5.46495 3.48635 5.44067 3.69601 5.62038L8.03728 9.34147L12.3786 5.62038C12.5882 5.44067 12.9039 5.46495 13.0836 5.67461C13.2633 5.88428 13.239 6.19993 13.0293 6.37964L8.36268 10.3796C8.17543 10.5401 7.89913 10.5401 7.71189 10.3796L3.04522 6.37964C2.83556 6.19993 2.81128 5.88428 2.99099 5.67461Z"
                            fill="#F8F8F8"
                          />
                        </svg>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            )}

            <PrimaryButton
              href={headerData?.connectButton?.url || '#'}
              label={headerData?.connectButton?.title || 'Connect'}
              buttonBlack={openDropdown !== null || headerActive || isNotHomeOrAbout}
              className={`${
                openDropdown !== null || headerActive || isNotHomeOrAbout ? styles.buttonBlack : ''
              } ${styles?.navButton}`}
            />
          </div>
        </div>

        {openDropdown !== null && !isMobileView && (
          <div className={styles?.desktopSubMenu}>
            <MegaMenu
              items={headerData1?.[openDropdown]?.sub_menu}
              onClose={() => setOpenDropdown(null)}
              isMobileMenuOpen={isMobileMenuOpen}
              className={`${styles.megaMenu} ${openDropdown !== null ? styles.megaMenuOpen : ''}`}
            />
          </div>
        )}

        <div
          className={` ${pathname === '/' ? styles.menuDark : ''} ${styles.mobileheaderNav} ${
            isAboutOrIndustriesPage ? styles.hamburgerMenu : ''
          }`}
          onClick={toggleMobileMenu}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 13" fill="none">
            <rect width="22" height="1" fill="white" transform={menuOpen ? 'rotate(45)' : ''} className={menuOpen ? styles.fillClrbbk : ''} />
            {!menuOpen && <rect width="22" height="1" transform="translate(0 6)" className={menuOpen ? styles.fillClrbbk : ''} fill="white" />}
            <rect width="22" height="1" transform={menuOpen ? 'rotate(-45) translate(-11 11)' : 'translate(0 12)'} fill="white" className={menuOpen ? styles.fillClrbbk : ''} />
          </svg>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.active : ''}`}>
          <div className={styles.mobileheadermenuListWrap}>
            <ul className={styles.mobileheadermenuList}>
              {headerData?.menu?.map((item, index) => {
                const isDropdown = item?.sub_menu;
                return (
                  <li key={index} className={`${styles.menuItem} ${isDropdown ? styles.dropdownbtn : ''} text-2 text-1-sm`}>
                    <Link
                      href={item?.menu?.url || '#'}
                      target={item?.menu?.target || '_self'}
                      onClick={(e) => {
                        if (isDropdown) {
                          e.preventDefault();
                          toggleDropdown(index);
                        } else {
                          toggleMobileMenu();
                        }
                      }}
                    >
                      {item?.menu?.title}
                      {isDropdown && (
                        <svg className={`${openDropdown === index ? styles.rotateSvg : styles.dropdownSvg}`} xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M2.99099 5.67461C3.1707 5.46495 3.48635 5.44067 3.69601 5.62038L8.03728 9.34147L12.3786 5.62038C12.5882 5.44067 12.9039 5.46495 13.0836 5.67461C13.2633 5.88428 13.239 6.19993 13.0293 6.37964L8.36268 10.3796C8.17543 10.5401 7.89913 10.5401 7.71189 10.3796L3.04522 6.37964C2.83556 6.19993 2.81128 5.88428 2.99099 5.67461Z"
                            fill="#F8F8F8"
                          />
                        </svg>
                      )}
                    </Link>
                    {openDropdown === index && isDropdown && (
                      <div className={`${styles?.mobileSubMenu}`} onClick={toggleMobileMenu}>
                        <MegaMenu items={item?.sub_menu} onClose={() => setOpenDropdown(null)} isMobileMenuOpen={isMobileMenuOpen} className={`${styles.megaMenu} ${styles.megaMenuOpen}`} />
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>

            <div><a className={styles?.mobilemenuBtn} target="_self" href="/contact">Contact Us</a></div>
          </div>
        </div>
      )}
    </>
  );
}