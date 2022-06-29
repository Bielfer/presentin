import MyLink from '@/components/core/MyLink';
import Image from 'next/image';

const Page404 = () => (
  <div className="h-screen pt-16 pb-12 flex flex-col bg-white">
    <main className="flex-grow flex flex-col justify-center max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex-shrink-0 flex justify-center">
        <MyLink href="/" className="inline-flex">
          <span className="sr-only">Workflow</span>
          <Image src="/logo.svg" width={50} height={50} alt="Logo" />
        </MyLink>
      </div>
      <div className="py-16">
        <div className="text-center">
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
            Erro 404
          </p>
          <h1 className="mt-2 text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
            Página não encontrada.
          </h1>
          <p className="mt-2 text-base text-gray-500">
            Pedimos desculpas, mas não foi possível encontrar a página que você
            buscava
          </p>
          <div className="mt-6">
            <MyLink
              href="/"
              className="text-base font-medium text-blue-600 hover:text-blue-500"
            >
              Voltar para página inicial<span aria-hidden="true"> &rarr;</span>
            </MyLink>
          </div>
        </div>
      </div>
    </main>
    {/* <footer className="flex-shrink-0 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
      <nav className="flex justify-center space-x-4">
        <a
          href="#"
          className="text-sm font-medium text-gray-500 hover:text-gray-600"
        >
          Contact Support
        </a>
        <span
          className="inline-block border-l border-gray-300"
          aria-hidden="true"
        />
        <a
          href="#"
          className="text-sm font-medium text-gray-500 hover:text-gray-600"
        >
          Status
        </a>
        <span
          className="inline-block border-l border-gray-300"
          aria-hidden="true"
        />
        <a
          href="#"
          className="text-sm font-medium text-gray-500 hover:text-gray-600"
        >
          Twitter
        </a>
      </nav>
    </footer> */}
  </div>
);

export default Page404;
