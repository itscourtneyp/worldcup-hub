import { NextResponse } from 'next/server'
import Stripe from 'stripe'

export async function POST(request: Request) {
  const { tier, email } = await request.json()

  if (!tier || !['featured', 'premium'].includes(tier)) {
    return NextResponse.json({ error: 'Invalid tier' }, { status: 400 })
  }

  const secretKey = process.env.STRIPE_SECRET_KEY
  if (!secretKey) {
    return NextResponse.json({ fallback: true })
  }

  const stripe = new Stripe(secretKey)

  const priceId =
    tier === 'featured'
      ? process.env.STRIPE_FEATURED_PRICE_ID
      : process.env.STRIPE_PREMIUM_PRICE_ID

  if (!priceId) {
    return NextResponse.json({ fallback: true })
  }

  const origin = request.headers.get('origin') || 'https://worldcup-hub.vercel.app'

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${origin}/checkout/success?tier=${tier}`,
    cancel_url: `${origin}/promote`,
    ...(email ? { customer_email: email } : {}),
  })

  return NextResponse.json({ url: session.url })
}
