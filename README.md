# LONDRI API

Backend API for LONDRI Owner and User App

## How to Use
1. Install using NPM
   `npm install`
2. Download file .env
3. How to Run
   `npm start`
  
## Endpoints Routes

### Default Routes
- **Endpoint:** `/`
- **Method**: `GET`
- **Description:** To Check API is Running
- **Response Body:**
  ```json
  {
    "error": false,
    "statusCode": 200,
    "message": "Successful access homepage API"
  }

### User Registration
- **Endpoint:** `/register`
- **Method**: POST
- **Description:** Register a new user.
- **Request Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securepassword",
    "confPassword": "securepassword",
    "telephone": "123456789"
  }
- **Response**
  - status code : 200
    ```json
    {
          "error": false,
          "message": "Registrasi berhasil dilakukan",
          "response": {
           "id": 1,
           "namaLengkap": "John Doe",
           "email": "john.doe@example.com",
           "nomorTelepon": "1234567890",
           "createdAt": "2023-12-21T12:34:56.789Z",
           "updatedAt": "2023-12-21T12:34:56.789Z"
       }
    }
    ```
      - Validation Error (Invalid Email Format):
       ```json
       {
         "error": true,
         "message": "Format email tidak valid"
       }
       ```
     - Validation Error (Password Mismatch):
       ```json
       {
         "error": true,
         "message": "Password dan Confirm Password tidak cocok"
       }
       ```
     - Server Error:
       ```json
       {
         "error": true,
         "message": "Internal Server Error"
       }
       ```
  - status code : 400
    ```json
      {
      "statusCode": 400,
      "message": "Harap Isi Semua Field"
      },
      {
      "statusCode": 400,
      "message": "Format Email Tidak Sesuai"
      },
      {
      "statusCode": 400,
      "message": "Password dan Conf Password tidak sesuai"
      }

  ### User Login

- **Endpoint:** `/login`
- **Method**: POST
- **Description:** Login for User.
  - **Request Body:**
    ```json
    {
      "email": "john@example.com",
      "password": "securepassword",
    }
- **Response**
  - Successful Authentication:
    ```json
    {
    "error": false,
    "message": "Login berhasil",
    "response": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1c2VyLWdjODd0WGFsIiwibmFtZSI6IlJlemEiLCJlbWFpbCI6InJlemFhamFAZ21haWwuY29tIiwiaWF0IjoxNzAzMDkzMzA1LCJleHAiOjE3MDMxMzY1MDV9.El_MHj0gwHV_9h-kfuMtsQizz_TOCZ94F2uUn2HLPec"
    }
    }
- Invalid Email:
  ```json
  {
  "error": true,
  "message": "Email tidak terdaftar"
  }
  ```
- Incorrect Password:
  ```json
  {
  "error": true,
  "message": "Password salah"
  }
  ```
### User EditProfile
- Description: Allows users to edit their profile information.
- Request Method: PUT
- Request Headers: Requires a valid JWT token in the Authorization header.
- Request Body:
  - `name`: Updated user name.
  - `email`: Updated email address.
  - `telephone`: Updated telephone number.
  - `latitude`: Updated latitude information.
  - `longitude`: Updated longitude information.
  - `alamat`: Updated address information.
  - `photo`: Image file for profile picture (uploaded as a file).
- Response:
  - Successful Edit:
       ```json
       {
         "success": true,
         "message": "Edit Profile Succes",
         "response": {
           "id": 1,
           "name": "Updated Name",
           "email": "updated.email@example.com",
           "telephone": "1234567890",
           "latitude": 40.7128,
           "longitude": -74.006,
           "alamat": "Updated Address",
           "photo": "https://updated-profile-photo-url.com",
           "createdAt": "2023-12-21T12:34:56.789Z",
           "updatedAt": "2023-12-21T12:45:00.000Z"
         }
       }
       ```
  - User Not Found:
       ```json
       {
         "success": false,
         "statusCode": 404,
         "message": "User not found"
       }
       ```
  - Server Error:
       ```json
       {
         "success": false,
         "statusCode": 500,
         "error": {
           "message": "Internal Server Error"
         }
       }
       ```
### User Profile
   - Description: Retrieves the authenticated user's profile information.
   - Request Method: GET
   - Request Headers: Requires a valid JWT token in the Authorization header.
   - Response:
     - Successful Retrieval:
       ```json
       {
         "success": true,
         "message": "Load Profile Berhasil",
         "response": {
           "id": 1,
           "name": "John Doe",
           "email": "john.doe@example.com",
           "telephone": "1234567890",
           "photo": "https://profile-photo-url.com",
           "alamat": "123 Main Street",
           "latitude": 40.7128,
           "longitude": -74.006
         }
       }
       ```
     - Unauthorized (Invalid Token):
       ```json
       {
         "error": true,
         "message": "Unauthorized. Invalid token."
       }
       ```
     - Server Error:
       ```json
       {
         "error": true,
         "message": "Internal Server Error"
       }
       ```

## Laundry API

### Get Laundry Services

- **Endpoint:** `/laundrys`
- **Method**: `GET`
- **Description:** Get a list of laundry and services.
- **Response :**
  ```json
  {
    "id": 742,
            "namaLaundry": "Laundry Aja",
            "alamat": "Jl. Merdeka",
            "fotoLaundry": "https://storage.googleapis.com/londri-foto-bucket/placeholder_laundry.png",
            "nomorTelepon": "089283847",
            "status": "Open",
            "layanan": [
                {
                    "id": "layanan-2joJ",
                    "namaLayanan": "Komplit Kilat",
                    "harga": "8000"
                },
                {
                    "id": "layanan-5NQdflKA",
                    "namaLayanan": "Setrika",
                    "harga": "6000"
                },
                ....
                ....
                ...
      "id": 743,
              "namaLaundry": "Laundry Aja",
              "alamat": "Jl. Merdeka",
              "fotoLaundry": "https://storage.googleapis.com/londri-foto-bucket/placeholder_laundry.png",
              "nomorTelepon": "089283847",
              "status": "Open",
              "layanan": []
            ]
    }

### Get Laundry Detail

- **Endpoint:** `/laundrys/detail/:id`
- **Method**: `GET`
- **Response**
  - Status : 200
    ```json
    "error": false,
    "message": "Detail Laundry berhasil ditampilkan",
    "resultData": {
        "id": 742,
        "namaLaundry": "Laundry Aja",
        "alamat": "Jl. Merdeka",
        "fotoLaundry": "https://storage.googleapis.com/londri-foto-bucket/placeholder_laundry.png",
        "nomorTelepon": "089283847",
        "status": "Open",
        "layanan": [
            {
                "id": "layanan-2joJ",
                "namaLayanan": "Komplit Kilat",
                "harga": "8000",
                "status": "Tersedia"
            },
            {
                "id": "layanan-5NQdflKA",
                "namaLayanan": "Setrika",
                "harga": "6000",
                "status": "Tidak Tersedia"
            },
        ]
      }
  - Status : 404
    ```json
      {
        "error": true,
        "statusCode": 404,
        "message": "Laundry Not Found"
      }
  

#### Laundry Registration

- **Endpoint:** `/laundry/register`
- **Method**: `POST`
- **Description:** Register a new laundry service.
- **Request Body:**
  ```json
  {
    "name": "LaundryX",
    "email": "info@laundryx.com",
    "password": "securepassword",
    "confPassword": "securepassword",
    "telephone": "987654321",
    "latitude": "12.3456",
    "longitude": "78.9101",
    "alamat" : "Sewon",
    "photo" : " "
  }
- **Response**
  - status code : 200
    ```json
    {
    "error": false,
    "message": "Registrasi berhasil dilakukan",
    "response": {
        "id": 754,
        "email": "testreza1@gmail.com",
        "namaLaundry": "Laundry",
        "nomorTelepon": "08123452",
        "fotoLaundry": "https://storage.googleapis.com/londri-foto-bucket/1703088946061-logoWisata.jpg",
        "alamat": "Sewon",
        "latitude": "0.903948",
        "longitude": "-0.568494",
        "passwordToken": null,
        "status": "Open"
      }
    }
  - status code : 400
    ```json
      {
      "statusCode": 400,
      "message": "Harap Isi Semua Field"
      },
      {
      "statusCode": 400,
      "message": "Format Email Tidak Sesuai"
      },
      {
      "statusCode": 400,
      "message": "Password dan Conf Password tidak sesuai"
      }

#### Laundry LOGIN

- **Endpoint:** `/laundry/login`
- **Method**: `POST`
- **Description:** Login for Laundry.
- **Request Body:**
    ```json
    {
      "email": "laundryandri@example.com",
      "password": "securepassword",
    }
- **Response**
  - status code : 200
    ```json
    {
    "error": false,
    "message": "Login berhasil",
    "response": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsYXVuZHJ5SUQiOjc0NiwibmFtZSI6IkxhdW5kcnkgUmV6YSIsImVtYWlsIjoiUmV6YUBnbWFpbC5jb20iLCJpYXQiOjE3MDMwNTE3OTcsImV4cCI6MTcwMzA5NDk5N30.RIWtJjx6R5QPlLz2YyMaieuexv_XipVM4OSKvb-HI8c"
      }
    }
  - status code : 401
    ```json
    {
      "error": true,
      "message": "Password tidak sesuai"
    }
  - statuss code : 403
    ```json
      {
        "error": true,
        "message": "Email tidak terdaftar"
      }


#### Laundry EDIT STATUS

- **Endpoint:** `/laundry/status/:id`
- **Method**: `PUT`
- **Description:** EDIT STATUS for Laundry.
- **Headers:**
    - `Authorization` : `Bearer < token >`  
- **Request Body:**
    ```json
      {
      "status": "Open"
      }
- **Response**
  - status code : 200
    ```json
    {
        "success": true,
        "statusCode": res.statusCode,
        "message": "Success",
    }
    
  - status code : 500
    ```json
    {
    "succes": false,
    "message": "Password Wrong!"
    }
  - status code : 404
    ```json
    {
      "success": false,
      "statusCode": res.statusCode,
      "message": "Luandry not found",
    }


#### Laundry Create Service

- **Endpoint:** `//laundry/service/create`
- **Method**: `POST`
- **Description:** Create a Service Laundry Owner.
- **Headers:**
    - `Authorization` : `Bearer < token >`  
  - **Request Body:**
    ```json
    {
      "namaLayanan": "Cuci",
      "harga" : 5000,
      "status" : "Tersedia", 
    }

- **Response**
  - status code : 200
    ```json
    {
      "error": false,
      "message": "Layanan laundri berhasil dibuat",
      "resultLayanan": {
        "id": "layanan-_-gmvBMa",
        "namaLayanan": "Cuci",
        "harga": 5000,
        "status": "Tersedia",
        "laundryID": 742
      }
    }
    
  - status code : 400
    ```json
    {
    "success": false,
    "statusCode": 400,
    "message": "Invalid Input Data!"
    }
  - status code : 404
    ```json
    {
      "success": false,
      "statusCode": 404,
      "message": "Luandry not found",
    }

### Laundry All Serrvice

- **Endpoint:** `/laundry/service/all`
- **Method**: `GET`
- **Description:** Get All Service from Laundry Owner.
- **Headers:**
    - `Authorization` : `Bearer < token >`  
- **Response**
  - status code : 200
    ```json
    {
      "error": false,
      "message": "Daftar Layanan Laundry",
      "services": [
        {
            "id": "layanan-2joJ",
            "namaLayanan": "Komplit Kilat",
            "harga": "8000"
        },
      ]
    }
  - status code : 404
    ```json
    {
      "success": false,
      "statusCode": 404,
      "message": "Laundry Not Found",
    }
  - status code : 500
    ```json
    {
    "error": true,
    "statusCode": 500,
    "error": {
        "message": "Internal Server Error",
      },
    }
  

### Laundry Detail Service

- **Endpoint:** `/laundry/service/detail/:serviceId`
- **Method**: `GET`
- **Description:** Get Detail Service from Laundry Owner.
- **Headers:**
    - `Authorization` : `Bearer < token >`  
- **Response**
  - status code : 200
    ```json
    {
      "error": false,
      "message": "Layanan #layanan-L_T1-C-f berhasil ditampilkan",
      "service": {
      "id": "layanan-L_T1-C-f",
      "namaLayanan": "Komplit Kilat",
      "harga": "8000",
      "status": "Tersedia"
      }
    }
  - status code : 404
    ```json
    {
      "success": false,
      "statusCode": 404,
      "message": "Layanan Tidak Ditemukan"
    } 
  - status code : 500
    ```json
    {
    "error": true,
    "statusCode": 500,
    "error": {
        "message": "Internal Server Error",
      },
    }

### Laundry Edit Status

- **Endpoint:** `/laundry/status`
- **Method**: `PUT`
- **Description:** Edit Status Service from Laundry Owner.
- **Headers:**
    - `Authorization` : `Bearer < token >`  
- **Request Body:**
    ```json
    {
      "status": "Open"
    }
- **Response**
  - status code : 200
    ```json
    {
      "success": true,
      "message": "Status Laundry Berhasil Dirubah",
      "resultStatus": {
        "ID_laundry": 746,
        "nama_laundry": "Laundry Reza",
        "status": "Open"
      }
    } 
  - status code : 404
    ```json
    {
      "success": false,
      "statusCode": 404,
      "message": "Laundry not found"
    } 
  - status code : 500
    ```json
    {
    "error": true,
    "statusCode": 500,
    "error": {
        "message": "Internal Server Error",
      },
    }

### Laundry Edit Service

- **Endpoint:** `/laundry/service/detail/:serviceId`
- **Method**: `PUT`
- **Description:** Edit Name and Price Service from Laundry Owner.
- **Headers:**
    - `Authorization` : `Bearer < token >`  
- **Request Body:**
    ```json
    {
      "namaLayanan": "Komplit",
      "hargaLayanan": "7000",
    }
- **Response**
  - status code : 200
    ```json
    {
       "success": true,
      "statusCode": 200,
      "message": "Layanan berhasil diupdate",
      "updatedLayanan": {
        "id": "layanan-L_T1-C-f",
        "namaLayanan": "Komplit",
        "harga": "7000",
        "status": "Tersedia",
        "laundryID": 742
      }
    }
    
  - status code : 404
    ```json
    {
      "success": false,
      "statusCode": 404,
      "message": "Layanan not found"
    } 
  - status code : 500
    ```json
    {
    "error": true,
    "statusCode": 500,
    "error": {
        "message": "Internal Server Error",
      },
    }

### Laundry Edit Status Service

- **Endpoint:** `/laundry/service/edit/status/:idLayanan`
- **Method**: `PUT`
- **Description:** Edit Status Service from Laundry Owner.
- **Headers:**
    - `Authorization` : `Bearer < token >`  
- **Request Body:**
    ```json
    {
      "status": "Tersedia"
    }
- **Response**
  - status code : 200
    ```json
    {
      "success": true,
      "statusCode": 200,
      "message": "Status layanan berhasil diupdate",
      "updatedLayanan": {
          "id": "layanan-L_T1-C-f",
          "namaLayanan": "Komplit Kilat",
          "hargaLayanan": "8000",
          "status": "Tersedia",
          "laundryID": 742
        }
    } 
  - status code : 404
    ```json
    {
      "success": false,
      "statusCode": 404,
      "message": "Layanan not found"
    } 
  - status code : 500
    ```json
    {
    "error": true,
    "statusCode": 500,
    "error": {
        "message": "Internal Server Error",
      },
    }

### Laundry Edit Status Service

- **Endpoint:** `/laundry/service/edit/status/:idLayanan`
- **Method**: `PUT`
- **Description:** Edit Status Service from Laundry Owner.
- **Headers:**
    - `Authorization` : `Bearer < token >`  
- **Request Body:**
    ```json
    {
      "status": "Tersedia"
    }
- **Response**
  - status code : 200
    ```json
    {
      "success": true,
      "statusCode": 200,
      "message": "Status layanan berhasil diupdate",
      "updatedLayanan": {
          "id": "layanan-L_T1-C-f",
          "namaLayanan": "Komplit Kilat",
          "hargaLayanan": "8000",
          "status": "Tersedia",
          "laundryID": 742
        }
    } 
  - status code : 404
    ```json
    {
      "success": false,
      "statusCode": 404,
      "message": "Layanan not found"
    } 
  - status code : 500
    ```json
    {
    "error": true,
    "statusCode": 500,
    "error": {
        "message": "Internal Server Error",
      },
    }

### Laundry Delete Status Service

- **Endpoint:** `/laundry/service/delete/:idLayanan`
- **Method**: `DEL`
- **Description:** Edit Status Service from Laundry Owner.
- **Headers:**
    - `Authorization` : `Bearer < token >`  
- **Response**
  - status code : 200
    ```json
    {
      "success": true,
      "statusCode": 200,
      "message": "Layanan berhasil dihapus",
      "deletedLayanan": {
        "id": "layanan-L_T1-C-f",
        "namaLayanan": "Komplit Kilat",
        "harga": "8000",
        "laundryID": 742
      }
    } 
  - status code : 404
    ```json
    {
      "success": false,
      "statusCode": 404,
      "message": "Service not found"
    } 
  - status code : 500
    ```json
    {
    "error": true,
    "statusCode": 500,
    "error": {
        "message": "Internal Server Error",
      },
    }


### Laundry Profile With Service

- **Endpoint:** `/laundry/profile/full`
- **Method**: `GET`
- **Description:** Get Laundry Profile and Service.
- **Headers:**
    - `Authorization` : `Bearer < token >`  
- **Response**
  - status code : 200
    ```json
    {
      "error": false,
    "message": "Load profile berhasil",
    "response": {
        "id": 742,
        "name": "Laundry Aja",
        "telephone": "089283847",
        "email": "laundrtest@gmail.com",
        "photo": "https://storage.googleapis.com/londri-foto-bucket/placeholder_laundry.png",
        "latitude": "-8.233",
        "longitude": "111.2344",
        "alamat": "Jl. Merdeka",
        "status": "Open",
        "layanans": [
            {
                "id": "layanan-2joJ",
                "name": "Komplit Kilat",
                "harga": "8000",
                "status": "Tersedia"
            },
            {
                "id": "layanan-8P2rRmcr",
                "name": "Cuci",
                "harga": "7000",
                "status": "Tidak Tersedia"
            },
        ]
    }
    }
  - status code : 404
    ```json
    {
      "success": false,
      "statusCode": 404,
      "message": "Laundry Not Found",
    }
  - status code : 500
    ```json
    {
    "error": true,
    "statusCode": 500,
    "error": {
        "message": "Internal Server Error",
      },
    }

### Laundry Get Order Masuk

- **Endpoint:** `/order/masuk`
- **Method**: `GET`
- **Description:** Get Order Masuk.
- **Headers:**
    - `Authorization` : `Bearer < token >`  
- **Response**
  - status code : 200
    ```json
    {
      "error": false,
    "message": "Get All Order for Laundry berhasil dilakukan",
    "resultOrders": [
        {
            "id": 8,
            "orderTrx": "TRX-98537",
            "userName": "Reza",
            "hargaLayanan": "6000",
            "namaLayanan": "Komplit",
            "estimasiBerat": 5,
            "hargaTotal": 30000,
            "catatan": "Order ID Laundri 742",
            "status": "Menunggu Diterima",
            "createdAt": "2023-12-20T16:58:36.000Z",
            "updatedAt": "2023-12-20T16:58:36.000Z"
        }
      ]
    }

  - status code : 500
    ```json
    {
    "error": true,
    "statusCode": 500,
    "error": {
        "message": "Internal Server Error",
      },
    }

### Laundry Get Detail Order Masuk

- **Endpoint:** `/laundry/order/detail/`
- **Method**: `GET`
- **Description:** Get Detail Order Masuk.
- **Headers:**
    - `Authorization` : `Bearer < token >`  
- **Response**
  - status code : 200
    ```json
    {
      "error": false,
    "message": "Get All Order for Laundry berhasil dilakukan",
    "resultOrders": [
        {
         "error": false,
          "message": "Get order details successfully",
          "resultOrder": {
              "id": 8,
              "orderTrx": "TRX-98537",
              "userName": "Reza",
              "hargaLayanan": "6000",
              "namaLayanan": "Komplit",
              "estimasiBerat": 5,
              "hargaTotal": 30000,
              "catatan": "Order ID Laundri 742",
              "status": "Menunggu Diterima",
              "createdAt": "2023-12-20T16:58:36.000Z",
              "updatedAt": "2023-12-20T16:58:36.000Z"
            }
        }
      ]
    }
  - status code : 500
    ```json
    {
      "success": false,
      "message": "Order not found"
    }
  - status code : 500
    ```json
    {
    "error": true,
    "statusCode": 500,
    "error": {
        "message": "Internal Server Error",
      },
    }

### Laundry Process Order

- **Endpoint:** `/laundry/order/editStatus/:id`
- **Method**: `PUT`
- **Description:** Process Order.
- **Headers:**
    - `Authorization` : `Bearer < token >`  
- **Request Body:**
    ```json
    {
      "status": "Selesai"
    }
- **Response**
  - status code : 200
    ```json
    {
      "error": false,
      "message": "Order status updated successfully",
      "resultOrder": {
          "id": 8,
          "orderTrx": "TRX-98537",
          "userName": "Reza",
          "hargaLayanan": "6000",
          "namaLayanan": "Komplit",
          "estimasiBerat": 5,
          "hargaTotal": 30000,
          "catatan": "Order ID Laundri 742",
          "status": "Selesai",
          "createdAt": "2023-12-20T16:58:36.000Z",
          "updatedAt": "2023-12-21T07:12:20.372Z"
      }
    }
  - status code : 500
    ```json
    {
      "success": false,
      "message": "Order not found"
    }
  - status code : 500
    ```json
    {
    "error": true,
    "statusCode": 500,
    "error": {
        "message": "Internal Server Error",
      },
    }
