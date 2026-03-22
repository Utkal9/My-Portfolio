import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import streamifier from "streamifier";
import dotenv from "dotenv";

// Safety net — load env vars even if server.js didn't do it first
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Log on startup so you can confirm values are loaded
console.log("☁️  Cloudinary config:", {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "❌ MISSING",
    api_key: process.env.CLOUDINARY_API_KEY ? "✅ set" : "❌ MISSING",
    api_secret: process.env.CLOUDINARY_API_SECRET ? "✅ set" : "❌ MISSING",
});

const memStorage = multer.memoryStorage();

export const uploadProject = multer({ storage: memStorage });
export const uploadProfile = multer({ storage: memStorage });
export const uploadCert = multer({ storage: memStorage });
export const uploadResume = multer({ storage: memStorage });
export const uploadAny = multer({ storage: memStorage });

export function uploadBuffer(
    buffer,
    folder = "portfolio/misc",
    resourceType = "image",
) {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { folder, resource_type: resourceType },
            (error, result) => {
                if (error) return reject(error);
                resolve({
                    url: result.secure_url,
                    public_id: result.public_id,
                });
            },
        );
        streamifier.createReadStream(buffer).pipe(stream);
    });
}

export async function deleteAsset(publicId, resourceType = "image") {
    if (!publicId) return;
    try {
        await cloudinary.uploader.destroy(publicId, {
            resource_type: resourceType,
        });
    } catch (err) {
        console.error("Cloudinary delete error:", err.message);
    }
}

export default cloudinary;
