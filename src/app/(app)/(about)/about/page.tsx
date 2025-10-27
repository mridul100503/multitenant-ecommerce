// app/(your-route)/about/page.jsx
import Image from "next/image";
import Navbar from "../../(home)/navbar/navbar";
import { Footer } from "../../(home)/navbar/footer";

export default function About() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-neutral-900 text-gray-900 dark:text-gray-100">
      <Navbar />

      <main className="flex-1 w-full max-w-5xl mx-auto px-6 py-12">
        {/* HERO */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Text */}
          <div className="md:col-span-2">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-3">
              Multivendor E-commerce Platform 
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 max-w-2xl">
              A full-stack marketplace connecting multiple sellers with buyers — vendor dashboards, admin roles, secure payments,
              responsive UI and dark mode. Built with Next.js, React, Node.js and MongoDB.
            </p>

            {/* Quick facts / one-liner for recruiters */}
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="px-3 py-1 rounded-full bg-white/80 dark:bg-white/6 shadow-sm text-sm">Role: Full-stack Engineer</span>
              <span className="px-3 py-1 rounded-full bg-white/80 dark:bg-white/6 shadow-sm text-sm">Timeline: 8 weeks</span>
              <span className="px-3 py-1 rounded-full bg-white/80 dark:bg-white/6 shadow-sm text-sm">Focus: Performance & UX</span>
            </div>

            {/* Role bullets */}
            <div className="mb-6">
              <h3 className="font-semibold mb-2">My contributions</h3>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                <li>Frontend: Next.js + React + Tailwind + ShadCN — component-driven UI, accessibility & responsive design.</li>
                <li>Backend: Node.js, Express / REST (or tRPC) + MongoDB — auth, vendor & admin APIs, order flows.</li>
                <li>Features: Authentication, vendor dashboards, admin roles, dark mode, payment integration and deployment.</li>
              </ul>
            </div>

            {/* Tech stack badges */}
            <div className="flex flex-wrap gap-2 items-center mb-6">
              {["Next.js","React","Node.js","MongoDB","Tailwind CSS","ShadCN","Stripe (payments)"].map(t => (
                <span key={t} className="text-sm px-3 py-1 rounded-md bg-white/80 dark:bg-white/6 shadow-sm">
                  {t}
                </span>
              ))}
            </div>
          </div>

           

          {/* Image */}
          <figure className="flex justify-center md:justify-end">
            <div className="w-44 h-44 md:w-56 md:h-56 rounded-full overflow-hidden shadow-xl ring-1 ring-gray-200 dark:ring-neutral-700">
              <Image
                src="/MyImage.png"
                alt="Mridul Yadav — Fullstack Engineer"
                width={224}
                height={224}
                className="object-cover"
                priority
              />
            </div>
            <figcaption className="sr-only">Mridul Yadav — Fullstack Engineer</figcaption>
          </figure>
        </section>

        {/* Optional: Project details card */}
        <section className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-neutral-800 rounded-lg p-5 shadow-sm">
            <h4 className="font-semibold mb-2">Project overview</h4>
            <p className="text-gray-700 dark:text-gray-300">
              Built a multivendor marketplace where vendors register, list products, and manage orders. Buyers can browse categories,
              checkout with secure payments, and track orders. Admin panel for moderation and analytics.
            </p>
          </div>

          <div className="bg-white dark:bg-neutral-800 rounded-lg p-5 shadow-sm">
            <h4 className="font-semibold mb-2">Why this matters (for recruiters)</h4>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
              <li>Scalable design: componentized frontend and decoupled APIs for future growth.</li>
              <li>Real product focus: vendor UX, payments, order lifecycle, and security considerations implemented.</li>
              <li>Production-ready: CI/CD friendly, tested, and deployed (Vercel/Heroku/your choice).</li>
            </ul>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

