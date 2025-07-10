# 🧠 Resume Analyzer + Job Finder

A smart web application that reads your uploaded resume (PDF), extracts your technical skills, and uses them to fetch matching job listings from the Adzuna Jobs API.

---

## 🚀 Features

- Upload your resume in PDF format
- Automatically extracts keywords like `JavaScript`, `Python`, `SQL`, etc.
- Queries real-time job listings from the Adzuna API
- Shows top job results based on your resume
- Simple and responsive frontend using EJS

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js
- **Frontend:** EJS templating engine, HTML, CSS
- **Parsing:** `pdf-parse`
- **File Uploads:** `multer`
- **Job Listings API:** Adzuna Public API
- **Environment Variables:** `dotenv`

---

## 📂 Project Structure

```

Assignment-8/
├── app.js
├── .env
├── package.json
├── routes/
│ └── upload.js
├── uploads/
│ └── (Uploaded PDF files)
└── views/
└── result.ejs

```

---

## 🧪 How to Run

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/resume-job-finder.git
   cd resume-job-finder
   ```

````

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Create a `.env` file**

   ```
   ADZUNA_APP_ID=your_app_id
   ADZUNA_APP_KEY=your_app_key
   ```

4. **Start the server**

   ```bash
   node app.js
   ```

5. **Open in browser**

   ```
   http://localhost:3000
   ```

---

## 🗺️ Currently Supported

- Country: **India** (`/in` endpoint of Adzuna)
- PDF resume parsing only

---

I'd love to hear some feedback : aayush.makhiija@gmail.com
````
