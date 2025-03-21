"use client";
import React, { useEffect, useState } from 'react';
import Header from './Header'; // Import your Header component

const fetchData = async () => {
  try {
    // Fetch Header Menu
    const menuResponse = await fetch(`${process.env.NEXT_PUBLIC_SERVER_MENU_URL}`);
    const menuData = await menuResponse.json();

    // Fetch General Settings
    const settingsResponse = await fetch(`${process.env.NEXT_PUBLIC_SERVER_GENERAL_SETTING_URL}`);
    const settingsData = await settingsResponse.json();
    return { menuData, settingsData };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { menuData: [], settingsData: {} };
  }
};

const HeaderMain = () => {
  const [headerMenu, setHeaderMenu] = useState([]);
  const [generalSettings, setGeneralSettings] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const { menuData, settingsData } = await fetchData();
      

      // Find Header Menu
      const headerMenu = menuData.find(menuData => menuData.menu.name === 'Header menu');
      
      if (headerMenu) {
        setHeaderMenu(headerMenu.items);
      } else {
        console.log("Header Menu not found");
      }

      // Set General Settings
      setGeneralSettings(settingsData);
     
    };

    getData();
  }, []);

  return (
    <div>
      <Header menu={headerMenu} generalSettings={generalSettings} />
    </div>
  );
};

export default HeaderMain;
