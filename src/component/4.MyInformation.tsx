
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';

const UserProfile: React.FC = () => {
  const [showImageModal, setShowImageModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showNameModal, setShowNameModal] = useState(false);

  const handleImageChange = () => {
    setShowImageModal(false);
    alert('Image change successful!');
  };

  const handlePasswordChange = () => {
    setShowPasswordModal(false);
    alert('Password change successful!');
  };

  const handleNameChange = () => {
    setShowNameModal(false);
    alert('Name change successful!');
  };

  return (
    <div className="container mt-4" style={{ backgroundColor: '#f1e9ff', padding: '20px', borderRadius: '8px' }}>
      <h2 className="text-center">User Information</h2>
      <div className="text-center">
        <img
          src="../resources/user_placeholder.png" // 기본 사용자 이미지
          alt="User"
          style={{ width: '100px', height: '100px', borderRadius: '50%', marginBottom: '10px' }}
        />
        <Button variant="outline-primary" onClick={() => setShowImageModal(true)}>
          Change Image
        </Button>
      </div>
      <p>Email: abc@stonybrook.edu</p>
      <div>
        <p>Password: ******</p>
        <Button variant="outline-primary" onClick={() => setShowPasswordModal(true)}>
          Change Password
        </Button>
      </div>
      <div className="mt-3">
        <p>Name: John Doe</p>
        <Button variant="outline-primary" onClick={() => setShowNameModal(true)}>
          Change Name
        </Button>
      </div>

      {/* Image Change Modal */}
      <Modal show={showImageModal} onHide={() => setShowImageModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Change your image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input type="file" className="form-control" />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowImageModal(false)}>
            Close
          </Button>
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
          <input type="password" className="form-control" placeholder="Enter the new password" />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowPasswordModal(false)}>
            Close
          </Button>
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
          <input type="text" className="form-control" placeholder="Enter the new name" />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowNameModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleNameChange}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserProfile;
