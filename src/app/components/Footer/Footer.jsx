"use client"
import React from "react";
import * as styles from "./footer.module.css"
import Link from "next/link";
import Image from "next/image";
import PrimaryButton from "../Buttons/PrimaryButton";

export default function Footer({ menu, generalSettings,menuTwo }) {
  if (!generalSettings || !generalSettings.footer) {
    return null;
  }
  const footerData = generalSettings?.footer || {};
  return (
    <nav className={styles.FooterContainer}>
      <div className="container">
        <div className={styles?.FooterMenuWrap}>
          {/* Use Dynamic Logo from General Settings */}
         <div className={styles?.contactWrap}>
           <p className="heading-4">{footerData.contact_heading}</p>
           <Link className={`${styles?.contactLink} text-3`} href={footerData.contact_link?.url}>{footerData.contact_link?.title} <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none">
                <circle cx="18" cy="18" r="18" fill="#F8F8F8"/>
                <path d="M17.6489 12L24.0018 18.7059M24.0018 18.7059L17.6489 25.4118M24.0018 18.7059H9.53125" stroke="black" strokeWidth="0.705882"/>
                <path d="M18.1176 12L24.4706 18.7059M24.4706 18.7059L18.1176 25.4118M24.4706 18.7059H10" stroke="black" strokeWidth="0.705882"/>
                </svg>
            </Link>
         </div>
          <div className={styles?.FooterlinkSets}>
          {/* Menu List */}
          <ul className={styles.footermenuList}>
            {menu.length > 0 ? (
              menu.map((item) => (
                <li key={item.ID} className={`text-2 ${styles.menuItem}`}>
                  <a href={item.url}>{item.title}</a>
                </li>
              ))
            ) : (
              <li></li> 
            )}
          </ul>
          <div>
            <ul className={styles.footermenuList}>
                {menuTwo.length > 0 ? (
                menuTwo.map((item) => (
                    <li key={item.ID} className={`text-2 ${styles.menuItem}`}>
                    <a href={item.url}>{item.title}</a>
                    </li>
                ))
                ) : (
                <li></li> 
                )}
            </ul>
          </div>

          {/* media links */}
          <div className={styles?.mediaLinkWrap}>
          <div className={styles?.emailWrap}>
                <p className="text-2">{footerData.email_title}</p>
                <Link className={`${styles?.LinkClr} text-3`} href={footerData.email?.url}>{footerData.email?.title}</Link>
            </div>
          <div className={styles?.IconsWrap}>
          <p className="text-2">{footerData?.media_title}</p>
          <ul className={styles?.mediaLinks}>
            {footerData?.media_links?.map((item, index) => (
                <li key={index}>
                <Link className={`${styles?.LinkClr} `} title={item.media_icon} href={item.media_link?.url || "#"} dangerouslySetInnerHTML={{__html:item.media_icon}}>
                </Link>
                </li>
            ))}
            </ul>
            </div>
            </div>
            </div>
        </div>
        <div className={styles?.copyRightWrap}>
            <div className={styles?.copyRightTexts}>
                <p className={`${styles?.bottomFootertext} text-6`} >© {new Date().getFullYear()} {footerData.copy_right_text}</p>
                <Link className={`${styles?.bottomFootertext} text-6`} href={footerData.privacy_page?.url}>{footerData.privacy_page?.title}</Link>
            </div>
            <p className={`${styles?.bottomFootertext} text-6`} >{footerData.rights}</p>
        </div>
      </div>
    </nav>
  );
}
