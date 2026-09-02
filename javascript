// pages/api/stripe/dealer-signup.js
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { dealerEmail, dealerName, paymentMethodId } = req.body;

  try {
    // 1. Create Customer in Stripe
    const customer = await stripe.customers.create({
      email: dealerEmail,
      name: dealerName,
      payment_method: paymentMethodId,
      invoice_settings: { default_payment_method: paymentMethodId },
    });

    // 2. Charge $250 Initiation Fee Immediately
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 25000, // $250.00 in cents
      currency: 'usd',
      customer: customer.id,
      payment_method: paymentMethodId,
      off_session: true,
      confirm: true,
      description: 'CATPOTS - Founding Dealer Partner Initiation Fee',
    });

    // 3. Store Customer ID in Database for Cost-Per-Lead (CPL) Metered Billing
    // await db.dealers.create({ email: dealerEmail, stripeCustomerId: customer.id, status: 'ACTIVE' });

    res.status(200).json({ success: true, paymentIntent });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
