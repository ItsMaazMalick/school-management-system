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
import { SignupForm } from "./signup";
import { getSession } from "@/actions/session";
import { redirect } from "next/navigation";

export default async function SignupPage() {
  const session = await getSession();
  if (session) {
    return redirect("/dashboard");
  }
  return (
    <div className="min-h-[100dvh] bg-gradient-to-b from-blue-100 to-white flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <Smartphone className="h-12 w-12 text-blue-500" />
          </div>
          <CardTitle className="text-2xl text-center">
            Create an Account
          </CardTitle>
          <CardDescription className="text-center">
            Enter your details to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignupForm />
        </CardContent>
        <CardFooter className="flex justify-center">
          <div className="text-sm text-gray-500">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-blue-500 hover:underline">
              Log in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
