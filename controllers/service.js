import Laundrys from "../models/laundryModel.js";
import Layanan from "../models/layananModel.js";

export const createService = async (req, res) => {
  const laundryId = req.laundry.laundryID;
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
    const dataLayanan = await Layanan.create({
      name: namaLayanan,
      id_laundry: laundryId,
      harga: harga,
    });

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
  } catch (error) {
    console.error("Error creating service:", error);
    res.status(500).json({
      error: true,
      statusCode: 500,
      error: {
        message: "Internal Server Error",
      },
    });
  }
};

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
  } catch (error) {
    console.error("Error deleting service:", error);
    res.status(500).json({
      error: true,
      statusCode: 500,
      error: {
        message: "Internal Server Error",
      },
    });
  }
};
