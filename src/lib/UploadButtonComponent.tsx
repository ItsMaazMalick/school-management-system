"use client";
import Link from "next/link";
import { UploadButton } from "./uploadthing";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export default function UploadButtonComponent({ image, setImage }: any) {
  const [progress, setProgress] = useState(false);
  return (
    <>
      {progress ? (
        <div className="text-primary-foreground rounded-md h-10 flex justify-center items-center text-xs">
          <Loader2 size={16} className="animate-spin mr-1" /> Uploading
        </div>
      ) : (
        <div className="w-full bg-primary text-black h-10 rounded-md text-xs">
          {image ? (
            <Link
              href={image}
              target="_blank"
              className="text-secondary-foreground bg-destructive rounded-md h-10 flex justify-center items-center"
            >
              Uploaded
            </Link>
          ) : (
            <UploadButton
              className="px-2"
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                setImage(res[0].url);
                setProgress(false);
              }}
              onUploadError={(error: Error) => {
                alert(`ERROR! ${error.message}`);
                setImage("");
              }}
              onUploadBegin={() => {
                setProgress(true);
              }}
            />
          )}
        </div>
      )}
    </>
  );
}
