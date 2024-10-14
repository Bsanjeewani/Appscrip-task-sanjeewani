import { useState, useEffect } from "react";
import Head from "next/head";
import Navbar from "../app/components/Navbar/Navbar";
import styles from "./home.module.css";
import { Heart } from "../app/images/navbar";
import Footer from "../app/components/Footer/Footer";

export default function Home({ products }) {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [sortOrder, setSortOrder] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(true);
  const [isMobileView, setIsMobileView] = useState(false);

  const categories = [
    "men's clothing",
    "women's clothing",
    "jewelery",
    "electronics",
  ];

  const handleSort = (e) => {
    const order = e.target.value;
    setSortOrder(order);

    let sortedProducts = [...filteredProducts];

    if (order === "lowToHigh") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (order === "highToLow") {
      sortedProducts.sort((a, b) => b.price - a.price);
    } else if (order === "alphabetical") {
      sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
    } else if (order === "recommended") {
      sortedProducts = [...products];
    }

    setFilteredProducts(sortedProducts);
  };

  const handleCategoryChange = (category) => {
    const newSelectedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((item) => item !== category)
      : [...selectedCategories, category];

    setSelectedCategories(newSelectedCategories);

    if (newSelectedCategories.length > 0) {
      const filtered = products.filter((product) =>
        newSelectedCategories.includes(product.category)
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  };

  const handleSelectAll = () => {
    setSelectedCategories(categories);
    setFilteredProducts(
      products.filter((product) => categories.includes(product.category))
    );
  };

  const handleUnselectAll = () => {
    setSelectedCategories([]);
    setFilteredProducts(products);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 1024);
      setShowFilters(window.innerWidth > 1024);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

        {/* Button to toggle filter visibility only on mobile/tablet */}
        {/* {isMobileView && ( */}
        <div className={styles.mainContainer}>
          <button
            className={styles.filterToggleButton}
            onClick={() => setShowFilters(!showFilters)}
          >
            {showFilters ? "Hide Filters" : "Show Filters"}
          </button>
          {/* )} */}

          <div>
            <select
              className={styles.sortContainer}
              onChange={handleSort}
              value={sortOrder}
            >
              <option value="">Sort By</option>
              <option value="recommended">Recommended</option>{" "}
              {/* Added Recommended option */}
              <option value="lowToHigh">Price: Low to High</option>
              <option value="highToLow">Price: High to Low</option>
              <option value="alphabetical">Alphabetical</option>
            </select>
          </div>
        </div>

        <div className={styles.mainContent}>
          {/* Sidebar for filters */}
          <aside
            className={`${styles.sidebar} ${
              showFilters ? styles.show : styles.hide
            }`}
          >
            <div className={styles.filterButtons}>
              <h3 onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                IDEAL FOR {isDropdownOpen ? "▲" : "▼"}
              </h3>
              <button onClick={handleSelectAll}> All</button>
              {/* Dropdown content */}
              {isDropdownOpen && (
                <div>
                  <button onClick={handleUnselectAll}>Unselect All</button>

                  {/* Render checkboxes for each category */}
                  {categories.map((category) => (
                    <div key={category}>
                      <label>
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(category)}
                          onChange={() => handleCategoryChange(category)}
                        />
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </aside>

          {/* Main product grid */}
          <div
            className={`${styles.productGrid} ${
              showFilters && !isMobileView ? "" : styles.fullWidth
            }`}
          >
            <div className={styles.grid}>
              {filteredProducts.map((product) => (
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
                  <p className={styles.signInMessage}>
                    Sign in or Create an account to see pricing.
                  </p>

                  <span>
                    <img src={Heart} alt="Favorite" width={24} height={24} />
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <footer>
          <Footer />
        </footer>
      </div>
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
