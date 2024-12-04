import { cloudinary } from "@/lib/cloudinary"; // your config path
import { NextRequest } from "next/server";

export const uploadToCloudinary = (
  fileUri: string,
  fileName: string
): Promise<any> => {
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader
      .upload(fileUri, {
        allowed_formats: ["gif", "jpg", "webp", "svg", "png"],
        invalidate: true,
        resource_type: "auto",
        filename_override: fileName,
        folder: "mobiles", // any sub-folder name in your cloud
        use_filename: true,
      })
      .then((result: any) => {
        resolve({ success: true, result });
      })
      .catch((error: any) => {
        reject({ success: false, error });
      });
  });
};
