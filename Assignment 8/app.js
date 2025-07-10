const express = require('express');
const path = require('path');
const uploadRoute = require('./routes/upload');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));
app.set('view engine', 'ejs');

console.log('Upload route loaded:', typeof uploadRoute);
app.use('/upload', uploadRoute);

app.get('/', (req, res) => {
  res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Resume Analyzer</title>
        <style>
          body {
            margin: 0;
            padding: 0;
            font-family: 'Inter', sans-serif;
            background: linear-gradient(135deg, #e0eafc, #cfdef3);
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
          }
  
          .container {
            background: white;
            padding: 40px;
            border-radius: 16px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            text-align: center;
            width: 100%;
            max-width: 420px;
          }
  
          h1 {
            margin-bottom: 10px;
            font-size: 24px;
            color: #333;
          }
  
          p {
            margin-bottom: 25px;
            color: #666;
          }
  
          .upload-btn-wrapper {
            position: relative;
            overflow: hidden;
            display: inline-block;
            margin-bottom: 20px;
          }
  
          .upload-btn {
            border: none;
            color: white;
            background-color: #4f46e5;
            padding: 12px 20px;
            border-radius: 8px;
            font-size: 16px;
            font-weight: 500;
            cursor: pointer;
            transition: background-color 0.2s ease;
          }
  
          .upload-btn:hover {
            background-color: #4338ca;
          }
  
          .upload-btn-wrapper input[type="file"] {
            font-size: 100px;
            position: absolute;
            left: 0;
            top: 0;
            opacity: 0;
            cursor: pointer;
          }
  
          button[type="submit"] {
            background-color: #10b981;
            color: white;
            border: none;
            padding: 12px 20px;
            border-radius: 8px;
            font-size: 16px;
            font-weight: 500;
            cursor: pointer;
            transition: background-color 0.2s ease;
          }
  
          button[type="submit"]:hover {
            background-color: #059669;
          }
  
          .file-name {
            font-size: 14px;
            margin-top: 8px;
            color: #444;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Resume Analyzer</h1>
          <p>Upload your resume and discover relevant job openings</p>
          <form action="/upload/resume" method="POST" enctype="multipart/form-data">
            <div class="upload-btn-wrapper">
              <button class="upload-btn">Choose File</button>
              <input type="file" name="resume" accept="application/pdf" required onchange="document.getElementById('file-name').textContent = this.files[0].name" />
            </div>
            <div id="file-name" class="file-name">No file selected</div>
            <br/>
            <button type="submit">Analyze Resume</button>
          </form>
        </div>
  
        <script>
          // optional: instantly show selected file name
          const fileInput = document.querySelector('input[type="file"]');
          fileInput.addEventListener('change', function() {
            const name = this.files[0]?.name || 'No file selected';
            document.getElementById('file-name').textContent = name;
          });
        </script>
      </body>
      </html>
    `);
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
