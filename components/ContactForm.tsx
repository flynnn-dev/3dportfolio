"use client";

import { FormEvent, useState } from "react";
import emailjs from "@emailjs/browser";

type Status = {
  type: "idle" | "loading" | "success" | "error";
  message: string;
};

export default function ContactForm() {
  const [status, setStatus] = useState<Status>({
    type: "idle",
    message: "",
  });

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;

    if (!form.reportValidity()) return;

    const data = new FormData(form);

    const payload = {
      name: String(data.get("name") || "").trim(),
      email: String(data.get("email") || "").trim(),
      message: String(data.get("message") || "").trim(),
    };

    if (payload.message.length < 10) {
      setStatus({
        type: "error",
        message: "Please write at least 10 characters.",
      });
      return;
    }

    const serviceId =
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;

    const templateId =
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;

    const publicKey =
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setStatus({
        type: "error",
        message: "Email service is not configured.",
      });
      return;
    }

    setStatus({
      type: "loading",
      message: "Sending…",
    });

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: payload.name,
          from_email: payload.email,
          reply_to: payload.email,
          message: payload.message,
        },
        {
          publicKey,
        }
      );

      form.reset();

      setStatus({
        type: "success",
        message: "Message sent. I’ll get back to you soon.",
      });
    } catch (error) {
      console.error(error);

      setStatus({
        type: "error",
        message: "Unable to send your message. Please try again.",
      });
    }
  }

  return (
    <form
      className="contact-form glass-panel reveal-card"
      onSubmit={submit}
    >
      <label>
        <span>Name</span>

        <input
          name="name"
          type="text"
          minLength={2}
          maxLength={80}
          required
          autoComplete="name"
          placeholder="Your name"
        />
      </label>

      <label>
        <span>Email</span>

        <input
          name="email"
          type="email"
          maxLength={160}
          required
          autoComplete="email"
          placeholder="you@example.com"
        />
      </label>

      <label>
        <span>Message</span>

        <textarea
          name="message"
          minLength={10}
          maxLength={3000}
          rows={5}
          required
          placeholder="Tell me about your project or opportunity."
        />
      </label>

      <button
        type="submit"
        disabled={status.type === "loading"}
      >
        <span>
          {status.type === "loading"
            ? "Sending…"
            : "Send Message"}
        </span>

        <span aria-hidden="true">↗</span>
      </button>

      <p
        className={`form-status ${status.type}`}
        role="status"
        aria-live="polite"
      >
        {status.message}
      </p>
    </form>
  );
}