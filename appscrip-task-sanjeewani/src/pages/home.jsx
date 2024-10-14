import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";

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
        <div className={styles.herocontainer}>
          <h1>Discover Our Products</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur. Amet est posuere rhoncus
            scelerisque. Dolor integer scelerisque nibh amet mi ut elementum
            dolor.
          </p>
        </div>
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
          {/* sort */}
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
          <div className={styles.sidebarContent}>
            <aside
              className={`${styles.sidebar} ${
                showFilters ? styles.show : styles.hide
              }`}
            >
              <div className={styles.filterButtons}>
                <h3 onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                  <div> IDEAL FOR </div>
                  <div>{isDropdownOpen ? "ᐱ" : "ᐯ"}</div>
                </h3>
                <div className={styles.all} onClick={handleSelectAll}>
                  {" "}
                  All
                </div>
                {/* Dropdown content */}
                {isDropdownOpen && (
                  <div>
                    <div
                      className={styles.unselect}
                      onClick={handleUnselectAll}
                    >
                      Unselect All
                    </div>

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
              {/* 2 */}

              <div className={styles.line}></div>
              <div className={styles.filterButtons}>
                <h3 onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                  <div> OCCASION </div>
                  <div>{isDropdownOpen ? "ᐱ" : "ᐯ"}</div>
                </h3>
                <div className={styles.all} onClick={handleSelectAll}>
                  {" "}
                  All
                </div>
              </div>
              <div className={styles.line}></div>

              {/* 3 */}
              <div className={styles.filterButtons}>
                <h3 onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                  <div> WORK </div>
                  <div>{isDropdownOpen ? "ᐱ" : "ᐯ"}</div>
                </h3>
                <div className={styles.all} onClick={handleSelectAll}>
                  {" "}
                  All
                </div>
              </div>
              <div className={styles.line}></div>

              {/* 4 */}
              <div className={styles.filterButtons}>
                <h3 onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                  <div> FABRIC </div>
                  <div>{isDropdownOpen ? "ᐱ" : "ᐯ"}</div>
                </h3>
                <div className={styles.all} onClick={handleSelectAll}>
                  {" "}
                  All
                </div>
              </div>

              {/* 5 */}
              <div className={styles.line}></div>

              <div className={styles.filterButtons}>
                <h3 onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                  <div> SEGMENT </div>
                  <div>{isDropdownOpen ? "ᐱ" : "ᐯ"}</div>
                </h3>
                <div className={styles.all} onClick={handleSelectAll}>
                  {" "}
                  All
                </div>
              </div>
              {/* 6 */}
              <div className={styles.line}></div>

              <div className={styles.filterButtons}>
                <h3 onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                  <div> SUITABLE FOR </div>
                  <div>{isDropdownOpen ? "ᐱ" : "ᐯ"}</div>
                </h3>
                <div className={styles.all} onClick={handleSelectAll}>
                  {" "}
                  All
                </div>
              </div>

              {/* 7 */}
              <div className={styles.line}></div>

              <div className={styles.filterButtons}>
                <h3 onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                  <div> RAW MATERIALS </div>
                  <div>{isDropdownOpen ? "ᐱ" : "ᐯ"}</div>
                </h3>
                <div className={styles.all} onClick={handleSelectAll}>
                  {" "}
                  All
                </div>
              </div>

              <div className={styles.line}></div>

              {/* 8 */}
              <div className={styles.filterButtons}>
                <h3 onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                  <div> PATTERN </div>
                  <div>{isDropdownOpen ? "ᐱ" : "ᐯ"}</div>
                </h3>
                <div className={styles.all} onClick={handleSelectAll}>
                  {" "}
                  All
                </div>
              </div>
            </aside>
          </div>
          {/* Main product grid */}
          <div
            className={`${styles.productGrid} ${
              showFilters && !isMobileView ? "" : styles.fullWidth
            }`}
          >
            <div className={styles.grid}>
              {filteredProducts.map((product) => (
                <div className={styles.productCard} key={product.id}>
                  <Link href={`/product/${product.id}`}>
                    <img
                      src={product.image}
                      alt={product.title}
                      width={300}
                      height={300}
                      objectFit="cover"
                    />
                  </Link>
                  <h2>{product.title}</h2>
                  <p>{product.description.substring(0, 100)}...</p>
                  <p className={styles.price}>${product.price}</p>
                  <p className={styles.signInMessage}>
                    Sign in or Create an account to see pricing.
                  </p>

                  <span className={styles.icon}>
                    <img
                      src={Heart}
                      alt="Favorite"
                      width={24}
                      height={24}
                      objectFit="cover"
                    />
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
