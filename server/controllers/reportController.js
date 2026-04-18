const Order = require('../models/Order');

exports.getSalesReport = async (req, res) => {
  try {
    const stats = await Order.aggregate([
      { $match: { paymentStatus: 'paid' } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          totalSales: { $sum: "$totalPrice" },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    const totalRevenue = stats.reduce((acc, curr) => acc + curr.totalSales, 0);
    const totalOrders = stats.reduce((acc, curr) => acc + curr.count, 0);

    res.json({ stats, totalRevenue, totalOrders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
