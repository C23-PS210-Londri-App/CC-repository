import Laundrys from "../models/laundryModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getLaundrys = async (req, res) => {
    try {
      const laundrys = await Laundrys.findAll({
        attributes: ['id', 'name', 'email','alamat']
      });
      res.json(laundrys);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  export const getLaundryById = async (req, res) => {
    const laundryId = req.params.id;
  
    try {
      const laundry = await Laundrys.findByPk(laundryId, {
        attributes: ['name', 'alamat', 'telephone', 'status']
      });
  
      // Jika pengguna tidak ditemukan, beri respons dengan status 404 dan pesan kesalahan
      if (!laundry) {
        return res.status(404).json({
          success: false,
          statusCode: res.statusCode,
          message: "Pengguna tidak ditemukan",
        });
      }
  
      // Beri respons dengan objek JSON yang berisi informasi pengguna yang diambil
      res.json({
        success: true,
        statusCode: res.statusCode,
        message: "Pengguna diambil dengan sukses",
        laundry,
      });
  
    } catch (error) {
      // Jika terjadi kesalahan selama blok try, tangani dan beri respons dengan JSON kesalahan
      res.status(500).json({
        success: false,
        statusCode: res.statusCode,
        error: {
          message: error.message,
          uri: req.originalUrl,
        },
      });
  
      // Catat kesalahan ke konsol untuk tujuan debugging
      console.log(error);
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
        expiresIn: '20s',
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
    const { id } = req.params;
    const { status  } = req.body;
    try {
      const luandry = await Laundrys.findByPk(id);
      if (!luandry) {
        return res.status(404).json({
          success: false,
          statusCode: res.statusCode,
          message: "Luandry not found",
        });
      }
      await luandry.update({
        status,
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

  export const editLaundry = async (req, res) => {
    const { id } = req.params;
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
      const laundry = await Laundrys.findByPk(id);
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
          uri: req.originalUrl,
        },
      });
    }
  };
