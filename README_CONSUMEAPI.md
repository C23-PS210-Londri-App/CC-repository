# Consume API

## Endpoints

### `POST /proses_input`

#### Request

- **Method**: `POST`
- **Content-Type**: `application/json`
- **Body**: JSON object with the following fields:
  - `kategori_1`: Category 1 value (boolean(0/1))
  - `kategori_2`: Category 2 value (boolean(0/1))
  - `kategori_3`: Category 3 value (boolean(0/1))
  - `kategori_4`: Category 4 value (boolean(0/1))
  - `kategori_5`: Category 5 value (boolean(0/1))
  - `latitude`: Latitude value (float)
  - `longitude`: Longitude value (float)

#### Response

- **Status Code**: `200 OK`
- **Content-Type**: `application/json`
- **Body**: JSON object with the following fields:
  - `next_most_likely_indices`: List of indices for next most likely recommendations
  - `status`: Status message indicating successful processing

#### Example

**Request:**

```json
{
  "kategori_1": 0,
  "kategori_2": 1,
  "kategori_3": 1,
  "kategori_4": 0,
  "kategori_5": 0,
  "latitude": 37.7749,
  "longitude": -122.4194
}
```
**Response:**
```json
{
    "next_most_likely_indices": [
        675,
        684,
        667,
        709,
        80,
        700,
        266,
        604,
        729,
        678,
        669,
        702,
        710,
        725,
        732
    ],
    "status": "Input berhasil diproses"
}
```

### Depedencies
Google Cloud Storage: Used to download the MinMaxScaler and trained machine learning model.

### Installation
```bash
pip install Flask google-cloud-storage numpy tensorflow
python your_api_filename.py
