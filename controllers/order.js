import Order from '../models/orderModel.js';
import Laundry from '../models/laundryModel.js';
import Layanan from '../models/layananModel.js';
import Users from '../models/UserModel.js';

export const createOrder = async (req, res) => {
  try {
    const { id_user: userId } = req.user;
    const laundryId = req.params.id;
    const { estimasi_berat, layanan_id, catatan } = req.body;
    
    if (!layanan_id) {
      return res.status(400).json({
        error: true,
        message: 'Data service tidak valid',
      });
    }

    // Assuming you have Sequelize models for Laundry and Layanan
    const laundry = await Laundry.findByPk(laundryId);
    const layanan = await Layanan.findByPk(layanan_id);
    if (!laundry || !layanan) {
      return res.status(404).json({
        error: true,
        message: 'Laundry atau layanan tidak ditemukan',
      });
    }
    const randomNumber = Math.floor(10000 + Math.random() * 90000);
    // Calculate the hargaTotal based on your application logic
    const hargaTotal = calculateTotalPrice(layanan, estimasi_berat);

    // Create a new order
    const newOrder = await Order.create({
      id_customer: req.user.userId,
      id_laundry: laundryId,
      id_layanan: layanan_id,
      orderTrx: `TRX-${randomNumber}`,
      estimasi_berat: estimasi_berat,
      catatan: catatan,
      status: 'Menunggu Diterima',
      harga: hargaTotal, 
    });

    res.status(201).json({
      error: false,
      message: 'Proses order berhasil dilakukan',
      resultOrder: {
        id: newOrder.id,
        orderTrx: newOrder.orderTrx,
        estimasiBerat: newOrder.estimasiBerat,
        hargaTotal: newOrder.hargaTotal,
        catatan: newOrder.catatan,
        status: newOrder.status,
        createdAt: newOrder.createdAt,
        updatedAt: newOrder.updatedAt,
        customerId: userId,
        userName: req.user.name, // Assuming the user model has a 'name' property
        namaLaundry: laundry.name,
        namaLayanan: layanan.name,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: true,
      message: 'Terjadi kesalahan pada server',
    });
  }
};

// Your function to calculate the total price based on the selected service and estimated weight
const calculateTotalPrice = (layanan, estimasiBerat) => {
  const weightPrice = layanan.harga || 0;
  return weightPrice * estimasiBerat;
};




export const allOrderforUser = async (req, res) => {
  try {
    const user = req.user.userId;

    const orders = await Order.findAll({
      where: {
        id_customer: user
      }
    });

    if (!orders || orders.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Riwayat Kosong.'
      });
    }

    const resultOrders = await Promise.all(
      orders.map(async (order) => {
        const laundry = await Laundry.findByPk(order.id_laundry);
        const layanan = await Layanan.findByPk(order.id_layanan);

        return {
          id: order.id,
          orderTrx: order.orderTrx,
          estimasiBerat: order.estimasiBerat,
          hargaTotal: order.hargaTotal,
          catatan: order.catatan,
          status: order.status,
          createdAt: order.createdAt,
          updatedAt: order.updatedAt,
          customerId: user,
          userName: req.user.name, // Assuming the user model has a 'name' property
          namaLaundry: laundry ? laundry.name : null,
          namaLayanan: layanan ? layanan.name : null,
        };
      })
    );

    res.status(201).json({
      error: false,
      message: 'Proses order berhasil dilakukan',
      resultOrders,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: true,
      message: 'Terjadi kesalahan pada server',
    });
  }
};



export const allOrderProcessforUser = async (req, res) => {
  try {
    const user = req.user.userId;

    const orders = await Order.findAll({
      where: {
        id_customer: user
      }
    });

    if (!orders || orders.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Riwayat Kosong.'
      });
    }

    const resultOrders = await Promise.all(
      orders.map(async (order) => {
        // Check if the order is not marked as "selesai"
        if (order.status !== 'Selesai') {
          const laundry = await Laundry.findByPk(order.id_laundry);
          const layanan = await Layanan.findByPk(order.id_layanan);

          return {
            id: order.id,
            orderTrx: order.orderTrx,
            estimasiBerat: order.estimasiBerat,
            hargaTotal: order.hargaTotal,
            catatan: order.catatan,
            status: order.status,
            createdAt: order.createdAt,
            updatedAt: order.updatedAt,
            customerId: user,
            userName: req.user.name, // Assuming the user model has a 'name' property
            namaLaundry: laundry ? laundry.name : null,
            namaLayanan: layanan ? layanan.name : null,
          };
        } else {
          return null; // Exclude completed orders
        }
      })
    );

    // Filter out null values (completed orders)
    const filteredResultOrders = resultOrders.filter(order => order !== null);

    res.status(201).json({
      error: false,
      message: 'Proses order berhasil dilakukan',
      resultOrders: filteredResultOrders,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: true,
      message: 'Terjadi kesalahan pada server',
    });
  }
};

export const allOrderSuccessforUser = async (req, res) => {
  try {
    const user = req.user.userId;

    const orders = await Order.findAll({
      where: {
        id_customer: user
      }
    });

    if (!orders || orders.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Riwayat Kosong.'
      });
    }

    const resultOrders = await Promise.all(
      orders.map(async (order) => {
        // Check if the order is not marked as "selesai"
        if (order.status === 'Selesai') {
          const laundry = await Laundry.findByPk(order.id_laundry);
          const layanan = await Layanan.findByPk(order.id_layanan);

          return {
            id: order.id,
            orderTrx: order.orderTrx,
            estimasiBerat: order.estimasiBerat,
            hargaTotal: order.hargaTotal,
            catatan: order.catatan,
            status: order.status,
            createdAt: order.createdAt,
            updatedAt: order.updatedAt,
            customerId: user,
            userName: req.user.name, // Assuming the user model has a 'name' property
            namaLaundry: laundry ? laundry.name : null,
            namaLayanan: layanan ? layanan.name : null,
          };
        } else {
          return null; // Exclude completed orders
        }
      })
    );

    // Filter out null values (completed orders)
    const filteredResultOrders = resultOrders.filter(order => order !== null);

    res.status(201).json({
      error: false,
      message: 'Proses order berhasil dilakukan',
      resultOrders: filteredResultOrders,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: true,
      message: 'Terjadi kesalahan pada server',
    });
  }
};