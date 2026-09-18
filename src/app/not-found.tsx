import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      {/* Visual Anchor / Error Code */}
      <h1 className="text-8xl font-extrabold text-gray-200 dark:text-gray-800">404</h1>
      
      {/* Context Message */}
      <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        We lost this page
      </h2>
      <p className="mt-2 text-base text-gray-600 max-w-md mx-auto">
        The URL might have moved. Let's get you back to finding what you love.
      </p>

    

      {/* Quick Navigation Links */}
      <div className="mt-10">
        <div className="mt-4 flex flex-wrap justify-center gap-4">
          <Link href="/shop" className="rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            Shop All
          </Link>
       
        </div>
      </div>

      {/* Primary Call to Action */}
   
    </div>
  );
}
