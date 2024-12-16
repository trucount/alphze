import Header from '../components/Header'

export default function Info() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">About ALPHZE</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="mb-4">
            ALPHZE is your ultimate streaming platform for movies, TV shows, and more! We offer a wide range of content to keep you entertained, including:
          </p>
          <ul className="list-disc list-inside mb-4">
            <li>The latest blockbuster movies</li>
            <li>Binge-worthy TV series</li>
            <li>Exclusive original content</li>
            <li>Interactive quizzes to test your knowledge</li>
            <li>Trailers for upcoming releases</li>
          </ul>
          <p className="mb-4">
            Our platform is designed to provide a seamless and enjoyable streaming experience, with features like:
          </p>
          <ul className="list-disc list-inside mb-4">
            <li>Personalized recommendations</li>
            <li>User profiles and watchlists</li>
            <li>High-quality video playback</li>
            <li>Multi-device support</li>
            <li>Gamification elements to enhance your experience</li>
          </ul>
          <p>
            Thank you for choosing ALPHZE as your go-to streaming platform. We're constantly working to improve and expand our offerings to ensure you always have something great to watch!
          </p>
        </div>
      </main>
    </div>
  )
}

