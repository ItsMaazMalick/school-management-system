import { NextResponse } from "next/server";
import * as escpos from "escpos";
// @ts-ignore
import USB from "escpos-usb";
import { printerConfig } from "@/lib/printer-config";

export async function print(value: string) {
  try {
    // Find the USB printer
    const device = new USB();

    // Create the escpos printer
    const printer = new escpos.Printer(device);

    // Convert base64 image to buffer
    const imageBuffer = Buffer.from(value, "base64");

    const image = new escpos.Image(imageBuffer);

    // Open the connection to the printer
    device.open(function (error: Error) {
      if (error) {
        console.error("Error opening printer:", error);
        throw error;
      }

      printer
        .align("CT")
        .text("QR Code")
        .newLine()
        .image(image, "D24")
        .cut()
        .close();
    });

    console.log("Print job sent successfully");
    return { success: "Print Successfull" };
  } catch (error) {
    console.error("Error setting up printer:", error);
    return { error: "Internal Server Error" };
  }
}
