import Link from 'next/link'
import { Clock, MapPin, Star, ChefHat, Leaf, Zap } from 'lucide-react'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center bg-stone-900 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-40"></div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            Flintic Eats
          </h1>
          <p className="text-xl md:text-2xl text-stone-200 mb-8 font-light">
            Smart dining, easy reservations.
          </p>
          <Link
            href="/reserve"
            className="inline-block bg-orange-600 hover:bg-orange-700 text-white font-semibold py-4 px-8 rounded-full transition-all transform hover:scale-105 shadow-lg"
          >
            Book a Table
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-6 bg-white dark:bg-stone-950">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-stone-900 dark:text-white mb-6">
            About Flintic Eats
          </h2>
          <p className="text-lg text-stone-600 dark:text-stone-300 leading-relaxed">
            Flintic Eats is a modern restaurant blending great food with smart technology.
            We believe dining should be an experience, not a hassle.
            Reserve a table in seconds and skip the waiting line, while enjoying our
            curated menu of seasonal delights.
          </p>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-20 px-6 bg-stone-50 dark:bg-stone-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: ChefHat, title: 'Seasonal Menu', desc: 'Dishes crafted from the season’s best.' },
              { icon: Leaf, title: 'Fresh Ingredients', desc: 'Locally sourced, organic produce.' },
              { icon: Star, title: 'Cozy Ambience', desc: 'Designed for comfort and conversation.' },
              { icon: Zap, title: 'Fast Online Booking', desc: 'Reserve your spot in seconds.' },
            ].map((item, idx) => (
              <div key={idx} className="bg-white dark:bg-stone-800 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow text-center">
                <item.icon className="h-10 w-10 text-orange-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-stone-900 dark:text-white mb-2">{item.title}</h3>
                <p className="text-stone-600 dark:text-stone-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hours & Location */}
      <section className="py-20 px-6 bg-white dark:bg-stone-950">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-stone-900 dark:text-white mb-6 flex items-center gap-3">
                <Clock className="h-8 w-8 text-orange-600" /> Opening Hours
              </h2>
              <ul className="space-y-2 text-lg text-stone-600 dark:text-stone-300">
                <li className="flex justify-between border-b border-stone-100 dark:border-stone-800 py-2">
                  <span>Mon – Fri</span>
                  <span>11:00 AM – 10:00 PM</span>
                </li>
                <li className="flex justify-between border-b border-stone-100 dark:border-stone-800 py-2">
                  <span>Sat – Sun</span>
                  <span>9:00 AM – 11:00 PM</span>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-stone-900 dark:text-white mb-6 flex items-center gap-3">
                <MapPin className="h-8 w-8 text-orange-600" /> Location
              </h2>
              <p className="text-lg text-stone-600 dark:text-stone-300">
                123 Automation Street<br />
                Tech City, TC 90210
              </p>
            </div>
          </div>
          <div className="h-80 bg-stone-200 dark:bg-stone-800 rounded-2xl overflow-hidden relative">
            {/* Placeholder for map */}
            <div className="absolute inset-0 flex items-center justify-center text-stone-400">
              <span className="text-lg font-medium">Map Placeholder</span>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 bg-orange-50 dark:bg-stone-900">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-stone-900 dark:text-white mb-12">
            What Our Guests Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Sarah J.', text: 'The booking process was so smooth, and the food was incredible!' },
              { name: 'Michael T.', text: 'Finally, a restaurant website that actually works well on mobile.' },
              { name: 'Emily R.', text: 'Loved the ambience and the seasonal specials. Will be back!' },
            ].map((item, idx) => (
              <div key={idx} className="bg-white dark:bg-stone-800 p-8 rounded-xl shadow-sm">
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-stone-600 dark:text-stone-300 mb-6 italic">"{item.text}"</p>
                <p className="font-semibold text-stone-900 dark:text-white">- {item.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
