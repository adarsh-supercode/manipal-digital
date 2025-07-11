"use client";
import React, { useEffect, useState } from 'react';
import * as styles from "../component.module.css"
import Image from 'next/image';
import Link from 'next/link';
import PrimaryButton from '@/app/components/Buttons/PrimaryButton';
import { decode } from 'he';

export default function Blogs() {
  const [industries, setIndustries] = useState([]);
  const [blogs, setblogs] = useState([]);
  const [activeIndustry, setActiveIndustry] = useState('all');
  const [services, setServices] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const [loadingIndustries, setLoadingIndustries] = useState(true);
  const [loadingServices, setLoadingServices] = useState(true);
  const [loadingblogs, setLoadingblogs] = useState(true);

  // Loader UI
  const renderLoader = () => (
    <div className={styles.loader}>
      <div className="container">
        <div className={styles.blogGrid}>
          {[...Array(4)].map((_, index) => (
            <img
              key={index}
              src="/assets/placeholder.png"  
              alt="Example Work Image"
             
            />
          ))}
        </div>
      </div>
    </div>
  );

  useEffect(() => {
    const fetchIndustries = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/industry`,);
      const data = await res.json();
      setIndustries(data);
      setLoadingIndustries(false); 
    };
    fetchIndustries();
  }, []);

  const getIndustryNameById = (id) => {
    const match = industries.find((industry) => industry.id === id);
    return match?.name || '';
  };

  useEffect(() => {
    const fetchServices = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/service`, );
      const data = await res.json();
      setServices(data);
      setLoadingServices(false);
    };
    fetchServices();
  }, []);

  const getServiceNameById = (id) => {
    const service = services.find((s) => s.id === id);
    return service?.name || '';
  };

  useEffect(() => {
    const fetchblogs = async () => {
      const url =
        activeIndustry === 'all'
          ? `${process.env.NEXT_PUBLIC_SERVER_URL}/blog?per_page=100&acf_format=standard`
          : `${process.env.NEXT_PUBLIC_SERVER_URL}/blog?industry=${activeIndustry}&per_page=100&acf_format=standard`;

      const res = await fetch(url);
      const data = await res.json();
      setblogs(data);
      setLoadingblogs(false);
    };

    fetchblogs();
  }, [activeIndustry]);

  const renderTab = (id, name) => (
    <li key={id} className={activeIndustry === id ? styles.tabActive : ''}>
      <p onClick={() => setActiveIndustry(id)} className='text-4'>{name}</p>
    </li>
  );

  if (loadingIndustries || loadingServices || loadingblogs) {
    return renderLoader();
  }
  return (
    <div className='container'>
      {/* <div className={styles?.industryTabs}>
        <ul className={styles?.industryTabsLists}>
          {renderTab('all', 'All')}
          {industries.map((industry) => renderTab(industry.id, decode(industry.name)))}
        </ul>
      </div> */}
      {/* <div className={styles?.industryTabsMobile}>
        <div className={styles.dropdownWrapper}>
              <div
        className={styles.dropdownToggle}
        onClick={() => setShowDropdown(!showDropdown)}
        >
          {activeIndustry === 'all' ? (
            <span className={styles.dropdownLabel}>
              <span className={styles.dropdownArrow}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                >
                  <rect
                    x="0.25"
                    y="0.25"
                    width="21.5"
                    height="21.5"
                    rx="1.75"
                    stroke="black"
                    strokeWidth="0.5"
                  />
                  <path
                    d="M18.8949 11.4996H8.35013M4.62809 11.4996H3.10547M4.62809 11.4996C4.62809 11.0061 4.82411 10.5329 5.17304 10.1839C5.52197 9.835 5.99522 9.63898 6.48868 9.63898C6.98214 9.63898 7.45539 9.835 7.80432 10.1839C8.15325 10.5329 8.34928 11.0061 8.34928 11.4996C8.34928 11.993 8.15325 12.4663 7.80432 12.8152C7.45539 13.1641 6.98214 13.3602 6.48868 13.3602C5.99522 13.3602 5.52197 13.1641 5.17304 12.8152C4.82411 12.4663 4.62809 11.993 4.62809 11.4996ZM18.8949 17.1385H13.9891M13.9891 17.1385C13.9891 17.6321 13.7926 18.1059 13.4436 18.4549C13.0946 18.8039 12.6212 19 12.1277 19C11.6342 19 11.1609 18.8031 10.812 18.4542C10.4631 18.1053 10.2671 17.632 10.2671 17.1385M13.9891 17.1385C13.9891 16.645 13.7926 16.172 13.4436 15.823C13.0946 15.474 12.6212 15.278 12.1277 15.278C11.6342 15.278 11.1609 15.474 10.812 15.8229C10.4631 16.1718 10.2671 16.6451 10.2671 17.1385M10.2671 17.1385H3.10547M18.8949 5.8606H16.2449M12.5228 5.8606H3.10547M12.5228 5.8606C12.5228 5.36714 12.7188 4.89389 13.0678 4.54496C13.4167 4.19603 13.89 4 14.3834 4C14.6278 4 14.8697 4.04813 15.0954 4.14163C15.3212 4.23513 15.5263 4.37218 15.6991 4.54496C15.8718 4.71773 16.0089 4.92284 16.1024 5.14858C16.1959 5.37432 16.244 5.61626 16.244 5.8606C16.244 6.10493 16.1959 6.34688 16.1024 6.57262C16.0089 6.79836 15.8718 7.00347 15.6991 7.17624C15.5263 7.34901 15.3212 7.48606 15.0954 7.57957C14.8697 7.67307 14.6278 7.72119 14.3834 7.72119C13.89 7.72119 13.4167 7.52517 13.0678 7.17624C12.7188 6.82731 12.5228 6.35406 12.5228 5.8606Z"
                    stroke="black"
                    strokeWidth="0.8"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <span className="text-2-sm">Filter</span>
            </span>
          ) : (
            decode(industries.find((ind) => ind.id === activeIndustry)?.name || '')
          )} */}
      {/* </div>


          {showDropdown && (
            <div className={styles?.dropdownListWrap}>
              <ul className={styles.dropdownList}>
              <li onClick={() => { setActiveIndustry('all'); setShowDropdown(false); }}>All</li>
              {industries.map((industry) => (
                <li
                  key={industry.id}
                  onClick={() => {
                    setActiveIndustry(industry.id);
                    setShowDropdown(false);
                  }}
                >
                  {decode(industry.name)}
                </li>
              ))}
            </ul>
            </div>
          )}
        </div>
      </div> */}



      <div className={styles.blogGrid}>
        {blogs.map((blog,index) => {
          const image = blog.acf?.thumbnail_image;
          return (
            <Link key={index} className={styles.blogCard} href={`/blog/${blog.slug}`}>
              <Image
                src={image?.url || '/placeholder-image.jpg'}
                alt={image?.alt || 'our-work Image'}
                width={615}
                height={500}
              />
              <div className={styles?.tagsWrap}>
                {/* {blog.industry?.length > 0 && (
                  <div className={`${styles?.tag} ${styles?.industryTag}`}>
                    {blog.industry.map((id) => (
                      <span key={id}>{decodeHtml(getIndustryNameById(id))}</span>
                    ))}
                  </div>
                )} */}
                {blog.service?.length > 0 && (
                  <div className={`${styles?.tag} ${styles?.serviceTag}`}>
                    {blog.service.map((id) => (
                      <span key={id} className='text-7 text-6-sm uppercase'>{getServiceNameById(id)}</span>
                    ))}
                  </div>
                )}
                <div className='text-4 opacity-06'>{new Date(blog.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            })}</div>
              </div>
              <div className={styles?.lineSvg}>
                <svg xmlns="http://www.w3.org/2000/svg" width="385" height="2" viewBox="0 0 385 2" fill="none">
                    <path opacity="0.4" d="M0 1H385" stroke="#000026" strokeWidth="0.8" strokeDasharray="6 6"/>
                </svg>
              </div>
              <h3 dangerouslySetInnerHTML={{ __html: blog.title.rendered }} className={`${styles?.postTitle} text-1 text-2-md text-2-sm`} />
              <div className={styles?.readMorebtn}>
                    <PrimaryButton
                    href={`/blog/${blog.slug}`}
                    label="Read more"
                    buttonBlack={true}
                    />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
