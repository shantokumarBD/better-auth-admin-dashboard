"use client";

import { requestPasswordReset } from "@/lib/auth-client";
import {Check} from "@gravity-ui/icons";
import {Button, Description, FieldError, Form, Input, Label, TextField} from "@heroui/react";
import toast from "react-hot-toast";

export default function ForgotPasswordPage() {
  const onSubmit = async(e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {};

    // Convert FormData to plain object
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    const { data: resData, error } = await requestPasswordReset({
        email: data.email,
        redirectTo: '/reset-password'
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Reset link sent! Please check your email.");
    }

  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-zinc-50 p-4 dark:bg-black">
      <div className="w-full max-w-md rounded-3xl border border-zinc-200 bg-white p-8 shadow-2xl dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight">Forgot Password</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Enter your email to receive a password reset link.
          </p>
        </div>
        <Form className="flex w-full flex-col gap-5" onSubmit={onSubmit}>
          <TextField
            isRequired
            name="email"
            type="email"
            validate={(value) => {
              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                return "Please enter a valid email address";
              }

              return null;
            }}
          >
            <Label>Email</Label>
            <Input placeholder="john@example.com" />
            <FieldError />
          </TextField>

          <div className="mt-2 w-full">
            <Button
              color="primary"
              type="submit"
              className="w-full font-medium"
            >
              Send Reset Link
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}