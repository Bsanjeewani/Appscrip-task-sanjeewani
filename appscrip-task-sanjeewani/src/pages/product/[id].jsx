import { useRouter } from "next/router";
import Head from "next/head";
import styles from "./product.module.css";

export default function ProductDetails({ product }) {
  const router = useRouter();
  const { id } = router.query;

  if (!product) {
    return <p>Loading...</p>;
  }

  // Handler for navigating back to the homepage
  const handleBackToHome = () => {
    router.push("/home"); // Navigate back to home page
  };

  return (
    <>
      <Head>
        <title>{product.title} | My E-commerce Store</title>
        <meta name="description" content={product.description} />
      </Head>

      <div className={styles.container}>
        <button className={styles.backButton} onClick={handleBackToHome}>
          Back to Home
        </button>
        <h1>{product.title}</h1>
        <div className={styles.productDetail}>
          <img
            src={product.image}
            alt={product.title}
            width={500}
            height={500}
            objectFit="cover"
          />
          <div className={styles.productInfo}>
            <p>
              <strong>Description</strong>
              <div>{product.description}</div>
            </p>
            <p>
              <strong>Category</strong>
              <div> {product.category}</div>
            </p>
            <p>
              <strong>Price</strong>

              <div>${product.price}</div>
            </p>
            <button className={styles.addToCart}>Add to Cart</button>
          </div>
        </div>

        {/* Back to Home Button */}
      </div>
    </>
  );
}

// Fetch product details based on ID
export async function getServerSideProps(context) {
  const { id } = context.params;
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  const product = await res.json();

  return {
    props: {
      product,
    },
  };
}
