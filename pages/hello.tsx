import Head from 'next/head'
import styles from '../styles/Home.module.css'

interface Product {
  id: number;
  title: string;
  description: string;
}

export async function getServerSideProps(context) {
  const url = "https://dummyjson.com/products"
  const res = await fetch(url)
  const resJson = await res.json()
  const products: Product[] = resJson.products;

  // Pass data to the page via props
  return {
    props: {
      products: products
    }
  }
}

export default function Hello({ products }) {
  return (
    <>
      <Head>
        <title>Hello Page!</title>
        <meta name="description" content="This is the hello page!" />
      </Head>
      <main className={styles.main}>
        {products.map((post) => (
          <div key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.description}</p>
          </div>
        ))}
      </main>
    </>
  )
}
