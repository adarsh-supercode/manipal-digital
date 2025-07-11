// "use client";
// import React, { useEffect, useState } from 'react';
// import Header from './Header'; // Import your Header component

// const fetchData = async () => {
//   try {
//     // Fetch Header Menu
//     const menuResponse = await fetch(`${process.env.NEXT_PUBLIC_SERVER_MENU_URL}`);
//     const menuData = await menuResponse.json();

//     // Fetch General Settings
//     const settingsResponse = await fetch(`${process.env.NEXT_PUBLIC_SERVER_GENERAL_SETTING_URL}`);
//     const settingsData = await settingsResponse.json();

//     return { menuData, settingsData };
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     return { menuData: [], settingsData: {} };
//   }
// };

// // Function to create a nested menu structure
// const createNestedMenu = (items) => {
//   const menuMap = {};

//   // Create a map of all items by ID
//   items.forEach(item => {
//     menuMap[item.id] = { ...item, children: [] };
//   });

//   const nestedMenu = [];

//   items.forEach(item => {
//     if (item.parent_id !== "0") {
//       // If parent exists, push it into parent's children
//       if (menuMap[item.parent_id]) {
//         menuMap[item.parent_id].children.push(menuMap[item.id]);
//       }
//     } else {
//       nestedMenu.push(menuMap[item.id]);
//     }
//   });

//   return nestedMenu;
// };

// const HeaderMain = () => {
//   const [headerMenu, setHeaderMenu] = useState([]);
//   const [generalSettings, setGeneralSettings] = useState(null);

//   useEffect(() => {
//     const getData = async () => {
//       const { menuData, settingsData } = await fetchData();

//       // Find Header Menu
//       const headerMenuData = menuData.find(menu => menu.name === 'Header menu');
      
//       if (headerMenuData) {
//         const nestedMenu = createNestedMenu(headerMenuData.items);
//         setHeaderMenu(nestedMenu);
//       } else {
//         console.log("Header Menu not found");
//       }

//       // Set General Settings
//       setGeneralSettings(settingsData);
//     };

//     getData(); 
//   }, []);
//   if (!headerMenu || !generalSettings) {
//     return <div></div>;
// }

//   return (
//     <div>
//       <Header menu={headerMenu} generalSettings={generalSettings} />
//     </div>
//   );
// };

// export default HeaderMain;



import Header from './Header';

const createNestedMenu = (items) => {
  const menuMap = {};
  items.forEach(item => {
    menuMap[item.id] = { ...item, children: [] };
  });

  const nestedMenu = [];

  items.forEach(item => {
    if (item.parent_id !== "0" && menuMap[item.parent_id]) {
      menuMap[item.parent_id].children.push(menuMap[item.id]);
    } else {
      nestedMenu.push(menuMap[item.id]);
    }
  });

  return nestedMenu;
};

const HeaderMain = async () => {
  try {
    const [menuRes, settingsRes] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_SERVER_MENU_URL}`,  { next: { revalidate: 60 } }),
      fetch(`${process.env.NEXT_PUBLIC_SERVER_GENERAL_SETTING_URL}`,  { next: { revalidate: 60 } })
    ]);

    const [menuData, settingsData] = await Promise.all([
      menuRes.json(),
      settingsRes.json()
    ]);

    const headerMenuData = menuData.find(menu => menu.name === 'Header menu');
    const nestedMenu = headerMenuData ? createNestedMenu(headerMenuData.items) : [];

    return (
      <Header menu={nestedMenu} generalSettings={settingsData} />
    );
  } catch (error) {
    console.error("Error fetching server data:", error);
    return <div>Failed to load header</div>;
  }
};

export default HeaderMain;
