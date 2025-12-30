"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { doc, getDoc, collection, query, where, getDocs, addDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/lib/firebaseClient";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CategoryNavigation } from "@/components/layout/CategoryNavigation";
import { NotificationStrip } from "@/components/home/NotificationStrip";
import { S3Image } from "@/components/common/S3Image";
import type { StoreItem } from "@/types/store";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params?.id as string;
  const [product, setProduct] = useState<StoreItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [recommendedProducts, setRecommendedProducts] = useState<StoreItem[]>([]);
  const [recommendedImages, setRecommendedImages] = useState<Record<string, string>>({});
  const [addingToCart, setAddingToCart] = useState(false);
  const [buying, setBuying] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);

  useEffect(() => {
    if (!productId) {
      console.error("No product ID provided");
      setLoading(false);
      return;
    }
    loadProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      console.log("Loading product with ID:", productId);
      
      if (!productId || productId.trim() === "") {
        console.error("Invalid product ID:", productId);
        setProduct(null);
        setLoading(false);
        return;
      }
      
      let productDoc = null;
      
      // Try 1: Search by Firestore document ID
      try {
        const productDocRef = doc(db, "store_items", productId);
        const docSnap = await getDoc(productDocRef);
        if (docSnap.exists()) {
          productDoc = docSnap;
          console.log("Product found by document ID");
        }
      } catch (error) {
        console.log("Product not found by document ID, trying itemId field");
      }
      
      // Try 2: Search by itemId field if document ID didn't work
      if (!productDoc) {
        try {
          const itemsQuery = query(
            collection(db, "store_items"),
            where("itemId", "==", productId)
          );
          const itemsSnapshot = await getDocs(itemsQuery);
          
          if (!itemsSnapshot.empty) {
            productDoc = itemsSnapshot.docs[0];
            console.log("Product found by itemId field");
          }
        } catch (error) {
          console.error("Error searching by itemId field:", error);
        }
      }
      
      // Try 3: Also try searching by old field name item_id
      if (!productDoc) {
        try {
          const itemsQuery = query(
            collection(db, "store_items"),
            where("item_id", "==", productId)
          );
          const itemsSnapshot = await getDocs(itemsQuery);
          
          if (!itemsSnapshot.empty) {
            productDoc = itemsSnapshot.docs[0];
            console.log("Product found by item_id field");
          }
        } catch (error) {
          console.error("Error searching by item_id field:", error);
        }
      }
      
      if (!productDoc || !productDoc.exists()) {
        console.error("Product not found in Firestore:", {
          productId,
          collection: "store_items",
          searchedBy: ["document ID", "itemId field", "item_id field"]
        });
        setProduct(null);
        setLoading(false);
        return;
      }

      const data = productDoc.data();
      console.log("Product data loaded:", data);
      console.log("Firestore document ID:", productDoc.id);
      
      // Normalize images - handle both array and single value, and both field names
      let normalizedImages: string[] = [];
      if (data.images) {
        normalizedImages = Array.isArray(data.images) ? data.images : [data.images];
      } else if (data.image) {
        normalizedImages = Array.isArray(data.image) ? data.image : [data.image];
      }
      
      // Normalize pricing
      const basePrice = data.basePrice || data.price || 0;
      const compareAtPrice = data.compareAtPrice || data.compare_at_price || data.discount_price || null;
      
      const productData: StoreItem = {
        itemId: productDoc.id,
        ...data,
        images: normalizedImages,
        basePrice: basePrice,
        compareAtPrice: compareAtPrice,
      } as StoreItem;

      setProduct(productData);
      
      // Load recommended products (products from same category, excluding current product)
      if (productData.categoryId) {
        loadRecommendedProducts(productData.categoryId, productData.itemId);
      }
    } catch (error) {
      console.error("Error loading product:", error);
      setProduct(null);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!product) return;
    if (product.trackInventory && product.stockQuantity === 0) return;

    const user = auth.currentUser;
    if (!user) {
      router.push(`/login?redirect=/item/${product.itemId}`);
      return;
    }

    try {
      setAddingToCart(true);
      await addDoc(collection(db, "carts"), {
        userId: user.uid,
        itemId: product.itemId,
        quantity: 1,
        addedAt: serverTimestamp(),
        // Basic denormalized info for easier display
        title: product.title,
        price: product.basePrice,
        image: product.images?.[0] || null,
        type: product.itemType || product.type || "product",
      });
      alert("Added to cart.");
    } catch (error) {
      console.error("Failed to add to cart:", error);
      alert("Failed to add to cart. Please try again.");
    } finally {
      setAddingToCart(false);
    }
  };

  const handleBuyNow = async () => {
    if (!product) return;
    if (product.trackInventory && product.stockQuantity === 0) return;

    const user = auth.currentUser;
    if (!user) {
      router.push(`/login?redirect=/item/${product.itemId}`);
      return;
    }

    try {
      setBuying(true);
      // For now, just ensure it's in the cart, then go to a generic checkout/cart page
      await addDoc(collection(db, "carts"), {
        userId: user.uid,
        itemId: product.itemId,
        quantity: 1,
        addedAt: serverTimestamp(),
        title: product.title,
        price: product.basePrice,
        image: product.images?.[0] || null,
        type: product.itemType || product.type || "product",
        source: "buy_now",
      });
      router.push("/cart");
    } catch (error) {
      console.error("Failed to start checkout:", error);
      alert("Failed to start checkout. Please try again.");
    } finally {
      setBuying(false);
    }
  };

  const handleAddToWishlist = async () => {
    if (!product) return;
    const user = auth.currentUser;

    if (!user) {
      router.push(`/login?redirect=/item/${product.itemId}`);
      return;
    }

    try {
      setWishlistLoading(true);
      await addDoc(collection(db, "wishlists"), {
        userId: user.uid,
        itemId: product.itemId,
        type: "product",
        createdAt: serverTimestamp(),
      });
      alert("Product added to your wishlist.");
    } catch (error) {
      console.error("Failed to add to wishlist:", error);
      alert("Failed to add to wishlist. Please try again.");
    } finally {
      setWishlistLoading(false);
    }
  };

  const loadRecommendedProducts = async (categoryId: string, excludeItemId: string) => {
    try {
      // Simple fetch: get all items, then filter/sort in memory to avoid index issues
      const snapshot = await getDocs(collection(db, "store_items"));
      const products: StoreItem[] = [];
      const imageMap: Record<string, string> = {};
      
      snapshot.forEach((doc) => {
        const data = doc.data();

        // Filter: same category, active status (or missing), and not the current product
        if (
          doc.id !== excludeItemId &&
          data.categoryId === categoryId &&
          (!data.status || data.status === "active")
        ) {
          // Normalize images
          let normalizedImages: string[] = [];
          if (data.images) {
            normalizedImages = Array.isArray(data.images) ? data.images : [data.images];
          } else if (data.image) {
            normalizedImages = Array.isArray(data.image) ? data.image : [data.image];
          }

          const productItem: StoreItem = {
            itemId: doc.id,
            ...data,
            images: normalizedImages,
            basePrice: data.basePrice || data.price || 0,
            compareAtPrice:
              data.compareAtPrice || data.compare_at_price || data.discount_price || null,
          } as StoreItem;

          products.push(productItem);

          // Get first image for each product
          if (normalizedImages.length > 0) {
            imageMap[productItem.itemId] = normalizedImages[0];
          }
        }
      });
      
      // Sort client-side by createdAt desc if present
      products.sort((a, b) => {
        const dateA = (a as any).createdAt?.toMillis?.() || 0;
        const dateB = (b as any).createdAt?.toMillis?.() || 0;
        return dateB - dateA;
      });
      
      // Limit to 4 products
      const limitedProducts = products.slice(0, 4);
      
      setRecommendedProducts(limitedProducts);
      setRecommendedImages(imageMap);
    } catch (error) {
      console.error("Error loading recommended products:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <NotificationStrip />
        <CategoryNavigation />
        <div className="container mx-auto px-4 py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading product...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <NotificationStrip />
        <CategoryNavigation />
        <div className="container mx-auto px-4 py-20">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Product Not Found</h1>
            <p className="text-gray-600 mb-2">The product you're looking for doesn't exist.</p>
            {productId && (
              <p className="text-sm text-gray-500 mb-8">
                Product ID: <code className="bg-gray-200 px-2 py-1 rounded">{productId}</code>
              </p>
            )}
            <div className="flex gap-4 justify-center">
              <Link
                href="/"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Go Back Home
              </Link>
              <button
                onClick={() => router.back()}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const images = product.images || [];
  const mainImage = images[selectedImageIndex] || images[0] || "";

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <NotificationStrip />
      <CategoryNavigation />
      
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <nav className="mb-6 text-sm">
          <ol className="flex items-center space-x-2 text-gray-600">
            <li><Link href="/" className="hover:text-blue-600">Home</Link></li>
            <li>/</li>
            <li><Link href="/" className="hover:text-blue-600">Products</Link></li>
            <li>/</li>
            <li className="text-gray-900">{product.title}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white rounded-lg shadow-lg p-6">
          {/* Left Side: Product Images */}
          <div className="space-y-4">
            {/* Main Big Image */}
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
              {mainImage ? (
                <S3Image
                  src={mainImage}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <svg className="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}
            </div>

            {/* Thumbnail Images */}
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImageIndex === index
                        ? "border-blue-600 ring-2 ring-blue-200"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <S3Image
                      src={img}
                      alt={`${product.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Side: Product Details */}
          <div className="space-y-6">
            {/* Product Type Badge */}
            {product.itemType && (
              <span className="inline-block bg-blue-600 text-white text-xs px-3 py-1 rounded-full uppercase font-semibold">
                {product.itemType.replace("_", " ")}
              </span>
            )}

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              {product.title}
            </h1>

            {/* Pricing */}
            <div className="space-y-2 py-4 border-y border-gray-200">
              {product.compareAtPrice && product.compareAtPrice > product.basePrice && (
                <div className="flex items-center gap-3">
                  <span className="text-2xl text-gray-500 line-through">
                    ₹{product.compareAtPrice.toLocaleString()}
                  </span>
                  <span className="text-sm bg-red-100 text-red-600 font-semibold px-2 py-1 rounded">
                    {Math.round(((product.compareAtPrice - product.basePrice) / product.compareAtPrice) * 100)}% OFF
                  </span>
                </div>
              )}
              <div className="text-4xl font-bold text-blue-600">
                ₹{product.basePrice.toLocaleString()}
              </div>
            </div>

            {/* Short Description */}
            {product.shortDescription && (
              <p className="text-lg text-gray-600">{product.shortDescription}</p>
            )}

            {/* Stock Status */}
            {product.trackInventory && product.stockQuantity !== undefined && (
              <div className="flex items-center gap-2">
                {product.stockQuantity > 0 ? (
                  <>
                    <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                    <span className="text-green-600 font-semibold">
                      {product.stockQuantity} in stock
                    </span>
                  </>
                ) : (
                  <>
                    <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                    <span className="text-red-600 font-semibold">Out of stock</span>
                  </>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3 pt-4">
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={addingToCart || (product.trackInventory && product.stockQuantity === 0)}
                  className={`flex-1 py-4 px-6 rounded-lg font-semibold text-lg transition-colors ${
                    product.trackInventory && product.stockQuantity === 0
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  {product.trackInventory && product.stockQuantity === 0
                    ? "Out of Stock"
                    : addingToCart
                    ? "Adding..."
                    : "Add to Cart"}
                </button>
                <button
                  type="button"
                  onClick={handleAddToWishlist}
                  className="px-4 py-4 rounded-lg border-2 border-gray-300 hover:border-gray-400 transition-colors"
                  title="Add to Wishlist"
                  disabled={wishlistLoading}
                >
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>
              <button
                type="button"
                onClick={handleBuyNow}
                disabled={buying || (product.trackInventory && product.stockQuantity === 0)}
                className="w-full py-4 px-6 rounded-lg font-semibold text-lg border-2 border-blue-600 text-blue-600 hover:bg-blue-50 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {product.trackInventory && product.stockQuantity === 0
                  ? "Out of Stock"
                  : buying
                  ? "Processing..."
                  : "Buy Now"}
              </button>
            </div>

            {/* Full Description */}
            {product.fullDescription && (
              <div className="pt-6 border-t">
                <h2 className="text-xl font-bold text-gray-900 mb-3">Description</h2>
                <div className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                  {product.fullDescription}
                </div>
              </div>
            )}

            {/* Additional Details */}
            {(product.material || product.dimensions || product.warranty) && (
              <div className="pt-6 border-t space-y-2">
                {product.material && (
                  <div className="flex">
                    <span className="font-semibold text-gray-700 w-32">Material:</span>
                    <span className="text-gray-600">{product.material}</span>
                  </div>
                )}
                {product.dimensions && (
                  <div className="flex">
                    <span className="font-semibold text-gray-700 w-32">Dimensions:</span>
                    <span className="text-gray-600">{product.dimensions}</span>
                  </div>
                )}
                {product.warranty && (
                  <div className="flex">
                    <span className="font-semibold text-gray-700 w-32">Warranty:</span>
                    <span className="text-gray-600">{product.warranty}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Recommended for You Section */}
        {recommendedProducts.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Recommended for You</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {recommendedProducts.map((recProduct) => (
                <Link
                  key={recProduct.itemId}
                  href={`/item/${recProduct.itemId}`}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  {/* Product Image */}
                  <div className="aspect-square bg-gray-200 relative overflow-hidden">
                    {recommendedImages[recProduct.itemId] ? (
                      <S3Image
                        src={recommendedImages[recProduct.itemId]}
                        alt={recProduct.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="p-4">
                    <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2">
                      {recProduct.title}
                    </h3>
                    {recProduct.shortDescription && (
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {recProduct.shortDescription}
                      </p>
                    )}
                    <div className="flex items-center justify-between">
                      {recProduct.compareAtPrice && recProduct.compareAtPrice > recProduct.basePrice && (
                        <span className="text-sm text-gray-500 line-through mr-2">
                          ₹{recProduct.compareAtPrice.toLocaleString()}
                        </span>
                      )}
                      <span className="text-xl font-bold text-blue-600">
                        ₹{recProduct.basePrice.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}

