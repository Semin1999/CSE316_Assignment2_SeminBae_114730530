/*
  Name: Semin Bae (114730530)
  E-mail: semin.bae@stonybrook.edu
*/
// Use React and useState hook to define state variables
import React, { useState } from 'react';
// Use Bootstrap library
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';
// import CSS styling
import './sytle/4.MyInformation.css';

const UserProfile: React.FC = () => {
  // State hooks to manage modal visibility
  const [showImageModal, setShowImageModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showNameModal, setShowNameModal] = useState(false);

  // Handle image change and close modal
  const handleImageChange = () => {
    setShowImageModal(false);
    alert('Image change successful!');
  };

  // Handle password change and close modal
  const handlePasswordChange = () => {
    setShowPasswordModal(false);
    alert('Password change successful!');
  };

  // Handle name change and close modal
  const handleNameChange = () => {
    setShowNameModal(false);
    alert('Name change successful!');
  };

  return (
    <div className="container mt-4" style={{ backgroundColor: '#f1e9ff', padding: '20px', borderRadius: '8px' }}>
      {/* User Information Header */}
      <h2 className="text-center">User Information</h2>
      {/* User Profile Image */}
      <div className="text-center">
        <img
          src="../resources/user.png"
          alt="User"
          style={{ width: '150px', height: '150px', borderRadius: '50%', marginBottom: '10px' }}
        />
        <br></br>
        {/* Button to open the image change modal */}
        <Button variant="outline-primary" onClick={() => setShowImageModal(true)} className="mt-2">
          Change Image
        </Button>
      </div>
      <br></br>

      {/* User Email */}
      <p className="text-center">Email: semin.bae@stonybrook.edu</p>

      {/* Password Change Section */}
      <div className="text-center">
        <p>Password: ******</p>
        {/* Button to open the password change modal */}
        <Button variant="outline-primary" onClick={() => setShowPasswordModal(true)} className="mt-2">
          Change Password
        </Button>
      </div>
    
      {/* Name Change Section */}
      <div className="text-center mt-3">
        <p>Name: Semin Bae</p>
        {/* Button to open the name change modal */}
        <Button variant="outline-primary" onClick={() => setShowNameModal(true)} className="mt-2">
          Change Name
        </Button>
      </div>

      {/* Image Change Modal */}
      <Modal show={showImageModal} onHide={() => setShowImageModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Change your image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Input to upload a new image */}
          <input type="file" className="form-control" accept='image/png, image/jpeg, image/jpg'/>
        </Modal.Body>
        <Modal.Footer>
          {/* Close button for the modal */}
          <Button variant="secondary" onClick={() => setShowImageModal(false)}>
            Close
          </Button>
          {/* Save changes button for image change */}
          <Button variant="primary" onClick={handleImageChange}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Password Change Modal */}
      <Modal show={showPasswordModal} onHide={() => setShowPasswordModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Change your password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Input to enter a new password */}
          <input type="password" className="form-control" placeholder="Enter the new password" />
        </Modal.Body>
        <Modal.Footer>
          {/* Close button for the modal */}
          <Button variant="secondary" onClick={() => setShowPasswordModal(false)}>
            Close
          </Button>
          {/* Save changes button for password change */}
          <Button variant="primary" onClick={handlePasswordChange}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Name Change Modal */}
      <Modal show={showNameModal} onHide={() => setShowNameModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Change your name</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Input to enter a new name */}
          <input type="text" className="form-control" placeholder="Enter the new name" />
        </Modal.Body>
        <Modal.Footer>
          {/* Close button for the modal */}
          <Button variant="secondary" onClick={() => setShowNameModal(false)}>
            Close
          </Button>
          {/* Save changes button for name change */}
          <Button variant="primary" onClick={handleNameChange}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserProfile;
