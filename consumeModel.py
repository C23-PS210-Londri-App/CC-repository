from flask import Flask, request, jsonify

app = Flask(__name__)

# Route untuk membaca dataset
@app.route('/baca_dataset', methods=['GET'])
def baca_data():
    # Secara sederhana, dapat mengembalikan pesan bahwa operasi GET dilakukan
    return jsonify({'status': 'GET berhasil dilakukan'})

# Route untuk menerima input JSON dan memberikan informasi tambahan
@app.route('/proses_input', methods=['POST'])
def proses_input():
    input_json = request.get_json()

    # Ambil informasi dari JSON
    nama = input_json.get('nama')
    kategori_1 = input_json.get('kategori_1')
    kategori_2 = input_json.get('kategori_2')
    kategori_3 = input_json.get('kategori_3')
    kategori_4 = input_json.get('kategori_4')
    kecamatan = input_json.get('kecamatan')
    kota = input_json.get('kota')
    latitude_longitude = input_json.get('latitude_longitude')  # assuming this is in the JSON
    rerata_rating = input_json.get('rerata_rating')  # assuming this is in the JSON

    # Proses informasi sesuai kebutuhan
    # Misalnya, Anda dapat menyimpan data input ke dalam database atau melakukan operasi lainnya

    # Balas dengan informasi tambahan
    return jsonify({
        'nama': nama,
        'kategori_1': kategori_1,
        'kategori_2': kategori_2,
        'kategori_3': kategori_3,
        'kategori_4': kategori_4,
        'kecamatan': kecamatan,
        'kota': kota,
        'latitude_longitude': latitude_longitude,
        'rerata_rating': rerata_rating,
        'status': 'Input berhasil diproses'
    })

if __name__ == '__main__':
    app.run(debug=True)
