import express from "express" 
import { Login, Register, getUsers } from "../controllers/Users.js"
import { verifyToken }  from "../middleware/verifyToken.js"
import { refreshToken } from "../controllers/RefreshToken.js" 
import { getLaundrys, loginLaundry, registerLaundry } from "../controllers/Laundry.js"

const router = express.Router()

// API USER
router.get('/users', verifyToken ,getUsers)
router.post('/register', Register)
router.post('/login', Login)
router.get('/token', refreshToken)


//API LAUNDRY
router.get('/laundrys',verifyToken,getLaundrys)
router.post('/laundry/register',registerLaundry)
router.post('/laundry/login', loginLaundry)

export default router