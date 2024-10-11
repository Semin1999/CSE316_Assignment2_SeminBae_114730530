import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './sytle/5.MyReservation.css'

interface Reservation {
  id: string; // 각 예약에 고유한 ID 추가
  facility: string;
  date: string;
  numPeople: number;
  isSUNYKorea: string;
  purpose: string;
}

const MyReservation: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    // 로컬 스토리지에서 예약 데이터를 가져옵니다.
    const storedReservations = localStorage.getItem('reservations');
    if (storedReservations) {
      setReservations(JSON.parse(storedReservations));
    }
  }, []);

  // 예약 취소 함수
  const handleCancel = (id: string) => {
    const updatedReservations = reservations.filter(reservation => reservation.id !== id);
    setReservations(updatedReservations);
    localStorage.setItem('reservations', JSON.stringify(updatedReservations));
    alert('Reservation canceled successfully.');
  };

  return (
    <div className="container mt-4">
      {reservations.length > 0 ? (
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
            <img
              className="top-image"
              src={`../resources/${reservation.facility.toLowerCase().replace(' ', '')}.jpg`}
              alt={reservation.facility}
            />
            <ul className="list-unstyled">
              <h4 className="card-title">{reservation.facility}</h4>
              <li>
                <img
                  src={'../resources/pen.png'}
                  style={{ width: '20px', height: '20px', marginRight: '8px' }}
                />
                {reservation.purpose}
              </li>
              <li>
                <img
                  src={'../resources/calander.png'}
                  style={{ width: '20px', height: '20px', marginRight: '8px' }}
                />
                {reservation.date}
              </li>
              <li>
                <img
                  src={'../resources/locate.png'}
                  style={{ width: '20px', height: '20px', marginRight: '8px' }}
                />
                {reservation.isSUNYKorea}
              </li>
              <li>
                <img
                  src={'../resources/twoPeople.png'}
                  style={{ width: '20px', height: '20px', marginRight: '8px' }}
                />
                {reservation.numPeople} people
              </li>
              {/* 취소 버튼 추가 */}
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
        <h1>No reservations found.</h1>
      )}
    </div>
  );
};

export default MyReservation;
