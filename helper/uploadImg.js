import { Storage } from "@google-cloud/storage"
import multer from "multer";
import path from "path"

const pathKey = path.resolve("./uploadImages.json");

const storage = new Storage({
  projectId: 'londri',
  keyFilename: pathKey,
});

const bucketName = 'londri-foto-bucket';
const bucket = storage.bucket(bucketName);

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

async function uploadImageToGCS(req, res, next) {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const fileName = `${Date.now()}-${file.originalname}`;
    const blob = bucket.file(fileName);
    const stream = blob.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
    });

    stream.on('error', (err) => {
      console.error(err);
      res.status(500).json({ error: 'Failed to upload file' });
    });

    stream.on('finish', () => {
      req.imageUrl = `https://storage.googleapis.com/${bucketName}/${fileName}`;
      next();
    });

    stream.end(file.buffer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export { upload, uploadImageToGCS };
