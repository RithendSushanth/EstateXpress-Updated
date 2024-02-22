import React from 'react';
import '../styles/Refund.scss';
import Navbar from '../components/Navbar';

const Refund = () => {
    return (
        <>
            <Navbar />
            <div className="refund">
                <h1>Refund Policy</h1>
                <p>At EstateXpress, we strive to provide a seamless rental experience. Our refund policy is designed to be fair and transparent:</p>

                <h2>1. Deposit Refunds</h2>
                <p>If you cancel your reservation before the specified deadline, we will refund your deposit in full. However, if you cancel after the deadline, the deposit is non-refundable.</p>

                <h2>2. Rent Refunds</h2>
                <p>If you have paid rent in advance and need to cancel your reservation, we will refund the remaining rent for the unused period, calculated from the date of cancellation.</p>

                <h2>3. Property Condition</h2>
                <p>To be eligible for a refund, the property must be returned in the same condition as it was rented. Any damages or excessive wear and tear may result in a deduction from the refund.</p>

                <h2>4. Processing Time</h2>
                <p>Refunds will be processed within 7-14 business days from the date of cancellation. Please note that it may take additional time for the refund to reflect in your account.</p>

                <h2>5. Contact Us</h2>
                <p>If you have any questions or concerns about our refund policy, please feel free to contact us at support@estatexpress.com. We are here to help!</p>
            </div>
        </>
    );
}

export default Refund;