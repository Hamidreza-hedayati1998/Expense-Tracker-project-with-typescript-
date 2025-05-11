
import { GetStaticPaths, GetStaticProps } from 'next';
import styles from './postid.module.scss'
interface Post {
  userId: string;
  id:string ;
  title: string;
  body: string;
}

interface Props {
  post: Post;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const posts: Post[] = await res.json();

  const paths = posts.map(post => ({
    params: { id: post.id.toString() },
  }));

  return {
    paths,
    fallback: false, 
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${params?.id}`);
  const post: Post = await res.json();

  return {
    props: { post },
  };
};

export default function PostPage({ post }: Props) {
  return (
    <div className={styles.Container}>
      <div className={styles.Card}>
        <h1>{post.title}</h1>
        <p>{post.body}</p>
      </div>
    </div>
  );
}
