import React from "react";
import * as styles from "../Components.module.css";
import Link from 'next/link';

const PrimaryButton = React.forwardRef(function PrimaryButton(
  { href, label, className, target, buttonBlack, blueButton, lightButton, onClick },
  ref
) {
  return (
    <Link
      ref={ref}
      href={href}
      className={`${styles.primaryButton} ${
        buttonBlack ? styles.buttonBlack : ""
      } ${lightButton ? styles.lightButton : ""} ${
        blueButton ? styles.blueButton : ""
      } ${className || ""}`}
      target={target}
      rel={target === "_blank" ? "noopener noreferrer" : undefined}
      data-cursor="bigCursor"
      onClick={onClick}
    >
      <span className={styles?.cbBtnCtaBorder}></span>
      <span className={styles?.cbBtnCtaTitle}>
        <span data-text={label}>{label}</span>
      
      </span>
      <span className={styles?.cbBtnctaRipple}>
          <span></span>
        </span>
    </Link>
  );
});

export default PrimaryButton;
