import Users from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from 'validator';

export const getUsers = async (req, res) => {
    try {
      const users = await Users.findAll({
        attributes: ['id', 'name', 'email']
      });
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  export const getUserById = async (req, res) => {
    const userId = req.params.id;
  
    try {
      const user = await Users.findByPk(userId, {
        attributes: ['id', 'name', 'email', 'telephone']
      });
  
      // Jika pengguna tidak ditemukan, beri respons dengan status 404 dan pesan kesalahan
      if (!user) {
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
        user,
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
  

export const Register = async (req, res) => {
    const { name, email, password, confPassword, telephone } = req.body;

    // Validasi apakah semua field diisi
    if (!name || !email || !password || !confPassword || !telephone) {
      return res.status(400).json({ msg: "Harap isi semua field" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ msg: "Format email tidak valid" });
    }

    if (password !== confPassword) {
      return res.status(400).json({ msg: "Password dan Confirm Password tidak cocok" });
    }
    const salt = await bcrypt.genSalt(); 
    const hashPassword = await bcrypt.hash(password, salt);
  
    try {
      await Users.create({
        name: name,
        email: email,
        password: hashPassword,
        telephone: telephone,
      });
  
      res.json({
        msg: 'Register Berhasil',
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

export const Login = async(req, res) => {
    try {
        const user = await Users.findAll({
            where:{
                email: req.body.email
            }
        });

        const match = await bcrypt.compare(req.body.password, user[0].password)
        if(!match) return res.status(400).json({msg: "Wrong Password"})
        const userId = user[0].id;
        const name = user[0].name;
        const email = user[0].email;
        const accessToken = jwt.sign({userId,name,email}, process.env.ACCESS_TOKEN_SECRET,{
            expiresIn:'20s'
        })
        const refreshToken = jwt.sign({userId,name,email}, process.env.REFRESH_TOKEN_SECRET,{
            expiresIn:'1d'
        })
        await Users.update({refresh_token: refreshToken},{
            where:{
                id:userId
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


export const editUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, telephone ,latitude, longitude, alamat } = req.body;
    
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
      const user = await Users.findByPk(id);
      if (!user) {
        return res.status(404).json({
          success: false,
          statusCode: res.statusCode,
          message: "User not found",
        });
      }
      await user.update({
        name,
        email,
        telephone,
        latitude,
        longitude,
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
