"use client";

import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RegisterFormData, Orgs } from "@/lib/types";
import { useAuth } from "@/lib/auth/authContext";
import { useState } from "react";
import { ResetPasswordDialog } from "./ResetPasswordDialog";
import { pb } from "@/lib/db/pb";
import { redirect } from "next/dist/server/api-utils";
import { ChevronDown } from "lucide-react";
import { DEFAULT_PASSWORD } from "@/lib/constants";

export function RegisterForm() {
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
      org: "",
    },
  });

  // Get all org options from the Orgs object
  const orgOptions = Object.keys(Orgs).filter((k) => isNaN(Number(k)));

  const { login } = useAuth();
  const [showReset, setShowReset] = useState(false);
  const [pendingCreds, setPendingCreds] = useState<{ email: string; password: string } | null>(null);
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  const handleSubmit = (data: { email: string; password: string; org: string }) => {
    const output = {
      email: data.email,
      password: data.password,
      org: data.org,
    };
    // console.log("Registration data:", output);

    // Always check password correctness first
    login(output.email, output.password)
      .then((authData) => {
        if (output.password === DEFAULT_PASSWORD) {
          setPendingCreds({ email: output.email, password: output.password });
          setShowReset(true);
        } else {
          window.location.href = "/dashboard";
        }
      })
      .catch((error) => {
        alert("Invalid credentials. Please check your email and password.");
      });
  };

  // Called when user sets a new password in the dialog
  const handleResetPassword = async (newPassword: string) => {
    if (!pendingCreds) return;
    try {
      // Log in with default password
      await login(pendingCreds.email, pendingCreds.password);
      // Update password in PocketBase
      await pb.collection("users").update(pb.authStore.record!.id, {
        password: newPassword,
        passwordConfirm: newPassword,
        oldPassword: pendingCreds.password,
        name: pendingCreds.email.split("@")[0], // Set name as part before @ in email
        org: form.getValues("org"),
      });
      setShowReset(false);
      window.location.href = "/dashboard";
    } catch (err) {
      alert("Failed to reset password. Please try again.");
    }
  };

  return (
    <div className="w-full flex flex-col items-center py-12 bg-white">
      <div className="w-full max-w-xl">
        <Form {...form}>
          <div className="space-y-6">
            {/* ...existing fields... */}
            <FormField
              control={form.control}
              name="org"
              rules={{ required: "Please select a state/organisation" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold text-sky-900 mb-1">Select State/Organisation</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <select
                        {...field}
                        className="w-full h-12 px-4 bg-white border-2 border-sky-600 shadow-lg rounded-xl text-black font-semibold cursor-pointer focus:ring-2 focus:ring-sky-400 focus:border-sky-600 transition-all appearance-none pr-10"
                        onFocus={() => setIsSelectOpen(true)}
                        onBlur={() => setIsSelectOpen(false)}
                        onMouseDown={() => setIsSelectOpen(!isSelectOpen)}
                      >
                        <option value="" disabled>
                          Select State/Organisation
                        </option>
                        {orgOptions.map((org) => (
                          <option key={org} value={org}>
                            {org}
                          </option>
                        ))}
                      </select>
                      <ChevronDown
                        className={`absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-sky-600 pointer-events-none transition-transform duration-200 ${
                          isSelectOpen ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Please enter a valid email address",
                },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold text-sky-900 mb-1">Nodal Officer Login</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter Email"
                      {...field}
                      className="h-12 px-4 border-2 border-sky-600 text-black rounded-xl placeholder:text-gray-500 focus:bg-gray-200 cursor-pointer"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              rules={{
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold text-sky-900 mb-1">Nodal Officer Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter Password"
                      {...field}
                      className="h-12 px-4 text-black rounded-xl border-2 border-sky-600 placeholder:text-gray-500 focus:bg-gray-200 cursor-pointer"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <button
              type="button"
              onClick={form.handleSubmit(handleSubmit)}
              className="w-full h-12 bg-gradient-to-r from-sky-700 to-cyan-600 hover:from-cyan-600 hover:to-sky-700 text-white font-bold rounded-xl transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 mt-4 text-lg shadow-md cursor-pointer"
            >
              Login
            </button>
          </div>
        </Form>
      </div>
      {/* Password Reset Dialog */}
      <ResetPasswordDialog open={showReset} onClose={() => setShowReset(false)} onSubmit={handleResetPassword} />
    </div>
  );
}
