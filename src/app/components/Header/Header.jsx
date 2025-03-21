"use client";
import React, { useState } from "react";
import * as styles from "./header.module.css";
import Link from "next/link";
import Image from "next/image";
import PrimaryButton from "../Buttons/PrimaryButton";

export default function Header({ menu, generalSettings }) {
  if (!generalSettings || !generalSettings.header) {
    return null;
  }
  const headerData = generalSettings?.header || {};
  
  // State to manage dropdown visibility
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (id) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

  const organizeMenu = (menuItems) => {
    let menuTree = [];
    let menuMap = {};

    // Step 1: Create a map of all menu items
    menuItems.forEach((item) => {
      menuMap[item.ID] = { ...item, children: [] };
    });

    // Step 2: Organize items into a hierarchical structure
    menuItems.forEach((item) => {
      if (item.menu_item_parent === "0") {
        // Main menu item
        menuTree.push(menuMap[item.ID]);
      } else {
        // Submenu item: Attach to its parent
        if (menuMap[item.menu_item_parent]) {
          menuMap[item.menu_item_parent].children.push(menuMap[item.ID]);
        }
      }
    });

    return menuTree;
  };

  const menuTree = organizeMenu(menu);

  return (
    <nav className={styles.headerNav}>
      <div className="container">
        <div className={styles?.headerMenuWrap}>
          {/* Dynamic Logo */}
          <Link href={headerData?.logo_link?.url}>
            <Image
              src={headerData?.logo?.url}
              alt="Company Logo"
              width={150}
              height={50}
            />
          </Link>

          {/* Menu List */}
          <ul className={styles.headermenuList}>
            {menuTree.length > 0 ? (
              menuTree.map((item) => (
                <li
                  key={item.ID}
                  className={`${styles.menuItem} ${item.children.length > 0 ? styles.dropdownbtn : ""} text-2`}
                >
                  <a
                    href={item.url}
                    onClick={(e) => {
                      if (item.children.length > 0) {
                        e.preventDefault(); // Prevent navigation for dropdowns
                        toggleDropdown(item.ID);
                      }
                    }}
                  >
                    {item.title}
                    {item.children.length > 0 && (
                      <svg className={`${openDropdown === item.ID ? styles.rotateSvg : styles.dropdownSvg}`}
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
                  </a>
                  {item.children.length > 0 && (
                    <ul className={`${styles.submenu} ${openDropdown === item.ID ? styles.show : styles.hide}`}>
                      {item.children.map((subItem) => (
                        <li key={subItem.ID} className={styles.submenuItem}>
                          <a href={subItem.url}>{subItem.title}</a>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))
            ) : (
              <li>No menu items</li>
            )}
          </ul>

          {/* Primary Button */}
          <PrimaryButton
            href={headerData?.button?.url || "#"}
            label={headerData?.button?.title || "Connect"}
          />
        </div>
      </div>
    </nav>
  );
}
