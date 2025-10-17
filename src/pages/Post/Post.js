import React from 'react'
import styles from "./Post.module.css"

//hooks
import { useParams } from 'react-router-dom';
import { UseFetchDocument } from '../../hooks/useFetchDocument';

const Post = () => {

  const { id } = useParams();
  const {document:post,loading} = UseFetchDocument("posts",id)
  return (
    <div className={styles.post_container}>
      {loading && <p>Carrehando Posts... </p>}
      {post && (
        <>
          <h1>{post.title} </h1>
          <img src={post.image} alt={post.title} />
          <p>{post.body}</p>
          <h3>Este post trata sobre : </h3>
          <div className={styles.tags}>
            { post && post.tagsArray.map((tag) => (
              <p key={tag}>
                <span>#</span>
                {tag}
              </p>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Post