"use client";

import { useState, useActionState, useEffect, useTransition } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { authenticate, resendOTP, verifyOTP } from "@/app/(auth)/login/actions";
import { AuthState } from "@/app/(auth)/login/actions";
import OTPInput from "./components/otp-input";

const LoginPageIndex = () => {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [showPassword, setShowPassword] = useState(false);
  const [capturedPassword, setCapturedPassword] = useState("");

  const [state, formAction, isPending] = useActionState<AuthState, FormData>(
    authenticate,
    { error: null },
  );

  const [otpState, otpAction, isOtpPending] = useActionState<
    AuthState,
    FormData
  >(verifyOTP, { error: null, step: "otp" });

  const [resendCooldown, setResendCooldown] = useState(0);
  const [resendError, setResendError] = useState("");
  const [resendSuccess, setResendSuccess] = useState("");
  const [isResending, startResendTransition] = useTransition();

  const email = state.email ?? otpState.email ?? "";
  const password = state.password ?? capturedPassword;

  // Cooldown timer
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const t = setTimeout(() => setResendCooldown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [resendCooldown]);

  // Start cooldown immediately when OTP step is shown
  useEffect(() => {
    if (state.step === "otp") {
      setResendCooldown(60);
    }
  }, [state.step]);

  const handleResend = () => {
    if (resendCooldown > 0 || isResending) return;
    setResendError("");
    setResendSuccess("");

    startResendTransition(async () => {
      const result = await resendOTP(email);
      if (result.error) {
        setResendError(result.error);
      } else {
        setResendSuccess("New code sent!");
        setResendCooldown(60);
        setTimeout(() => setResendSuccess(""), 3000);
      }
    });
  };

  const handleAuthSubmit = (formData: FormData) => {
    setCapturedPassword(String(formData.get("password") || ""));
    return formAction(formData);
  };

  const isOTPStep = state.step === "otp" || otpState.step === "otp";

  return (
    <div className="w-full max-w-md">
      {/* brand */}
      <div className="mb-8 text-center">
        <Link href="/" className="inline-flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="Outsyde Logo"
            width={500}
            height={500}
            className="w-11 md:w-14"
          />
          <span className="font-display text-2xl font-black tracking-tight md:text-2xl">
            <span className="text-brand-orange">ut</span>syde
          </span>
        </Link>
        <p className="mt-2 text-sm text-brand-night/60">
          {mode === "signin"
            ? "Welcome back. Let's go out."
            : "Join the movement."}
        </p>
      </div>

      <div className="rounded-3xl border border-brand-night/10 bg-white p-6 shadow-sm sm:p-8">
        {/* Google */}
        <button
          type="button"
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="flex h-12 w-full items-center justify-center gap-3 rounded-full border border-brand-night/15 text-sm font-semibold text-brand-night transition-colors hover:bg-brand-sand"
        >
          <svg width="16" height="16" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Continue with Google
        </button>

        {/* divider */}
        <div className="my-6 flex items-center gap-4">
          <span className="h-px flex-1 bg-brand-night/10" />
          <span className="text-xs uppercase tracking-widest text-brand-night/40">
            or
          </span>
          <span className="h-px flex-1 bg-brand-night/10" />
        </div>

        {/* ── OTP step ── */}
        {state.success ? (
          <div className="flex flex-col gap-6">
            <div className="text-center">
              <div className="text-4xl mb-3">📬</div>
              <h2 className="text-lg font-bold text-brand-night">
                Check your inbox
              </h2>
              <p className="text-sm text-brand-night/60 mt-1">
                We sent a 6-digit code to <strong>{email}</strong>
              </p>
            </div>

            <form action={otpAction} className="flex flex-col gap-4">
              <input type="hidden" name="email" value={email} />
              <input type="hidden" name="password" value={password} />

              <OTPInput name="otp" />

              {otpState.error && (
                <p className="text-xs text-red-500 font-medium text-center">
                  {otpState.error}
                </p>
              )}

              {otpState.success && (
                <p className="text-xs text-brand-lagoon font-medium text-center">
                  {otpState.success}
                </p>
              )}

              <button
                type="submit"
                disabled={isOtpPending}
                className="h-12 w-full rounded-full bg-brand-orange text-sm font-bold text-brand-night transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isOtpPending ? "Verifying…" : "Verify code"}
              </button>
            </form>

            {/* Resend */}
            <div className="text-center">
              <p className="text-xs text-brand-night/40 mb-2">
                Didn't get the code?
              </p>
              {resendError && (
                <p className="text-xs text-red-500 mb-2">{resendError}</p>
              )}
              {resendSuccess && (
                <p className="text-xs text-brand-lagoon mb-2">
                  {resendSuccess}
                </p>
              )}
              <button
                onClick={handleResend}
                disabled={resendCooldown > 0 || isResending}
                className="text-sm font-medium text-brand-orange disabled:text-brand-night/30 transition-colors"
              >
                {isResending
                  ? "Sending…"
                  : resendCooldown > 0
                    ? `Resend in ${resendCooldown}s`
                    : "Resend code"}
              </button>
            </div>

            {/* Back */}
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="text-xs text-center text-brand-night/40 hover:text-brand-night transition-colors"
            >
              ← Back to sign in
            </button>
          </div>
        ) : (
          <>
            {/* mode toggle */}
            <div className="mb-6 grid grid-cols-2 rounded-full bg-brand-sand p-1">
              {(["signin", "signup"] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMode(m)}
                  className={`h-9 rounded-full text-sm font-semibold transition-colors ${
                    mode === m
                      ? "bg-brand-night text-brand-sand"
                      : "text-brand-night/60 hover:text-brand-night"
                  }`}
                >
                  {m === "signin" ? "Sign in" : "Sign up"}
                </button>
              ))}
            </div>

            <form action={handleAuthSubmit} className="space-y-4">
              <input type="hidden" name="mode" value={mode} />

              {mode === "signup" && (
                <div className="grid grid-cols-2 gap-3">
                  <input
                    name="firstName"
                    placeholder="First name"
                    required
                    className="h-12 w-full rounded-full border border-brand-night/15 bg-white px-5 text-sm text-brand-night outline-none transition placeholder:text-brand-night/40 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/30"
                  />
                  <input
                    name="lastName"
                    placeholder="Last name"
                    required
                    className="h-12 w-full rounded-full border border-brand-night/15 bg-white px-5 text-sm text-brand-night outline-none transition placeholder:text-brand-night/40 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/30"
                  />
                </div>
              )}

              <input
                name="email"
                type="email"
                placeholder="Email address"
                required
                className="h-12 w-full rounded-full border border-brand-night/15 bg-white px-5 text-sm text-brand-night outline-none transition placeholder:text-brand-night/40 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/30"
              />

              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password (min. 8 characters)"
                  required
                  minLength={8}
                  className="h-12 w-full rounded-full border border-brand-night/15 bg-white px-5 pr-14 text-sm text-brand-night outline-none transition placeholder:text-brand-night/40 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/30"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-xs font-semibold text-brand-night/50 hover:text-brand-orange"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>

              {state.error && (
                <p className="rounded-xl bg-brand-orange/10 px-4 py-3 text-center text-sm font-medium text-brand-orange">
                  {state.error}
                </p>
              )}

              <button
                type="submit"
                disabled={isPending}
                className="h-12 w-full rounded-full bg-brand-orange text-sm font-bold text-brand-night transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isPending
                  ? "Loading..."
                  : mode === "signin"
                    ? "Sign in"
                    : "Create account"}
              </button>
            </form>
          </>
        )}

        <p className="mt-6 text-center text-xs text-brand-night/50">
          By continuing you agree to our{" "}
          <a href="#" className="underline hover:text-brand-orange">
            Terms
          </a>{" "}
          and{" "}
          <a href="#" className="underline hover:text-brand-orange">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default LoginPageIndex;
