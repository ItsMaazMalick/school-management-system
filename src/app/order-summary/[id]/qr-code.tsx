import Image from "next/image";
import QRCode from "qrcode";

export async function QrCodePage({ value }: { value: string }) {
  // Generate QR code
  const qrCodeImage = await QRCode.toDataURL(value, {
    errorCorrectionLevel: "M",
    margin: 3,
    scale: 4,
  });

  return <Image src={qrCodeImage} alt="QrCode" width={100} height={100} />;
}
