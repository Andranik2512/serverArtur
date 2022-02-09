import Stripe from 'stripe';

//for testing
const storeItems = [
    {id:1, priceInCents: 10000, name: "Learn React Today", quantity: 2 },
    {id:2, priceInCents: 20000, name: "Learn CSS Today", quantity: 5 },
  ]

class PaymentController{
    
    async createCheckout(req, res){
        try{
            const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY)
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ["card"],
                mode: "payment",
                line_items: storeItems.map(item => { 
                    return {
                        price_data: {
                            currency: "usd",
                            product_data: {
                                name: item.name,
                            },
                            unit_amount: item.priceInCents,
                        },
                        quantity: item.quantity,
                    }
                }),
                success_url: `https://www.google.com/`,
                cancel_url: `https://www.youtube.com/`,
            })
            console.log(session.url);
            return res.json({url: session.url})
        }catch(error){
            console.log(error);
            return res.status(500).json({message: error})
        }
    }
}

export default new PaymentController();