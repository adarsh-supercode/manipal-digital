"use client";

import React, { useState, useEffect } from "react";
import * as styles from "./footer.module.css";
import Link from "next/link";

export default function Footer({ menu = [], generalSettings, menuTwo = [] }) {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const pageHeight = document.documentElement.scrollHeight;
      const currentScroll = window.scrollY;

      setShowScrollTop(currentScroll > pageHeight / 2);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const footerData = generalSettings?.main;
  if (!generalSettings || !generalSettings.main) {
    return null;
  }

  return (
    <nav className={styles.FooterContainer}>
      <div className="container">
        <div className={styles.FooterMenuWrap}>
          <div className={styles.contactWrap}>
            <p className="heading-4">{footerData.contact_heading}</p>
            {footerData.contact_link?.url ? (
              <Link className={`${styles.contactLink} text-3`} href={footerData.contact_link.url}>
                {footerData.contact_link.title}
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none">
                  <g clipPath="url(#clip0_925_203)">
                    <path d="M18 36C27.9411 36 36 27.9411 36 18C36 8.05887 27.9411 0 18 0C8.05887 0 0 8.05887 0 18C0 27.9411 8.05887 36 18 36Z" fill="#F8F8F8"/>
                    <path d="M17.6489 12L24.0018 18.7059M24.0018 18.7059L17.6489 25.4118M24.0018 18.7059H9.53125" stroke="black" strokeWidth="0.705882"/>
                  </g>
                </svg>
              </Link>
            ) : (
              <span>No contact link available</span>
            )}
            <div className={styles.countriesWrap}>
              {footerData?.countries?.map((item, index) => (
                // <Link href={item.link.url} target="_blank">
                <div className={`${styles.country} uppercase`} key={index} target="_blank">
                  <svg xmlns="http://www.w3.org/2000/svg" width="7" height="7" viewBox="0 0 7 7" fill="none">
                    <circle cx="3.5" cy="3.5" r="3.5" fill="#F8F8F8"/>
                  </svg>
                  <span className="text-3">{item.country}</span>
                </div>
                // </Link>
              ))}
            </div>
          </div>

          <div className={styles.FooterlinkSets}>
            <ul className={styles.footermenuList}>
              {menu?.map((item) => (
                <li key={item.id} className={`text-2 ${styles.menuItem}`}>
                  <Link href={item.url}>{item.title}</Link>
                </li>
              ))}
            </ul>
            <div>
              <ul className={styles.footermenuList}>
                {menuTwo?.map((item) => (
                  <li key={item.id} className={`text-2 ${styles.menuItem}`}>
                    {item.url.startsWith('http') ? (
                      <a href={item.url} target="_blank" rel="noopener noreferrer">
                        {item.title}
                      </a>
                    ) : (
                      <Link href={item.url}>{item.title}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.mediaLinkWrap}>
              <div className={styles.emailWrap}>
                <p className="text-2">{footerData.email_title}</p>
                <Link className={`${styles.LinkClr} text-4 opacity-07`} href={footerData.email?.url}>
                  {footerData.email?.title}
                </Link>
              </div>

              <div className={styles.IconsWrap}>
                <p className="text-2">{footerData?.media_title}</p>
                <ul className={styles.mediaLinks}>
                  {footerData?.links?.map((item, index) => (
                    <li key={index}>
                      <Link
                        className={`${styles.LinkClr}`}
                        target={item.link?.target}
                        title={item.media_icon}
                        href={item.link?.url || "#"}
                        dangerouslySetInnerHTML={{ __html: item.svg }}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.copyRightWrap}>
          <div className={styles.copyRightTexts}>
            <p className={`${styles.bottomFootertext} text-6`}>
              © {new Date().getFullYear()} {footerData.copy_right_text}
            </p>
            <p className={`${styles.bottomFootertext} text-6`}>
              {footerData.copy_right}
            </p>
          </div>

          <div className={styles.footerMenuSec}>
            <Link className={`${styles.bottomFootertext} text-6`} href={footerData.privacy_page?.url}>
              {footerData.privacy_page?.title}
            </Link>
            <Link className={`${styles.bottomFootertext} text-6`} href={footerData.fairUse?.url}>
              {footerData.fairUse?.title}
            </Link>
          </div>
        </div>
      </div>

      {showScrollTop && (
        <img
          src="/assets/arrow-up.svg"
          alt="arrow-up"
          className={`${styles.arrowUp} ${styles.arrowVisible}`}
          onClick={() => {
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }}
        />
      )}
    </nav>
  );
}