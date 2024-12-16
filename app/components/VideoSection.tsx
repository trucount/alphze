import Link from 'next/link'
import { motion } from 'framer-motion'

interface Video {
  id: number
  title: string
  description: string
  videoUrl: string
  thumbnailUrl: string
}

interface VideoSectionProps {
  title: string
  videos: Video[]
  spotlight?: boolean
}

export default function VideoSection({ title, videos, spotlight = false }: VideoSectionProps) {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className={`grid ${spotlight ? 'grid-cols-1' : 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'} gap-4`}>
        {videos.map((video) => (
          <motion.div
            key={video.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <Link href={`/video/${video.id}`}>
              <img src={video.thumbnailUrl} alt={video.title} className="w-full h-40 object-cover" />
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2 truncate">{video.title}</h3>
                <p className="text-gray-600 text-sm line-clamp-2">{video.description}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

