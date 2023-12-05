# LONDRI API

This API provides endpoints for user registration, login, fetching user data, and laundry services.

## Table of Contents

- [Endpoints](#endpoints)
  - [User API](#user-api)
  - [Laundry API](#laundry-api)
- [Installation](#installation)
- [Authentication](#authentication)
- [Dependencies](#dependencies)

## Endpoints

### User API

#### Get Users

- **Endpoint:** `GET /users`
- **Description:** Get a list of users with limited information.
- **Authentication:** Requires a valid access token.
- **Headers:**
    - `Authorization` : `Bearer < token >`

#### User Registration

- **Endpoint:** `POST /register`
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
- **Description:** Get a list of laundry services.
- **Authentication:** Requires a valid access token.

#### Laundry Registration

- **Endpoint:** `POST /laundry/register`
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


