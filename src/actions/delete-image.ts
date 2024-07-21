import { utapi } from "./UTApi";

export async function deleteImage(imageKey: string) {
  try {
    console.log(imageKey);
    const res = await utapi.deleteFiles(imageKey);
    return { success: "Image deleted" };
  } catch (error) {
    return { error: "Somethinng went wrong" };
  }
}
