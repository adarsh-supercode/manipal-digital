'use client'; 
import React, { useEffect } from 'react';
import * as styles from "../components.module.css"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/swiper-bundle.css';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import Link from 'next/link';
import { decode } from 'he';

export default function Innerpage({ portfolio , allPosts = [],industryTag}) {

  const { industryTerms = [], serviceTerms = [],acf } = portfolio;
  const featuredMedia = portfolio._embedded?.['wp:featuredmedia']?.[0];
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
        breakpoints: {
          // when window width is >= 320px
          320: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          // when window width is >= 640px
          640: {
            slidesPerView: 2,
            spaceBetween: 15,
          },
          // when window width is >= 1024px
          1024: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          // when window width is >= 1440px
          1440: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
        },
      });
    });
  }, []);  

  return (
    <section className='padding-top-xl'>
        <div className={styles?.innerpageContainer}>
            <div className="container">
                <div>
                  <div className={styles?.InnerpageTitlewrap}>
                    <p className='text-4 text-4-md text-6-sm  uppercase'>{portfolio.type.replace(/-/g, ' ')}</p>
                    <h1 dangerouslySetInnerHTML={{ __html: portfolio.title.rendered }}  className={`${styles?.InnerpageTitle} heading-2 heading-3-md heading-4-sm `}/>
                  </div> 
                  <div className={styles?.tagsWrap}>
                    <div className={`${styles?.tag} ${styles?.industryTag} uppercase text-6-sm`}>
                      {industryTerms.length > 0 && (
                        industryTerms.map(term => decode(term.name)).join(', ')
                      )}
                    </div>
                    <div className={`${styles?.tag} ${styles?.serviceTag} uppercase text-6-sm`}>
                      {serviceTerms.length > 0 && (
                        serviceTerms.map(term => decode(term.name)).join(', ')
                      )}
                    </div>
                  </div>
                </div>
                </div>  

                {acf?.video?.url ? (
                  <video src={acf.video.url} autoPlay loop muted playsInline className={styles.backgroundVideo} />
                ) : (
                  featuredMedia && (
                    <div className={styles.featuredImageWrap}>
                      <img
                        src={featuredMedia.source_url}
                        alt={featuredMedia.alt_text || featuredMedia.title?.rendered || 'Featured image'}
                      />
                    </div>
                  )
                )}
            

           <div className={styles?.singlepageContentWrap}>
           <div className="container">
              {/* THIS is where your slider lives */}
              <div dangerouslySetInnerHTML={{ __html: portfolio.content.rendered }} />
            </div>  
           </div>
            <div className={styles?.innovationsWrap}>
              <div className={styles?.innovationsTitle}>
                <p className="heading-3 heading-4-md">Discover our innovations</p>
              </div>
              <div className={styles?.innovationsSlider}>
                  <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    // slidesPerView={2.5}
                    spaceBetween={30}
                    centeredSlides={true}
                    loop={true}
                    autoplay={true}
                    pagination={{ clickable: true }}
                    // navigation={true}
                    breakpoints={{
                      320: {
                        slidesPerView: 1.5,
                      },
                      375: {
                        slidesPerView: 1.2,
                      },
                      768: {
                        slidesPerView: 2.8,
                      },
                      1024: {
                        slidesPerView: 2.8,
                      },
                    }}
                    className={styles.ourWorkSwiper}
                    data-cursor="dragButton"
                  >
                    {allPosts.map((post) => (
                      <SwiperSlide key={post.id}>
                        <Link key={post.id} className={styles.ourworkCard} href={`/our-portfolio/${post.slug}`}>
                          <img src={post.acf.thumbnail_image.url} />
                          <div className={styles.tagsWrap}>
                            <div className={`${styles.tag} ${styles.industryTag} uppercase text-7 text-7-md text-6-sm`}>
                              {post.industryTerms?.map((term) => decode(term.name)).join(', ')}
                            </div>
                            <div className={`${styles.tag} ${styles.serviceTag} uppercase text-7 text-7-md text-6-sm`}>
                              {post.serviceTerms?.map((term) => decode(term.name)).join(', ')}
                            </div>
                          </div>
                          <h3 dangerouslySetInnerHTML={{ __html: post.title.rendered }}  className={`${styles?.postTitlePt} text-1 texy-2-md text-2-sm`}/>                     
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
