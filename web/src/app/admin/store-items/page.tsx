"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { collection, getDocs, doc, deleteDoc, query, orderBy, where } from "firebase/firestore";
import { db } from "@/lib/firebaseClient";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { S3Image } from "@/components/common/S3Image";
import type { StoreItem, StoreItemType, Category, Brand } from "@/types/store";

export default function StoreItemsPage() {
  const router = useRouter();
  const [items, setItems] = useState<(StoreItem & { id: string })[]>([]);
  const [filteredItems, setFilteredItems] = useState<(StoreItem & { id: string })[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [totalProductsCount, setTotalProductsCount] = useState<number>(0);

  useEffect(() => {
    loadItems();
    loadCategories();
    loadBrands();
    loadTotalProductsCount();
  }, [filterType, filterStatus]);

  useEffect(() => {
    // Filter items based on search query
    if (!searchQuery.trim()) {
      setFilteredItems(items);
    } else {
      const query = searchQuery.toLowerCase().trim();
      const filtered = items.filter((item) =>
        item.title?.toLowerCase().includes(query) ||
        item.itemId?.toLowerCase().includes(query) ||
        item.shortDescription?.toLowerCase().includes(query)
      );
      setFilteredItems(filtered);
    }
  }, [searchQuery, items]);

  const loadItems = async () => {
    try {
      setLoading(true);
      // Fetch all items without orderBy to avoid index requirements
      const snapshot = await getDocs(collection(db, "store_items"));
      const itemsData: (StoreItem & { id: string })[] = [];
      
      snapshot.forEach((doc) => {
        const data = doc.data();
        itemsData.push({ 
          id: doc.id, 
          ...data,
          // Map old field names to new ones for backward compatibility
          itemId: data.itemId || data.item_id || "",
          itemType: data.itemType || data.type || "physical_product",
          categoryId: data.categoryId || data.category_id || "",
          basePrice: data.basePrice || data.price || 0,
          compareAtPrice: data.compareAtPrice || data.compare_at_price || data.discount_price || null,
        } as StoreItem & { id: string });
      });

      // Filter and sort in memory
      let filtered = itemsData;
      
      if (filterType !== "all") {
        filtered = filtered.filter(item => {
          const itemType = item.itemType || (item as any).type;
          return itemType === filterType;
        });
      }
      
      if (filterStatus !== "all") {
        filtered = filtered.filter(item => item.status === filterStatus);
      }

      // Sort by createdAt (newest first) - handle both field names
      filtered.sort((a, b) => {
        const dateA = (a as any).createdAt?.toMillis?.() || (a as any).created_at?.toMillis?.() || 0;
        const dateB = (b as any).createdAt?.toMillis?.() || (b as any).created_at?.toMillis?.() || 0;
        return dateB - dateA;
      });

      setItems(filtered);
      setFilteredItems(filtered);
    } catch (error) {
      console.error("Error loading items:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      const snapshot = await getDocs(collection(db, "categories"));
      const categoriesData: Category[] = [];
      snapshot.forEach((doc) => {
        categoriesData.push({ categoryId: doc.id, ...doc.data() } as Category);
      });
      setCategories(categoriesData);
    } catch (error) {
      console.error("Error loading categories:", error);
    }
  };

  const loadBrands = async () => {
    try {
      const snapshot = await getDocs(collection(db, "brands"));
      const brandsData: Brand[] = [];
      snapshot.forEach((doc) => {
        brandsData.push({ brandId: doc.id, ...doc.data() } as Brand);
      });
      setBrands(brandsData);
    } catch (error) {
      console.error("Error loading brands:", error);
    }
  };

  const loadTotalProductsCount = async () => {
    try {
      // Count all items without orderBy to avoid index requirements
      const snapshot = await getDocs(collection(db, "store_items"));
      setTotalProductsCount(snapshot.size);
    } catch (error) {
      console.error("Error loading total products count:", error);
      setTotalProductsCount(0);
    }
  };

  const getCategoryName = (categoryId: string) => {
    const category = categories.find(cat => cat.categoryId === categoryId);
    return category?.name || "N/A";
  };

  const getBrandName = (brandId: string | null) => {
    if (!brandId) return "N/A";
    const brand = brands.find(b => b.brandId === brandId);
    return brand?.name || "N/A";
  };

  const getStockStatus = (item: StoreItem & { id: string }) => {
    if (item.itemType === "digital_product") {
      return "N/A";
    }
    if (!item.trackInventory) {
      return "In stock";
    }
    const stock = item.stockQuantity || 0;
    return stock > 0 ? "In stock" : "Out of stock";
  };

  const formatDate = (date: any) => {
    if (!date) return "N/A";
    try {
      const dateObj = date.toDate ? date.toDate() : new Date(date);
      return dateObj.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch (error) {
      return "N/A";
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return;
    try {
      await deleteDoc(doc(db, "store_items", id));
      loadItems();
    } catch (error) {
      console.error("Error deleting item:", error);
      alert("Failed to delete item");
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Items</h1>
            <p className="text-gray-600 mt-2">Total Products: {totalProductsCount.toLocaleString()}</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => router.push("/admin/store-items/populate-dummy")}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              📦 Populate Dummy Data
            </button>
            <button
              onClick={() => router.push("/admin/store-items/new")}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              + Add New Product
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 flex gap-4 flex-wrap">
          <div className="flex-1 min-w-[300px]">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products by title, ID, or description..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg"
          >
            <option value="all">All Types</option>
            <option value="physical_product">Physical Products</option>
            <option value="digital_product">Digital Products</option>
            <option value="live_class">Live Classes</option>
            <option value="workshop">Workshops</option>
            <option value="bundle">Bundles</option>
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="draft">Draft</option>
          </select>
        </div>

        {/* Items Table */}
        {loading ? (
          <div className="text-center py-12">Loading...</div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            {searchQuery ? `No products found matching "${searchQuery}"` : "No products found"}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">#</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product Image</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredItems.map((item, index) => {
                  const thumbnail = item.thumbnailImage || item.images?.[0] || "";
                  const stockStatus = getStockStatus(item);
                  return (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {thumbnail ? (
                          <div className="w-16 h-16 rounded-lg overflow-hidden border border-gray-200">
                            <S3Image
                              src={thumbnail}
                              alt={item.title || "Product image"}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-16 h-16 rounded-lg bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-400 text-xs">No Image</span>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">{item.title || "N/A"}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {getCategoryName(item.categoryId || "")}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.compareAtPrice ? (
                          <div>
                            <div className="line-through text-gray-400">₹{item.basePrice || 0}</div>
                            <div className="text-green-600 font-semibold">₹{item.compareAtPrice}</div>
                          </div>
                        ) : (
                          <span>₹{item.basePrice || 0}</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {stockStatus !== "N/A" ? (
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${
                              stockStatus === "In stock"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {stockStatus}
                          </span>
                        ) : (
                          <span className="text-sm text-gray-500">{stockStatus}</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            item.status === "active"
                              ? "bg-green-100 text-green-800"
                              : item.status === "inactive"
                              ? "bg-red-100 text-red-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {item.status === "active" ? "Active" : item.status === "draft" ? "Draft" : "Inactive"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate((item as any).createdAt || (item as any)["created_at"])}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex gap-2">
                          <button
                            onClick={() => router.push(`/item/${item.id}`)}
                            className="text-blue-600 hover:text-blue-900"
                            title="View"
                          >
                            View
                          </button>
                          <span className="text-gray-300">|</span>
                          <button
                            onClick={() => router.push(`/admin/store-items/${item.id}/edit`)}
                            className="text-indigo-600 hover:text-indigo-900"
                            title="Edit"
                          >
                            Edit
                          </button>
                          <span className="text-gray-300">|</span>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="text-red-600 hover:text-red-900"
                            title="Delete"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
