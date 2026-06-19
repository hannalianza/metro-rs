"use client";

import { useState, type FormEvent } from "react";

const info = [
  {
    title: "Visit Our Showroom",
    lines: ["5113 Pacific Highway East, Unit 1B", "Fife, WA 98424"],
    icon: "M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z",
  },
  {
    title: "Call Us",
    lines: ["(253) 266-9394", "Mon–Fri 8am–4:30pm, Sat 8am–4pm"],
    icon: "M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z",
  },
  {
    title: "Email Us",
    lines: ["just4metrors@gmail.com", "We respond within 24 hours"],
    icon: "M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75",
  },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-brand-800 py-16 text-white">
        <div className="mx-auto max-w-7xl px-4">
          <h1 className="text-4xl font-bold">Contact Us</h1>
          <p className="mt-4 max-w-2xl text-lg text-gray-300">
            Have questions or need a quote? We&apos;re here to help. Reach out to
            our team and we&apos;ll get back to you within 24 hours.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Contact form */}
            <div>
              <h2 className="mb-6 text-2xl font-bold">Send Us a Message</h2>
              {submitted ? (
                <div className="rounded-lg border border-green-200 bg-green-50 p-8 text-center">
                  <svg className="mx-auto h-12 w-12 text-green-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                  <h3 className="mt-4 text-lg font-semibold text-green-800">
                    Message Sent!
                  </h3>
                  <p className="mt-2 text-sm text-green-600">
                    Thank you for contacting us. A member of our team will get back
                    to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="firstName" className="mb-1 block text-sm font-medium text-gray-700">First Name *</label>
                      <input id="firstName" name="firstName" required className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500" />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="mb-1 block text-sm font-medium text-gray-700">Last Name *</label>
                      <input id="lastName" name="lastName" required className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">Email *</label>
                    <input id="email" name="email" type="email" required className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500" />
                  </div>
                  <div>
                    <label htmlFor="phone" className="mb-1 block text-sm font-medium text-gray-700">Phone</label>
                    <input id="phone" name="phone" type="tel" className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500" />
                  </div>
                  <div>
                    <label htmlFor="subject" className="mb-1 block text-sm font-medium text-gray-700">Subject *</label>
                    <select id="subject" name="subject" required className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500">
                      <option value="">Select a subject</option>
                      <option value="quote">Request a Quote</option>
                      <option value="product">Product Question</option>
                      <option value="order">Order Inquiry</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="message" className="mb-1 block text-sm font-medium text-gray-700">Message *</label>
                    <textarea id="message" name="message" rows={5} required className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500" />
                  </div>
                  <button type="submit" className="btn-primary w-full sm:w-auto">
                    Send Message
                  </button>
                </form>
              )}
            </div>

            {/* Contact info & map */}
            <div>
              <h2 className="mb-6 text-2xl font-bold">Get in Touch</h2>
              <div className="space-y-6">
                {info.map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <svg className="h-6 w-6 flex-shrink-0 text-brand-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                    </svg>
                    <div>
                      <h3 className="font-semibold">{item.title}</h3>
                      {item.lines.map((line) => (
                        <p key={line} className="text-sm text-gray-500">{line}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Google Maps embed */}
              <div className="mt-8 overflow-hidden rounded-lg border border-gray-200 shadow-sm">
                <iframe
                  title="Metro Restaurant Supply location"
                  src="https://maps.google.com/maps?q=5113+Pacific+Highway+East+Unit+1B+Fife+WA+98424&output=embed"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
