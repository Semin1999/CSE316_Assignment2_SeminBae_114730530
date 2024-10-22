/*
  Name: Semin Bae (114730530)
  E-mail: semin.bae@stonybrook.edu
*/
import React from 'react';
// use CSS styling
import './sytle/2.FacilityList.css'
// use bootstrap library to better show the Facility list
import 'bootstrap/dist/css/bootstrap.min.css';

// Initalize structure for Facility
interface Facility {
  name: string;
  desc: string;
  days: string;
  participants: string;
  location: string;
  available: string;
}

// Initalize the Facility List with given information (It will use on another tsx, so export)
export const facilityData: Facility[] = [
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

// FacilityList component to display a list of facility cards
const FacilityList: React.FC = () => {
  // Render the facility list using Bootstrap for layout and CSS for styling
  return (
    // Use Bootstrap's container class for a well-structured layout
    <div className="container mt-4">
      <div className="row">
        {/* Loop through each facility in facilityData array using map */}
        {facilityData.map((facility, index) => {
          // Create a dynamic path to the image based on facility name
          const imagePath = `../resources/${facility.name.toLowerCase().replace(' ', '')}.jpg`;
          // Return a Bootstrap card for each facility
          return (
            <div key={index} className="col-md-6">
              {/* Display Each facility card's information and its styling (use with bootstrap) */}
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
