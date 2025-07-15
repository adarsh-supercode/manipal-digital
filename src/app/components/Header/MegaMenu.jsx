import { useState } from "react";
import styles from "./megamenu.module.css";
import Image from "next/image";
import Link from "next/link";

export default function MegaMenu({ items, onClose,isMobileMenuOpen }) {
  if (!items) return null;

  const [activeImage, setActiveImage] = useState(items[0]?.image);

  return (
    <section
      className={`${styles.bgColor4} ${isMobileMenuOpen ? styles.mobileMegamenu : ''}`} 
      onMouseEnter={() => {}}
      onMouseLeave={onClose}
    >
      <div className={styles.megaMenuWrapper}>
        <div className={styles.menu}>
          {items.map((item, index) => (
            <Link key={index} href={item.link}  className={styles.menuItem}   onMouseEnter={() => setActiveImage(item.image)} onClick={onClose}  data-cursor="bigCursor">
              <h3 className="text-3 text-2-sm">{item.title}</h3>
              <p className="text-6 opacity-06">{item.description}</p>
            </Link>
          ))}
        </div>
        {/* <div className={styles.imageContainer}>
          <Image
            src={activeImage}
            alt="Service"
            className={styles.image}
            width={315}
            height={300}
          />
        </div> */}
      </div>
    </section>
  );
}
