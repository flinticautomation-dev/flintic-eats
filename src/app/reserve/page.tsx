'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Calendar, Clock, Users, CheckCircle, AlertCircle } from 'lucide-react'
import { format } from 'date-fns'
import clsx from 'clsx'

const reservationSchema = z.object({
    date: z.string().min(1, 'Date is required'),
    time: z.string().min(1, 'Time is required'),
    partySize: z.number().min(1, 'At least 1 person').max(10, 'Max 10 people'),
    firstName: z.string().min(2, 'First name is required'),
    lastName: z.string().min(2, 'Last name is required'),
    email: z.string().email('Invalid email'),
    phone: z.string().min(10, 'Invalid phone number'),
    occasion: z.string().optional(),
    notes: z.string().optional(),
})

type ReservationForm = z.infer<typeof reservationSchema>

export default function ReservePage() {
    const [step, setStep] = useState<1 | 2>(1)
    const [availability, setAvailability] = useState<{ available: boolean; remaining?: number } | null>(null)
    const [checking, setChecking] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const {
        register,
        handleSubmit,
        watch,
        trigger,
        formState: { errors },
    } = useForm<ReservationForm>({
        resolver: zodResolver(reservationSchema),
        defaultValues: {
            partySize: 2,
        },
    })

    const watchDate = watch('date')
    const watchTime = watch('time')

    const generateTimeSlots = (dateString: string) => {
        let isWeekend = false

        if (dateString) {
            const date = new Date(dateString + 'T12:00:00')
            const day = date.getDay()
            isWeekend = day === 0 || day === 6
        }

        const slots = []
        const startHour = isWeekend ? 9 : 11
        const endHour = isWeekend ? 23 : 22

        for (let hour = startHour; hour < endHour; hour++) {
            slots.push(`${hour.toString().padStart(2, '0')}:00`)
            slots.push(`${hour.toString().padStart(2, '0')}:30`)
        }

        return slots
    }

    const checkAvailability = async () => {
        const valid = await trigger(['date', 'time'])
        if (!valid) return

        setChecking(true)
        setAvailability(null)
        setError(null)

        try {
            const res = await fetch(`/api/availability?date=${watchDate}&time=${watchTime}`)
            const data = await res.json()

            if (data.error) throw new Error(data.error)

            setAvailability({ available: data.available, remaining: data.remaining })
            if (data.available) {
                setStep(2)
            } else {
                setError(data.message || 'Sorry, this time slot is already booked. Please select another time.')
            }
        } catch (err) {
            console.error(err)
            setError('Failed to check availability. Please try again.')
        } finally {
            setChecking(false)
        }
    }

    const onSubmit = async (data: ReservationForm) => {
        setSubmitting(true)
        setError(null)

        try {
            const res = await fetch('/api/reservations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    first_name: data.firstName,
                    last_name: data.lastName,
                    email: data.email,
                    phone: data.phone,
                    party_size: data.partySize,
                    reservation_date: data.date,
                    reservation_time: data.time,
                    occasion: data.occasion,
                    extra_notes: data.notes,
                }),
            })

            const result = await res.json()
            if (!res.ok) throw new Error(result.error || 'Failed to book')

            setSuccess(true)
        } catch (err: any) {
            console.error(err)
            setError(err.message || 'Something went wrong. Please try again.')
        } finally {
            setSubmitting(false)
        }
    }

    if (success) {
        return (
            <div className="min-h-screen bg-stone-50 dark:bg-stone-950 flex items-center justify-center p-6">
                <div className="bg-white dark:bg-stone-900 p-8 rounded-2xl shadow-lg max-w-md w-full text-center">
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-stone-900 dark:text-white mb-4">Reservation Confirmed!</h2>
                    <p className="text-stone-600 dark:text-stone-300 mb-8">
                        Your table has been booked. We've sent a confirmation email to your inbox.
                    </p>
                    <a
                        href="/"
                        className="inline-block w-full bg-stone-900 dark:bg-white text-white dark:text-stone-900 font-semibold py-3 rounded-lg hover:opacity-90 transition-opacity"
                    >
                        Return Home
                    </a>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-stone-50 dark:bg-stone-950 py-20 px-6">
            <div className="max-w-2xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-stone-900 dark:text-white mb-4">Book a Table</h1>
                    <p className="text-lg text-stone-600 dark:text-stone-400">
                        Reserve your spot at Flintic Eats.
                    </p>
                </div>

                <div className="bg-white dark:bg-stone-900 rounded-2xl shadow-sm p-8">
                    {/* Progress Steps */}
                    <div className="flex items-center justify-center mb-8 space-x-4">
                        <div className={clsx("flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold", step >= 1 ? "bg-orange-600 text-white" : "bg-stone-200 text-stone-500")}>1</div>
                        <div className="w-12 h-0.5 bg-stone-200 dark:bg-stone-700"></div>
                        <div className={clsx("flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold", step >= 2 ? "bg-orange-600 text-white" : "bg-stone-200 text-stone-500")}>2</div>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {step === 1 && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2 flex items-center gap-2">
                                            <Calendar className="h-4 w-4" /> Date
                                        </label>
                                        <input
                                            type="date"
                                            min={format(new Date(), 'yyyy-MM-dd')}
                                            {...register('date')}
                                            className="w-full px-4 py-3 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-white focus:ring-2 focus:ring-orange-500 outline-none"
                                        />
                                        {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2 flex items-center gap-2">
                                            <Clock className="h-4 w-4" /> Time
                                        </label>
                                        <select
                                            {...register('time')}
                                            className="w-full px-4 py-3 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-white focus:ring-2 focus:ring-orange-500 outline-none"
                                        >
                                            <option value="">Select time</option>
                                            {generateTimeSlots(watchDate || '').map((t) => (
                                                <option key={t} value={t}>{t}</option>
                                            ))}
                                        </select>
                                        {errors.time && <p className="text-red-500 text-sm mt-1">{errors.time.message}</p>}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2 flex items-center gap-2">
                                        <Users className="h-4 w-4" /> Party Size
                                    </label>
                                    <input
                                        type="number"
                                        min="1"
                                        max="10"
                                        {...register('partySize', { valueAsNumber: true })}
                                        className="w-full px-4 py-3 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-white focus:ring-2 focus:ring-orange-500 outline-none"
                                    />
                                    {errors.partySize && <p className="text-red-500 text-sm mt-1">{errors.partySize.message}</p>}
                                </div>

                                {error && (
                                    <div className="bg-red-50 dark:bg-red-900/20 text-red-600 p-4 rounded-lg flex items-center gap-2">
                                        <AlertCircle className="h-5 w-5" />
                                        {error}
                                    </div>
                                )}

                                <button
                                    type="button"
                                    onClick={checkAvailability}
                                    disabled={checking}
                                    className="w-full bg-stone-900 dark:bg-white text-white dark:text-stone-900 font-semibold py-4 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
                                >
                                    {checking ? 'Checking Availability...' : 'Find a Table'}
                                </button>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">First Name</label>
                                        <input
                                            {...register('firstName')}
                                            className="w-full px-4 py-3 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-white focus:ring-2 focus:ring-orange-500 outline-none"
                                        />
                                        {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">Last Name</label>
                                        <input
                                            {...register('lastName')}
                                            className="w-full px-4 py-3 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-white focus:ring-2 focus:ring-orange-500 outline-none"
                                        />
                                        {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">Email</label>
                                        <input
                                            type="email"
                                            {...register('email')}
                                            className="w-full px-4 py-3 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-white focus:ring-2 focus:ring-orange-500 outline-none"
                                        />
                                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">Phone</label>
                                        <input
                                            type="tel"
                                            {...register('phone')}
                                            className="w-full px-4 py-3 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-white focus:ring-2 focus:ring-orange-500 outline-none"
                                        />
                                        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">Occasion (Optional)</label>
                                    <select
                                        {...register('occasion')}
                                        className="w-full px-4 py-3 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-white focus:ring-2 focus:ring-orange-500 outline-none"
                                    >
                                        <option value="">Select an occasion</option>
                                        <option value="Birthday">Birthday</option>
                                        <option value="Anniversary">Anniversary</option>
                                        <option value="Date Night">Date Night</option>
                                        <option value="Business Meal">Business Meal</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">Extra Notes (Optional)</label>
                                    <textarea
                                        {...register('notes')}
                                        rows={3}
                                        className="w-full px-4 py-3 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-white focus:ring-2 focus:ring-orange-500 outline-none resize-none"
                                        placeholder="Allergies, seating preference, etc."
                                    />
                                </div>

                                {error && (
                                    <div className="bg-red-50 dark:bg-red-900/20 text-red-600 p-4 rounded-lg flex items-center gap-2">
                                        <AlertCircle className="h-5 w-5" />
                                        {error}
                                    </div>
                                )}

                                <div className="flex gap-4">
                                    <button
                                        type="button"
                                        onClick={() => setStep(1)}
                                        className="w-1/3 bg-stone-200 dark:bg-stone-800 text-stone-900 dark:text-white font-semibold py-4 rounded-lg hover:bg-stone-300 dark:hover:bg-stone-700 transition-colors"
                                    >
                                        Back
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={submitting}
                                        className="w-2/3 bg-orange-600 hover:bg-orange-700 disabled:bg-stone-400 text-white font-semibold py-4 rounded-lg transition-colors"
                                    >
                                        {submitting ? 'Confirming...' : 'Confirm Reservation'}
                                    </button>
                                </div>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    )
}
