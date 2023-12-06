import Laundrys from "../models/laundryModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getLaundrys = async (req, res) => {
    try {
      const users = await Laundrys.findAll({
        attributes: ['id', 'name', 'email']
      });
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
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
  } = req.body;

  // Validasi input
  if (!name || !email || !password || !confPassword || !telephone || !latitude || !longitude) {
    return res.status(400).json({ msg: "Semua field harus diisi" });
  }

  if (password !== confPassword) {
    return res.status(400).json({ msg: "Password dan Confirm Password tidak cocok" });
  }

  // Validasi email (bisa ditambahkan validasi lainnya sesuai kebutuhan)
  // ...

  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);

  try {
    // Gunakan nama yang konsisten
    await Laundrys.create({
      name: name,
      email: email,
      password: hashPassword,
      telephone: telephone,
      latitude: latitude,
      longitude: longitude,
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

