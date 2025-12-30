"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { collection, getDocs, query, orderBy, where } from "firebase/firestore";
import { db } from "@/lib/firebaseClient";
import { AdminLayout } from "@/components/admin/AdminLayout";
import {
  ShoppingBag,
  DollarSign,
  TrendingUp,
  Package,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"];

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState({
    orders: 0,
    revenue: 0,
    averagePrice: 0,
    productsSold: 0,
    totalUsers: 0,
    totalOrders: 0,
    totalRevenue: 0,
    activeCourses: 0,
    totalProducts: 0,
    totalCategories: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      // Load all data in parallel
      const [ordersSnapshot, itemsSnapshot, usersSnapshot, categoriesSnapshot] = await Promise.all([
        getDocs(query(collection(db, "orders"), orderBy("createdAt", "desc"))),
        getDocs(query(collection(db, "store_items"), where("status", "==", "active"))),
        getDocs(collection(db, "users")),
        getDocs(collection(db, "categories")),
      ]);

      // Get all products without orderBy to avoid index requirements
      const allItemsSnapshot = await getDocs(collection(db, "store_items"));

      const orders = ordersSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const items = itemsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Calculate stats
      const totalOrders = orders.length;
      const totalRevenue = orders.reduce((sum, order: any) => {
        const amount = order.totalAmount || order.total_amount || 0;
        // Only count paid orders for revenue
        if (order.paymentStatus === "paid" || order.payment_status === "paid") {
          return sum + amount;
        }
        return sum;
      }, 0);
      const avgPrice = totalOrders > 0 ? totalRevenue / totalOrders : 0;
      const productsSold = orders.reduce((sum, order: any) => {
        return sum + (order.items?.length || 0);
      }, 0);

      // Analytics stats
      const totalUsers = usersSnapshot.size;
      // Count all products - use the same method as items page for consistency
      const totalProducts = allItemsSnapshot.size;
      const totalCategories = categoriesSnapshot.size;
      // Filter courses from items (handle both old and new field names)
      const activeCourses = itemsSnapshot.docs.filter((doc) => {
        const data = doc.data();
        return (data.itemType === "physical_product" || data.type === "course") && data.status === "active";
      }).length;

      setStats({
        orders: totalOrders,
        revenue: totalRevenue,
        averagePrice: avgPrice,
        productsSold: productsSold,
        totalUsers: totalUsers,
        totalOrders: totalOrders,
        totalRevenue: totalRevenue,
        activeCourses: activeCourses,
        totalProducts: totalProducts,
        totalCategories: totalCategories,
      });
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Sample chart data (replace with real data from Firestore)
  const dailySalesData = [
    { name: "Apple", value: 30, color: "#3B82F6" },
    { name: "Samsung", value: 25, color: "#10B981" },
    { name: "Google", value: 20, color: "#F59E0B" },
    { name: "Others", value: 25, color: "#8B5CF6" },
  ];

  const statisticsData = [
    { year: "2010", value: 120 },
    { year: "2011", value: 150 },
    { year: "2012", value: 180 },
    { year: "2013", value: 140 },
    { year: "2014", value: 160 },
    { year: "2015", value: 190 },
    { year: "2016", value: 170 },
    { year: "2017", value: 200 },
    { year: "2018", value: 180 },
    { year: "2019", value: 190 },
  ];

  const revenueData = [
    { year: "2013", revenue: 80 },
    { year: "2014", revenue: 100 },
    { year: "2015", revenue: 120 },
    { year: "2016", revenue: 110 },
    { year: "2017", revenue: 140 },
    { year: "2018", revenue: 130 },
    { year: "2019", revenue: 150 },
  ];

  const recentBuyers = [
    {
      product: "iPhone X",
      customer: "Tiffany W. Yang",
      category: "Mobile",
      popularity: 85,
      amount: "$1200.00",
    },
    {
      product: "iPad",
      customer: "Dale B. Warman",
      category: "Tablet",
      popularity: 70,
      amount: "$1190.00",
    },
    {
      product: "MacBook Pro",
      customer: "John D. Smith",
      category: "Laptop",
      popularity: 95,
      amount: "$2499.00",
    },
  ];

  const transactions = [
    {
      card: "**** **** **** 1234",
      date: "11 April 2019",
      amount: "$79.49",
      type: "VISA",
      payer: "Helen Warren",
    },
    {
      card: "**** **** **** 5678",
      date: "28 Jan 2019",
      amount: "$1254.00",
      type: "stripe",
      payer: "Kayla Lambie",
    },
  ];

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-full">
          <div className="text-lg">Loading...</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <MetricCard
            title="TOTAL PRODUCTS"
            value={stats.totalProducts.toLocaleString()}
            change="All products in store"
            changeType="neutral"
            icon={Package}
            iconColor="bg-blue-500"
          />
          <MetricCard
            title="TOTAL CATEGORIES"
            value={stats.totalCategories.toLocaleString()}
            change="Product categories"
            changeType="neutral"
            icon={ShoppingBag}
            iconColor="bg-green-500"
          />
          <MetricCard
            title="ORDERS"
            value={stats.orders.toLocaleString()}
            change="+11% From previous period"
            changeType="positive"
            icon={ShoppingBag}
            iconColor="bg-purple-500"
          />
        </div>

        {/* Additional Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <MetricCard
            title="REVENUE"
            value={`₹${stats.revenue.toLocaleString()}`}
            change="-29% From previous period"
            changeType="negative"
            icon={DollarSign}
            iconColor="bg-green-500"
          />
          <MetricCard
            title="AVERAGE PRICE"
            value={`₹${stats.averagePrice.toFixed(1)}`}
            change="0% From previous period"
            changeType="neutral"
            icon={TrendingUp}
            iconColor="bg-yellow-500"
          />
          <MetricCard
            title="PRODUCT SOLD"
            value={stats.productsSold.toLocaleString()}
            change="+89% Last year"
            changeType="positive"
            icon={Package}
            iconColor="bg-orange-500"
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Daily Sales - Donut Chart */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Daily Sales</h3>
            <div className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={dailySalesData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {dailySalesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="text-center mt-4">
              <p className="text-2xl font-bold text-gray-900">Apple Company</p>
              <p className="text-3xl font-bold text-blue-600 mt-2">30</p>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">5,459 Total Sales</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">18 Open Compaign</span>
              </div>
            </div>
          </div>

          {/* Statistics - Bar Chart */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Statistics</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={statisticsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#10B981" />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">$1875.54 Revenue</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">541 Total Offers</span>
              </div>
            </div>
          </div>

          {/* Total Revenue - Line Chart */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Total Revenue</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#EF4444"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">$7841.12 Total Revenue</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">17 Open Compaign</span>
              </div>
            </div>
          </div>
        </div>

        {/* Data Tables Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Buyers */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-2">Recent Buyers</h3>
            <p className="text-sm text-gray-500 mb-4">
              Transaction period from 21 July to 25 Aug
            </p>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                      Product
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                      Customers
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                      Categories
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                      Popularity
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {recentBuyers.map((buyer, idx) => (
                    <tr key={idx} className="border-b border-gray-100">
                      <td className="py-3 px-4 text-sm text-gray-900">{buyer.product}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{buyer.customer}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{buyer.category}</td>
                      <td className="py-3 px-4">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${buyer.popularity}%` }}
                          ></div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm font-semibold text-gray-900">
                        {buyer.amount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Account Transactions */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-2">Account Transactions</h3>
            <p className="text-sm text-gray-500 mb-4">
              Transaction period from 21 July to 25 Aug
            </p>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                      Card
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                      Date
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                      Amount
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                      Card
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                      Pay
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction, idx) => (
                    <tr key={idx} className="border-b border-gray-100">
                      <td className="py-3 px-4 text-sm text-gray-900">
                        {transaction.card}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">{transaction.date}</td>
                      <td className="py-3 px-4 text-sm font-semibold text-gray-900">
                        {transaction.amount}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">{transaction.type}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{transaction.payer}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "negative" | "neutral";
  icon: React.ElementType;
  iconColor: string;
}

function MetricCard({
  title,
  value,
  change,
  changeType,
  icon: Icon,
  iconColor,
}: MetricCardProps) {
  const changeColor =
    changeType === "positive"
      ? "text-green-600"
      : changeType === "negative"
      ? "text-red-600"
      : "text-orange-600";

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-600 uppercase">{title}</h3>
        <div className={`${iconColor} p-3 rounded-lg`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
      <div className="mb-2">
        <p className="text-3xl font-bold text-gray-900">{value}</p>
      </div>
      <p className={`text-sm ${changeColor}`}>{change}</p>
    </div>
  );
}
