import Navbar from "../../(home)/navbar/navbar";
import { Footer } from "../../(home)/navbar/footer";

export default function Services() {
  const services = [
    {
      title: "Full-Stack Development",
      description: "End-to-end web apps using React, Next.js, Node.js, MongoDB.",
    },
    {
      title: "Frontend & UI/UX",
      description: "Responsive, user-friendly designs using Tailwind & ShadCN.",
    },
    {
      title: "Backend & API",
      description: "REST APIs, authentication, and database management.",
    },
    {
      title: "Deployment",
      description: "CI/CD, Vercel/Heroku deployment, production-ready apps.",
    },
    {
      title: "Feature Implementation",
      description: "Dark mode, admin panel, secure payments, role-based access.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-neutral-900 text-gray-900 dark:text-gray-100">
      <Navbar />

      <main className="flex-1 w-full max-w-5xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-center mb-12">Services</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-neutral-800 rounded-lg p-6 shadow hover:shadow-lg transition text-center flex flex-col gap-4"
            >
              <h3 className="text-xl font-semibold">{service.title}</h3>
              <p className="text-gray-700 dark:text-gray-300">{service.description}</p>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
