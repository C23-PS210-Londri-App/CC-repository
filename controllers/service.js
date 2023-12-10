import Laundrys from "../models/laundryModel.js";
import Layanan from "../models/layananModel.js";

export const createService = async (req, res) => {
  const laundryId = req.params.id;
  const { namaLayanan, harga } = req.body;

  try {
    // Validate input
    if (!namaLayanan || !harga) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: "Invalid input data",
      });
    }

    const laundry = await Laundrys.findByPk(laundryId);

    if (!laundry) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: "Laundry Tidak Ditemukan",
      });
    }

    // Update the database record
    await Layanan.create({
      name: namaLayanan,
      id_laundry: laundryId,
      harga: harga,
    });

    res.json({
      success: true,
      statusCode: res.statusCode,
      message: "Success",
    });
  } catch (error) {
    console.error("Error creating service:", error);
    res.status(500).json({
      success: false,
      statusCode: 500,
      error: {
        message: "Internal Server Error",
        uri: req.originalUrl,
      },
    });
  }
};


export const editService = async (req, res) => {
    const { id } = req.params;
    const { namaLayanan, harga } = req.body;
    
    try {
      const layanan = await Layanan.findByPk(id);
      if (!layanan) {
        return res.status(404).json({
          success: false,
          statusCode: res.statusCode,
          message: "layanan not found",
        });
      }
      await layanan.update({
        name: namaLayanan,
        harga,
      });

      res.json({
        success: true,
        statusCode: res.statusCode,
        message: "Success",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        statusCode: res.statusCode,
        error: {
          message: error.message,
          uri: req.originalUrl,
        },
      });
    }
  };

