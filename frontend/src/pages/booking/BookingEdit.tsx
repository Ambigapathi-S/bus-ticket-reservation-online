import React, { useEffect, useState } from "react";
import { Col, Container, Row, ToastContainer } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  deleteBooking,
  getBookingById,
  saveBooking,
  updateBooking,
} from "../../service/BookingService";
import { toast } from "react-toastify";
import {
  getLoggedInUser,
  isAdminUser,
  logout,
} from "../../service/AuthService";

const BookingSchema = yup
  .object({
    bookingDate: yup.string().required("Date is Required!"),
    numSeats: yup.number().required("No.of Seats are Required!"),
    totalAmount: yup.number().required("Total Amont is Required!"),
    status: yup.string(),
    paymentDetails: yup.string().required("Payment Details is Required!"),
  })
  .required();

const BookingEdit = (busId: any, passengerId: any) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isAdmin = isAdminUser();
  const [bookingDetails, setBookingDetails] = useState<any | null>(null);
  const email = getLoggedInUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(BookingSchema),
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          let ids = Number(id);
          const response = await getBookingById(ids);
          if (response.data) {
            setValues(response.data);
            setBookingDetails(response.data);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [id]);

  function setValues(data: any) {
    setValue("bookingDate", data.bookingDate);
    setValue("numSeats", data.numSeats);
    setValue("totalAmount", data.totalAmount);
    setValue("status", data.status);
    setValue("paymentDetails", data.paymentDetails);
  }
  const onSubmit = async (register: any) => {
    try {
      let ids = Number(id);
      let bookings: any = {
        bookingDate: register.bookingDate,
        numSeats: register.numSeats,
        totalAmount: register.totalAmount,
        status: register.status,
        paymentDetails: register.paymentDetails,
        bus: { id: bookingDetails?.bus.id },
        user: { id: bookingDetails?.user.id },
      };
      const response = await updateBooking(ids, bookings);
      let resMsg = response.data.message;
      if (response.status === 200) {
        toast("Booking Details Updated Successfully!", { type: "success" });
        navigate("/booking/list");
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
    <div className="FormUI bookedit">
      <div className="head d-flex justify-content-between align-items-center">
        <h3 className="title">Update Booking Details</h3>
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col xs={6} md={6} sm={12} lg={6}>
            <div className="form-group">
              <input
                {...register("bookingDate")}
                placeholder="Date of Booking"
                type="date"
                className={`form-control ${errors.bookingDate ? "error" : ""} `}
                readOnly
              />
              <p className="error">{errors.bookingDate?.message}</p>
            </div>
          </Col>
          <Col xs={6} md={6} sm={12} lg={6}>
            <div className="form-group">
              <input
                {...register("numSeats")}
                placeholder="No. of Seats"
                className={`form-control ${errors.numSeats ? "error" : ""} `}
                readOnly
              />
              <p className="error">{errors.numSeats?.message}</p>
            </div>
          </Col>
          <Col xs={6} md={6} sm={12} lg={6}>
            <div className="form-group">
              <input
                {...register("totalAmount")}
                placeholder="Total Amount"
                className={`form-control ${errors.totalAmount ? "error" : ""} `}
                readOnly
              />
              <p className="error">{errors.totalAmount?.message}</p>
            </div>
          </Col>
          <Col xs={6} md={6} sm={12} lg={6}>
            <div className="form-group">
              <select
                {...register("status")}
                className={`form-control ${errors.status ? "error" : ""} `}
                disabled={!isAdmin}
              >
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <p className="error">{errors.status?.message}</p>
            </div>
          </Col>
          <Col xs={6} md={6} sm={12} lg={6}>
            <div className="form-group">
              <input
                {...register("paymentDetails")}
                placeholder="Payment Details"
                className={`form-control ${
                  errors.paymentDetails ? "error" : ""
                } `}
                readOnly
              />
              <p className="error">{errors.paymentDetails?.message}</p>
            </div>
          </Col>
        </Row>

        <div className="text-center">
          <input type="submit" className="btn btn-primary" />
        </div>
      </form>
    </div>
  );
};

export default BookingEdit;
