import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const date = searchParams.get('date')
    const time = searchParams.get('time')

    if (!date || !time) {
        return NextResponse.json({ error: 'Date and time are required' }, { status: 400 })
    }

    try {
        const { count, error } = await supabase
            .from('reservations')
            .select('*', { count: 'exact', head: true })
            .eq('reservation_date', date)
            .eq('reservation_time', time)
            .neq('status', 'cancelled')

        if (error) {
            console.error('Error checking availability:', error)
            return NextResponse.json({ error: 'Failed to check availability' }, { status: 500 })
        }

        // Only allow 1 booking per time slot
        const available = count === 0

        return NextResponse.json({
            available,
            remaining: available ? 1 : 0,
            message: available ? 'Time slot available' : 'This time slot is already booked'
        })
    } catch (error) {
        console.error('Unexpected error:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
