import React, { useState, useEffect } from 'react';
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


  useEffect(() => {
    // 기본으로 선택된 시설의 이름을 설정하고 그에 따른 정보를 표시
    if (!selectedFacility && facilityData.length > 0) {
      setSelectedFacility(facilityData[0].name);
    }
  }, []);

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

    if(selectedFacilityData.available == "Only for SUNY Korea"){
      // 5. SUNY Korea 검증: Non-SUNY Korea 선택 시 예약 불가
      if (isSUNYKorea !== 'SUNY Korea') {
        alert('Only SUNY Korea students can make a reservation.');
        return;
      }
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

    function computeWeekFromDate(q: number, m: number, y: number): number {
      console.log("day, month, year", q, m, y);
    
      if (m === 1) {
        m = 13;
        y--; // 1월은 전년도 13월로
      } else if (m === 2) {
        m = 14;
        y--; // 2월은 전년도 14월로
      }
    
      const k = y % 100; // 년도의 마지막 두 자리
      const j = Math.floor(y / 100); // 세기
    
      // Zeller's Congruence 공식 적용
      return (q + Math.floor(13 * (m + 1) / 5) + k + Math.floor(k / 4) + Math.floor(j / 4) - 2 * j) % 7;
    }
    
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
    
    const listDate: number[] = convertDaysToNumbers(selectedFacilityData.days);
    
    listDate.forEach(element => {
      console.log("##", element);
    });
    
    // `getDay()`는 요일을 반환하므로, `getDate()`로 변경하여 날짜를 계산
    const selectedDayOfWeek = computeWeekFromDate(
      selectedDate.getDate(), // 날짜 (일)
      selectedDate.getMonth() + 1, // 월 (0부터 시작하므로 +1)
      selectedDate.getFullYear() // 연도
    );
    
    if (!listDate.includes(selectedDayOfWeek)) {
      alert('You selected an unavailable day of the week');
      return;
    }
    

    // 8. 모든 조건이 만족될 때 예약 정보를 저장
    // 고유한 ID를 생성하여 예약 정보에 추가
    const newReservation = {
      id: Date.now().toString(), // 고유한 ID 생성 (타임스탬프 사용)
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
          style={{ width: '95%', margin: 'auto' }}
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
