import { Button, Card } from "react-bootstrap";
import { useState } from "react";

function ItemCard({ item, altText, renderButton, onButtonClick }) {
  const [showButtons, setShowButtons] = useState(false);

  function handleMouseEnter() {
    setShowButtons(true);
  }

  function handleMouseLeave() {
    setShowButtons(false);
  }

  return (
    <Card className="shadow border h-100 m-1">
      {item === undefined ? (
        <div className="h-100 container d-flex rounded justify-content-center align-items-center border border-primary">
          <div
            className="align-items-center text-center"
            onClick={renderButton ? onButtonClick : null}
          >
            {altText}
            <h2 className="bi bi-plus-lg"></h2>
          </div>
        </div>
      ) : (
        <div
          className="w-100 h-100"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Card.Img
            src={item?.image}
            alt="Card image"
            className="w-100 h-100"
            style={{ objectFit: "cover" }}
          />
          <Card.ImgOverlay className="h-25 bg-light opacity-75 m-2">
            <div className="d-flex justify-content-between align-items-start">
              <em className="fw-semibold col">{item?.name}</em>
              <small className="fw-light">${item?.price}</small>
            </div>
            <p>
              <small>{item?.description}</small>
            </p>
          </Card.ImgOverlay>
          {showButtons && (
            <div className="position-absolute bottom-0 end-0 m-2 d-flex justify-content-end align-items-center w-100">
              <button
                className="btn btn-primary me-2 rounded-circle bi bi-pencil-fill"
                style={{ height: "3rem", width: "3rem" }}
              />
              <button
                className="btn btn-danger rounded-circle bi bi-trash3-fill"
                style={{ height: "3rem", width: "3rem" }}
              />
            </div>
          )}
        </div>
      )}
    </Card>
  );
}

export default ItemCard;

