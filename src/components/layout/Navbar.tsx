'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, UtensilsCrossed } from 'lucide-react'
import clsx from 'clsx'

const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Menu', href: '/menu' },
    { name: 'Reservations', href: '/reserve' },
    { name: 'Contact', href: '/contact' },
]

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <header className="absolute inset-x-0 top-0 z-50">
            <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
                <div className="flex lg:flex-1">
                    <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-2">
                        <UtensilsCrossed className="h-8 w-8 text-orange-600" />
                        <span className="text-xl font-bold tracking-tight text-stone-900 dark:text-white">
                            Flintic Eats
                        </span>
                    </Link>
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-stone-700 dark:text-stone-200"
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <span className="sr-only">Open main menu</span>
                        <Menu className="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>
                <div className="hidden lg:flex lg:gap-x-12">
                    {navigation.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="text-sm font-semibold leading-6 text-stone-900 dark:text-white hover:text-orange-600 dark:hover:text-orange-500 transition-colors"
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    <Link href="/reserve" className="text-sm font-semibold leading-6 text-stone-900 dark:text-white">
                        Book a Table <span aria-hidden="true">&rarr;</span>
                    </Link>
                </div>
            </nav>

            {/* Mobile menu */}
            <div className={clsx("lg:hidden", mobileMenuOpen ? "fixed inset-0 z-50" : "hidden")}>
                <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white dark:bg-stone-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center justify-between">
                        <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-2">
                            <UtensilsCrossed className="h-8 w-8 text-orange-600" />
                            <span className="text-xl font-bold tracking-tight text-stone-900 dark:text-white">Flintic Eats</span>
                        </Link>
                        <button
                            type="button"
                            className="-m-2.5 rounded-md p-2.5 text-stone-700 dark:text-stone-200"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <span className="sr-only">Close menu</span>
                            <X className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="space-y-2 py-6">
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-stone-900 dark:text-white hover:bg-stone-50 dark:hover:bg-stone-800"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                            <div className="py-6">
                                <Link
                                    href="/reserve"
                                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-stone-900 dark:text-white hover:bg-stone-50 dark:hover:bg-stone-800"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Book a Table
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}
