const express = require('express');
const cors = require('cors');
const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 5000;

// Enable CORS for frontend
app.use(cors());

// Create necessary folders
const uploadDir = path.join(__dirname, 'uploads');
const outputDir = path.join(__dirname, 'output');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, `original-${Date.now()}${path.extname(file.originalname)}`);
  },
});
const upload = multer({ storage });

// Helper: Convert KB to approximate Sharp quality level
const getQualityFromKB = (sizeKB) => {
  if (!sizeKB) return 80;
  const targetBytes = sizeKB * 1024;
  // Approximate guess: Lower size → lower quality
  if (targetBytes < 50 * 1024) return 40;
  if (targetBytes < 100 * 1024) return 50;
  if (targetBytes < 200 * 1024) return 60;
  return 70;
};

// POST /resize → Main route
app.post('/resize', upload.single('image'), async (req, res) => {
  const { width, height, targetSizeKB } = req.body;
  const filePath = req.file.path;
  const outputFilePath = path.join(outputDir, `processed-${Date.now()}.jpg`);

  try {
    let sharpInstance = sharp(filePath);

    // Resize if width or height is specified
    if (width || height) {
      sharpInstance = sharpInstance.resize({
        width: width ? parseInt(width) : null,
        height: height ? parseInt(height) : null,
      });
    }

    // Compress based on quality estimation
    const quality = getQualityFromKB(targetSizeKB);
    sharpInstance = sharpInstance.jpeg({ quality });

    // Save the result
    await sharpInstance.toFile(outputFilePath);

    // Send the processed image
    res.sendFile(outputFilePath, () => {
      // Optional cleanup
      fs.unlinkSync(filePath);
      // fs.unlinkSync(outputFilePath); // Only delete if you don’t want to keep result
    });
  } catch (err) {
    console.error('Error processing image:', err);
    res.status(500).json({ message: 'Processing failed' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
