const File = require("../models/File");
const cloudinary = require("cloudinary").v2;

exports.localFileUpload = async (req,res)=>{
    try {
        //Fetch the File from Request
        const file = req.files.file;
        console.log("File",file);

        //Create Path where the file need to be Stored on the Server
        let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;
        console.log("Path",path);

        //Add Path to the Move function
        file.mv(path, (err) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: false,
                    message: 'File upload failed',
                });
            }
        });

        //Craete the Successful Response
        res.json({
            success: true,
            message: 'Local File Upload Successfully',
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
        });
    }
}

function isFileTypeSupported(type, supportTypes){
    return supportTypes.includes(type);
}

async function uploadFileToCloudinary(file, folder, quality){
    const options = {folder};
    console.log("Temp File Path", file.tempFilePath);
    if(quality){
        options.quality = quality;
    }
    options.resource_type = "auto";  
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}

// Image Uplalod Handler
exports.imageUpload = async (req, res)=>{
    try {
        const {name, tags,email} = req.body;
        console.log(name, tags,email);

        const file = req.files.imageFile;
        console.log(file);

        //Validation
        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType = file.name.split('.')[1].toLowerCase();

        if(!isFileTypeSupported(fileType, supportedTypes)){
            return res.status(400).json({
                success: false,
                message: 'File Format not Supported',
            });
        }

        //File Format is supported
        const response = await uploadFileToCloudinary(file, "Prasad");
        console.log(response);

        //Create a entry in the database
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url,
        })

        res.json({
            success: true,
            imageUrl: response.secure_url,
            message: 'Image Uploaded SuccessFully',
        })
    } catch (error) {
       console.log(error);
       res.status(400).json({
            success: false,
            message: 'Something Went Wrong',
       });
    }
}

// Video Uplalod Handler
exports.videoUpload = async (req, res)=>{
    try {
        //Fetch the data from the Users body
        const {name, tags,email} = req.body;
        console.log(name, tags, email);

        const file = req.files.videoFile;
        console.log(file);

        //Validation
        const supportedTypes = ["mp4", "mov"];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("File Type", fileType);
        

        if(!isFileTypeSupported(fileType, supportedTypes)){
            return res.status(400).json({
                success: false,
                message: 'File Format not Supported',
            });
        }

        //File Format is supported
        console.log("Uploading...");
        const response = await uploadFileToCloudinary(file, "Prasad");
        console.log(response);

        //Create a entry in the database
        const fileData = await File.create({
            name,
            tags,
            email,
            videoUrl: response.secure_url,
        })

        res.json({
            success: true,
            videoUrl: response.secure_url,
            message: 'Video Uploaded SuccessFully',
        })
    } catch (error) {
       console.log(error);
       res.status(400).json({
            success: false,
            message: 'Something Went Wrong',
       });
    }
}

//Image Size Reducer
exports.imageSizeReducer = async (req, res)=>{
    try {
        //Fetch the data  
        const {name, tags,email} = req.body;
        console.log(name, tags,email);

        const file = req.files.imageFile;
        console.log(file);

        //Validation
        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType = file.name.split('.')[1].toLowerCase();

        if(!isFileTypeSupported(fileType, supportedTypes)){
            return res.status(400).json({
                success: false,
                message: 'File Format not Supported',
            });
        }

        //File Format is supported
        console.log("Uploading...");
        const response = await uploadFileToCloudinary(file, "Prasad", 30);
        console.log(response);

        //Create a entry in the database
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url,
        })

        res.json({
            success: true,
            imageUrl: response.secure_url,
            message: 'Image Uploaded SuccessFully',
        })
    } catch (error) {
       console.log(error);
       res.status(400).json({
            success: false,
            message: 'Something Went Wrong',
       });
    }
}
