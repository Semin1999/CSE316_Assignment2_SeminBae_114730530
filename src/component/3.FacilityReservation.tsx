/*
  Name: Semin Bae (114730530)
  E-mail: semin.bae@stonybrook.edu
*/
// Use React and useState hook to define state variables
import React, { useState, useEffect } from 'react';
// Use the Initalized facility list data
import { facilityData }from './2.FacilityList';
// Use Bootstrap styling library
import 'bootstrap/dist/css/bootstrap.min.css';
// Use CSS Styling
import './sytle/3.FacilityReservation.css'

const FacilityReservation: React.FC = () => {

  // State hooks and initalize to manage form inputs (and given some initial assigned values)
  const [date, setDate] = useState<string>('');
  const [numPeople, setNumPeople] = useState<number>(1);
  const [isSUNYKorea, setIsSUNYKorea] = useState<string>('Non-SUNY Korea');
  const [purpose, setPurpose] = useState<string>('');
  const [selectedFacility, setSelectedFacility] = useState<string | null>(null);

  // Handle changes to the facility dropdown
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFacility(event.target.value);
  };
  
  // Get the selected facility's details from the data array
  const selectedFacilityData = facilityData.find(
    (facility) => facility.name === selectedFacility
  );

  // Handle changes to the date input
  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
  };

  // Handle changes to the number of people input
  const handleNumPeopleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNumPeople(Number(event.target.value));
  };

  // Handle changes to the SUNY Korea affiliation radio buttons
  const handleSUNYChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsSUNYKorea(event.target.value);
  };

  // Handle changes to the purpose textarea
  const handlePurposeChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPurpose(event.target.value);
  };

  // Effect to set default facility if none is selected
  useEffect(() => {
    if (!selectedFacility && facilityData.length > 0) {
      setSelectedFacility(facilityData[0].name);
    }
  }, []);

  // Handle form submission and validation (check all the condition are valid)
  const handleSubmit = (event: React.FormEvent) => {
    // check whether all the conditional fields are filled
    event.preventDefault();

    // Condition 1: If there no selection of Facility
    if (!selectedFacilityData) {
      alert('Please select a facility.');
      return;
    }

    // Condition 2: If the selected Date is previous than today
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      alert('The selected date must be today or later.');
      return;
    }

    // Condition 3: If the number of people is not range of the Facility
    const [minParticipants, maxParticipants] = selectedFacilityData.participants.split(' - ').map(Number);
    if (numPeople < minParticipants || numPeople > maxParticipants) {
      alert(`Number of people must be between ${minParticipants} and ${maxParticipants}.`);
      return;
    }

    // Condition 4: If the Facility is only for suny korea, then only suny korea student can reserve
    if(selectedFacilityData.available == "Only for SUNY Korea"){
      if (isSUNYKorea !== 'SUNY Korea') {
        alert('Only SUNY Korea students can make a reservation.');
        return;
      }
    }

    // Condition 5: If the Facility reservation already exists for the selected date
    const existingReservations = JSON.parse(localStorage.getItem('reservations') || '[]');
    const isDateAlreadyBooked = existingReservations.some(
      (reservation: any) => reservation.date === date && reservation.facility === selectedFacility
    );

    if (isDateAlreadyBooked) {
      alert('A reservation already exists for the selected date.');
      return;
    }

    // Condition 6: If it is not available days of week
    // Get computer week from date to use what instruction given
    function computeWeekFromDate(q: number, m: number, y: number): number {
      console.log("day, month, year", q, m, y);
    
      if (m === 1) {
        m = 13;
        y--;
      } else if (m === 2) {
        m = 14;
        y--;
      }
    
      const k = y % 100; // get first 2 number from year
      const j = Math.floor(y / 100); // last 2 number from year
    
      // Zeller's Congruence
      return (q + Math.floor(13 * (m + 1) / 5) + k + Math.floor(k / 4) + Math.floor(j / 4) - 2 * j) % 7;
    }
    
    // Convert days to number to use map
    function convertDaysToNumbers(daysString: string): number[] {
      const daysArray = daysString.split(', ').map(day => day.trim());
    
      const dayToNumberMap: { [key: string]: number } = {
        'Sun': 1,
        'Mon': 2,
        'Tue': 3,
        'Wed': 4,
        'Thu': 5,
        'Fri': 6,
        'Sat': 0,
      };
    
      return daysArray.map(day => dayToNumberMap[day]);
    }
    
    // Convert available days to numbers and check against selected day of the week
    const listDate: number[] = convertDaysToNumbers(selectedFacilityData.days);
    
    // Get the day of the week from the selected date
    const selectedDayOfWeek = computeWeekFromDate(
      selectedDate.getDate(),
      selectedDate.getMonth() + 1,
      selectedDate.getFullYear()
    );
    
    if (!listDate.includes(selectedDayOfWeek)) {
      alert('You selected an unavailable day of the week');
      return;
    }
    

    // All the conditions are fullfilled, then you can reserve
    // Assigned ID for each reservation to distinguish which can use delete reservation
    const newReservation = {
      id: Date.now().toString(), // Make the ID to use Date.now() with string
      facility: selectedFacility,
      date,
      numPeople,
      isSUNYKorea,
      purpose,
    };

    // Save reservation in local storage with Json.stringfy data
    const updatedReservations = [...existingReservations, newReservation];
    localStorage.setItem('reservations', JSON.stringify(updatedReservations));

    // All the reservation has been success, then alert successful
    alert('Reservation successful!');
  };

  return (
    <div className="container mt-4">
      {/* Facility dropdown menu */}
      <div className="mb-4">
        <select
          className="form-select"
          onChange={handleSelectChange}
          value={selectedFacility || ''}
          style={{ width: '95%', margin: 'auto' }}
        >
          {/* Assign the Facility names from facility List data */}
          {facilityData.map((facility) => (
            <option key={facility.name} value={facility.name}>
              {facility.name}
            </option>
          ))}
        </select>
      </div>
      
      {/* Display Facility information and image with selected Facility */}
      {selectedFacilityData && (
        <div
          className="card mb-4"
          style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', padding: '16px', width: '95%', margin: 'auto' }}
        >
          <img
            className='top-image'
            src={`../resources/${selectedFacilityData.name.toLowerCase().replace(' ', '')}.jpg`}
            alt={selectedFacilityData.name}
          />
          <ul className="list-unstyled">
            <h3 className="card-title">{selectedFacilityData.name}</h3>
            <p className="card-text">{selectedFacilityData.desc}</p>
            <li><img src = {'../resources/calander.png'} style={{ width: '20px', height: '20px'}} /> {selectedFacilityData.days}</li>
            <li><img src = {'../resources/locate.png'} style={{ width: '20px', height: '20px'}} /> {selectedFacilityData.location}</li>
            <li><img src = {'../resources/twoPeople.png'} style={{ width: '20px', height: '20px'}} /> {selectedFacilityData.participants}</li>
            <li><img src = {'../resources/mencheck.png'} style={{ width: '20px', height: '20px'}} /> {selectedFacilityData.available}</li>
          </ul>
        </div>
      )}

      {/* Date input area */}
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

        {/* input number of people area */}
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

        {/* input Affiliation of SUNY Korea area */}
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

           {/* input Affiliation of Non SUNY Korea area */}
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

        {/* input Text for purpose of use area */}
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

        {/* Submit button assigned */}
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default FacilityReservation;
