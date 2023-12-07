import express from "express" 
import { Login, Register, getUserById, getUsers } from "../controllers/Users.js"
import { verifyToken }  from "../middleware/verifyToken.js"
import { refreshToken } from "../controllers/RefreshToken.js" 
import { getLaundrys, loginLaundry, registerLaundry, service } from "../controllers/Laundry.js"

const router = express.Router()

// API USER
router.get('/users', verifyToken ,getUsers)
router.get("/users/:id", verifyToken ,getUserById);
router.post('/register', Register)
router.post('/login', Login)
router.get('/token', refreshToken)


//API LAUNDRY
router.get('/laundrys',verifyToken,getLaundrys)
router.post('/laundry/register',registerLaundry)
router.post('/laundry/login', loginLaundry)

//layanan
router.post('/laundry/service/:id',service)


export default router