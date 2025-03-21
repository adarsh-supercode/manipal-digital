import React from "react";
import * as styles from "../Components.module.css";

export default function PrimaryButton({ href, label, className, target, buttonBlack }) {
  return (
    <a
      href={href}
      className={`${styles.primaryButton} ${buttonBlack ? styles.buttonBlack : ""} ${className || ""}`}
      target={target}
      rel={target === "_blank" ? "noopener noreferrer" : undefined}
    >
      {label}
    </a>
  );
}
