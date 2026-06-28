import { LoginForm } from '@/modules/auth/components/LoginForm';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen">
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <LoginForm />
        </div>
      </div>
      <div className="relative hidden w-0 flex-1 lg:block">
        <div className="absolute inset-0 h-full w-full bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2029&auto=format&fit=crop')] bg-cover bg-center mix-blend-multiply opacity-20"></div>
          <div className="absolute bottom-10 left-10 text-white max-w-xl">
            <h2 className="text-4xl font-bold mb-4">Streamline your business operations.</h2>
            <p className="text-indigo-100 text-lg">NexaERP provides state of the art tools to manage customers, invoices, and analytics efficiently.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
