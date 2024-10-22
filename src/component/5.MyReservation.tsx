/*
  Name: Semin Bae (114730530)
  E-mail: semin.bae@stonybrook.edu
*/
// Use React and useState hook to define state variables
import React, { useEffect, useState } from 'react';
// Use Bootstrap library
import 'bootstrap/dist/css/bootstrap.min.css';
// Import CSS for styling
import './sytle/5.MyReservation.css'

// Initalize structer for Reservation
interface Reservation {
  id: string; // Speciaial ID for distinguish the reservation
  facility: string;
  date: string;
  numPeople: number;
  isSUNYKorea: string;
  purpose: string;
}

const MyReservation: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    // Fetch reservations from local storage
    const storedReservations = localStorage.getItem('reservations');
    if (storedReservations) {
      setReservations(JSON.parse(storedReservations));
    }
  }, []);

  // Function to handle reservation cancellation
  const handleCancel = (id: string) => {
    // Filter out the canceled reservation from the list
    const updatedReservations = reservations.filter(reservation => reservation.id !== id);
    
    // Update the state and local storage with the new list
    setReservations(updatedReservations);
    localStorage.setItem('reservations', JSON.stringify(updatedReservations));
    
    // Notify user of successful cancellation
    alert('Reservation canceled successfully.');
  };

  return (
    <div className="container mt-4">
      {reservations.length > 0 ? (
        // Map through the reservations and display each one as a card
        reservations.map((reservation) => (
          <div
            key={reservation.id}
            className="card mb-4"
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'flex-start',
              padding: '16px',
              width: '95%',
              margin: 'auto',
            }}
          >
            {/* Display the facility image */}
            <img
              className="top-image"
              src={`../resources/${reservation.facility.toLowerCase().replace(' ', '')}.jpg`}
              alt={reservation.facility}
            />
            
            {/* Display the reservation details */}
            <ul className="list-unstyled">
              <h4 className="card-title">{reservation.facility}</h4>
              <li>
                <img
                  src={'../resources/pen.png'}
                  style={{ width: '20px', height: '20px', marginRight: '8px' }}
                  alt="Purpose"
                />
                {reservation.purpose}
              </li>
              <li>
                <img
                  src={'../resources/calander.png'}
                  style={{ width: '20px', height: '20px', marginRight: '8px' }}
                  alt="Date"
                />
                {reservation.date}
              </li>
              <li>
                <img
                  src={'../resources/locate.png'}
                  style={{ width: '20px', height: '20px', marginRight: '8px' }}
                  alt="Location"
                />
                {reservation.isSUNYKorea}
              </li>
              <li>
                <img
                  src={'../resources/twoPeople.png'}
                  style={{ width: '20px', height: '20px', marginRight: '8px' }}
                  alt="Participants"
                />
                {reservation.numPeople} people
              </li>

              {/* Add a cancel button for each reservation */}
              <li>
                <button
                  onClick={() => handleCancel(reservation.id)}
                  className="btn btn-danger"
                  style={{ marginTop: '10px' }}
                >
                  Cancel
                </button>
              </li>
            </ul>
          </div>
        ))
      ) : (
        // If no reservations found, display a message
        <h1>No reservations found.</h1>
      )}
    </div>
  );
};

export default MyReservation;