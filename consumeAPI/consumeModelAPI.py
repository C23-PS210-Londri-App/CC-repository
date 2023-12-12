from flask import Flask, request, jsonify
from keras.models import load_model
import numpy as np
import pickle

app = Flask(__name__)

# Load the trained model
savedModel = load_model('model_rev_final.h5', compile=False)
savedModel.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])

# Load the MinMaxScaler from pickle file
with open('minmax_scaler.pkl', 'rb') as f:
    minmax_scaler = pickle.load(f)

# Route untuk membaca dataset
@app.route('/baca_dataset', methods=['GET'])
def baca_data():
    # Secara sederhana, dapat mengembalikan pesan bahwa operasi GET dilakukan
    return jsonify({'status': 'GET berhasil dilakukan'})

@app.route('/proses_input', methods=['POST'])
def proses_input():
    model_summary = savedModel.summary()
    try:
        input_json = request.get_json()

        # Ambil informasi dari JSON
        nama = input_json.get('nama')
        kategori_1 = input_json.get('kategori_1')
        kategori_2 = input_json.get('kategori_2')
        kategori_3 = input_json.get('kategori_3')
        kategori_4 = input_json.get('kategori_4')
        kategori_5 = input_json.get('kategori_5')
        kecamatan = input_json.get('kecamatan')
        kota = input_json.get('kota')
        latitude = input_json.get('latitude')
        longitude = input_json.get('longitude')
        review_rating = input_json.get('review_rating')

        # Use the loaded MinMaxScaler for latitude and longitude
        new_data_point = np.array([latitude, longitude, kategori_1, kategori_2, kategori_3, kategori_4, kategori_5])
        long_lat = new_data_point[:2].reshape(1, -1)

        # Use the loaded MinMaxScaler for latitude and longitude
        new_data_point[:2] = minmax_scaler.transform(long_lat).flatten()

        # Jika Anda ingin menggunakan model machine learning (contoh rekomendasi)
        new_data_point = new_data_point.reshape(1, -1)

        recommendation_score = savedModel.predict(new_data_point)
        class_probabilities = recommendation_score[0]
        sorted_indices = np.argsort(class_probabilities)[::-1]
        next_most_likely_indices = sorted_indices[1:16]

        # Debugging: Print recommendation scores and indices
        print("Recommendation Scores:", recommendation_score)
        print("Next Most Likely Indices:", next_most_likely_indices)

        # Balas dengan informasi tambahan
        return jsonify({
            'nama': nama,
            'kategori_1': kategori_1,
            'kategori_2': kategori_2,
            'kategori_3': kategori_3,
            'kategori_4': kategori_4,
            'kategori_5': kategori_5,
            'kecamatan': kecamatan,
            'kota': kota,
            'latitude': latitude,
            'longitude': longitude,
            'review_rating': review_rating,
            'next_most_likely_indices': next_most_likely_indices.tolist(),
            'status': 'Input berhasil diproses'
        })

    except Exception as e:
        # Debugging: Print any exception that occurs
        print("Error:", str(e))
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    import os
    port = int(os.environ.get("PORT", 8080))
    app.run(host='0.0.0.0', port=port, debug=True)
