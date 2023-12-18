import Laundrys from "../models/laundryModel.js";
import Layanan from "../models/layananModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getAllLaundrys = async (req, res) => {
  try {
    const laundries = await Laundrys.findAll();
    const laundriesWithServices = [];

    for (const laundry of laundries) {
      const laundryId = laundry.id;

      const services = await Layanan.findAll({
        where: { id_laundry: laundryId },
      });

      const laundryWithServices = {
        id: laundry.id,
        namaLaundry: laundry.name,
        alamat: laundry.alamat,
        fotoLaundry: laundry.photo,
        nomorTelepon:laundry.telephone,
        status:laundry.status,
        layanan: services.map((service) => ({
          id: service.id,
          namaLayanan: service.name,
          harga: service.harga,
        })),
      };
      laundriesWithServices.push(laundryWithServices);
    }

    const responseData = {
      error: false,
      message: "Daftar Laundry berhasil ditampilkan",
      resultData: laundriesWithServices,
    };

    res.json(responseData);
  } catch (error) {
    console.error("Error fetching laundries with services:", error);
    res.status(500).json({
      error: true,
      statusCode: 500,
      error: {
        message: "Internal Server Error",
      },
    });
  }
};

export const getLaundryDetail = async (req, res) => {
  const { idLaundry } = req.params;

  console.log('idLaundry:', idLaundry); // Log the value of idLaundry

  try {
    const laundry = await Laundrys.findByPk(idLaundry, {
      include: [
        {
          model: Layanan,
          attributes: ['id', 'name', 'harga'],
        },
      ],
    });

    if (!laundry) {
      return res.status(404).json({
        error: true,
        statusCode: 404,
        error: {
          message: "Laundry not found",
        },
      });
    }

    const laundryDetail = {
      id: laundry.id,
      namaLaundry: laundry.name,
      alamat: laundry.alamat,
      fotoLaundry: laundry.photo,
      nomorTelepon: laundry.telephone,
      status: laundry.status,
      layanan: laundry.layanans.map((service) => ({
        id: service.id,
        namaLayanan: service.name,
        harga: service.harga,
      })),
    };

    const responseData = {
      error: false,
      message: "Detail Laundry berhasil ditampilkan",
      resultData: laundryDetail,
    };

    res.json(responseData);
  } catch (error) {
    console.error("Error fetching laundry details:", error);
    res.status(500).json({
      error: true,
      statusCode: 500,
      error: {
        message: "Internal Server Error",
      },
    });
  }
};

  export const registerLaundry = async (req, res) => {
    const {
      email,
      password,
      telephone,
      name,
      alamat,
      latitude,
      longitude,
    } = req.body;
  
    // Validations
    if (!email || !password || !telephone || !name || !alamat || !latitude || !longitude) {
      return res.status(400).json({ msg: "Semua field harus diisi" });
    }
  
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt)
  
  let imageUrl = "";
    // Cek apakah file dan cloudStoragePublicUrl tersedia
    if (req.file && req.file.cloudStoragePublicUrl) {
      imageUrl = req.file.cloudStoragePublicUrl;
    } else if (req.imageUrl) {
      // Jika cloudStoragePublicUrl tidak tersedia, gunakan imageUrl dari helper uploadImageToGCS
      imageUrl = req.imageUrl;
    } else {
      return res.status(500).json({ error: 'Image URL not available' });
    }
    try {
      const createdLaundry = await Laundrys.create({
        email,
        password: hashPassword,
        telephone,
        name,
        alamat,
        latitude,
        longitude,
        photo: imageUrl,
        status: "Open",
      });
  
      const responseBody = {
        error: false,
        message: "Registrasi berhasil dilakukan",
        response: {
          id: createdLaundry.id,
          namaLengkap: null, // Update with actual field value
          email: createdLaundry.email,
          nomorTelepon: createdLaundry.nomor_telepon,
          namaLaundry: createdLaundry.nama_laundry,
          fotoLaundry: createdLaundry.photo,
          alamat: createdLaundry.alamat,
          latitude: createdLaundry.latitude,
          longitude: createdLaundry.longitude,
          passwordToken: null, // Update with actual field value
          status: createdLaundry.status,
          createdAt: createdLaundry.createdAt,
          updatedAt: createdLaundry.updatedAt,
        },
      };
  
      res.status(201).json(responseBody);
    } catch (error) {
      console.error(error);
  
      if (error.name === 'SequelizeUniqueConstraintError') {
        // Handle case where email is already registered
        return res.status(403).json({
          error: true,
          message: "Email sudah terdaftar",
        });
      }
  
      res.status(500).json({ error: 'Gagal melakukan registrasi' });
    }
  };

  export const loginLaundry = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res.status(400).json({
          error: true,
          message: "Email dan password harus diisi",
        });
      }
  
      const laundry = await Laundrys.findOne({
        where: { email },
      });
  
      if (!laundry) {
        return res.status(403).json({
          error: true,
          message: "Email tidak terdaftar",
        });
      }
  
      const match = await bcrypt.compare(password, laundry.password);
  
      if (!match) {
        return res.status(401).json({
          error: true,
          message: "Password tidak sesuai",
        });
      }
  
      const { id, name } = laundry;
      const accessToken = jwt.sign({ laundryID: id, name, email }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '12h',
      });
  
      res.json({
        error: false,
        message: "Login berhasil",
        response: {
          token: accessToken,
        },
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: true,
        message: "Gagal melakukan login",
      });
    }
  };  

  export const laundryStatus = async (req, res) => {
    const laundryID = req.laundry.laundryID;
    const {status} = req.body;
    
    try {
      const laundry = await Laundrys.findByPk(laundryID);
      if (!laundry) {
        return res.status(404).json({
          success: false,
          statusCode: res.statusCode,
          message: "Laundry not found",
        });
      }
      const statusUpdate = await laundry.update({
        status,
      });

      res.json({
        success: true,
        message: "Status Laundry Berhasil Dirubah",
        resultStatus: {
          ID_laundry : statusUpdate.id,
          nama_laundry : statusUpdate.name,
          status: statusUpdate.status
        }
      });

    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        statusCode: res.statusCode,
        error: {
          message: error.message,
        },
      });
    }
};

  export const editLaundry = async (req, res) => {
    const laundryID = req.laundry.laundryID;
    const { name, telephone, alamat } = req.body;
    
    let imageUrl = "";
    // Cek apakah file dan cloudStoragePublicUrl tersedia
    if (req.file && req.file.cloudStoragePublicUrl) {
      imageUrl = req.file.cloudStoragePublicUrl;
    } else if (req.imageUrl) {
      // Jika cloudStoragePublicUrl tidak tersedia, gunakan imageUrl dari helper uploadImageToGCS
      imageUrl = req.imageUrl;
    } else {
      return res.status(500).json({ error: 'Image URL not available' });
    }
    
    try {
      const laundry = await Laundrys.findByPk(laundryID);
      if (!laundry) {
        return res.status(404).json({
          success: false,
          statusCode: res.statusCode,
          message: "laundry not found",
        });
      }
      await laundry.update({
        name,
        telephone,
        alamat,
        photo: imageUrl,
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
        },
      });
    }
  };
