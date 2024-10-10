import React from 'react';
import './sytle/2.FacilityList.css'
import 'bootstrap/dist/css/bootstrap.min.css';

interface Facility {
  name: string;
  desc: string;
  days: string;
  participants: string;
  location: string;
  available: string;
}

const facilityData: Facility[] = [
  {
    name: 'Gym',
    desc: 'A place used for physical activity',
    days: 'Mon, Tue, Wed, Thu, Fri, Sat, Sun',
    participants: '1 - 5',
    location: 'A101',
    available: 'Available to all',
  },
  {
    name: 'Auditorium',
    desc: 'A place for large events',
    days: 'Mon, Tue, Wed, Thu',
    participants: '10 - 40',
    location: 'A234',
    available: 'Available to all',
  },
  {
    name: 'Swimming Pool',
    desc: 'A place for physical activity',
    days: 'Sun, Sat',
    participants: '1 - 8',
    location: 'B403',
    available: 'Available to all',
  },
  {
    name: 'Seminar Room',
    desc: 'A place for large meetings',
    days: 'Mon, Wed, Fri',
    participants: '10 - 30',
    location: 'B253',
    available: 'Available to all',
  },
  {
    name: 'Conference Room',
    desc: 'A place for small but important meetings',
    days: 'Mon, Tue, Wed, Thu, Fri',
    participants: '1 - 10',
    location: 'C1033',
    available: 'Only for SUNY Korea',
  },
  {
    name: 'Library',
    desc: 'A quiet place',
    days: 'Mon, Tue, Wed, Thu, Fri, Sat, Sun',
    participants: '1 - 20',
    location: 'A1011',
    available: 'Only for SUNY Korea',
  },
];

const FacilityList: React.FC = () => {

  return (
    <div className="container mt-4">
      <div className="row">
        {facilityData.map((facility, index) => {
          const imagePath = `../resources/${facility.name.toLowerCase().replace(' ', '')}.jpg`;
          return (
            <div key={index} className="col-md-6">
              <div className="card mb-6">
                <img
                  src={imagePath}
                  className="card-img-top"
                  alt={facility.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{facility.name}</h5>
                  <p className="card-text">{facility.desc}</p>
                  <ul className="list-unstyled">
                    <li><img src = {'../resources/calander.png'} style={{ width: '20px', height: '20px'}} /> {facility.days}</li>
                    <li><img src = {'../resources/twoPeople.png'} style={{ width: '20px', height: '20px'}} /> {facility.participants}</li>
                    <li><img src = {'../resources/locate.png'} style={{ width: '20px', height: '20px'}} /> {facility.location}</li>
                    <li><img src = {'../resources/mencheck.png'} style={{ width: '20px', height: '20px'}} /> {facility.available}</li>
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FacilityList;
