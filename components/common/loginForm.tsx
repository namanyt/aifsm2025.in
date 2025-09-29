"use client";

import { useForm } from "react-hook-form";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "../ui/select";
import { Input } from "../ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RegisterFormData, Orgs } from "@/lib/types";
import { useAuth } from "@/lib/auth/authContext";
import { pb } from "@/lib/db/pb";
import { redirect } from "next/dist/server/api-utils";
import Link from "next/dist/client/link";

export function LoginForm() {
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

  const handleSubmit = (data: { email: string; password: string; org: string }) => {
    const output = {
      email: data.email,
      password: data.password,
      org: data.org,
    };
    console.log("Registration data:", output);
    // Handle form submission here

    login(output.email, output.password)
      .then((authData) => {
        console.log("User logged in: ", authData);
        window.location.href = "/dashboard"; // Redirect to dashboard after login
      })
      .catch((error) => {
        alert("Invalid credentials. Please check your email and password.");
      });
  };

  return (
    <div className="w-full flex flex-col items-center py-12 bg-white">
      <h2 className="text-3xl font-bold text-center text-[#9E5700] mb-2">Login</h2>
      <div className="w-16 h-1 bg-[#9E5700] mx-auto mb-8 rounded" />
      <div className="w-full max-w-xl">
        <Form {...form}>
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="org"
              rules={{ required: "Please select a state/organisation" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold text-sky-900 mb-1">Select State/Organisation</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full h-12 px-4 bg-white border-2 shadow-lg rounded-xl text-black font-semibold cursor-pointer transition-all">
                        <SelectValue placeholder="40 states/departments/Institutes" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="max-h-64 max-w-[50vw] backdrop-blur-sm bg-white/50 ">
                      {orgOptions.map((org) => (
                        <SelectItem
                          key={org}
                          value={org}
                          className="cursor-pointer w-full hover:bg-blue-50 bg-white/50 backdrop-blur-sm border-2 border-gray-200"
                        >
                          {org}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Nodal Officer Login */}
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
                      className="h-12 px-4 bg-gray-300 text-black rounded-sm border-0 placeholder:text-gray-500 focus:bg-gray-200"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Nodal Officer Password */}
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
                      className="h-12 px-4 bg-gray-300 text-black rounded-sm border-0 placeholder:text-gray-500 focus:bg-gray-200"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Register Button */}
            <button
              type="button"
              onClick={form.handleSubmit(handleSubmit)}
              className="w-full h-12 bg-gradient-to-r from-sky-700 to-cyan-600 hover:from-cyan-600 hover:to-sky-700 text-white font-bold rounded-xl transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 mt-4 text-lg shadow-md cursor-pointer"
            >
              Login
            </button>
          </div>
        </Form>

        {/* for forgot password */}
        {/* AFTER SMTP is setup SET THIS FORM */}
        <div className="mt-4">
          <Link href="/login/forgot" className="text-sm text-sky-600 hover:underline cursor-pointer">
            Forgot Password?
          </Link>
        </div>
      </div>
    </div>
  );
}
