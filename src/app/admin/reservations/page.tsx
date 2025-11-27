'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { format } from 'date-fns'
import { Search, Filter, CheckCircle, XCircle, Clock } from 'lucide-react'
import clsx from 'clsx'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

type Reservation = {
    id: string
    first_name: string
    last_name: string
    email: string
    phone: string
    party_size: number
    reservation_date: string
    reservation_time: string
    occasion?: string
    extra_notes?: string
    status: 'booked' | 'seated' | 'cancelled' | 'completed'
    created_at: string
}

export default function AdminReservations() {
    const [reservations, setReservations] = useState<Reservation[]>([])
    const [loading, setLoading] = useState(true)
    const [filterDate, setFilterDate] = useState(format(new Date(), 'yyyy-MM-dd'))
    const [statusFilter, setStatusFilter] = useState<string>('all')

    const fetchReservations = async () => {
        setLoading(true)
        let query = supabase
            .from('reservations')
            .select('*')
            .order('reservation_date', { ascending: true })
            .order('reservation_time', { ascending: true })

        if (filterDate) {
            query = query.eq('reservation_date', filterDate)
        }

        if (statusFilter !== 'all') {
            query = query.eq('status', statusFilter)
        }

        const { data, error } = await query

        if (error) {
            console.error('Error fetching reservations:', error)
        } else {
            setReservations(data as Reservation[])
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchReservations()
    }, [filterDate, statusFilter])

    const updateStatus = async (id: string, newStatus: string) => {
        const { error } = await supabase
            .from('reservations')
            .update({ status: newStatus })
            .eq('id', id)

        if (!error) {
            fetchReservations()
        }
    }

    return (
        <div>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <h1 className="text-3xl font-bold text-stone-900 dark:text-white">Reservations</h1>

                <div className="flex gap-4">
                    <div className="relative">
                        <input
                            type="date"
                            value={filterDate}
                            onChange={(e) => setFilterDate(e.target.value)}
                            className="pl-10 pr-4 py-2 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-white focus:ring-2 focus:ring-orange-500 outline-none"
                        />
                        <Filter className="absolute left-3 top-2.5 h-4 w-4 text-stone-400" />
                    </div>

                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-4 py-2 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-white focus:ring-2 focus:ring-orange-500 outline-none"
                    >
                        <option value="all">All Status</option>
                        <option value="booked">Booked</option>
                        <option value="seated">Seated</option>
                        <option value="cancelled">Cancelled</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>
            </div>

            <div className="bg-white dark:bg-stone-800 rounded-xl shadow-sm border border-stone-100 dark:border-stone-700 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-stone-50 dark:bg-stone-900/50 border-b border-stone-200 dark:border-stone-700">
                            <tr>
                                <th className="px-6 py-4 text-sm font-semibold text-stone-900 dark:text-white">Time</th>
                                <th className="px-6 py-4 text-sm font-semibold text-stone-900 dark:text-white">Guest</th>
                                <th className="px-6 py-4 text-sm font-semibold text-stone-900 dark:text-white">Party</th>
                                <th className="px-6 py-4 text-sm font-semibold text-stone-900 dark:text-white">Contact</th>
                                <th className="px-6 py-4 text-sm font-semibold text-stone-900 dark:text-white">Status</th>
                                <th className="px-6 py-4 text-sm font-semibold text-stone-900 dark:text-white">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-200 dark:divide-stone-700">
                            {loading ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-8 text-center text-stone-500">Loading...</td>
                                </tr>
                            ) : reservations.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-8 text-center text-stone-500">No reservations found for this date.</td>
                                </tr>
                            ) : (
                                reservations.map((res) => (
                                    <tr key={res.id} className="hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors">
                                        <td className="px-6 py-4 text-stone-900 dark:text-white font-medium">
                                            {res.reservation_time.slice(0, 5)}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-stone-900 dark:text-white">{res.first_name} {res.last_name}</div>
                                            {res.occasion && (
                                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300 mt-1">
                                                    {res.occasion}
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-stone-600 dark:text-stone-300">
                                            {res.party_size} ppl
                                        </td>
                                        <td className="px-6 py-4 text-sm text-stone-600 dark:text-stone-300">
                                            <div>{res.email}</div>
                                            <div>{res.phone}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={clsx(
                                                "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium",
                                                res.status === 'booked' && "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300",
                                                res.status === 'seated' && "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300",
                                                res.status === 'cancelled' && "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300",
                                                res.status === 'completed' && "bg-stone-100 text-stone-800 dark:bg-stone-700 dark:text-stone-300"
                                            )}>
                                                {res.status === 'booked' && <Clock className="h-3 w-3" />}
                                                {res.status === 'seated' && <CheckCircle className="h-3 w-3" />}
                                                {res.status === 'cancelled' && <XCircle className="h-3 w-3" />}
                                                {res.status.charAt(0).toUpperCase() + res.status.slice(1)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-2">
                                                {res.status === 'booked' && (
                                                    <>
                                                        <button
                                                            onClick={() => updateStatus(res.id, 'seated')}
                                                            className="text-green-600 hover:text-green-700 text-sm font-medium"
                                                        >
                                                            Seat
                                                        </button>
                                                        <button
                                                            onClick={() => updateStatus(res.id, 'cancelled')}
                                                            className="text-red-600 hover:text-red-700 text-sm font-medium"
                                                        >
                                                            Cancel
                                                        </button>
                                                    </>
                                                )}
                                                {res.status === 'seated' && (
                                                    <button
                                                        onClick={() => updateStatus(res.id, 'completed')}
                                                        className="text-stone-600 hover:text-stone-700 text-sm font-medium"
                                                    >
                                                        Complete
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
