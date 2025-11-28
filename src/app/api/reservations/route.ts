import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { sendEmail, generateReservationEmail } from '@/lib/email'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const {
            first_name,
            last_name,
            email,
            phone,
            party_size,
            reservation_date,
            reservation_time,
            occasion,
            extra_notes
        } = body

        // Basic validation
        if (!first_name || !last_name || !email || !phone || !party_size || !reservation_date || !reservation_time) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
        }

        // Check availability (simplified: max capacity per slot)
        const { count, error: countError } = await supabase
            .from('reservations')
            .select('*', { count: 'exact', head: true })
            .eq('reservation_date', reservation_date)
            .eq('reservation_time', reservation_time)
            .neq('status', 'cancelled')

        if (countError) {
            console.error('Error checking availability:', countError)
            return NextResponse.json({ error: 'Failed to check availability' }, { status: 500 })
        }

        // Only allow 1 booking per time slot
        if (count !== null && count > 0) {
            return NextResponse.json({
                error: 'This time slot is already booked. Please select another time.'
            }, { status: 409 })
        }

        // Create reservation
        const { data, error } = await supabase
            .from('reservations')
            .insert([
                {
                    first_name,
                    last_name,
                    email,
                    phone,
                    party_size,
                    reservation_date,
                    reservation_time,
                    occasion,
                    extra_notes,
                    status: 'booked'
                }
            ])
            .select()
            .single()

        if (error) {
            console.error('Error creating reservation:', error)
            return NextResponse.json({ error: `Supabase Error: ${error.message}` }, { status: 500 })
        }

        // Send confirmation email
        try {
            await sendEmail({
                to: email,
                subject: 'Your Flintic Eats Reservation is Confirmed',
                html: generateReservationEmail(data)
            })
        } catch (emailError) {
            console.error('Failed to send email:', emailError)
        }

        return NextResponse.json({ success: true, reservation: data })
    } catch (error: any) {
        console.error('Unexpected error:', error)
        return NextResponse.json({ error: `Server Error: ${error.message || error}` }, { status: 500 })
    }
}

export async function GET(request: Request) {
    // This endpoint should be protected for admin only
    // For now, we'll just return all reservations

    const { data, error } = await supabase
        .from('reservations')
        .select('*')
        .order('created_at', { ascending: false })

    if (error) {
        return NextResponse.json({ error: 'Failed to fetch reservations' }, { status: 500 })
    }

    return NextResponse.json({ reservations: data })
}
