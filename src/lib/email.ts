export async function sendEmail({
    to,
    subject,
    html,
}: {
    to: string
    subject: string
    html: string
}) {
    // In a real app, use Resend, SendGrid, or AWS SES
    // For this demo, we'll log to console
    console.log('--- MOCK EMAIL SENT ---')
    console.log('To:', to)
    console.log('Subject:', subject)
    console.log('Body:', html)
    console.log('-----------------------')

    return { success: true }
}

export function generateReservationEmail(reservation: any) {
    return `
    <h1>Reservation Confirmed!</h1>
    <p>Hi ${reservation.first_name},</p>
    <p>Your table at Flintic Eats is booked.</p>
    <ul>
      <li><strong>Date:</strong> ${reservation.reservation_date}</li>
      <li><strong>Time:</strong> ${reservation.reservation_time}</li>
      <li><strong>Guests:</strong> ${reservation.party_size}</li>
    </ul>
    <p>See you soon!</p>
  `
}
