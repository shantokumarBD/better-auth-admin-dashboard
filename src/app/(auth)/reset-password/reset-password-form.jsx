"use client";
import { useSearchParams } from "next/navigation";
import React from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { resetPassword } from "@/lib/auth-client";

const ResetPasswordForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const onSubmit = async (e) => {
    e.preventDefault();
    const password = new FormData(e.currentTarget).get("password");

    const res = await resetPassword({
      newPassword: password,
      token: token,
    });

    if (res.error) {
      toast.error(res.error.message);
    } else {
      toast.success("Password updated successfully!");
      router.push("/sign-in");
    }
  };
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-zinc-50 p-4 dark:bg-black">
      <div className="w-full max-w-md rounded-3xl border border-zinc-200 bg-white p-8 shadow-2xl dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight">Reset Password</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Enter a new password for your account.
          </p>
        </div>
        <Form className="flex w-full flex-col gap-5" onSubmit={onSubmit}>
          <TextField
            isRequired
            minLength={8}
            name="password"
            type="password"
            validate={(value) => {
              if (value.length < 8) {
                return "Password must be at least 8 characters";
              }
              if (!/[A-Z]/.test(value)) {
                return "Password must contain at least one uppercase letter";
              }
              if (!/[0-9]/.test(value)) {
                return "Password must contain at least one number";
              }
              return null;
            }}
          >
            <Label>New Password</Label>
            <Input placeholder="Enter your new password" />
            <Description>
              Must be at least 8 characters with 1 uppercase and 1 number
            </Description>
            <FieldError />
          </TextField>
          <div className="mt-2 w-full">
            <Button
              color="primary"
              type="submit"
              className="w-full font-medium"
            >
              Update Password
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
