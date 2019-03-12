import { read } from 'fs';

const express = require('express');
const router = express.Router();
const key = require('../../stripeKey');
const stripe = require('stripe')(key);
stripe.setTimeout(20000);

/*  ***TEST ROUTE WORKING RESPONSE LOGGED***
router.post('/test', (req, res) => {
    (async () => {
        const charge = await stripe.charges.create({
            amount: 999,
            currency: 'usd',
            source: 'tok_visa',
            receipt_email: 'jenny.rosen@example.com',
        });
    })();
    console.log(res);
})
*/

// Create new product
router.post('/products', (req, res) => {
    try {
        const product = stripe.products.create({
            name: 'Red Mountain Makers Membership',
            type: 'service',
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
        res.send(plan);
    }
    catch (err) {
        console.error(err);
        throw err
    }
})

// Create a new customer and then a new charge for that customer
// router.post('/paymentuser', (req, res) => {
//     stripe.customers.create({
//         email: req.body.email
//     }).then((customer) => {
//         return stripe.customers.createSource(customer.id, {
//             source: 'tok_visa'
//         });
//     }).then((source) => {
//         return stripe.charges.create({
//             amount: 1,
//             currency: 'usd',
//             customer: source.customer
//         });
//     }).then((charge) => {
//         // New charge created on a new customer
//     }).catch((err) => {
//         // Deal with an error
//     });
//     console.log(res);
// })

module.exports = router;
