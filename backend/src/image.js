// Import the required packages for Cloudinary
const stream = require('stream');
const cloudinary = require('cloudinary');

// Retrieve the Coludinary secret URL
if (!process.env.CLOUDINARY_URL) {
    console.error("Must set cloudinary url");
}

// Function to manage uploading an image using cloudinary
function upload(publicId, req, res, next) {
    // If the request is not a file (image to be uploaded), do nothing
    if (!req.file) {
        next();
        return;
    }

    // Upload an image stream to cloudinary
    const uploadStream = cloudinary.uploader.upload_stream(result => {
        // Add to the request the URL of the image
        req.fileurl = result.url;

        // Add to the request the public ID of the image
        req.fileid = result.public_id;
        next();
    }, { public_id: req.body[publicId] })

    // Use the PassThrough stream to help manage our image upload
    const s = new stream.PassThrough()

    // Retrieve the buffer for the file to be upload through Cloudinary
    s.end(req.file.buffer)

    // Pipe the buffer
    s.pipe(uploadStream)

    // End the upload on time
    s.on('end', uploadStream.end)
}

// Declare and define a method that uploads an image using Cloudinary
const uploadImage = (publicId) => (req, res, next) => {
    multer().single(publicId)(req, res, () => upload(publicId, req, res, next));
}

module.exports = uploadImage;