// import { v2 as cloudinary } from "cloudinary";
// import { CloudinaryStorage } from "multer-storage-cloudinary";
// import multer from "multer";
// import dotenv from "dotenv";

// dotenv.config(); // Load environment variables

// // Configure Cloudinary
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// // Configure Multer Storage for Cloudinary
// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: async (req, file) => ({
//     folder: "profile_pictures", // Folder where images are stored
//     format: "png", // Change as needed: 'jpg', 'webp', etc.
//     public_id: file.originalname.split(".")[0] + "-" + Date.now(), // Unique filename
//   }),
// });

// const upload = multer({ storage });

// export default upload;
