import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { saveBooking } from "../../service/BookingService";
import { toast } from "react-toastify";
import {
  findUserByEmail,
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

const BookingAdd = (BusDetails: any) => {
  const navigate = useNavigate();
  const isAdmin = isAdminUser();
  const email = getLoggedInUser();
  const [userId, setUserID] = useState(0);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(BookingSchema),
  });
  useEffect(() => {
    getUserdetails();
  }, [])
  const getUserdetails = async () => {
    try {
      const response = await findUserByEmail(email);
      setUserID(response.data.id);
    } catch (error: any) {
      let resMsg = error?.response?.data.message;
      toast(resMsg);
    }
  };

  const onSubmit = async (register: any) => {
    try {
      let bookings: any = {
        bookingDate: register.bookingDate,
        numSeats: register.numSeats,
        totalAmount: register.totalAmount,
        status: "pending",
        paymentDetails: register.paymentDetails,
        bus: { id: BusDetails.BusDetails.id },
        user: { id: userId },
      };
      const response = await saveBooking(bookings);
      let resMsg = response.data;
      if (response.status === 200 || response.status === 201) {
        toast("Booking Added Successfully!", { type: "success" });
        if (isAdmin) {
          navigate("/booking/list");
        } else {
          navigate(`/booking/list?email=${email}`);
        }
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
  function calculatePrice(count: any) {
    let price = BusDetails.BusDetails.fare;
    let seats = count;
    let result = Number(price) * Number(seats);
    setValue("totalAmount", result);
  }
  return (
    <div className="bookingForm FormUI">
      <h3 className="title">Add Booking Details</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col xs={6} md={4} sm={4} lg={4}>
            <div className="form-group">
              <input
                {...register("bookingDate")}
                placeholder="Date of Booking"
                type="date"
                className={`form-control ${errors.bookingDate ? "error" : ""} `}
                min={new Date().toISOString().split('T')[0]}
              />
              <p className="error">{errors.bookingDate?.message}</p>
            </div>
          </Col>
          <Col xs={6} md={4} sm={4} lg={4}>
            <div className="form-group">
              <input
                {...register("numSeats")}
                placeholder="No. of Seats"
                type="number"
                className={`form-control ${errors.numSeats ? "error" : ""} `}
                onChange={(e) => calculatePrice(e.target.value)}
              />
              <p className="error">{errors.numSeats?.message}</p>
            </div>
          </Col>
          <Col xs={6} md={4} sm={4} lg={4}>
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
          <Col xs={6} md={4} sm={4} lg={4}>
            <div className="form-group">
              <select
                {...register("status")}
                className={`form-control ${errors.status ? "error" : ""} `}
                disabled={!isAdmin}
              >
                <option>Pending</option>
                <option>Cofirmed</option>
                <option>Cancelled</option>
              </select>
              <p className="error">{errors.status?.message}</p>
            </div>
          </Col>
          <Col xs={6} md={4} sm={4} lg={4}>
            <div className="form-group">
              <input
                {...register("paymentDetails")}
                placeholder="Payment Details"
                className={`form-control ${
                  errors.paymentDetails ? "error" : ""
                } `}
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

export default BookingAdd;
