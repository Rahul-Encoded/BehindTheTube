import multer from "multer";
// Importing multer, a middleware for handling file uploads in Node.js. It allows storing files locally or in the cloud.

const storage = multer.diskStorage({
    // Defining the storage engine to handle how and where files should be stored when uploaded.

    destination: function (req, file, cb) {
        // Specifies the folder where uploaded files will be stored.
        cb(null, './public/temp');
        // The first argument is for any potential error (null here), and the second is the destination path.
        // Files will be temporarily stored in the './public/temp' folder.
    },

    filename: function (req, file, cb) {
        // Defines how the uploaded file's name should be saved on the local server.
        
        // Here, we're using the file's original name, which is not ideal for production if multiple files have the same name.
        // A better approach would be to append a unique identifier to avoid overwriting files with the same name.
        cb(null, file.originalname /*file.fieldname + '-' + uniqueSuffix*/);
        // Commented out the uniqueSuffix part as a workaround because the number of files and the time they stay on the local server are small.
        // However, it's important to note that this can lead to file overwriting if multiple files with the same name are uploaded.
    }
});

export const upload = multer({ storage: storage });
// Exporting the configured multer instance, which can be used in routes to handle file uploads.
