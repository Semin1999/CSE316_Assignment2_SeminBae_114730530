import React, { useState } from 'react';
import { facilityData }from './2.FacilityList';
import 'bootstrap/dist/css/bootstrap.min.css';
import './sytle/3.FacilityReservation.css'

const FacilityReservation: React.FC = () => {

    const [date, setDate] = useState<string>('');
    const [numPeople, setNumPeople] = useState<number>(1);
    const [isSUNYKorea, setIsSUNYKorea] = useState<string>('Non-SUNY Korea');
    const [purpose, setPurpose] = useState<string>('');
    const [selectedFacility, setSelectedFacility] = useState<string | null>(null);

    // 드롭다운에서 선택된 시설을 처리하는 함수
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFacility(event.target.value);
  };
  
  // 선택된 시설의 상세 정보를 가져오는 함수
  const selectedFacilityData = facilityData.find(
    (facility) => facility.name === selectedFacility
  );

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
  };

  const handleNumPeopleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNumPeople(Number(event.target.value));
  };

  const handleSUNYChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsSUNYKorea(event.target.value);
  };

  const handlePurposeChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPurpose(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!selectedFacilityData) {
      alert('Please select a facility.');
      return;
    }

    // 3. 날짜 검증: 오늘 날짜보다 이전일 경우 예약 불가
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // 시간을 00:00:00으로 설정하여 날짜만 비교

    if (selectedDate < today) {
      alert('The selected date must be today or later.');
      return;
    }

    // 4. 인원 검증: 인원 범위를 벗어난 경우 예약 불가
    const [minParticipants, maxParticipants] = selectedFacilityData.participants.split(' - ').map(Number);
    if (numPeople < minParticipants || numPeople > maxParticipants) {
      alert(`Number of people must be between ${minParticipants} and ${maxParticipants}.`);
      return;
    }

    // 5. SUNY Korea 검증: Non-SUNY Korea 선택 시 예약 불가
    if (isSUNYKorea !== 'SUNY Korea') {
      alert('Only SUNY Korea students can make a reservation.');
      return;
    }

    // 6. 같은 날짜에 다른 예약이 있는지 검증
    const existingReservations = JSON.parse(localStorage.getItem('reservations') || '[]');
    const isDateAlreadyBooked = existingReservations.some(
      (reservation: any) => reservation.date === date && reservation.facility === selectedFacility
    );

    if (isDateAlreadyBooked) {
      alert('A reservation already exists for the selected date.');
      return;
    }

    // 8. 모든 조건이 만족될 때 예약 정보를 저장
    const newReservation = {
      facility: selectedFacility,
      date,
      numPeople,
      isSUNYKorea,
      purpose,
    };

    const updatedReservations = [...existingReservations, newReservation];
    localStorage.setItem('reservations', JSON.stringify(updatedReservations));

    alert('Reservation successful!');
    console.log(newReservation);
  };

  return (
    <div className="container mt-4">
      {/* 드롭다운 메뉴 */}
      <div className="mb-4">
        <select
          className="form-select"
          onChange={handleSelectChange}
          value={selectedFacility || ''}
          style={{ width: '90%', margin: 'auto' }}
        >
          {facilityData.map((facility) => (
            <option key={facility.name} value={facility.name}>
              {facility.name}
            </option>
          ))}
        </select>
      </div>

      {selectedFacilityData && (
        <div
          className="card mb-4"
          style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', padding: '16px', width: '90%', margin: 'auto' }}
        >
          <img
            src={`../resources/${selectedFacilityData.name.toLowerCase().replace(' ', '')}.jpg`}
            alt={selectedFacilityData.name}
            style={{ width: '200px', marginRight: '16px' }}
          />
          <ul className="list-unstyled">
            <h5 className="card-title">{selectedFacilityData.name}</h5>
            <p className="card-text">{selectedFacilityData.desc}</p>
            <li>{selectedFacilityData.days}</li>
            <li>{selectedFacilityData.participants}</li>
            <li>{selectedFacilityData.location}</li>
            <li>{selectedFacilityData.available}</li>
          </ul>
        </div>
      )}

      <form onSubmit={handleSubmit} className="p-4" style={{ backgroundColor: '#f1e9ff' }}>
        <div className="mb-3">
          <label htmlFor="date" className="form-label">Date to be Used:</label>
          <input
            type="date"
            id="date"
            className="form-control"
            value={date}
            onChange={handleDateChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="numPeople" className="form-label">Number of People:</label>
          <input
            type="number"
            id="numPeople"
            className="form-control"
            value={numPeople}
            onChange={handleNumPeopleChange}
            min={1}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Affiliation:</label>
          <div>
            <input
              type="radio"
              id="sunyKorea"
              name="affiliation"
              value="SUNY Korea"
              checked={isSUNYKorea === 'SUNY Korea'}
              onChange={handleSUNYChange}
            />
            <label htmlFor="sunyKorea" className="ms-2">SUNY Korea</label>
            
            <input
              type="radio"
              id="nonSUNYKorea"
              name="affiliation"
              value="Non-SUNY Korea"
              checked={isSUNYKorea === 'Non-SUNY Korea'}
              onChange={handleSUNYChange}
              className="ms-3"
            />
            <label htmlFor="nonSUNYKorea" className="ms-2">Non-SUNY Korea</label>
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="purpose" className="form-label">Purpose of Use:</label>
          <textarea
            id="purpose"
            className="form-control"
            value={purpose}
            onChange={handlePurposeChange}
            rows={3}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};


  

export default FacilityReservation;
