const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();

// Create an uploads directory if it doesn't exist
const uploadsDir = './uploads';
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Serve static files from the current directory
app.use(express.static(__dirname));

// Multer configuration
const upload = multer({
  dest: './uploads/',
  limits: {
    fileSize: 1000000, // 1MB
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.endsWith('.csv')) {
      return cb(new Error('Only CSV files are allowed!'));
    }
    cb(null, true);
  },
});

// Handle CSV file upload
app.post('/upload', upload.single('csvFile'), (req, res) => {
  console.log('File upload request received');
  console.log(req.file); // Check if req.file is populated correctly

  if (!req.file) {
    console.error('No file uploaded');
    res.status(400).send({ message: 'No file uploaded' });
    return;
  }

  const file = req.file;
  const filePath = path.join(__dirname, './uploads/', file.originalname);
  console.log(`File uploaded to: ${filePath}`);

  // Create a write stream to write the file to disk
  const writeStream = fs.createWriteStream(filePath);

  // Write the file to disk in chunks
  req.file.stream.pipe(writeStream);

  // Handle errors and completion
  writeStream.on('error', (err) => {
    console.error(err);
    res.status(500).send({ message: 'Error saving file' });
  });

  writeStream.on('finish', () => {
    console.log('File saved successfully');
    res.send({ message: 'File uploaded and saved successfully!' });
  });
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});