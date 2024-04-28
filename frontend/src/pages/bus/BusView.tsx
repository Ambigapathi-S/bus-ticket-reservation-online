import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getBusById } from "../../service/BusService";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { isAdminUser, isUserLoggedIn, logout } from "../../service/AuthService";
import { ToastContainer, toast } from "react-toastify";
import BookingAdd from "../booking/BookingAdd";

const BusView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isAdmin:any = isAdminUser();
  const [BusDetails, setBusDetails] = useState({
    id: "",
    name: "",
    source: "",
    destination: "",
    departureTime: "",
    arrivalTime: "",
    seats: "",
    fare: "",
    amenities: "",
    operators: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          let ids = Number(id);
          const response = await getBusById(ids);
          setBusDetails(response.data);
        }
      } catch (error: any) {
        if (error?.response?.status === 403) {
          logout();
          navigate("/login");
        } else {
          toast(error);
        }
      }
    };
    fetchData();
  }, [id]);

  let isLoggedIn = isUserLoggedIn();

  function checkRedirect() {
    if (!isUserLoggedIn()) {
      navigate("/login");
      isLoggedIn = false;
    } else {
      isLoggedIn = true;
    }
  }

  return (
    <Container>
      <ToastContainer />
      <div className="ViewBusDetails">
        <div className="head d-flex justify-content-between align-items-center">
          <h3>Bus Details #{BusDetails.id}</h3>
          {isAdmin && (
            <a href="/bus/list" className="btn btn-back">
              Back to List
            </a>
          )}
          {!isAdmin && (
            <a href="/" className="btn btn-back">
              Back
            </a>
          )}
        </div>

        <Row>
          <Col xs={12} md={6} sm={6} lg={6}>
            <p>
              <label>Name : </label>
              <span>{BusDetails.name}</span>
            </p>
            <p>
              <label>Source : </label>
              <span>{BusDetails.source}</span>
            </p>
            <p>
              <label>Destination : </label>
              <span>{BusDetails.destination}</span>
            </p>
            <p>
              <label>Departure Time : </label>
              <span>{BusDetails.departureTime}</span>
            </p>
            <p>
              <label>Arrival Time : </label>
              <span>{BusDetails.arrivalTime}</span>
            </p>
          </Col>
          <Col xs={12} md={6} sm={6} lg={6}>
            <p>
              <label>Seats : </label>
              <span>{BusDetails.seats}</span>
            </p>
            <p>
              <label>Fare : </label>
              <span>Rs.{BusDetails.fare}</span>
            </p>
            <p>
              <label>Amenities : </label>
              <span>{BusDetails.amenities}</span>
            </p>
            <p>
              <label>Operators : </label>
              <span>{BusDetails.operators}</span>
            </p>
            {!isLoggedIn && (
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => checkRedirect()}
              >
                Book Now
              </button>
            )}
          </Col>
        </Row>
        {!isAdmin && (
          <Row>
            <Col xs={12} md={12} sm={12} lg={12}>
              {isLoggedIn && BusDetails && (
                <BookingAdd BusDetails={BusDetails} />
              )}
            </Col>
          </Row>
        )}
      </div>
    </Container>
  );
};

export default BusView;
