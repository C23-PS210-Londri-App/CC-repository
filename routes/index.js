import express from "express" 
import { Login, Register, editUser, getUserById, getUsers } from "../controllers/Users.js"
import { verifyToken }  from "../middleware/verifyToken.js"
import { refreshToken } from "../controllers/RefreshToken.js" 
import { editLaundry, getLaundryById, getLaundrys, laundryStatus, loginLaundry, registerLaundry } from "../controllers/Laundry.js"
import { createService, editService } from "../controllers/service.js"
import { allOrderProcessforUser, allOrderSuccessforUser, allOrderforUser, createOrder } from "../controllers/order.js"
import { upload, uploadImageToGCS } from "../helper/uploadImg.js"
import { acceptOrder, allOrderforlaundry, detailOrder } from "../controllers/orderOwner.js"

const router = express.Router()

// Default router
router.get("/", (req, res) => {
    return res.json({
      error: false,
      statusCode: 200,
      message: "Successful access homepage API",
    });
  });

// API USER
router.get('/users', verifyToken ,getUsers)
router.get("/users/:id", verifyToken ,getUserById);
router.post('/register', Register)
router.post('/login', Login)
router.put('/user/edit/:id',upload.single('photo'),uploadImageToGCS, editUser)
router.get('/token', refreshToken)

// API Order User
router.get('/user/order/riwayat',verifyToken,allOrderforUser)
router.get('/user/order/process',verifyToken,allOrderProcessforUser)
router.get('/user/order/success',verifyToken,allOrderSuccessforUser)


//API Order Laundry Owner
router.get('/laundry/order/masuk',verifyToken,allOrderforlaundry)
router.get('/laundry/order/detail/:orderTrx', verifyToken,detailOrder)
router.put('/laundry/order/editStatus/:orderTrx', verifyToken,acceptOrder)





//API LAUNDRY
router.get('/laundrys',verifyToken,getLaundrys)
router.get("/laundrys/:id", verifyToken ,getLaundryById);
router.post('/laundry/register',upload.single('photo'),uploadImageToGCS,registerLaundry)
router.post('/laundry/login', loginLaundry)
router.put('/laundry/status/:id', verifyToken ,laundryStatus)
router.put('/laundry/edit/:id',upload.single('photo'),uploadImageToGCS,editLaundry)

// API routes for LAYANAN
router.post('/laundry/service/:id', verifyToken, createService);
router.put('/laundry/service/:id', verifyToken, editService);
router.delete('/laundry/service/delete/:id', verifyToken, deleteService);

// API UNTUK ORDER
router.post('/order/:id', verifyToken,createOrder) // masih salah


export default router