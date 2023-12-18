import Laundrys from "../models/laundryModel.js";
import Layanan from "../models/layananModel.js";

// Create a new laundry service for a specific laundry
export const createService = async (req, res) => {
  const laundryId = req.laundry.laundryID;
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
<<<<<<< HEAD
    const dataLayanan = await Layanan.create({
=======
    const createdLayanan = await Layanan.create({
>>>>>>> c553798674b0c0758b396d5b217a34efacaa2ae2
      name: namaLayanan,
      id_laundry: laundryId,
      harga: harga,
    });

<<<<<<< HEAD
    const responseData = {
      error: false,
      message: "Layanan laundri berhasil dibuat",
      resultLayanan: {
          id: dataLayanan.id,
          namaLayanan: dataLayanan.name,
          email: dataLayanan.email,
          harga: dataLayanan.harga,
          laundryID : dataLayanan.id_laundry,
          createdAt: dataLayanan.createdAt,
          updatedAt: dataLayanan.updatedAt,
      },
  };

    res.json(responseData);
=======
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
>>>>>>> c553798674b0c0758b396d5b217a34efacaa2ae2
  } catch (error) {
    console.error("Error creating service:", error);
    res.status(500).json({
      error: true,
<<<<<<< HEAD
      statusCode: 500,
      error: {
        message: "Internal Server Error",
      },
=======
      message: "Gagal membuat layanan",
>>>>>>> c553798674b0c0758b396d5b217a34efacaa2ae2
    });
  }
};

<<<<<<< HEAD
export const getAllServices = async (req, res) => {
  const laundryId = req.laundry.laundryID;

  try {
    const laundry = await Laundrys.findByPk(laundryId);

    if (!laundry) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: "Laundry Tidak Ditemukan",
      });
    }

    // Fetch all services for the given laundry ID
    const services = await Layanan.findAll({
      where: { id_laundry: laundryId },
    });

    const responseData = {
      error: false,
      message: "Daftar Layanan Laundry",
      services: services.map((service) => ({
        id: service.id,
        namaLayanan: service.name,
        harga: service.harga,
        createdAt: service.createdAt,
        updatedAt: service.updatedAt,
      })),
    };

    res.json(responseData);
  } catch (error) {
    console.error("Error fetching services:", error);
    res.status(500).json({
      error: true,
      statusCode: 500,
      error: {
        message: "Internal Server Error",
      },
    });
  }
};

export const getServiceDetails = async (req, res) => {
  const laundryId = req.laundry.laundryID;
  const serviceId = req.params.id; 

  try {
    const laundry = await Laundrys.findByPk(laundryId);

    if (!laundry) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: "Laundry Tidak Ditemukan",
      });
    }

    const service = await Layanan.findOne({
      where: { id: serviceId, id_laundry: laundryId },
    });

    if (!service) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: "Layanan Tidak Ditemukan",
      });
    }

    const responseData = {
      error: false,
      message: `Layanan #${serviceId} berhasil ditampilkan`,
      service: {
        id: service.id,
        namaLayanan: service.name,
        harga: service.harga,
        createdAt: service.createdAt,
        updatedAt: service.updatedAt,
      },
    };

    res.json(responseData);
  } catch (error) {
    console.error("Error fetching service details:", error);
    res.status(500).json({
      error: true,
      statusCode: 500,
      error: {
        message: "Internal Server Error",
      },
    });
  }
};

export const editService = async (req, res) => {
  const laundryId = req.laundry.laundryID;
  const { id } = req.params;
  const { namaLayanan, harga } = req.body;

  try {
    const layanan = await Layanan.findByPk(id);

    if (!layanan) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: "Layanan not found",
      });
    }

    await layanan.update({
      name: namaLayanan,
      harga,
    });

    const updatedLayanan = await Layanan.findByPk(id);

    const responseData = {
      success: true,
      statusCode: 200,
      message: "Layanan berhasil diupdate",
      updatedLayanan: {
        id: updatedLayanan.id,
        namaLayanan: updatedLayanan.name,
        harga: updatedLayanan.harga,
        laundryID : laundryId,
      },
    };

    res.json(responseData);
  } catch (error) {
    console.error("Error updating service:", error);
    res.status(500).json({
      error: true,
      statusCode: 500,
      error: {
        message: "Internal Server Error",
      },
    });
  }
};

export const deleteService = async (req, res) => {
  const laundryId = req.laundry.laundryID;
  const { id } = req.params;

  try {
    const layanan = await Layanan.findByPk(id);

    if (!layanan) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: "Layanan not found",
      });
    }

    // Check if the service belongs to the laundry
    if (layanan.id_laundry !== laundryId) {
      return res.status(403).json({
        success: false,
        statusCode: 403,
        message: "Forbidden: Layanan does not belong to the Laundry",
      });
    }

    // Delete the service
    await layanan.destroy();

    const responseData = {
      success: true,
      statusCode: 200,
      message: "Layanan berhasil dihapus",
      deletedLayanan: {
        id: layanan.id,
        namaLayanan: layanan.name,
        harga: layanan.harga,
        laundryID: laundryId,
      },
    };

    res.json(responseData);
=======
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

// Delete a specific laundry service
export const deleteService = async (req, res) => {
  const { id } = req.params;

  try {
    const layanan = await Layanan.findByPk(id);

    if (!layanan) {
      return res.status(404).json({
        error: true,
        message: `Layanan #${id} tidak ditemukan`,
      });
    }

    // Delete the record
    await layanan.destroy();

    res.status(200).json({
      error: false,
      message: "Layanan laundri berhasil dihapus",
    });
>>>>>>> c553798674b0c0758b396d5b217a34efacaa2ae2
  } catch (error) {
    console.error("Error deleting service:", error);
    res.status(500).json({
      error: true,
<<<<<<< HEAD
      statusCode: 500,
      error: {
        message: "Internal Server Error",
      },
    });
  }
};
=======
      message: "Gagal menghapus layanan",
    });
  }
};
>>>>>>> c553798674b0c0758b396d5b217a34efacaa2ae2
