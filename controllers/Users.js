import Users from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from 'validator';


export const showProfile = async (req, res ) => {
    const userID = req.user.userId
    
    try {
        const userData = await Users.findByPk(userID, {
            attributes: ['id', 'name', 'email','telephone','photo','alamat','latitude','longitude']
        });

        res.json({
          success : true,
          message : 'Load Profile Berhasil',
          response: userData
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
  
};


export const Register = async (req, res) => {
    const { name, email, password, confPassword, telephone } = req.body;

    if (!name || !email || !password || !confPassword || !telephone) {
        return res.status(400).json({ error: true, message: "Harap isi semua field" });
    }

    if (!validator.isEmail(email)) {
        return res.status(400).json({ error: true, message: "Format email tidak valid" });
    }

    if (password !== confPassword) {
        return res.status(400).json(
          { error: true, 
            message: "Password dan Confirm Password tidak cocok" 
        });
    }

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    try {
        const newUser = await Users.create({
            name: name,
            email: email,
            password: hashPassword,
            telephone: telephone,
        });

        const responseData = {
            error: false,
            message: "Registrasi berhasil dilakukan",
            response: {
                id: newUser.id,
                namaLengkap: newUser.name,
                email: newUser.email,
                nomorTelepon: newUser.telephone,
                createdAt: newUser.createdAt,
                updatedAt: newUser.updatedAt,
            },
        };

        res.status(201).json(responseData);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: true, message: 'Internal Server Error' });
    }
};

export const Login = async (req, res) => {
  try {
      const user = await Users.findOne({
          where: {
              email: req.body.email
          }
      });

      if (!user) {
          return res.status(403).json({
              error: true,
              message: "Email tidak terdaftar"
          });
      }

      const match = await bcrypt.compare(req.body.password, user.password);
      if (!match) {
          return res.status(401).json({
              error: true,
              message: "Password salah"
          });
      }

      const userId = user.id;
      const name = user.name;
      const email = user.email;
      const accessToken = jwt.sign({ userId, name, email }, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: '12h'
      });

      const responseData = {
          error: false,
          message: "Login berhasil",
          response: {
              token: accessToken
          }
      };

      res.status(200).json(responseData);

  } catch (error) {
      console.log(error);
      res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};


export const editUser = async (req, res) => {
  const userID = req.user.userId
  const { name, email, telephone, latitude, longitude, alamat } = req.body;

  let imageUrl = "";

  if (req.file && req.file.cloudStoragePublicUrl) {
    imageUrl = req.file.cloudStoragePublicUrl;
  } else if (req.imageUrl) {
    imageUrl = req.imageUrl;
  } else {
    return res.status(500).json({ error: 'Image URL not available' });
  }

  try {
    const user = await Users.findByPk(userID);

    if (!user) {
      return res.status(404).json({
        success: false,
        statusCode: res.statusCode,
        message: "User not found",
      });
    }

    const userUpdate = await user.update({
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
      message: "Edit Profile Succes",
      response: userUpdate
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
