import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { Container } from "react-bootstrap";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { CiViewList } from "react-icons/ci";
import {
  findUserByEmail,
  getLoggedInUser,
  isAdminUser,
} from "../../service/AuthService";
import { useNavigate } from "react-router-dom";
import {
  getAllBooking,
  deleteBooking,
  getBookingById,
  getBookingByUserId,
} from "../../service/BookingService";
import { toast } from "react-toastify";

const BookingList = () => {
  const [BookingList, setBookingList] = useState([]);
  const navigate = useNavigate();
  const isAdmin = isAdminUser();
  let email: string | null = getLoggedInUser();
  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    try {
      const response = await findUserByEmail(email);
      callBookingListApi(response.data.id);
    } catch (error: any) {
      let resMsg = error?.response?.data.message;
      toast(resMsg);
    }
  };

  const callBookingListApi = async (id: number) => {
    try {
      if (isAdmin) {
        const response = await getAllBooking();
        setBookingList(response.data);
      } else {
        const response = await getBookingByUserId(id);
        setBookingList(response.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  function updateBooking(id: number) {
    navigate(`/booking/update/${id}`);
  }

  function viewBooking(id: number) {
    navigate(`/booking/view/${id}`);
  }

  const removeBooking = async (id: number) => {
    try {
      const response = await deleteBooking(id);
      callBookingListApi(0);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <div className="ListUI">
        <div className="head d-flex justify-content-between align-items-center">
          <h3 className="title-h3">Booking List</h3>
        </div>
        <div className="table-responsive">
          <Table bordered>
            <thead>
              <tr>
                <th>#</th>
                <th>Booking Date</th>
                <th>Bus Name</th>
                <th>Source</th>
                <th>Destination</th>
                <th>Departure Time</th>
                <th>Arrival Time</th>
                <th>No. of Seats</th>
                <th>Total Amount</th>
                <th>Status</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {BookingList?.map((booking: any, index: number) => (
                <tr key={booking?.id}>
                  <td>{index + 1}</td>
                  <td>{booking?.bookingDate}</td>
                  <td>{booking?.bus?.name}</td>
                  <td>{booking?.bus?.source}</td>
                  <td>{booking?.bus?.destination}</td>
                  <td>{booking?.bus?.departureTime}</td>
                  <td>{booking?.bus?.arrivalTime}</td>
                  <td>{booking?.numSeats}</td>
                  <td>{booking?.totalAmount}</td>
                  <td>{booking?.status}</td>
                  <td className="action-icons text-center">
                    {isAdmin && (
                      <span className="edit tooltip">
                        <button onClick={() => updateBooking(booking?.id)}>
                          <span className="icon">
                            <FaRegEdit />
                          </span>
                          <span className="tooltiptext">Update</span>
                        </button>
                      </span>
                    )}
                    {isAdmin && (
                      <span className="delete tooltip">
                        <button onClick={() => removeBooking(booking?.id)}>
                          <span className="icon">
                            <MdDeleteOutline />
                          </span>
                          <span className="tooltiptext">Delete</span>
                        </button>
                      </span>
                    )}
                    <span className="view tooltip">
                      <button onClick={() => viewBooking(booking?.id)}>
                        <span className="icon">
                          <CiViewList />
                        </span>
                        <span className="tooltiptext">View</span>
                      </button>
                    </span>
                  </td>
                </tr>
              ))}
              {!BookingList.length && (
                <tr>
                  <td colSpan={11} className="text-center">
                    No Booking's Found
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </div>
    </Container>
  );
};

export default BookingList;
