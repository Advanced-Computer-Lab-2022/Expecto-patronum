const mongodb = require('mongodb');
const stripe = require('stripe');
const User = require('../models/UserSchema');
const Course = require('../models/CourseSchema');


// Replace with your Stripe API key
const stripe = stripe("sk_test_51MFkvUKcBqZZ0sjUrFighyNKBV48CtUM78B4l4v19qzCsPGNpidrNnneN5UVRhz2MTVt8lnjlfCiMb8UlQ2ToeYS00frYRLUb4");

export async function addPaymentMethod(req, res) {
  try {
    // Get user id from session
    const userId = req.session.userId;

    // Get credit card information from request body
    const { creditCardNumber, ccv, cardHolderName, expiration } = req.body;

    // Get user collection
    const users = User;

    // Find user by id
    const user = await users.findOne({ _id: userId });

    // Check if credit card is already saved
    let cardAlreadyAdded = false;
    for (const paymentMethod of user.paymentMethods) {
      if (paymentMethod.ccv === ccv) {
        cardAlreadyAdded = true;
        break;
      }
    }

    if (cardAlreadyAdded) {
      // Credit card is already saved
      return res.status(400).send({ error: 'Card already added' });
    }

    // Create a new card with Stripe
    const customer = await stripe.customers.create({
      description: `Customer for ${cardHolderName}`,
      source: creditCardNumber
    });

    // Create payment method object
    const paymentMethod = {
      last4: creditCardNumber.slice(-4),
      expiration,
      name: cardHolderName,
      customerId: customer.id
    };

    // Add payment method to user's paymentMethods array
    await users.updateOne(
      { _id: userId },
      { $push: { paymentMethods: paymentMethod } }
    );

    // Return success response
    res.send({ message: 'Payment method added successfully' });
  } catch (error) {
    // Return error response
    res.status(500).send({ error: error.message });
  }
}

export async function getPaymentMethods(req, res) {
  // Get user id from session
  const userId = req.session.userId;
  // Get user collection
  const users = User;
  // Find user by id
  const user = await users.findOne({ _id: userId });
  // Return payment methods
  res.send(user.paymentMethods);

}

export async function deletePaymentMethod(req, res) {
  try {
    // Get user id from session
    const userId = req.session.userId;
    // Get payment method id from request params
    const { paymentMethodId } = req.body;
    // Get user collection
    const users = User;
    // Find user by id
    const user = await users.findOne({ _id: userId });
    // Get payment method
    const paymentMethod = user.paymentMethods[paymentMethodId];
    // Delete payment method from Stripe
    await stripe.customers.del(paymentMethod.customerId);
    // Delete payment method from user's paymentMethods array
    await users.updateOne(
      { _id: userId }, { $pull: { paymentMethods: { customerId: paymentMethod.customerId } } }
    );
    // Return success response
    res.send({ message: 'Payment method deleted successfully' });
  } catch (error) {
    // Return error response
    res.status(500).send({ error: error.message });


  }
}

export async function Charge(req, res) {
  //1) Get the user id from the session
  //2) Get the course id from the request body
  //3) Get the instructor id from the request body
  //4) Get the payment method id from the request body
  //5) Get the user collection
  //6) Find the user by id
  //7) Get the payment method from the user
  //8) Get the instructor collection
  //9) Find the instructor by id and update the wallet with the course price
  //10)add the course id to the purchase course array in the user collection
  //11)make the payment with stripe
  //12)add the transaction to the user collection
  //13)return success response
  //14)if the payment fails return reverse the wallet update and remove the course from the purchase course array
  ////////////////////
  // const charge = await stripe.charges.create({
  //   amount: req.body.amount,
  //   currency: 'usd',
  //   customer: customerId,
  //   description: 'Example charge',
  /* },(error, charge) => {
    if(error){
      //rollback
    }
    else{
      res.send(charge);
    }
  })));*/

}


export async function Refund(req, res) {

  //1) Get the user id from the session
  //2) Get the course id from the request body
  //3) Get the user collection
  //4) Find the user by id
  //5)get the transactions array
  //6)find the transaction with the course id
  //7) get the charge id from the transaction
  //8) refund the charge
  //9) return success response



  // const refund = await stripe.refunds.create({
  //   charge: chargeId,
  //   amount: 1000,
  // });
  // res.send(refund);
}
