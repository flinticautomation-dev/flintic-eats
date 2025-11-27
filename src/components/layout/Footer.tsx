import Link from 'next/link'

export default function Footer() {
    return (
        <footer className="bg-stone-900 text-stone-400 py-12">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-white text-lg font-semibold mb-4">Flintic Eats</h3>
                        <p className="text-sm">
                            Modern dining experience with smart reservations.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-white text-lg font-semibold mb-4">Contact</h3>
                        <p className="text-sm">123 Automation Street</p>
                        <p className="text-sm">Tech City, TC 90210</p>
                        <p className="text-sm mt-2">hello@flinticeats.com</p>
                        <p className="text-sm">+1 (555) 123-4567</p>
                    </div>
                    <div>
                        <h3 className="text-white text-lg font-semibold mb-4">Hours</h3>
                        <p className="text-sm">Mon–Fri: 11:00 AM – 10:00 PM</p>
                        <p className="text-sm">Sat–Sun: 9:00 AM – 11:00 PM</p>
                    </div>
                </div>
                <div className="mt-8 border-t border-stone-800 pt-8 text-center text-xs">
                    <p>&copy; {new Date().getFullYear()} Flintic Eats. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}
