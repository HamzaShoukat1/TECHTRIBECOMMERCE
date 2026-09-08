export default function Footer() {
  return (
    <footer className="w-full bg-white px-6 py-12 font-sans md:px-16  lg:px-24 border-t border-gray-200">
      {/* Top Main Section */}
      <div className="mx-auto max-w-7xl grid grid-cols-1 gap-8 md:grid-cols-2 font-poppins lg:grid-cols-4">
        
        {/* Column 1: Brand Info */}
        <div className="flex flex-col gap-8">
          <h2 className="text-2xl font-bold text-black">Funiro.</h2>
          <p className="max-w-[280px] text-sm leading-relaxed text-gray-400">
            400 University Drive Suite 200 Coral Gables,<br />
            FL 33134 USA
          </p>
        </div>

        {/* Column 2: Links */}
        <div className="flex flex-col gap-6 lg:pl-12">
          <span className="text-sm font-medium text-gray-400">Links</span>
          <nav className="flex flex-col gap-6">
            <a href="#" className="text-sm font-bold text-black transition-colors hover:text-gray-600">Home</a>
            <a href="#" className="text-sm font-bold text-black transition-colors hover:text-gray-600">Shop</a>
            <a href="#" className="text-sm font-bold text-black transition-colors hover:text-gray-600">About</a>
            <a href="#" className="text-sm font-bold text-black transition-colors hover:text-gray-600">Contact</a>
          </nav>
        </div>

        {/* Column 3: Help */}
        <div className="flex flex-col gap-6">
          <span className="text-sm font-medium text-gray-400">Help</span>
          <nav className="flex flex-col gap-6">
            <a href="payment" className="text-sm font-bold text-black transition-colors hover:text-gray-600">Payment Options</a>
            <a href="return" className="text-sm font-bold text-black transition-colors hover:text-gray-600">Returns</a>
            <a href="/privacy-policies" className="text-sm font-bold text-black transition-colors hover:text-gray-600">Privacy Policies</a>
          </nav>
        </div>

        <div className="flex flex-col gap-6">
          <span className="text-sm font-medium text-gray-400">Newsletter</span>
          <form className="flex items-center gap-4">
            <input 
              type="email" 
              placeholder="Enter Your Email Address" 
              className="w-full border-b border-black pb-1 text-xs text-[#9F9F9F] focus:text-black focus:outline-none"
            />
            <button 
              type="submit" 
              className="border-b border-black pb-1 text-xs font-bold tracking-wider text-black uppercase transition-opacity hover:opacity-70"
            >
              Subscribe
            </button>
          </form>
        </div>

      </div>

      {/* Bottom Legal Copyright Section */}
      <div className="mx-auto max-w-7xl mt-12 pt-8 border-t border-gray-100">
        <p className="text-sm text-black">
          2023 furino. All rights reserved
        </p>
      </div>
    </footer>
  )
}
