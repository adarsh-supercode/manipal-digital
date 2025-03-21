import React from 'react';
export default function FeaturedPosts({ posts }) {
  const { main_post, sub_posts } = posts || {};
  console.log('posts: ', posts);

  return (
    <div>
      {main_post && (
        <div>
          <h2>{main_post.post_title}</h2>
          <p dangerouslySetInnerHTML={{ __html: main_post.post_content }} />
        </div>
      )}

      
      <div>
        {sub_posts &&
          sub_posts.map((post, index) => (
            <div key={index}>
              <h3>{post.post_title}</h3>
              <p dangerouslySetInnerHTML={{ __html: post.post_excerpt }} />
            </div>
          ))}
      </div>
    </div>
  );
}
