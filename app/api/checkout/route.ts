import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { tier, email } = await req.json()

    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json({ fallback: true, email: 'hello@worldcuphubla.com' })
    }

    // Dynamic import to avoid build errors when stripe package is not installed
    let Stripe: typeof import('stripe').default
    try {
      Stripe = (await import('stripe')).default
    } catch {
      return NextResponse.json({ fallback: true, email: 'hello@worldcuphubla.com' })
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

    const priceId =
      tier === 'premium'
        ? process.env.STRIPE_PREMIUM_PRICE_ID
        : process.env.STRIPE_FEATURED_PRICE_ID

    if (!priceId) {
      return NextResponse.json({ fallback: true, email: 'hello@worldcuphubla.com' })
    }

    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL || 'https://worldcup-hub.vercel.app'

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [{ price: priceId, quantity: 1 }],
      customer_email: email || undefined,
      success_url: `${siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}&tier=${tier}`,
      cancel_url: `${siteUrl}/promote`,
      metadata: { tier },
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('Checkout error:', err)
    return NextResponse.json(
      { fallback: true, email: 'hello@worldcuphubla.com' },
      { status: 500 }
    )
  }
}
