"use client";
import { useState } from "react";
import NewsLatterBox from "./NewsLatterBox";
import Lottie from "lottie-react";
import loadingAnimation from "../../../public/images/lottie/loading.json";
import { RainbowButton } from "@/components/ui/rainbow-button";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="relative py-16 md:py-20 lg:py-28">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 pointer-events-none"></div>

      <div className="container relative z-10">
        <div className="-mx-4 flex flex-wrap items-start gap-y-10">
          {/* Contact Form */}
          <div className="w-full px-4 lg:w-7/12 xl:w-8/12">
            <div className="rounded-2xl bg-white dark:bg-gray-900 shadow-lg p-8 sm:p-10 lg:p-12 transition-all duration-300 hover:shadow-xl">
              <h2 className="mb-3 text-3xl font-bold text-gray-900 dark:text-white">
                Need Help? <span className="text-primary">Open a Ticket</span>
              </h2>
              <p className="mb-10 text-base text-gray-600 dark:text-gray-300">
                Our support team will respond as soon as possible via email.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name & Email */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      required
                      className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-3 text-base focus:border-primary focus:ring-2 focus:ring-primary/40 transition"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
                      Your Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      required
                      className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-3 text-base focus:border-primary focus:ring-2 focus:ring-primary/40 transition"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="What is your issue about?"
                    required
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-3 text-base focus:border-primary focus:ring-2 focus:ring-primary/40 transition"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
                    Your Message
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Type your message here..."
                    required
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-3 text-base focus:border-primary focus:ring-2 focus:ring-primary/40 transition resize-none"
                  />
                </div>

                {/* Submit */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <RainbowButton
                    disabled={status === "loading"}
                    className={`${status === "loading" ? "opacity-60" : ""} flex items-center gap-2`}
                  >
                    {status === "loading" && (
                      <Lottie animationData={loadingAnimation} className="w-5 h-5" />
                    )}
                    {status === "loading" ? "Sending..." : "Submit Ticket"}
                  </RainbowButton>

                  {status === "success" && (
                    <p className="text-green-600 text-sm font-medium">
                      ✅ Message sent successfully!
                    </p>
                  )}
                  {status === "error" && (
                    <p className="text-red-600 text-sm font-medium">
                      ❌ Something went wrong. Try again.
                    </p>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-full px-4 lg:w-5/12 xl:w-4/12">
            <NewsLatterBox />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
