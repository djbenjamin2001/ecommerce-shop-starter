import React, { useState } from 'react';
import BookingCalendar from 'react-booking-calendar';

function BookingPage() {
    const [bookings, setBookings] = useState([
        new Date(2024, 4, 20),
        new Date(2024, 4, 21),
        new Date(2024, 4, 22),
    ]);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        date: ''
    });

    const handleDateClick = (date) => {
        // This function is called when a date is clicked on the calendar
        setFormData({ ...formData, date: date.toLocaleDateString() });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically handle the booking logic, e.g., send data to a backend server
        alert(`Booking confirmed for ${formData.name} on ${formData.date}`);
    };

    return (
        <div className="max-w-4xl mx-auto p-5 border rounded-lg shadow-lg mt-10">
            <h2 className="text-2xl font-bold text-center mb-6">Make a Booking</h2>
            <BookingCalendar bookings={bookings} onDayClick={handleDateClick} />
            <form onSubmit={handleSubmit} className="mt-4">
                <label className="block mb-2 text-sm font-bold text-gray-700">
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="mt-1 block w-full p-2 border rounded-md"
                        required
                    />
                </label>
                <label className="block mb-2 text-sm font-bold text-gray-700">
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="mt-1 block w-full p-2 border rounded-md"
                        required
                    />
                </label>
                <button type="submit" className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Confirm Booking
                </button>
            </form>
        </div>
    );
}

export default BookingPage;
