import Image from "next/image";
import { LoginForm } from "./LoginForm";

export default function LoginPage() {
  return (
    <div className="w-full h-full flex flex-col lg:flex-row justify-center items-center shadow-lg rounded-lg shadow-primary gap-4">
      <div className="w-1/2 h-full hidden lg:block overflow-hidden">
        <Image
          src="/images/auth-image.jpg"
          alt=""
          width={1000}
          height={1000}
          className="w-full h-full object-cover rounded-xl"
        />
      </div>
      <div className="w-full lg:w-1/2 h-full flex flex-col items-center justify-center p-4">
        <p className="text-4xl font-bold text-primary">Best School System</p>
        <p className="font-semibold text-primary my-4">
          Provide details below to login
        </p>
        <LoginForm />
      </div>
    </div>
  );
}
