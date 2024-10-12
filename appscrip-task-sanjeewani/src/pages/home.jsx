import Head from "next/head";
import Image from "next/image";
import Navbar from "../app/components/Navbar/Navbar";
import styles from "./home.module.css";

export default function Home({ products }) {
  return (
    <>
      <Navbar />
      <Head>
        <title>Product Listing | My E-commerce Store</title>
        <meta
          name="description"
          content="Browse through a wide selection of products at our e-commerce store."
        />
        <meta name="keywords" content="e-commerce, products, shopping, store" />
        <meta name="author" content="My E-commerce Store" />
      </Head>

      <div className={styles.container}>
        <h1>Discover Our Products</h1>

        <div className={styles.grid}>
          {products.map((product) => (
            <div className={styles.productCard} key={product.id}>
              <img
                src={product.image}
                alt={product.title}
                width={300}
                height={300}
                objectFit="cover"
              />
              <h2>{product.title}</h2>
              <p>{product.description.substring(0, 100)}...</p>
              <p className={styles.price}>${product.price}</p>
              <button>Add to Cart</button>
            </div>
          ))}
        </div>
      </div>

      <footer>footer</footer>
    </>
  );
}

// Fetching Data
export async function getServerSideProps() {
  const res = await fetch("https://fakestoreapi.com/products");
  const products = await res.json();

  return {
    props: {
      products,
    },
  };
}
