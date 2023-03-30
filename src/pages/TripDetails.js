import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import adminLayout from "../hoc/adminLayout";
import GoogleMap from "../components/GoogleMap";
import DailyItinerary from "../components/DailyItinerary";
import CreateTripModal from "../components/CreateTripModal";
import ItineraryService from "../api/ItineraryControllerAPI";

function TripDetails() {
  const { index } = useParams();
  const [itineraryItemList, setDestinationList] = useState([]);
  const [itinerary, setItinerary] = useState({});
  const [itineraryItem, setItineraryItem] = useState({});

  // const AddDestination = (dayNumber, destinations) => {};

  const fetchData = async () => {
    const destinations = await ItineraryService.getItineraryItems(index);
    const itinerary = await ItineraryService.getItinerary(index);
    setItinerary(itinerary);
    setDestinationList(destinations);

    // Set the last item in the itineraryItemList
    setItineraryItem(destinations[destinations.length - 1]);
  };

  useEffect(() => {
    fetchData();
  }, [index]);

  const handleClick = async () => {
    const destinations = await ItineraryService.getItineraryItems(index);
  };

  const days = [];
  const start = new Date(itinerary.startDate);
  const end = new Date(itinerary.endDate);

  const formattedStartDate = new Date(start).toLocaleDateString("en-UK", {
    day: "2-digit",
    month: "short",
  });
  const formattedEndDate = new Date(end).toLocaleDateString("en-UK", {
    day: "2-digit",
    month: "short",
  });
  const dayCount = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

  for (let i = 1; i <= dayCount; i++) {
    days.push({
      dayNumber: i,
      itineraryItem: itineraryItemList[i - 1],
    });
  }

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-">
            <div className="row align-items-center">
              <div className="col-sm">
                <h1 className="font-weight-bold">{itinerary.name}</h1>
              </div>
              <div className="col-sm text-right">
                <button
                  type="button"
                  className="btn btn-link"
                  onClick={handleClick}
                >
                  <h1>
                    <i className="bi bi-pencil-square"></i>
                  </h1>
                </button>
              </div>
            </div>
            <p>{itinerary.country}</p>
            <p>
              {formattedStartDate} to {formattedEndDate}
            </p>
            <div>
              {days.map((day) => (
                <DailyItinerary
                  dayNumber={day?.dayNumber}
                  key={day?.dayNumber}
                  itineraryItemId={itineraryItem.id}     // added to implement add itineraryItem
                  fetchData={fetchData}       // Added to implement for fetch data 
                  {...day?.itineraryItem}
                />
              ))}
            </div>
            {/* <CreateTripModal show={show} handleClose={handleClose} /> */}
          </div>
          <div className="col-sm">
            <GoogleMap />
          </div>
        </div>
      </div>
    </>
  );
}

export default adminLayout(TripDetails);
