'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'
import { CalendarDays, Users, Clock, ArrowRight } from 'lucide-react'
import { format } from 'date-fns'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        todayReservations: 0,
        totalGuests: 0,
        pending: 0
    })
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchStats = async () => {
            const today = format(new Date(), 'yyyy-MM-dd')

            const { data: todayRes } = await supabase
                .from('reservations')
                .select('party_size')
                .eq('reservation_date', today)
                .neq('status', 'cancelled')

            const { count: pendingCount } = await supabase
                .from('reservations')
                .select('*', { count: 'exact', head: true })
                .eq('status', 'booked')
                .gte('reservation_date', today)

            const totalGuests = todayRes?.reduce((acc, curr) => acc + curr.party_size, 0) || 0

            setStats({
                todayReservations: todayRes?.length || 0,
                totalGuests,
                pending: pendingCount || 0
            })
            setLoading(false)
        }

        fetchStats()
    }, [])

    if (loading) {
        return <div className="text-stone-500">Loading dashboard...</div>
    }

    return (
        <div>
            <h1 className="text-3xl font-bold text-stone-900 dark:text-white mb-8">Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-white dark:bg-stone-800 p-6 rounded-xl shadow-sm border border-stone-100 dark:border-stone-700">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                            <CalendarDays className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-sm text-stone-500 dark:text-stone-400">Today's Reservations</p>
                            <h3 className="text-2xl font-bold text-stone-900 dark:text-white">{stats.todayReservations}</h3>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-stone-800 p-6 rounded-xl shadow-sm border border-stone-100 dark:border-stone-700">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
                            <Users className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                            <p className="text-sm text-stone-500 dark:text-stone-400">Expected Guests</p>
                            <h3 className="text-2xl font-bold text-stone-900 dark:text-white">{stats.totalGuests}</h3>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-stone-800 p-6 rounded-xl shadow-sm border border-stone-100 dark:border-stone-700">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
                            <Clock className="h-6 w-6 text-orange-600" />
                        </div>
                        <div>
                            <p className="text-sm text-stone-500 dark:text-stone-400">Upcoming Pending</p>
                            <h3 className="text-2xl font-bold text-stone-900 dark:text-white">{stats.pending}</h3>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white dark:bg-stone-800 rounded-xl shadow-sm border border-stone-100 dark:border-stone-700 p-8 text-center">
                <h2 className="text-xl font-semibold text-stone-900 dark:text-white mb-4">Quick Actions</h2>
                <div className="flex justify-center gap-4">
                    <Link
                        href="/admin/reservations"
                        className="inline-flex items-center gap-2 bg-stone-900 dark:bg-white text-white dark:text-stone-900 px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
                    >
                        Manage Reservations <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
            </div>
        </div>
    )
}
