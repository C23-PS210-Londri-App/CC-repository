import express from "express" 
import { Login, Register, editUser, getUserById, getUsers } from "../controllers/Users.js"
import { verifyToken }  from "../middleware/verifyToken.js"
import { refreshToken } from "../controllers/RefreshToken.js" 
import { editLaundry, getLaundryById, getLaundrys, laundryStatus, loginLaundry, registerLaundry } from "../controllers/Laundry.js"
import { createService, editService } from "../controllers/service.js"
import { createOrder } from "../controllers/order.js"
import { upload, uploadImageToGCS } from "../helper/uploadImg.js"

const router = express.Router()

// API USER
router.get('/users', verifyToken ,getUsers)
router.get("/users/:id", verifyToken ,getUserById);
router.post('/register', Register)
router.post('/login', Login)
router.put('/user/edit/:id',upload.single('photo'),uploadImageToGCS, editUser)

router.get('/token', refreshToken)


//API LAUNDRY
router.get('/laundrys',verifyToken,getLaundrys)
router.get("/laundrys/:id", verifyToken ,getLaundryById);
router.post('/laundry/register',upload.single('photo'),uploadImageToGCS,registerLaundry)
router.post('/laundry/login', loginLaundry)
router.put('/laundry/status/:id', verifyToken ,laundryStatus)
router.put('/laundry/edit/:id',upload.single('photo'),uploadImageToGCS,editLaundry)

// API UNTUK LAYANAN
router.post('/laundry/service/:id',verifyToken , createService)
router.put('/laundry/service/:id', verifyToken , editService)


// API UNTUK ORDER
router.post('/order/:id', verifyToken,createOrder) // masih salah




export default router