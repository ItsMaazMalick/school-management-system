import CryptoJS from "crypto-js";

export const encryptString = (value: string) => {
  return CryptoJS.AES.encrypt(value, process.env.CRYPTO_SECRET_KEY!).toString();
};

export const decryptString = (value: string) => {
  try {
    const bytes = CryptoJS.AES.decrypt(value, process.env.CRYPTO_SECRET_KEY!);
    const decryptedValue = bytes.toString(CryptoJS.enc.Utf8);
    return decryptedValue;
  } catch (error) {
    return null;
  }
};
