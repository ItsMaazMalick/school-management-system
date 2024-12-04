import { getSession } from "@/actions/session";
import { LoginForm } from "./login";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Smartphone } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await getSession();
  if (session) {
    return redirect("/dashboard");
  }
  return (
    <div className="h-[100dvh] bg-gradient-to-b from-blue-100 to-white flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <Smartphone className="h-12 w-12 text-blue-500" />
          </div>
          <CardTitle className="text-2xl text-center">
            Login to Your Account
          </CardTitle>
          <CardDescription className="text-center">
            Enter your email and password to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
        <CardFooter className="flex flex-col items-center">
          <div className="text-sm text-gray-500">
            Don&apos;t have an account?{" "}
            <Link href="/auth/signup" className="text-blue-500 hover:underline">
              Sign up
            </Link>
          </div>
          <Link
            href="/forgot-password"
            className="text-sm text-blue-500 hover:underline mt-2"
          >
            Forgot your password?
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
