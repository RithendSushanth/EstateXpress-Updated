import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import axios from "axios";
import ListingCard from "../components/ListingCard";

export default function AdminUserListings() {

    const userID = useParams("userID");


    const [listings, setListings] = useState([]);


    useEffect(() => {

        console.log("HELLO");

        axios.post("http://localhost:5000/admin/user_listings", { userID },
            {
                headers: {
                    "Content-Type": "application/json",
                }
            }
        )
            .then(res => {

                setListings(res.data.listingsByUser.flatMap(data => data));
                console.log(res.data.listingsByUser)
            });


    }, [userID]);


    useEffect(() => { console.log(listings) })


    return (
        <div>
            <h1>User Listings</h1>
            {listings.length === 0 ? (
                <p>No listings found.</p>
            ) : (
                <ul>
                    {listings.map((listing, index) => (
                        <ListingCard
                            key={listing._id}
                            listingId={listing._id}
                            creator={listing.creator}
                            listingPhotoPaths={listing.listingPhotoPaths}
                            city={listing.city}
                            province={listing.province}
                            country={listing.country}
                            category={listing.category}
                            type={listing.type}
                            price={listing.price}
                            booking={listing.booking}
                        />
                    ))}
                </ul>
            )}
        </div>
    );

}
