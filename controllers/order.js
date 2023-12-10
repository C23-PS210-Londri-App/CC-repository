import Laundrys from "../models/laundryModel.js";
import Users from "../models/userModel.js";
import Layanan from "../models/layananModel.js";
import Order from "../models/orderModel.js";

export const createOrder = async (req, res) => {
    try {
      const userId = req.user.id_customer;
      const laundryId = req.params.id;
      const {layanan, estimasi, catatan} = req.body;
      
      console.log(userId)

      if (!layanan) {
        return res.status(400).json({
          success: false,
          message: "Data service tidak valid",
        });
      }
     
      const transaction = await Order.create({
        id_pelanggan: userId,  // Mengganti id_laundry
        id_laundry: laundryId,
        id_layanan: layanan,
        estimasi_berat: estimasi,
        catatan,
        status: "In Progress",
      });

      res.status(201).json({
        success: true,
        message: "Order Berhasil berhasil dibuat",
        transaction,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Terjadi kesalahan pada server",
      });
    }
};