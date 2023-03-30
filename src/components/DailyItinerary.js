import { Card, CardGroup, Modal } from "react-bootstrap";
import { useState } from "react";
import ItemCard from "./ItemCard";
import AddDestinationModal from "./AddDestinationModal";
import AddAccommodationModal from "./AddAccommodationModal";
import AddTransportModal from "./AddTransportModal";

function DailyItinerary({
  dayNumber,
  name,
  destination,
  accommodation,
  transport,
  itineraryItemId,
  fetchData
}) {
  
  console.log("ItineraryItemId:", itineraryItemId++);

  const [localDestination, setLocalDestination] = useState(destination);
  const [localAccommodation, setLocalAccommodation] = useState(accommodation);
  const [localTransport, setLocalTransport] = useState(transport);

  console.log(localDestination);
  let destItem;
  if (localDestination != undefined) {
    destItem = {
      name: localDestination?.name,
      description: localDestination?.description,
      image: localDestination?.image,
      price: accommodation?.price + transport?.price,
    };
  }

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showDestinationModal, setShowDestinationModal] = useState(false);
  const [showAccommodationModal, setShowAccommodationModal] = useState(false);
  const [showTransportModal, setShowTransportModal] = useState(false);

  const handleCloseDestinationModal = () => setShowDestinationModal(false);
  const handleShowDestinationModal = () => setShowDestinationModal(true);

  const handleCloseAccommodationModal = () => setShowAccommodationModal(false);
  const handleShowAccommodationModal = () => setShowAccommodationModal(true);

  const handleCloseTransportModal = () => setShowTransportModal(false);
  const handleShowTransportModal = () => setShowTransportModal(true);

  const handleAddDestination = (newDestination) => {
    setLocalDestination(newDestination);
    handleClose();
  };

  const handleAddAccommodation = (newAccommodation) => {
    setLocalAccommodation(newAccommodation);
    handleClose();
  };

  const handleAddTransport = (newTransport) => {
    setLocalTransport(newTransport);
    handleClose();
  };

  return (
    <Card className="mb-3 border rounded">
      <Card.Header>Day {dayNumber}</Card.Header>
      <Card.Body>
        <div className="d-flex" style={{ height: "18rem" }}>
          <div className="w-50 h-100">
            <ItemCard
              item={destItem}
              altText="Add destination"
              renderButton={localDestination === undefined}
              onButtonClick={handleShowDestinationModal}
            />
          </div>
          <AddDestinationModal
            show={showDestinationModal}
            handleClose={handleCloseDestinationModal}
            handleShow={handleShowDestinationModal}
            handleAddDestination={handleAddDestination}
            fetchData={fetchData}
            itineraryItemId={itineraryItemId++}
          />
  
          <div className="w-25 h-100">
            <ItemCard
              item={localAccommodation}
              altText="Add accommodation"
              renderButton={localAccommodation === undefined}
              onButtonClick={handleShowAccommodationModal}
            />
          </div>
          <AddAccommodationModal
            show={showAccommodationModal}
            handleClose={handleCloseAccommodationModal}
            handleShow={handleShowAccommodationModal}
            handleAddAccommodation={handleAddAccommodation}
            fetchData={fetchData}
            itineraryItemId={itineraryItemId++}
          />
  
          <div className="w-25 h-100">
            <ItemCard
              item={localTransport}
              altText="Add transport"
              renderButton={localTransport === undefined}
              onButtonClick={handleShowTransportModal}
            />
          </div>
          <AddTransportModal
            show={showTransportModal}
            handleClose={handleCloseTransportModal}
            handleShow={handleShowTransportModal}
            handleAddTransport={handleAddTransport}
            fetchData={fetchData}
            itineraryItemId={itineraryItemId++}
          />
        </div>
      </Card.Body>
    </Card>
  );
  
}
export default DailyItinerary;