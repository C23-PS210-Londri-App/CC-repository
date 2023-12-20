import express from "express" 
import { Login, Register, editUser, showProfile} from "../controllers/Users.js"
import { verifyToken }  from "../middleware/verifyToken.js"
import { refreshToken } from "../controllers/RefreshToken.js" 
import { editLaundry, getAllLaundrys, getLaundryDetail, laundryStatus, loginLaundry, registerLaundry,  showFullProfile} from "../controllers/Laundry.js"
import { createService, deleteService, editService, getAllServices, getServiceDetails, editServiceStatus } from "../controllers/service.js"
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
// GENERETE TOKEN
router.get('/token', refreshToken)

// API USER AUTH
router.post('/register', Register)
router.post('/login', Login)

// API USER PROFILE
router.get('/user/profile',verifyToken,showProfile)
router.post('/user/profile/edit',verifyToken,upload.single('photo'),uploadImageToGCS, editUser)
router.put('/user/profile/edit',verifyToken,upload.single('photo'),uploadImageToGCS, editUser)
router.post('/user/profile/edit',verifyToken,upload.single('photo'),uploadImageToGCS, editUser)

// API Order User
router.post('/order/:id', verifyToken,createOrder)
router.get('/user/order/riwayat',verifyToken,allOrderforUser)
router.get('/user/order/process',verifyToken,allOrderProcessforUser)
router.get('/user/order/success',verifyToken,allOrderSuccessforUser)

//API Order Laundry Owner
router.get('/laundry/order/masuk',verifyToken,allOrderforlaundry)
router.get('/laundry/order/detail/:orderTrx', verifyToken,detailOrder)
router.put('/laundry/order/editStatus/:orderTrx', verifyToken,acceptOrder)
router.post('/laundry/order/editStatus/:orderTrx', verifyToken,acceptOrder)

//API LAUNDRY AUTH
router.post('/laundry/register',upload.single('photo'),uploadImageToGCS,registerLaundry)
router.post('/laundry/login', loginLaundry)

// API GET LAUNDRY
router.get('/laundrys',verifyToken,getAllLaundrys)
router.get('/laundrys/detail/:idLaundry', verifyToken ,getLaundryDetail);

// API LAUNDRY PROFILE
router.put('/laundry/status', verifyToken ,laundryStatus)
router.get('/laundry/profile/full',verifyToken, showFullProfile)
router.post('/laundry/profile/edit',upload.single('photo'),uploadImageToGCS,editLaundry)
router.put('/laundry/profile/edit',upload.single('photo'),uploadImageToGCS,editLaundry)

// API UNTUK LAUNDRY LAYANAN
router.get('/laundry/service/all',verifyToken, getAllServices)
router.get('/laundry/service/detail/:idLayanan',verifyToken,getServiceDetails)
router.post('/laundry/service/create',verifyToken , createService)
router.post('/laundry/service/edit/status/:id',verifyToken, editServiceStatus)
router.put('/laundry/service/edit/status/:id',verifyToken, editServiceStatus)
router.post('/laundry/service/edit/:idLayanan', verifyToken , editService)
router.put('/laundry/service/edit/:idLayanan', verifyToken , editService)
router.delete('/laundry/service/delete/:idLayanan',verifyToken, deleteService)


export default router
