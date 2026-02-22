import Link from 'next/link';
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b">
        <Link className="flex items-center justify-center" href="#">
          <span className="font-bold text-2xl tracking-tighter text-indigo-600">Voxari Health</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#solutions">
            Solutions
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#pricing">
            Pricing
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/sign-in">
            Login
          </Link>
          <Button asChild>
            <Link href="/demo">Book a Demo</Link>
          </Button>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  AI Receptionist for Modern Healthcare
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Automate your front desk with intelligent voice agents that book appointments, answer FAQs, and provide white-glove service.
                </p>
              </div>
              <div className="space-x-4">
                <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700">Get Started</Button>
                <Button size="lg" variant="outline">Learn More</Button>
              </div>
            </div>
          </div>
        </section>

        <section id="solutions" className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold text-center mb-12">Solution Packs</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 bg-white rounded-lg shadow-sm border">
                <h3 className="text-xl font-bold mb-2">MedSpa</h3>
                <p className="text-gray-600">Conversion focused. Reactivate clients and book more aesthetic treatments.</p>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-sm border">
                <h3 className="text-xl font-bold mb-2">General Clinic</h3>
                <p className="text-gray-600">Patient routing and safety-first intake for family practice and urgent care.</p>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-sm border">
                <h3 className="text-xl font-bold mb-2">Luxe Aesthetic</h3>
                <p className="text-gray-600">White-glove concierge service for premium aesthetic practices.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500">© 2024 Voxari Health. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
