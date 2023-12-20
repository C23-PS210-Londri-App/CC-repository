# LONDRI API
Backend API for LONDRI Owner and User App

## How to Use
1. Install using NPM
   `npm install`
2. Download file .env
3. How to Run
   `npm start`
  
## Endpoints Routes

#### Default Routes
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

#### User Registration
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
        "id": "user-gc87tXal",
        "namaLengkap": "Reza",
        "email": "rezaaja@gmail.com",
        "nomorTelepon": "08928229"
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

  #### User Login

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
  - status code : 200
    ```json
    {
    "error": false,
    "message": "Login berhasil",
    "response": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1c2VyLWdjODd0WGFsIiwibmFtZSI6IlJlemEiLCJlbWFpbCI6InJlemFhamFAZ21haWwuY29tIiwiaWF0IjoxNzAzMDkzMzA1LCJleHAiOjE3MDMxMzY1MDV9.El_MHj0gwHV_9h-kfuMtsQizz_TOCZ94F2uUn2HLPec"
    }
    }
  - status code : 400
    ```json
    {
    "statusCode": 400,
    "message": "Password Wrong!"
    }
  - statuss code : 404
      ```json
      {
      "statusCode": 404,
        "message": "Email tidak ditemukan!"
      }
    
## Laundry API

#### Get Laundry Services

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

#### Get Laundry Detail

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

- **Endpoint:** `POST /laundry/status/:id`
- **Method**: PUT
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


