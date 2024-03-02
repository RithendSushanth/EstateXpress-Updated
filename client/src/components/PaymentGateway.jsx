import React from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


export default async function PaymentGateway(paymentInfo) {


    


    // Function to get order placed date
    function formatDate(date) {
        const months = [
          "January", "February", "March", "April", "May", "June", "July",
          "August", "September", "October", "November", "December"
        ];
      
        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();
      
        return `${day}-${month}-${year}`;
      }
      
    console.log(`total cost ${paymentInfo.totalCostInPaisa}`);

    // const data = await fetch('http://localhost:5000/razorpay', {
    //     method: 'POST',
    // }).then((t) => t.json())
    const data = await fetch('http://localhost:5000/Bookings/razorpay', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        amount: paymentInfo.totalCostInPaisa * 100 // Replace this with the actual amount you want to pass
    })
}).then((response) => response.json());

    console.log(data); // The response data from the server will be logged here

    // options
    const options = {
        key: "rzp_test_Mn9ma4Q7usMZHe",
        currency: data.currency,
        amount: paymentInfo.totalCostInPaisa * 100,
        description: data.description,
        order_id: data.id,
        
        
        // Things to do after payment is done
        handler: async function (response) {
            //alert("Payment ID" + response.razorpay_payment_id);
            //alert("Order ID" + response.razorpay_order_id);

            // Get today's date
            const today = new Date();
            
            // Format the date as "27-April-2003"
            const formattedDate = formatDate(today);

            // Order data to save
            const order = {
                userID: paymentInfo.userID,
                amount: paymentInfo.totalCostInPaisa / 100,
                paymentID: response.razorpay_payment_id,
                orderID: response.razorpay_order_id,
                orderPlacedDate:formattedDate,

            }


            try {
                const bookingForm = {
                  customerId: paymentInfo.customerId,
                  listingId: paymentInfo.listingId,
                  hostId:  paymentInfo.listing.creator._id,
                  startDate: paymentInfo.daterange[0].startDate.toDateString(),
                  endDate: paymentInfo.daterange[0].endDate.toDateString(),
                  totalPrice: paymentInfo.totalCostInPaisa
                }


                console.log(bookingForm);
          
                const response = await fetch("http://localhost:5000/bookings/create", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(bookingForm)
                })
          
                if (response.ok) {
                   // navigate(`/${paymentInfo.customerId}/trips`)
                }
              } catch (err) {
                console.log("Submit Booking Failed.", err.message)
              }



            // // Add the item to order history
            // paymentInfo.dispatch(addToOrder(order));

            // // Very payment as done
            // paymentInfo.dispatch(paymentUpdate(1))

         
            
        },

        prefill:{
            name: "paddy",
            email: "paddy@gmail.com",
            contact:'9876546787'
        }

    };

    // Display the window
    const paymentObject = new window.Razorpay(options)

    paymentObject.open();

  return (
    <div></div>
  )
}
