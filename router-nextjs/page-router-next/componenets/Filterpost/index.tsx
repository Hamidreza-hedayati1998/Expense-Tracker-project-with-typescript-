import { useState } from "react";
import styles from "./search.module.scss"
import Link from "next/link";
interface SearchFilterPostProps{
  posts:{userId:string,    
    id:string,
    title:string,
    body:string,}[];  

};
 const SearchFilterPost=({posts}:SearchFilterPostProps)=>{
  const [SearchTerms,setSerachTerms] = useState('');
  const filteredPost=posts.filter(post=>
   SearchTerms.trim() !=='' && post.title.toLowerCase().includes(SearchTerms.trim().toLowerCase())
  );
  return(
    <div className={styles.SearchContainer}>
        <input 
        type="text"
        placeholder="Enter title posts"
        value={SearchTerms}
        onChange={e => setSerachTerms(e.target.value) }
        className={styles.SearchInput}
        />
        {SearchTerms && filteredPost.length > 0 &&
         (<div className={styles.ResultBox}>
            {filteredPost.map(post=>(
                <Link key={post.id} href={`/posts/${post.id}`} className={styles.ResultItem}>
                {post.title}
              </Link>
            ))}
        </div>
        )}
        
    </div>
  )
}
export default SearchFilterPost;