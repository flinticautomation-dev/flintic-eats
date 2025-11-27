'use client'

import { useState } from 'react'
import { MapPin, Phone, Mail, Send } from 'lucide-react'

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    })
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setStatus('submitting')

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })

            if (!res.ok) throw new Error('Failed to send message')

            setStatus('success')
            setFormData({ name: '', email: '', message: '' })
        } catch (error) {
            console.error(error)
            setStatus('error')
        }
    }

    return (
        <div className="bg-white dark:bg-stone-950 min-h-screen py-20 px-6">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
                {/* Contact Info */}
                <div>
                    <h1 className="text-4xl font-bold text-stone-900 dark:text-white mb-6">Get in Touch</h1>
                    <p className="text-lg text-stone-600 dark:text-stone-300 mb-12">
                        Have a question or special request? We'd love to hear from you.
                    </p>

                    <div className="space-y-8">
                        <div className="flex items-start gap-4">
                            <div className="bg-orange-100 dark:bg-orange-900/20 p-3 rounded-full">
                                <MapPin className="h-6 w-6 text-orange-600" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-stone-900 dark:text-white mb-1">Visit Us</h3>
                                <p className="text-stone-600 dark:text-stone-400">
                                    123 Automation Street<br />
                                    Tech City, TC 90210
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="bg-orange-100 dark:bg-orange-900/20 p-3 rounded-full">
                                <Phone className="h-6 w-6 text-orange-600" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-stone-900 dark:text-white mb-1">Call Us</h3>
                                <p className="text-stone-600 dark:text-stone-400">+1 (555) 123-4567</p>
                                <p className="text-sm text-stone-500 mt-1">Mon-Fri from 11am to 10pm</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="bg-orange-100 dark:bg-orange-900/20 p-3 rounded-full">
                                <Mail className="h-6 w-6 text-orange-600" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-stone-900 dark:text-white mb-1">Email Us</h3>
                                <p className="text-stone-600 dark:text-stone-400">hello@flinticeats.com</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="bg-stone-50 dark:bg-stone-900 p-8 rounded-2xl shadow-sm">
                    <h2 className="text-2xl font-bold text-stone-900 dark:text-white mb-6">Send a Message</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                required
                                className="w-full px-4 py-3 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-white focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                required
                                className="w-full px-4 py-3 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-white focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">
                                Message
                            </label>
                            <textarea
                                id="message"
                                required
                                rows={4}
                                className="w-full px-4 py-3 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-white focus:ring-2 focus:ring-orange-500 outline-none transition-all resize-none"
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={status === 'submitting' || status === 'success'}
                            className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-stone-400 text-white font-semibold py-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                        >
                            {status === 'submitting' ? (
                                'Sending...'
                            ) : status === 'success' ? (
                                'Message Sent!'
                            ) : (
                                <>
                                    Send Message <Send className="h-4 w-4" />
                                </>
                            )}
                        </button>

                        {status === 'error' && (
                            <p className="text-red-600 text-sm text-center">Something went wrong. Please try again.</p>
                        )}
                    </form>
                </div>
            </div>
        </div>
    )
}
