'use client';
import React from 'react';
import styles from "../components/blobLoader.module.css"

const BlobLoader = ({isGeometryLoaded}) => {
  return (
    <div className={styles.loaderWrapper}>
        <div className={`${styles.shape} ${styles.loaderWrap}`}>
        <span></span>
        <span></span>
        <span></span>
    </div>
    </div>
  );
};

export default BlobLoader;
