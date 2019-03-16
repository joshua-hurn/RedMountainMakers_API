import { read } from 'fs';

const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_TEST);
const Users = require('../../db/models').Users;
stripe.setTimeout(20000);

// Create new product
router.post('/products', (req, res) => {
    try {
        const product = stripe.products.create({
            name: req.body.name,
            type: req.body.type,
        });
        res.sendStatus(200);
        stripe.products.list(
            { limit: 3 },
            function (err, products) {
                if (err) {
                    console.log(err)
                } else {
                    console.log(products)
                }
            }
        );
    } catch (err) {
        throw err
    }
})

// Create new plan
router.post('/plans', (req, res) => {
    try {
        const plan = stripe.plans.create({
            product: req.body.product,
            nickname: req.body.nickname,
            currency: req.body.currency,
            interval: req.body.interval,
            amount: req.body.amount,
        });
        res.sendStatus(200);
    }
    catch (err) {
        console.error(err);
        throw err
    }
})

// This route and the one below serve two different purposes. This one charges the customer 
// without saving their details for future purchases. If the customer wants only to make the 
// one purchase, use this route.
router.post('/createcharge', (req, res) => {
    // Token is created using Checkout or Elements!
    // Get the payment token ID submitted by the form:
    const token = req.body.stripeToken; // Using Express

    (async () => {
        const charge = await stripe.charges.create({
            amount: req.body.amount,
            currency: 'usd',
            description: req.body.description,
            source: token,
        });
    })();
})

// Create customer and set their id to the Stripe payment source(ie. credit card) via token.
// Then update db with their id for recurring payments.
router.post('/createcustomer', (req, res) => {
    (async () => {
        // Create a Customer:
        const customer = await stripe.customers.create({
            source: 'tok_mastercard',
            email: req.body.email,
        });

        // Charge the Customer instead of the card:
        const charge = await stripe.charges.create({
            amount: 1000,
            currency: 'usd',
            customer: customer.id,
        });

        // Stripe has created the new customer. Now we are saving their credentials from Stripe into our database
        // for future charges.
        Users.findOneAndUpdate({ _id: { $eq: req.params.id } }, { $set: { customer_id: customer } },
            (err) => {
                if (err) return next(err);
            });
    })
})

module.exports = router;
