'use client'; 
import React, { useEffect } from 'react';
import * as styles from "../component.module.css"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/swiper-bundle.css';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import Link from 'next/link';

export default function BlogInnerpage({ blog , allPosts = [],industryTag}) {

  const { industryTerms = [], serviceTerms = [] } = blog || {};
  const author = blog.acf?.author;
  const readTime = blog.acf?.read_time;
  const featuredMedia = blog._embedded?.['wp:featuredmedia']?.[0];

  useEffect(() => {
    import('swiper/bundle').then(({ default: Swiper }) => {
      new Swiper('.swiper-container', {
        loop: true,
        slidesPerView: 2,
        spaceBetween: 20,
        autoplay: {
          delay: 2000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        },
        pagination: {
          el: '.swiper-pagination',
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      });
    });
  }, []);  

  return (
    <section className='padding-top-xl'>
        <div className={styles?.innerpageContainer}>
            <div className="container">
                <div className={styles?.titleSec}>
                  <div className={styles?.InnerpageTitlewrap}>
                    {/* <p className='text-4 uppercase'>{blog.type.replace(/-/g, ' ')}</p> */}
                    <h1  dangerouslySetInnerHTML={{ __html: blog.title.rendered }} className={`${styles?.innerpageTitle} heading-2 heading-4-sm heading-3-md `}/>
                  </div> 
                    {author?.name && (
                        <div className={styles.authorWrap}>
                          <div className={styles?.nameWrap}>
                            <p className='text-7'>Written by</p>
                            <p className={`${styles.authorName} text-4 `}>{author.name}</p>
                          </div>
                          {author?.image?.url && (
                            <img
                              src={author.image.url}
                              alt={author.name}
                              className={styles.authorImage}
                              data-cursor="none"
                            />
                          )}
                          
                        </div>
                      )}

                  {/* <div className={styles?.tagsWrap}> */}
                    {/* <div className={`${styles?.tag} ${styles?.industryTag}`}>
                      {industryTerms.length > 0 && (
                        industryTerms.map(term => term.name).join(', ')
                      )}
                    </div>
                    <div className={`${styles?.tag} ${styles?.serviceTag}`}>
                      {serviceTerms.length > 0 && (
                        serviceTerms.map(term => term.name).join(', ')
                      )}
                    </div> */}
                  {/* </div> */}
                </div>
                <div  className={styles?.typeDatetimeWrap}>
                  <div className={styles?.typeDate}>
                      <p className='text-4 uppercase'>{blog.type.replace(/-/g, ' ')}</p>
                      <p className='text-4'>{new Date(blog.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            })}
                      </p>
                  </div>
                  {/* <p className='text-4'>{readTime.time}</p> */}
                </div>
                {featuredMedia && (
                  <div className={styles.featuredImageWrap}>
                    <img
                      src={featuredMedia.source_url}
                      alt={featuredMedia.alt_text || featuredMedia.title?.rendered || 'Featured image'}
                    />
                  </div>
                )}

                </div>  

               
            

            <div className="container">
              {/* THIS is where your slider lives */}
              <div   className={styles?.blogContentWrap}>
              <div dangerouslySetInnerHTML={{ __html: blog.content.rendered }}  className={styles?.blogContent}/>
              </div>
            </div>  
            <div className={styles?.innovationsWrap}>
              <div className={styles?.innovationsTitle}>
                <p className="heading-3">Discover our innovations</p>
              </div>
              <div className={styles?.innovationsSlider}>
                  <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    slidesPerView={2.5}
                    spaceBetween={30}
                    centeredSlides={true}
                    loop={true}
                    autoplay={false}
                    pagination={{ clickable: true }}
                    // navigation={true}
                    breakpoints={{
                      320: {
                        slidesPerView: 1,
                      },
                      768: {
                        slidesPerView: 2,
                      },
                      1024: {
                        slidesPerView: 3,
                      },
                    }}
                    className={styles.ourWorkSwiper}
                    data-cursor="dragButton"
                  >
                    {allPosts
                    .filter((post) => post.id !== blog.id).map((post) => (
                      <SwiperSlide key={post.id}>
                        <Link key={post.id} className={styles.ourworkCard}  href={`/blog/${post.slug}`}>
                          <img src={post.acf.thumbnail_image.url} />
                          <div className={styles.tagsWrap}>
                            {/* <div className={`${styles.tag} ${styles.industryTag} text-7 uppercase`}>
                              {post.industryTerms?.map((term) => term.name).join(', ')}
                            </div> */}
                            {post.serviceTerms?.length > 0 && (
                            <div className={`${styles.tag} ${styles.serviceTag} text-7 text-6-sm uppercase`}>
                              {post.serviceTerms?.map((term) => term.name).join(', ')}
                            </div>
                            )}
                          </div>
                          <h3 dangerouslySetInnerHTML={{ __html: post.title.rendered }}  className={styles?.postTitlePt}/>                     
                        </Link>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
            </div>
        </div>
    </section>
  );
}
