"use server";

import { uploadToCloudinary } from "@/lib/upload-image";

export const uploadImage = async (file: File) => {
  try {
    const fileBuffer = await file.arrayBuffer();

    const mimeType = file.type;
    const encoding = "base64";
    const base64Data = Buffer.from(fileBuffer).toString("base64");

    // this will be used to upload the file
    const fileUri = "data:" + mimeType + ";" + encoding + "," + base64Data;

    const res = await uploadToCloudinary(fileUri, file.name);
    return res;
  } catch {
    return { error: "Something went wrong" };
  }
};
