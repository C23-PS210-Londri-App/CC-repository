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
    name,
    email,
    password,
    confPassword,
    telephone,
    latitude,
    longitude,
    alamat,
  } = req.body;

  // Validasi input
  if (!name || !email || !password || !confPassword || !telephone || !latitude || !longitude || !alamat) {
    return res.status(400).json({ msg: "Semua field harus diisi" });
  }

  if (password !== confPassword) {
    return res.status(400).json({ msg: "Password dan Confirm Password tidak cocok" });
  }

  // Validasi email (bisa ditambahkan validasi lainnya sesuai kebutuhan)
  // ...

  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);
  let status = "Open";
  
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
    // Gunakan nama yang konsisten
    await Laundrys.create({
      name: name,
      email: email,
      password: hashPassword,
      telephone: telephone,
      latitude: latitude,
      longitude: longitude,
      alamat : alamat,
      photo : imageUrl,
      status: status,
    });

    res.json({
      msg: 'Register Berhasil',
    });
  } catch (error) {
    console.error(error);

    // Tanggapan kesalahan yang lebih deskriptif
    res.status(500).json({ error: 'Gagal melakukan registrasi' });
  }
};

export const loginLaundry = async(req, res) => {
    try {
        const laundry = await Laundrys.findAll({
            where:{
                email: req.body.email
            }
        });
        const match = await bcrypt.compare(req.body.password, laundry[0].password)
        if(!match) return res.status(400).json({msg: "Wrong Password"})
        const laundryID = laundry[0].id;
        const name = laundry[0].name;
        const email = laundry[0].email;
        const accessToken = jwt.sign({laundryID,name,email}, process.env.ACCESS_TOKEN_SECRET,{
            expiresIn:'20s'
        })
        const refreshToken = jwt.sign({laundryID,name,email}, process.env.REFRESH_TOKEN_SECRET,{
            expiresIn:'1d'
        })
        await Laundrys.update({refresh_token: refreshToken},{
            where:{
                id:laundryID
            }
        })
        res.cookie('refreshToken', refreshToken,{
            httpOnly:  true,
            maxAge:24*60*60 *1000,
        })
        res.json({accessToken})

    } catch (error) {
        console.log(error)
        res.status(404).json({msg:"Email tidak ditemukan"})
    }
  }


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
