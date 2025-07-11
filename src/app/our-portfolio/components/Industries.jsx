"use client";
import React, { useEffect, useState } from 'react';
import * as styles from "../components.module.css";
import Image from 'next/image';
import Link from 'next/link';
import { decode } from 'he';
export default function Industries() {
  const [industries, setIndustries] = useState([]);
  const [ourWorks, setOurWorks] = useState([]);
  const [activeIndustry, setActiveIndustry] = useState('all');
  const [services, setServices] = useState([]);

  const [loadingIndustries, setLoadingIndustries] = useState(true);
  const [loadingServices, setLoadingServices] = useState(true);
  const [loadingOurWorks, setLoadingOurWorks] = useState(true);

  // Fetch industries, services, and portfolio (ourWorks) in parallel
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Use Promise.all to parallelize the fetch requests
        const [industriesData, servicesData, ourWorksData] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/industry`).then((res) => res.json()),
          fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/service`).then((res) => res.json()),
          fetch(
            activeIndustry === 'all'
              ? `${process.env.NEXT_PUBLIC_SERVER_URL}/our-portfolio?per_page=100&acf_format=standard`
              : `${process.env.NEXT_PUBLIC_SERVER_URL}/our-portfolio?industry=${activeIndustry}&per_page=100&acf_format=standard`
          ).then((res) => res.json())
        ]);

        setIndustries(industriesData);
        setServices(servicesData);
        setOurWorks(ourWorksData);
        setLoadingIndustries(false);
        setLoadingServices(false);
        setLoadingOurWorks(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [activeIndustry]);

  const getIndustryNameById = (id) => {
    const match = industries.find((industry) => industry.id === id);
    return match?.name || '';
  };

  const getServiceNameById = (id) => {
    const service = services.find((s) => s.id === id);
    return service?.name || '';
  };

  const renderTab = (id, name) => (
    <li key={id} className={activeIndustry === id ? styles.tabActive : ''}>
      <p onClick={() => setActiveIndustry(id)} className='text-4'>{name}</p>
    </li>
  );

  // Loader UI
  const renderLoader = () => (
    <div className={styles.loader}>
      <div className="container">
        <div className={styles.ourWorkGrid}>
          {[...Array(4)].map((_, index) => (
            <Image
              key={index}
              src="/assets/placeholder.png"  
              alt="Example Work Image"
              width={615}
              height={500}
            />
          ))}
        </div>
      </div>
    </div>
  );
  

  // Show loader if any of the data is still loading
  if (loadingIndustries || loadingServices || loadingOurWorks) {
    return renderLoader();
  }

  return (
    <div className='container'>
      <div className={styles.ourWorkGrid}>
        {ourWorks.map((ourwork) => {
          const image = ourwork.acf?.thumbnail_image;
          return (
            <Link key={ourwork.id} className={styles.ourworkCard} href={`/our-portfolio/${ourwork.slug}`}>
              <Image
                src={image?.url || '/placeholder-image.jpg'}
                alt={image?.alt || 'our-work Image'}
                width={615}
                height={500}
                loading="lazy" // Lazy loading images
              />
              <div className={styles?.tagsWrap}>
                {ourwork.industry?.length > 0 && (
                  <div className={`${styles?.tag} ${styles?.industryTag}`}>
                    {ourwork.industry.map((id) => (
                      <span key={id} className='uppercase text-7 text-7-md text-6-sm'>{decode(getIndustryNameById(id))}</span>
                    ))}
                  </div>
                )}
                {ourwork.service?.length > 0 && (
                  <div className={`${styles?.tag} ${styles?.serviceTag}`}>
                    {ourwork.service.map((id) => (
                      <span key={id} className='uppercase text-7 text-7-md text-6-sm'>{getServiceNameById(id)}</span>
                    ))}
                  </div>
                )}
              </div>
              <h3 dangerouslySetInnerHTML={{ __html: ourwork.title.rendered }} className={`${styles?.postTitle} text-1 text-2-md text-2-sm`} />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
