import styles from "./postlist.module.scss"
import Link from 'next/link';
interface PostListProps {
    posts: {
      userId:string,    
      id:string,
      title:string,
       body:string,
    }[];
  }

export default function PostsList({ posts }:PostListProps) {
    return (
      <div className={styles.Container}>
        {posts.map(p => (
         <>
         <div className={styles.List}>
          <li  key={p.id}>
          {p.title}
          </li>
          <button className={styles.btn}>
            <Link href={`/posts/${p.id}`}>go to Link</Link>
          </button>
         </div>
         
         
         
         </>
           
         
        ))}
      </div>
    );
  }