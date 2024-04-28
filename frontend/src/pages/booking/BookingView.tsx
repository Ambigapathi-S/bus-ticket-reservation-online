import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteBooking,
  getBookingById,
  getBookingByUserId,
  updateBooking,
} from "../../service/BookingService";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {
  getLoggedInUser,
  isAdminUser,
  logout,
} from "../../service/AuthService";
import { ToastContainer, toast } from "react-toastify";

const BookingView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const email = getLoggedInUser();
  const isAdmin = isAdminUser();
  const [BookingDetails, setBookingDetails] = useState<any | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          let ids = Number(id);
          const response = await getBookingById(ids);
          setBookingDetails(response.data);
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

  const cancelTicket = async () => {
    try {
      let ids = Number(id);
      let bookings: any = {
        bookingDate: BookingDetails?.bookingDate,
        numSeats: BookingDetails?.numSeats,
        totalAmount: BookingDetails?.totalAmount,
        status: "cancelled",
        paymentDetails: BookingDetails?.paymentDetails,
        bus: { id: BookingDetails?.bus?.id },
        user: { id: BookingDetails?.user?.id },
      };
      const response = await updateBooking(ids, bookings);
      let resMsg = response.data.message;
      if (response.status === 200) {
        toast("Ticket Cancelled Successfully!", { type: "success" });
        navigate(`/booking/list?email=${email}`);
      } else if (response.status === 403) {
        logout();
        navigate("/login");
      } else {
        toast(resMsg);
      }
    } catch (error: any) {
      let resMsg = error?.response?.data.message;
      toast(resMsg);
    }
  };

  return (
    <Container>
      <ToastContainer />
      <div className="ViewBusDetails">
        <div className="head d-flex justify-content-between align-items-center">
          <h3>Booking Details #{BookingDetails?.id}</h3>
          <div className="d-flex gap-2">
            {BookingDetails?.status == "pending" && (
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => cancelTicket()}
              >
                Cancel Ticket
              </button>
            )}
            {!isAdmin && (
              <a href={`/booking/list?email=${email}`} className="btn btn-back">
                Back to List
              </a>
            )}
            {isAdmin && (
              <a href="/booking/list" className="btn btn-back">
                Back to List
              </a>
            )}
          </div>
        </div>

        <Row>
          <Col xs={12} md={6} sm={6} lg={6}>
            <p>
              <label>Passenger Name : </label>
              <span>{BookingDetails?.user?.name}</span>
            </p>
            <p>
              <label>Passenger Email : </label>
              <span>{BookingDetails?.user?.email}</span>
            </p>
            <p>
              <label>Booking Date : </label>
              <span>{BookingDetails?.bookingDate}</span>
            </p>
            <p>
              <label>Booking Date : </label>
              <span>{BookingDetails?.bookingDate}</span>
            </p>
            <p>
              <label>No. of Seats : </label>
              <span>{BookingDetails?.numSeats}</span>
            </p>
            <p>
              <label>Total Amount : </label>
              <span>{BookingDetails?.totalAmount}</span>
            </p>
            <p>
              <label>Status : </label>
              <span>{BookingDetails?.status}</span>
            </p>
            <p>
              <label>Payment Details : </label>
              <span>{BookingDetails?.paymentDetails}</span>
            </p>
          </Col>
          <Col xs={12} md={6} sm={6} lg={6}>
            <p>
              <label>Bus Name : </label>
              <span>{BookingDetails?.bus?.name}</span>
            </p>
            <p>
              <label>Source : </label>
              <span>{BookingDetails?.bus?.source}</span>
            </p>
            <p>
              <label>Destination : </label>
              <span>{BookingDetails?.bus?.destination}</span>
            </p>
            <p>
              <label>Departure Time : </label>
              <span>{BookingDetails?.bus?.departureTime}</span>
            </p>
            <p>
              <label>Arrival Time : </label>
              <span>{BookingDetails?.bus?.arrivalTime}</span>
            </p>

            <p>
              <label>Amenities : </label>
              <span>{BookingDetails?.bus?.amenities}</span>
            </p>
            <p>
              <label>Operators : </label>
              <span>{BookingDetails?.bus?.operators}</span>
            </p>
          </Col>
        </Row>
        {BookingDetails?.status == "cancelled" && (
          <Row>
            <Col xs={12} md={12} sm={12} lg={12}>
              <p className="alert alert-danger">
                *Paid Amount will be credited to your account within 3 working
                days!
              </p>
            </Col>
          </Row>
        )}
      </div>
    </Container>
  );
};

export default BookingView;
