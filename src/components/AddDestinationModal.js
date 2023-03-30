import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Autocomplete from "react-google-autocomplete";
import ReactGoogleAutocomplete from 'react-google-autocomplete';
import ItineraryService from "../api/ItineraryControllerAPI";


function AddDestinationModal({ show, handleClose, fetchData, handleAddDestination, itineraryItemId }) {
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = (e) => { 
    e.preventDefault();
    const addDestination = {
        name: name,
        user: {"id":1},
        city: city,
        country: country,
        description: description,
        image: image
      };
  
      console.log(addDestination);
  
      ItineraryService.addDestinationItem(itineraryItemId, addDestination)
      .then(response => {
        fetchData();
        handleClose();
        handleAddDestination(response.data); // Pass the newly added destination to handleAddDestination
      })
      .catch(error => {
        console.log(error);
      })
    handleClose();    
  };

  return (
    <>
    <div className="row mx-auto">

    <Modal centered show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Destination</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <form onSubmit={handleSubmit}>
              <div className="form-floating mb-3">
                <input type="text" required className="form-control" placeholder="Name of trip" onChange={(e) => setName(e.target.value)} />
                <label>Name of destination</label>
              </div>
              <div className="form-floating mb-3">
                <input type="text" required className="form-control" placeholder="Destination City" onChange={(e) => setCity(e.target.value)} />
                <label>Destination City</label>
              </div>
              <div className="form-floating mb-3">
                <input type="text" required className="form-control" placeholder="Destination Country" onChange={(e) => setCountry(e.target.value)} />
                <label>Destination Country</label>
              </div>
              <div className="form-floating mb-3">
                <input type="text" required className="form-control" placeholder="Description of the trip" onChange={(e) => setDescription(e.target.value)} />
                <label>Description</label>
              </div>
              <div className="form-floating mb-3">
                <input type="text" required className="form-control" placeholder="Image URL" onChange={(e) => setImage(e.target.value)} />
                <label>Image URL</label>
              </div>
              <button className="btn btn-primary text-white w-100" type="submit">
                Add new destination
              </button>
            </form>
        </Modal.Body>
      </Modal>
     </div>
   </>
  );
}
export default AddDestinationModal;
