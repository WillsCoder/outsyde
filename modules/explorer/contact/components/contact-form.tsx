"use client";
import { useState } from "react";
import { IconArrowUpRight, IconCheck } from "@tabler/icons-react";

const ContactForm = () => {
  const [sent, setSent] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };

    try {
      setLoading(true);
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong.");
      }

      setSent(true);
      form.reset();
    } catch (error) {
      console.error(error);
      setLoading(false);
      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Try again.",
      );
    }
  };

  return (
    <div>
      {sent ? (
        <div className="flex min-h-107.5 flex-col items-center justify-center text-center">
          <div className="mb-6 flex h-20 w-20 animate-success-pop items-center justify-center rounded-full bg-brand-lagoon">
            <IconCheck size={36} />
          </div>

          <h3 className="font-display text-3xl font-bold">Message sent!</h3>

          <p className="mt-3 max-w-sm leading-7 text-white/50">
            Thanks for reaching out. We&apos;ll get back to you as soon as
            possible.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Field label="Your name" name="name" />
            <Field label="Email address" name="email" type="email" />
          </div>

          <Field label="What’s this about?" name="subject" />

          <div className="group">
            <label
              htmlFor="message"
              className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-white/40 transition-colors group-focus-within:text-brand-orange"
            >
              Tell us more
            </label>

            <textarea
              id="message"
              name="message"
              required
              rows={5}
              placeholder="Tell us about your project..."
              className="w-full resize-none border-b border-white/15 bg-transparent px-0 py-3 text-base text-white outline-none placeholder:text-white/20 transition-colors focus:border-brand-orange"
            />
          </div>

          <button
            type="submit"
            className="group relative mt-3 flex w-full items-center justify-center gap-3 overflow-hidden rounded-xl bg-brand-orange px-6 py-4 font-bold text-white transition-all duration-500 hover:-translate-y-1 hover:bg-[#ff6d40] hover:shadow-[0_15px_40px_rgba(255,92,43,0.25)]"
          >
            <span className="absolute inset-0 -translate-x-full bg-white/10 transition-transform duration-500 group-hover:translate-x-0" />
            <span className="relative">{loading ? "Sending..." : "Send message"}</span>
            <IconArrowUpRight
              size={19}
              className="relative transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </button>

          <p className="text-center text-xs leading-5 text-white/30">
            By submitting this form, you agree to be contacted about your
            enquiry.
          </p>

          {error && (
            <p className="text-center text-sm leading-5 text-red-500">{error}</p>
          )}
        </form>
      )}
    </div>
  );
};

export default ContactForm;

function Field({
  label,
  name,
  type = "text",
}: {
  label: string;
  name: string;
  type?: string;
}) {
  return (
    <div className="group">
      <label
        htmlFor={name}
        className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-white/40 transition-colors group-focus-within:text-brand-orange"
      >
        {label}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        required
        className="w-full border-b border-white/15 bg-transparent px-0 py-3 text-base text-white outline-none placeholder:text-white/20 transition-colors focus:border-brand-orange"
        placeholder={
          name === "name"
            ? "Jane Smith"
            : name === "email"
              ? "jane@example.com"
              : "Recommend a spot, Submit an event, Partnership, Feedback..."
        }
      />
    </div>
  );
}
