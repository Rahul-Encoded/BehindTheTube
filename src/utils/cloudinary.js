import { v2 as cloudinary } from "cloudinary";
// Importing Cloudinary's v2 API, which is used for handling media (images, videos, etc.) in the cloud.

import fs from "fs";
// Importing the file system (fs) module to manage file operations, such as deleting files after upload failures.

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,   // Cloudinary's cloud name, retrieved from environment variables.
    api_key: process.env.CLOUDINARY_API_KEY,         // API key for Cloudinary, also retrieved from environment variables.
    api_secret: process.env.CLOUDINARY_API_SECRET,   // Secret key for Cloudinary, stored securely in environment variables.
});
// Configuring Cloudinary with credentials from environment variables. This allows your app to securely upload files to Cloudinary.

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;
        // If no file path is provided, return null to avoid further processing.

        // Uploading the file to Cloudinary. 
        // resource_type: "auto" ensures Cloudinary automatically detects the file type (image, video, etc.).
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        });

        // Upon successful upload, log the Cloudinary URL of the uploaded file.
        console.log("File is uploaded on Cloudinary", response.url);
        return response;  // Return the response which includes the file's URL and other metadata.

    } catch (error) {
        // If the upload fails, delete the local file using fs.unlinkSync to remove temporary files and free up space.
        fs.unlinkSync(localFilePath);
        return null;  // Return null to indicate the failure of the upload process.
    }
};

export { uploadOnCloudinary };
// Exporting the function for use in other parts of the application.
