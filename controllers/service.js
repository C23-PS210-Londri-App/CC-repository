import Laundrys from "../models/laundryModel.js";
import Layanan from "../models/layananModel.js";

// Create a new laundry service for a specific laundry
export const createService = async (req, res) => {
  const laundryId = req.params.id;
  const { namaLayanan, harga } = req.body;

  try {
    // Validate input
    if (!namaLayanan || !harga) {
      return res.status(400).json({
        error: true,
        message: "Invalid input data",
      });
    }

    const laundry = await Laundrys.findByPk(laundryId);

    if (!laundry) {
      return res.status(404).json({
        error: true,
        message: "Laundry Tidak Ditemukan",
      });
    }

    // Update the database record
    const createdLayanan = await Layanan.create({
      name: namaLayanan,
      id_laundry: laundryId,
      harga: harga,
    });

    res.status(201).json({
      error: false,
      message: "Layanan laundri berhasil dibuat",
      resultLayanan: {
        id: createdLayanan.id,
        namaLayanan: createdLayanan.name,
        hargaLayanan: createdLayanan.harga,
        status: "Tidak Tersedia", // Assuming you want to set a default status
        createdAt: createdLayanan.createdAt,
        updatedAt: createdLayanan.updatedAt,
        laundryId: createdLayanan.id_laundry,
      },
    });
  } catch (error) {
    console.error("Error creating service:", error);
    res.status(500).json({
      error: true,
      message: "Gagal membuat layanan",
    });
  }
};

// Edit details of a specific laundry service
export const editService = async (req, res) => {
  const { id } = req.params;
  const { namaLayanan, harga } = req.body;

  try {
    const layanan = await Layanan.findByPk(id);
    if (!layanan) {
      return res.status(404).json({
        error: true,
        message: `Layanan #${id} tidak ditemukan`,
      });
    }
    
    await layanan.update({
      name: namaLayanan,
      harga,
    });

    res.status(200).json({
      error: false,
      message: "Layanan laundri berhasil dirubah",
      resultLayanan: {
        id: layanan.id,
        namaLayanan: layanan.name,
        hargaLayanan: layanan.harga,
        status: layanan.status,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: true,
      message: "Gagal merubah layanan",
    });
  }
};
