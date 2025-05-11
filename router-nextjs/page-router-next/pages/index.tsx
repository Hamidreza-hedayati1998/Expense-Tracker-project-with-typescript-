import PostList from "../componenets/postList";
import { GetStaticProps, NextPage } from 'next';
import styles from "./home.module.scss"
import SearchFilterPost  from "../componenets/Filterpost";
interface HomeProps {
  posts: {
    userId:string,    
    id:string,
    title:string,
     body:string,
  }[];
}
export const getStaticProps :GetStaticProps <HomeProps> = async()=> {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const posts = await res.json();

  return {
    props: { posts },
  };
};

const Home:NextPage<HomeProps> = ({ posts }) =>{
  return (
    
    <div className={styles.Container}>
      <div className={styles.header}>
      <h1 className={styles.textheader}>Posts</h1>
       <SearchFilterPost posts={posts} />
      </div>
      
      <PostList posts={posts} />
    </div>
  );
};
export default Home;