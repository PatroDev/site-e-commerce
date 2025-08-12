import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, Users, Package, ShoppingCart, DollarSign, TrendingUp, ArrowUpRight, Calendar } from 'lucide-react';
import { mockAnalytics } from '../../data/mockData';
import { useAuth } from '../../contexts/AuthContext';

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const analytics = mockAnalytics;

  if (!user || (user.role !== 'admin' && user.role !== 'manager')) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
          <p className="text-gray-600">You don't have permission to access this page.</p>
          <Link to="/" className="text-blue-600 hover:text-blue-700 mt-4 inline-block">
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  const stats = [
    {
      name: 'Total Revenue',
      value: `$${analytics.totalRevenue.toLocaleString()}`,
      change: `+${analytics.revenueGrowth}%`,
      icon: DollarSign,
      color: 'text-green-600 bg-green-100',
    },
    {
      name: 'Total Orders',
      value: analytics.totalOrders.toLocaleString(),
      change: `+${analytics.orderGrowth}%`,
      icon: ShoppingCart,
      color: 'text-blue-600 bg-blue-100',
    },
    {
      name: 'Total Customers',
      value: analytics.totalCustomers.toLocaleString(),
      change: `+${analytics.customerGrowth}%`,
      icon: Users,
      color: 'text-purple-600 bg-purple-100',
    },
    {
      name: 'Total Products',
      value: analytics.totalProducts.toLocaleString(),
      change: '+5.2%',
      icon: Package,
      color: 'text-orange-600 bg-orange-100',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome back, {user.firstName}! Here's what's happening with your store.</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Link
          to="/admin/products"
          className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 border border-gray-200 hover:border-blue-300 group"
        >
          <div className="flex items-center">
            <Package className="h-8 w-8 text-blue-600 group-hover:text-blue-700" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">Manage Products</p>
              <p className="text-xs text-gray-500">Add, edit, or remove products</p>
            </div>
          </div>
        </Link>

        <Link
          to="/admin/orders"
          className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 border border-gray-200 hover:border-blue-300 group"
        >
          <div className="flex items-center">
            <ShoppingCart className="h-8 w-8 text-green-600 group-hover:text-green-700" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">View Orders</p>
              <p className="text-xs text-gray-500">Manage customer orders</p>
            </div>
          </div>
        </Link>

        <Link
          to="/admin/customers"
          className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 border border-gray-200 hover:border-blue-300 group"
        >
          <div className="flex items-center">
            <Users className="h-8 w-8 text-purple-600 group-hover:text-purple-700" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">Customers</p>
              <p className="text-xs text-gray-500">Manage customer accounts</p>
            </div>
          </div>
        </Link>

        <Link
          to="/admin/blog"
          className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 border border-gray-200 hover:border-blue-300 group"
        >
          <div className="flex items-center">
            <BarChart3 className="h-8 w-8 text-orange-600 group-hover:text-orange-700" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">Blog Posts</p>
              <p className="text-xs text-gray-500">Manage blog content</p>
            </div>
          </div>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  {stat.change}
                </p>
              </div>
              <div className={`p-3 rounded-full ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts and Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Sales Chart */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Sales Overview</h3>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              View Details
            </button>
          </div>
          <div className="h-64 flex items-end justify-between space-x-2">
            {analytics.salesData.map((data, index) => (
              <div key={index} className="flex flex-col items-center space-y-2 flex-1">
                <div
                  className="bg-blue-500 w-full rounded-t"
                  style={{
                    height: `${(data.revenue / Math.max(...analytics.salesData.map(d => d.revenue))) * 200}px`
                  }}
                ></div>
                <span className="text-xs text-gray-600">
                  {new Date(data.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Top Products</h3>
            <Link to="/admin/products" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              View All
            </Link>
          </div>
          <div className="space-y-4">
            {analytics.topProducts.map((product, index) => (
              <div key={product.id} className="flex items-center space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-semibold text-blue-600">#{index + 1}</span>
                </div>
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-10 h-10 object-cover rounded-lg"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{product.name}</p>
                  <p className="text-sm text-gray-500">${product.price}</p>
                </div>
                <div className="flex items-center text-green-600">
                  <ArrowUpRight className="h-4 w-4" />
                  <span className="text-sm font-medium">{product.reviewCount}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
          <div className="flex items-center text-gray-500 text-sm">
            <Calendar className="h-4 w-4 mr-1" />
            Today
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
            <div>
              <p className="text-sm font-medium text-gray-900">New order #1234 received</p>
              <p className="text-xs text-gray-500">2 minutes ago</p>
            </div>
          </div>
          <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
            <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
            <div>
              <p className="text-sm font-medium text-gray-900">Product "Wireless Headphones" updated</p>
              <p className="text-xs text-gray-500">15 minutes ago</p>
            </div>
          </div>
          <div className="flex items-start space-x-3 p-3 bg-orange-50 rounded-lg">
            <div className="w-2 h-2 bg-orange-600 rounded-full mt-2"></div>
            <div>
              <p className="text-sm font-medium text-gray-900">New customer registered</p>
              <p className="text-xs text-gray-500">1 hour ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;