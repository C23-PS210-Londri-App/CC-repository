import Order from '../models/orderModel.js';
import Layanan from '../models/layananModel.js';
import Users from '../models/UserModel.js';

export const allOrderforlaundry = async (req, res) => {
    try {
      const laundry = req.laundry.laundryID
  
      const orders = await Order.findAll({
        where: {
          id_laundry: laundry
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
          const user = await Users.findByPk(order.id_customer);
          const layanan = await Layanan.findByPk(order.id_layanan);
  
          return {
            id: order.id,
            orderTrx: order.orderTrx,
            userName: user ? user.name : null,
            hargaLayanan: layanan ? layanan.harga : null,
            namaLayanan: layanan ? layanan.name : null,
            estimasiBerat: order.estimasi_berat,
            hargaTotal: order.harga,
            catatan: order.catatan,
            status: order.status,
            createdAt: order.createdAt,
            updatedAt: order.updatedAt,

          };
        })
      );
  
      res.status(201).json({
        error: false,
        message: 'Get All Order for Laundry berhasil dilakukan',
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

export const acceptOrder = async (req, res) => {
    try {
      const laundry = req.laundry.laundryID;
      const orderTrx = req.params.orderTrx;
      const { status } = req.body;
  
      const order = await Order.findOne({
        where: {
          id_laundry: laundry,
          orderTrx: orderTrx,
        }
      });
  
      if (!order) {
        return res.status(404).json({
          success: false,
          message: 'Order not found'
        });
      }
  
      const updatedOrder = await order.update({
        status: status,
      });
  
      const user = await Users.findByPk(updatedOrder.id_customer);
      const layanan = await Layanan.findByPk(updatedOrder.id_layanan);
  
      const resultOrder = {
        id: updatedOrder.id,
        orderTrx: updatedOrder.orderTrx,
        userName: user ? user.name : null,
        hargaLayanan: layanan ? layanan.harga : null,
        namaLayanan: layanan ? layanan.name : null,
        estimasiBerat: updatedOrder.estimasi_berat,
        hargaTotal: updatedOrder.harga,
        catatan: updatedOrder.catatan,
        status: updatedOrder.status,
        createdAt: updatedOrder.createdAt,
        updatedAt: updatedOrder.updatedAt,
      };
  
      res.status(201).json({
        error: false,
        message: 'Order status updated successfully',
        resultOrder,
      });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: true,
        message: 'Terjadi kesalahan pada server',
      });
    }
  };


export const detailOrder = async (req, res) => {
    try {
      const laundry = req.laundry.laundryID;
      const orderTrx = req.params.orderTrx;
  
      const order = await Order.findOne({
        where: {
          id_laundry: laundry,
          orderTrx: orderTrx,
        }
      });
  
      if (!order) {
        return res.status(404).json({
          success: false,
          message: 'Order not found'
        });
      }
  
      const user = await Users.findByPk(order.id_customer);
      const layanan = await Layanan.findByPk(order.id_layanan);
  
      const resultOrder = {
        id: order.id,
        orderTrx: order.orderTrx,
        userName: user ? user.name : null,
        hargaLayanan: layanan ? layanan.harga : null,
        namaLayanan: layanan ? layanan.name : null,
        estimasiBerat: order.estimasi_berat,
        hargaTotal: order.harga,
        catatan: order.catatan,
        status: order.status,
        createdAt: order.createdAt,
        updatedAt: order.updatedAt,
      };
  
      res.status(200).json({
        error: false,
        message: 'Get order details successfully',
        resultOrder,
      });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: true,
        message: 'Terjadi kesalahan pada server',
      });
    }
  };