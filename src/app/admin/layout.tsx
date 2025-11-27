'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'
import { LayoutDashboard, CalendarDays, LogOut } from 'lucide-react'
import clsx from 'clsx'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter()
    const pathname = usePathname()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const checkUser = async () => {
            const { data: { session } } = await supabase.auth.getSession()
            if (!session && pathname !== '/admin/login') {
                router.push('/admin/login')
            }
            setLoading(false)
        }

        checkUser()

        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            if (!session && pathname !== '/admin/login') {
                router.push('/admin/login')
            }
        })

        return () => subscription.unsubscribe()
    }, [router, pathname])

    const handleSignOut = async () => {
        await supabase.auth.signOut()
        router.push('/admin/login')
    }

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center bg-stone-100 dark:bg-stone-900">Loading...</div>
    }

    if (pathname === '/admin/login') {
        return <>{children}</>
    }

    return (
        <div className="min-h-screen bg-stone-100 dark:bg-stone-900 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white dark:bg-stone-800 border-r border-stone-200 dark:border-stone-700 hidden md:flex flex-col">
                <div className="p-6 border-b border-stone-200 dark:border-stone-700">
                    <h1 className="text-xl font-bold text-stone-900 dark:text-white">Flintic Admin</h1>
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    <Link
                        href="/admin"
                        className={clsx(
                            "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                            pathname === '/admin'
                                ? "bg-orange-50 dark:bg-orange-900/20 text-orange-600"
                                : "text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-700"
                        )}
                    >
                        <LayoutDashboard className="h-5 w-5" />
                        Dashboard
                    </Link>
                    <Link
                        href="/admin/reservations"
                        className={clsx(
                            "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                            pathname === '/admin/reservations'
                                ? "bg-orange-50 dark:bg-orange-900/20 text-orange-600"
                                : "text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-700"
                        )}
                    >
                        <CalendarDays className="h-5 w-5" />
                        Reservations
                    </Link>
                </nav>
                <div className="p-4 border-t border-stone-200 dark:border-stone-700">
                    <button
                        onClick={handleSignOut}
                        className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    >
                        <LogOut className="h-5 w-5" />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto">
                <div className="p-8">
                    {children}
                </div>
            </main>
        </div>
    )
}
