import React from 'react';
import {StripeProvider, Elements  } from 'react-stripe-elements';
import Form from './Form';

const Payment = () => {
    return (
        <div>
            <StripeProvider apiKey="pk_test_51IcvzIJt6QCCB8rY7FDWCLFodiT0HYnNaAOy5ukVwyZO9lKt5b7uMMjEbHZj2E8kR43rhL0QejGF3byQR29hBYRE00omTZyH79">
                <Elements>
                    <Form />
                </Elements>
            </StripeProvider>
        </div>
    )
}

export default Payment
