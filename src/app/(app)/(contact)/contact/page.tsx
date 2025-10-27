import Navbar from "../../(home)/navbar/navbar";
import { Footer } from "../../(home)/navbar/footer";

export default function Contact() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-neutral-900 text-gray-900 dark:text-gray-100">
      <Navbar />

      <main className="flex-1 w-full max-w-xl mx-auto px-6 py-16 flex flex-col items-center text-center">
        <h1 className="text-4xl font-bold mb-6">Contact Me</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-10">
          Reach out via any of the following channels:
        </p>

        <div className="flex flex-col gap-4 text-lg">
          <a
            href="mailto:mridulyadav@example.com"
            className="text-blue-600 hover:underline"
          >
            Gmail: mridulyadav@example.com
          </a>

          <a
            href="tel:+919999999999"
            className="text-blue-600 hover:underline"
          >
            Mobile: +91 99999 99999
          </a>

          <a
            href="https://www.linkedin.com/in/mridulyadav/"
            target="_blank"
            className="text-blue-600 hover:underline"
          >
            LinkedIn: linkedin.com/in/mridulyadav
          </a>

          <a
            href="/Mridul_Yadav_Resume.pdf"
            download
            className="inline-block mt-4 px-6 py-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Download Resume
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
}
