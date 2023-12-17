# LONDRI API

This API provides endpoints for user registration, login, fetching user data, and laundry services.

## Table of Contents

- [LONDRI API](#londri-api)
  - [Table of Contents](#table-of-contents)
  - [Endpoints](#endpoints)
    - [User API](#user-api)
      - [Get Users](#get-users)
      - [Get Users By ID](#get-users-by-id)
      - [User Registration](#user-registration)
      - [User LOGIN](#user-login)
    - [Laundry API](#laundry-api)
      - [Get Laundry Services](#get-laundry-services)
      - [Get LAUNDRY By ID](#get-laundry-by-id)
      - [Laundry Registration](#laundry-registration)
      - [Laundry LOGIN](#laundry-login)
      - [Laundry EDIT STATUS](#laundry-edit-status)
## Endpoints

### User API

#### Get Users

- **Endpoint:** `GET /users`
- **Method**: GET
- **Description:** Get a list of users with limited information.
- **Authentication:** Requires a valid access token.
- **Headers:**
    - `Authorization` : `Bearer < token >`
- **Response**
  ```json
  {
    "id": "user-agdKaSq2",
    "name": "Hafis",
    "email": "reza@gmail.com"
  }

#### Get Users By ID

- **Endpoint:** `GET /users/:id`
- **Method**: GET
- **Description:** Get a list of users with limited information.
- **Authentication:** Requires a valid access token.
- **Headers:**
    - `Authorization` : `Bearer < token >`
- **Response**
  - Status : 200
  ```json
  {
    "success": true,
    "statusCode": res.statusCode,
    "message": "Pengguna diambil dengan sukses",
    "user" : {
      "id": "user-agdKaSq2",
      "name": "Hafis",
      "email": "reza@gmail.com",
      "telephone" : "0892829"
    }
  }


#### User Registration

- **Endpoint:** `POST /register`
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
    "statusCode": 200,
    "message": "Registrasi Berhasil"
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

  #### User LOGIN

- **Endpoint:** `POST /login`
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
    "statusCode": 200,
    "message": "success",
    "data": {
    "name": "Pengguna 1",
    "email": "pengguna1@gmail.com",
    "accessToken":     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1c2VyLU9pbmlRTzl0c1MiLCJuYW1lIjoiUGVuZ2d1bmEgMSIsImVtYWlsSWQiOiJwZW5nZ3VuYTFAZ21haWwuY29tIiwiaWF0IjoxNjg0NTU2ODgzLCJleHAiOjE2ODQ1OTI4ODN9.iRL0Y6PL88e_RoCSTJ2IrpOkJ_AHIw4X3VmQEcAJzJ"
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

    
### Laundry API

#### Get Laundry Services

- **Endpoint:** `GET /laundrys`
- **Method**: GET
- **Description:** Get a list of laundry services.
- **Headers:**
    - `Authorization` : `Bearer < token >`
- **Authentication:** Requires a valid access token.
- **Response :**
  ```json
  {
    [
      {
          "id": 1,
          "name": "Reza Laundry",
          "email": "laundry@gmail.com",
          "alamat": "Sewon"
      },
      {
          "id": 3,
          "name": "Bersih Laundry",
          "email": "laundryRa@gmail.com",
          "alamat": "Jl. Merdeka"
      },
    ]
    }

#### Get LAUNDRY By ID

- **Endpoint:** `GET /laundry/:id`
- **Method**: GET
- **Description:** Get a list of laudnry with limited information.
- **Authentication:** Requires a valid access token.
- **Headers:**
    - `Authorization` : `Bearer < token >`
- **Response**
  - Status : 200
    ```json
      {
        "success": true,
        "statusCode": res.statusCode,
        "message": "Pengguna diambil dengan sukses",
        "user" : {
          "id": "user-agdKaSq2",
          "name": "Hafis",
          "alamat": "Jalan Manukwari",
          "telephone" : "0892829",
          "status" : "Open"
        }
      }
  - Status : 404
    ```json
      {
        "success": false,
        "statusCode": res.statusCode,
        "message": "Pengguna tidak ditemukan"
      }
  

#### Laundry Registration

- **Endpoint:** `POST /laundry/register`
- **Method**: POST
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
    "longitude": "78.9101"
  }
- **Response**
  - status code : 200
    ```json
    {
    "statusCode": 200,
    "message": "Registrasi Berhasil"
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

- **Endpoint:** `POST /laundry/login`
- **Method**: POST
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
    "statusCode": 200,
    "message": "success",
    "data": {
    "name": "laundry Andri",
    "email": "laundryandri@gmail.com",
    "accessToken":     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1c2VyLU9pbmlRTzl0c1MiLCJuYW1lIjoiUGVuZ2d1bmEgMSIsImVtYWlsSWQiOiJwZW5nZ3VuYTFAZ21haWwuY29tIiwiaWF0IjoxNjg0NTU2ODgzLCJleHAiOjE2ODQ1OTI4ODN9.iRL0Y6PL88e_RoCSTJ2IrpOkJ_AHIw4X3VmQEcAJzJ"
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


