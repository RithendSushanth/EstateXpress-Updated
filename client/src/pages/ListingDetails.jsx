import { useEffect, useState } from "react";
import "../styles/ListingDetails.scss";

import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useNavigate, useParams } from "react-router-dom";
import { facilities } from "../data";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import { useSelector, useDispatch } from "react-redux";
import Footer from "../components/Footer"


import PaymentGateway from "../components/PaymentGateway";

const ListingDetails = () => {


   // Script loading function
   function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
            resolve(false);
        };
        document.body.appendChild(script);
    });
}

useEffect(() => {
  async function initializeRazorpay() {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
    }
  }

  
  initializeRazorpay();
}, []);




// Object to pass to payment gateway
// const paymentInfo = {
//   "totalCostInPaisa":listing.price * dayCount,
//   "userID": userID,
//   'dispatch': useDispatch(),
// }












  const [loading, setLoading] = useState(true);

  const { listingId } = useParams();

  const [listing, setListing] = useState(null);

  const getListingDetails = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/properties/${listingId}`,
        {
          method: "GET",
        }
      );

      const data = await response.json();
      console.log(data);
      setListing(data);
      setLoading(false);
    } catch (err) {
      console.log("Fetch Listing Details Failed", err.message);
    }
  };

  useEffect(() => {
    getListingDetails();
  }, []);

  console.log(listing)


  /* BOOKING CALENDAR */
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const handleSelect = (ranges) => {
    // Update the selected date range when user makes a selection
    setDateRange([ranges.selection]);
  };

  const start = new Date(dateRange[0].startDate);
  const end = new Date(dateRange[0].endDate);
  const dayCount = Math.round(end - start) / (1000 * 60 * 60 * 24); // Calculate the difference in day unit

  /* SUBMIT BOOKING */
  const customerId = useSelector((state) => state?.user?._id)

  const navigate = useNavigate()

  // const handleSubmit = async () => {
  //   try {
  //     const bookingForm = {
  //       customerId,
  //       listingId,
  //       hostId: listing.creator._id,
  //       startDate: dateRange[0].startDate.toDateString(),
  //       endDate: dateRange[0].endDate.toDateString(),
  //       totalPrice: listing.price * dayCount,
  //     }

  //     const response = await fetch("http://localhost:5000/bookings/create", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(bookingForm)
  //     })

  //     if (response.ok) {
  //       navigate(`/${customerId}/trips`)
  //     }
  //   } catch (err) {
  //     console.log("Submit Booking Failed.", err.message)
  //   }


  // }


  
  
     // Object to pass to payment gateway
     const paymentInfo = {
      customerId,
      dayCount,
      listingId:listingId,
      daterange: dateRange,
      listing:listing,
      totalCostInPaisa:listing?.price * dayCount,
      userID: customerId,
      dispatch: useDispatch(),
    
  }
   
  

  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      
      <div className="listing-details">
        <div className="title">
          <h1>{listing.title}</h1>
          <div></div>
        </div>

        {/* <div className="photos">
          {listing.listingPhotoPaths?.map((item) => (
            <img
              src={`http://localhost:5000/${item.replace("public", "")}`}
              alt="listing photo"
            />
          ))}
        </div> */}
         <Carousel showThumbs={false} className="carousel">
          {listing.listingPhotoPaths?.map((item) => (
            <div key={item}>
              <img src={`http://localhost:5000/${item.replace('public', '')}`} alt="listing photo" />
            </div>
          ))}
        </Carousel>

        <h2>
          {listing.type} in {listing.city}, {listing.province},{" "}
          {listing.country}
        </h2>
        <p>
          {listing.guestCount} guests - {listing.bedroomCount} bedroom(s) -{" "}
          {listing.bedCount} bed(s) - {listing.bathroomCount} bathroom(s)
        </p>
        <hr />

        <div className="profile">
          <img
            src={`http://localhost:5000/${listing.creator.profileImagePath.replace(
              "public",
              ""
            )}`}
          />
          <h3>
            Hosted by {listing.creator.firstName} {listing.creator.lastName}
          </h3>
        </div>
        <hr />

        <h3>Description</h3>
        <p>{listing.description}</p>
        <hr />

        <h3>{listing.highlight}</h3>
        <p>{listing.highlightDesc}</p>
        <hr />

        <div className="booking">
          <div>
            <h2>What this place offers?</h2>
            <div className="amenities">
              {listing.amenities[0].split(",").map((item, index) => (
                <div className="facility" key={index}>
                  <div className="facility_icon">
                    {
                      facilities.find((facility) => facility.name === item)
                        ?.icon
                    }
                  </div>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2>How long do you want to stay?</h2>
            <div className="date-range-calendar">
              <DateRange ranges={dateRange} onChange={handleSelect} />
              {dayCount > 1 ? (
                <h2>
                  ₹{listing.price} x {dayCount} nights
                </h2>
              ) : (
                <h2>
                  ₹{listing.price} x {dayCount} night
                </h2>
              )}

              <h2>Total price: ₹{listing.price * dayCount}</h2>
              <p>Start Date: {dateRange[0].startDate.toDateString()}</p>
              <p>End Date: {dateRange[0].endDate.toDateString()}</p>

              <button className="button" type="submit" onClick={()=> PaymentGateway(paymentInfo)}>
                BOOKING
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ListingDetails;
