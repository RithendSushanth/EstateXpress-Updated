// AdminAnalytics.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/AdminAnalytics.scss';

const AdminAnalytics = () => {
    const [analyticsData, setAnalyticsData] = useState(null);

    useEffect(() => {
        const fetchAnalyticsData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/admin/analytics');
                setAnalyticsData(response.data);
            } catch (error) {
                console.error('Failed to fetch analytics data:', error);
            }
        };

        fetchAnalyticsData();
    }, []);

    return (
        <div className="admin-analytics">
            <h1>Admin Analytics</h1>
            {analyticsData ? (
                <div className="analytics-data">
                    <div>Total Users: {analyticsData.totalUsers}</div>
                    <div>New User Registrations: {analyticsData.newUserRegistrations}</div>
                    <div>Active Users: {analyticsData.activeUsers}</div>
                    <div>Total Properties: {analyticsData.totalProperties}</div>
                    <div>New Listings: {analyticsData.newListings}</div>
                    <div>Property Views: {analyticsData.propertyViews}</div>
                    <div>Total Bookings: {analyticsData.totalBookings}</div>
                    <div>Booking Trends: {analyticsData.bookingTrends}</div>
                    <div>Popular Booking Times: {analyticsData.popularBookingTimes}</div>
                    <div>Total Revenue: {analyticsData.totalRevenue}</div>
                    <div>Average Booking Value: {analyticsData.averageBookingValue}</div>
                    <div>Revenue Trends: {analyticsData.revenueTrends}</div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default AdminAnalytics;
