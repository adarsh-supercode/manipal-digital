import React from 'react';
import styles from '../css/featuredpost.module.css'
import Image from 'next/image'
import PrimaryButton from '@/app/components/Buttons/PrimaryButton';
import Link from 'next/link';
import { decode } from 'he';
export default function FeaturedPosts({ posts}) {
  const { main_post, sub_posts } = posts || {};

  const getPostUrl = (post) => {
    if (!post) return "#";
  

    const { post_type, post_name } = post;
  
    if (!post_type || !post_name) return "#";
  
    switch (post_type) {
      case "blog":
        return `/blog/${post_name}`;
      case "our-portfolio":
        return `/our-portfolio/${post_name}`;
      case "case_study":
        return `/case-studies/${post_name}`;
      default:
        return `/${post_name}`;
    }
  };

  return (
    <div className={` row`}>
      <div className='d-flex justify-content-between color-4 mb-5'>
        <h2 className='heading-3 heading-4-sm'>Insights</h2>
        <div className='hideMobile'><PrimaryButton href={"/our-portfolio"} label={"View All"} /></div>
      </div>
      <div className={`${styles?.featuredPostWrap}`}>
      <div className={`${styles?.featuredPostMain} col-lg-5`} data-cursor="exploreButton">
      {main_post && (
        <Link href={getPostUrl(main_post)}>
              <div className={`${styles.mainPostContainer} d-flex flex-column gap-10 align-items-start color-4`}>
                  <Image
                  src={main_post?.acf?.thumbnail_image?.url}
                  className={styles?.featuredfirstPostImage}
                  width={510}
                  height={400}
                  alt='Shape logo'
                  style={{ width: '100%', height: 'auto' }}
                />
                {main_post?.terms?.industry?.[0]?.name && (
               <span className='categoryTag text-5'>
                  {decode(main_post?.terms?.industry?.[0]?.name || '')}
                </span>
                 )}
                <h2 className='heading-6 text-2-sm '>{main_post.post_title}</h2>
              </div>
              </Link>
            )}

      </div>
      
      <div className={`${styles?.subPostWrap} d-flex flex-column gap-20 color-4 col-lg-7 `}  >
        {sub_posts &&
          sub_posts.map((post, index) => (
            <Link href={getPostUrl(post)} key={index} data-cursor="exploreButton">
            <div  className={styles.subPostContainer}>
          <Image
              src={post?.acf?.thumbnail_image?.url} 
              width={410}
              height={230}
              alt="Shape logo"
            />
            <div className={`${styles?.featuredpostContent} d-flex flex-column gap-10 align-items-start`}>
            {post?.terms?.industry?.[0]?.name && (
               <span className='categoryTag text-5'>
                  {decode(post?.terms?.industry?.[0]?.name || '')}
                </span>
                 )}
              <h3 className='heading-6 text-2-sm '>{post.post_title}</h3>
              <p dangerouslySetInnerHTML={{ __html: post.post_excerpt }} />
            </div>
            </div>
            </Link>
          ))}
      </div>
      </div>
      <div className={`${styles?.viewBtn} hideDesktop`}><PrimaryButton href={"/our-portfolio"} label={"View All"} /></div>
    </div>
  );
}
