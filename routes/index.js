import express from "express" 
import { Login, Register, editUser, getUserById, getUsers } from "../controllers/Users.js"
import { verifyToken }  from "../middleware/verifyToken.js"
import { refreshToken } from "../controllers/RefreshToken.js" 
import { getLaundryById, getLaundrys, laundryStatus, loginLaundry, registerLaundry } from "../controllers/Laundry.js"
import { createService, editService } from "../controllers/service.js"
import { createOrder } from "../controllers/order.js"

const router = express.Router()

// API USER
router.get('/users', verifyToken ,getUsers)
router.get("/users/:id", verifyToken ,getUserById);
router.post('/register', Register)
router.post('/login', Login)
router.put('/user/edit/:id', editUser)

router.get('/token', refreshToken)

//API LAUNDRY
router.get('/laundrys',verifyToken,getLaundrys)
router.get("/laundrys/:id", verifyToken ,getLaundryById);
router.post('/laundry/register',registerLaundry)
router.post('/laundry/login', loginLaundry)
router.put('/laundry/status/:id', laundryStatus)


// API UNTUK LAYANAN
router.post('/laundry/service/:id', createService)
router.put('/laundry/service/:id', editService)


// API UNTUK ORDER
router.post('/order/:id', verifyToken,createOrder)




export default router