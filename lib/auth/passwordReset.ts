import { pb } from "@/lib/db/pb";

export interface PasswordResetRequest {
  email: string;
}

export interface PasswordResetConfirm {
  token: string;
  password: string;
  passwordConfirm: string;
}

/**
 * Send password reset email to user
 */
export async function requestPasswordReset(email: string): Promise<boolean> {
  try {
    await pb.collection("users").requestPasswordReset(email);
    return true;
  } catch (error) {
    console.error("Password reset request failed:", error);
    throw error;
  }
}

/**
 * Confirm password reset with token (for when user clicks link in email)
 */
export async function confirmPasswordReset(token: string, password: string, passwordConfirm: string): Promise<boolean> {
  try {
    await pb.collection("users").confirmPasswordReset(token, password, passwordConfirm);
    return true;
  } catch (error) {
    console.error("Password reset confirmation failed:", error);
    throw error;
  }
}
