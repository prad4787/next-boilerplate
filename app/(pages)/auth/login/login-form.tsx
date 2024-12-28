"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link"
import { SubmitHandler, useForm } from "react-hook-form"
import { loginFormSchema } from "@/validators/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormField } from "@/components/form/form-field"
import { Form } from "@/components/form/form"
import { useLoginMutation } from "@/store/api/authApi"
import { useRouter } from "next/navigation"
import { LoginResponse } from "@/types/auth"
import { useStorage } from "@/hooks/use-storage"
import { STORAGE_KEYS } from "@/constants/storage.constant"

type LoginFormData = {
  email: string;
  password: string;
}

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {

  const [login, { isLoading }] = useLoginMutation()
  const router = useRouter()
  const { setItem } = useStorage()

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
    mode: "onSubmit",
    defaultValues: {
      email: "admin@gmail.com",
      password: "secret",
    },
  });

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    try {
      const formValues = form.getValues();

      const loginData = {
        email: formValues.email,
        password: formValues.password,
      };

      const response = await login(loginData).unwrap();
      
      setItem(STORAGE_KEYS.ACCESS_TOKEN, response.access_token);
      setItem(STORAGE_KEYS.REFRESH_TOKEN, response.refresh_token);
      setItem(STORAGE_KEYS.USER, JSON.stringify(response.user));
      
      router.push("/user/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form form={form} onSubmit={onSubmit}>
            <div className="flex flex-col gap-6">

              <div className={`grid gap-2`}>
                <FormField
                  name="email"
                  label="Email"
                  placeholder="m@example.com"
                />
              </div>
              <div className="grid gap-0">

                <FormField
                  name="password"
                  label="Password"
                  type="password"
                  placeholder="*********"
                />
                <div className="flex items-center">
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>

              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign in"}
              </Button>
              <Button variant="outline" className="w-full">
                Login with Google
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/auth/register" className="underline underline-offset-4">
                Sign up
              </Link>
            </div>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
