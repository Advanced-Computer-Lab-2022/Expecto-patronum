const mongodb = require('mongodb');
const User = require('../models/UserSchema');
const Course = require('../models/CourseSchema');
const stripe = require('stripe')('sk_test_51MFkvUKcBqZZ0sjUrFighyNKBV48CtUM78B4l4v19qzCsPGNpidrNnneN5UVRhz2MTVt8lnjlfCiMb8UlQ2ToeYS00frYRLUb4');



module.exports.Test1 = async (req, res) => {
  const email = 'customer@example.com';
  const name = 'Test Customer';
  const cardNumber = '4242424242424242';
  const cardExpMonth = 12;
  const cardExpYear = 2022;
  const cardCvc = 123;

  const cardToken = await stripe.tokens.create({
    card: {
      number: cardNumber,
      exp_month: cardExpMonth,
      exp_year: cardExpYear,
      cvc: cardCvc,
    },
  });

  const customer = await stripe.customers.create({
    email: email,
    name: name,
    source: cardToken.id,

  });
  const card = await stripe.customers.retrieveSource(
    customer.id,
    customer.default_source
  );
  res.send(card)



}






