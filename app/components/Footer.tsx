import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-orange-500 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h3 className="text-xl font-bold mb-4">ALPHZE</h3>
            <p>Your ultimate streaming platform for movies, TV shows, and more!</p>
          </div>
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul>
              <li><Link href="/" className="hover:text-orange-200 transition-colors duration-200">Home</Link></li>
              <li><Link href="/trailers" className="hover:text-orange-200 transition-colors duration-200">Trailers</Link></li>
              <li><Link href="/quizzes" className="hover:text-orange-200 transition-colors duration-200">Quizzes</Link></li>
              <li><Link href="/account" className="hover:text-orange-200 transition-colors duration-200">Account</Link></li>
            </ul>
          </div>
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <p>Email: support@alphze.com</p>
            <p>Phone: (123) 456-7890</p>
          </div>
          <div className="w-full md:w-1/4">
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-orange-200 transition-colors duration-200">Facebook</a>
              <a href="#" className="hover:text-orange-200 transition-colors duration-200">Twitter</a>
              <a href="#" className="hover:text-orange-200 transition-colors duration-200">Instagram</a>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p>&copy; 2023 ALPHZE. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

