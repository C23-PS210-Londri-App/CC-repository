# Consume MLModelAPI

## URL
https://mlmodel-api-mr4guvmuya-et.a.run.app

## Endpoints

### 1. Process Input

#### Endpoint

POST /proses_input


#### Request

- **Method**: `POST`
- **Content-Type**: `application/json`
- **Body**: JSON object with the following fields:
  - `laundry_id`: ID of the laundry (string)

#### Response

- **Success Response:**

```json
{
  "laundry_results": [
    {
      "id": 48,
      "name": "Laundry XYZ",
      "layanan_names": ["cuci", "setrika"]
    },
    // ... (additional laundry results)
  ]
}
```
#### Error Response
```
{
  "error": "Invalid laundry_id"
}

{
  "error": "No layanan data found for the given laundry_id"
}

{
  "error": "No layanan data found for the given laundry_id"
}

