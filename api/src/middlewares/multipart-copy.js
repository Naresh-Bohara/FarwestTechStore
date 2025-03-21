// multipart-parser.middleware.js 
// import multer from "multer";

// // Set up memory storage
// const storage = multer.memoryStorage();

// const uploader = multer({
//   storage,
//   limits: { fileSize: 5 * 1024 * 1024 }, 
// });

// export { uploader };




// //auth controller register function
// register = async (req, res, next) => {
//     try {
//       const { body, file } = req;
//       let uploadedFileUrl = null;
  
//       if (!file) {
//         return res.status(400).json({
//           message: "File is required.",
//           status: "FAILED",
//         });
//       }
  
//       // Allowed MIME types for images
//       const allowedImageMimeTypes = [
//         "image/jpeg", "image/png", "image/svg+xml", 
//         "image/bmp", "image/webp"
//       ];
  
//       // Allowed MIME types for document files
//       const allowedDocMimeTypes = [
//         "text/plain", "application/pdf", "text/csv", 
//         "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // xlsx
//         "application/json", "application/vnd.ms-excel", // xls
//         "application/vnd.ms-powerpoint" // ppt
//       ];
  
//       // Check if the file is an allowed image or document
//       if (allowedImageMimeTypes.includes(file.mimetype)) {
//         // Upload image to Cloudinary
//         const result = await new Promise((resolve, reject) => {
//           const stream = cloudinary.uploader.upload_stream(
//             { folder: "user_profiles", resource_type: "image" },
//             (error, result) => {
//               if (error) reject(error);
//               resolve(result);
//             }
//           );
//           stream.end(file.buffer); // Use buffer from memory storage
//         });
//         uploadedFileUrl = result.secure_url;
//       } else if (allowedDocMimeTypes.includes(file.mimetype)) {
//         // Upload document to Cloudinary
//         const result = await new Promise((resolve, reject) => {
//           const stream = cloudinary.uploader.upload_stream(
//             { folder: "user_profiles", resource_type: "raw" }, // Use "raw" for non-image files
//             (error, result) => {
//               if (error) reject(error);
//               resolve(result);
//             }
//           );
//           stream.end(file.buffer); // Use buffer from memory storage
//         });
//         uploadedFileUrl = result.secure_url;
//       } else {
//         return res.status(400).json({
//           message: "Invalid file type. Allowed types are JPG, JPEG, PNG, SVG, BMP, WEBP, TXT, PDF, CSV, XLSX, JSON, XLS, PPT.",
//           status: "FAILED",
//         });
//       }
  
//       // Prepare the user data
//       const userData = {
//         ...body,
//         fileUrl: uploadedFileUrl, // Changed key name for generality
//       };
  
//       // Send response
//       res.status(201).json({
//         data: userData,
//         message: "User registered successfully",
//         status: "SUCCESS",
//       });
//     } catch (error) {
//       next(error);
//     }
//   };




