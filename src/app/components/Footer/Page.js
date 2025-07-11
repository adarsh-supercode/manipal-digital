"use client";
import React, { useEffect, useState } from 'react';
import Footer from './Footer';

const fetchData = async () => {
  try {
    // Fetch Footer Menu
    const menuResponse = await fetch(`${process.env.NEXT_PUBLIC_SERVER_MENU_URL}`, {
      next: { revalidate: 60 },
    });
    const menuData = await menuResponse.json();

    // Fetch General Settings
    const settingsResponse = await fetch(`${process.env.NEXT_PUBLIC_SERVER_GENERAL_SETTING_URL}`, {
      next: { revalidate: 60 },
    });
    const settingsData = await settingsResponse.json();
    return { menuData, settingsData };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { menuData: [], settingsData: {} };
  }
};

const FooterMain = () => {
  const [footerMenu, setfooterMenu] = useState([]);
  const [generalSettings, setGeneralSettings] = useState(null);
  const [footerMenuTwo, setfooterMenuTwo] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const { menuData, settingsData} = await fetchData();
      

      // Find Header Menu
      // const footerMenu = menuData.find(menuData => menuData.menu.name === 'Footer Menu');
      const footerMenu = menuData.find(menu => menu.name === 'Footer Menu');
      const footerMenuTwo = menuData.find(menu => menu.name === 'Footer menu two');
      
      if (footerMenu) {
        setfooterMenu(footerMenu.items);
      } else {
        console.log("Footer Menu not found");
      }
      if (footerMenuTwo) {
        setfooterMenuTwo(footerMenuTwo.items);
      } else {
        console.log("Footer Menu not found");
      }

      // Set General Settings
      setGeneralSettings(settingsData);
     
    };

    getData();
  }, []);

  return (
    <div>
      <Footer menu={footerMenu} generalSettings={generalSettings} menuTwo={footerMenuTwo}/>
      
    </div>
  );
};

export default FooterMain;
