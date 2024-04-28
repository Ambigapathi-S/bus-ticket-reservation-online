import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { Button, Card, Container } from "react-bootstrap";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { CiViewList } from "react-icons/ci";
import { isAdminUser } from "../../service/AuthService";
import { useNavigate } from "react-router-dom";
import { deleteBus, getAllBus } from "../../service/BusService";

const BusList = (props: { data: any[] }) => {
  const [BusList, setBusList] = useState<any[]>([]);
  const navigate = useNavigate();
  const isAdmin = isAdminUser();
  useEffect(() => {
    if (props.data.length > 0) {
      setBusList(props?.data);
    } else {
      callBusListApi();
    }
  }, [props.data]);

  const callBusListApi = async () => {
    try {
      const response = await getAllBus();
      setBusList(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  function updateBus(id: number) {
    navigate(`/bus/update/${id}`);
  }

  function viewBus(id: number) {
    navigate(`/bus/view/${id}`);
  }

  const removeBus = async (id: number) => {
    try {
      const response = await deleteBus(id);
      callBusListApi();
    } catch (error) {
      console.error(error);
    }
  };

  function addBus() {
    navigate(`/bus/add`);
  }

  return (
    <Container>
      <div className="ListUI">
        <div className="head d-flex justify-content-between align-items-center">
          <h3 className="title-h3">Bus's List</h3>
          {isAdmin && (
            <button className="btn btn-primary" onClick={() => addBus()}>
              Add Bus
            </button>
          )}
        </div>
        {isAdmin && (
          <div className="table-responsive">
            <Table bordered>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Source</th>
                  <th>Destination</th>
                  <th>Departure Time</th>
                  <th>Arrival Time</th>
                  <th>Fare</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {BusList.map((Bus: any, index) => (
                  <tr key={Bus.id}>
                    <td>{index + 1}</td>
                    <td>{Bus.name}</td>
                    <td>{Bus.source}</td>
                    <td>{Bus.destination}</td>
                    <td>{Bus.departureTime}</td>
                    <td>{Bus.arrivalTime}</td>
                    <td>{Bus.fare}</td>
                    <td className="action-icons text-center">
                      {isAdmin && (
                        <span className="edit tooltip">
                          <button onClick={() => updateBus(Bus.id)}>
                            <span className="icon">
                              <FaRegEdit />
                            </span>
                            <span className="tooltiptext">Update</span>
                          </button>
                        </span>
                      )}
                      {isAdmin && (
                        <span className="delete tooltip">
                          <button onClick={() => removeBus(Bus.id)}>
                            <span className="icon">
                              <MdDeleteOutline />
                            </span>
                            <span className="tooltiptext">Delete</span>
                          </button>
                        </span>
                      )}
                      <span className="view tooltip">
                        <button onClick={() => viewBus(Bus.id)}>
                          <span className="icon">
                            <CiViewList />
                          </span>
                          <span className="tooltiptext">View</span>
                        </button>
                      </span>
                    </td>
                  </tr>
                ))}
                {!BusList.length && (
                  <tr>
                    <td colSpan={8} className="text-center">
                      No Bus Found
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        )}
        <div className="box-ui">
          {!isAdmin &&
            BusList.length > 0 &&
            BusList.map((Bus: any, index: number) => (
              <div className="box" key={index}>
                <Card>
                  <Card.Body>
                    <Card.Title>
                      <a href={`/bus/view/${Bus.id}`}>{Bus.name}</a>
                    </Card.Title>
                    <Card.Text>
                      <p>
                        <span>From</span> {Bus.source} <span>to</span>{" "}
                        {Bus.destination}
                      </p>
                      <p>
                        <span>Departured At</span> {Bus.departureTime}{" "}
                        <span>Arraival at</span>
                        {Bus.arrivalTime}
                      </p>
                      <p className="flex-ui">
                        <p>
                          <span>Available Seats</span> {Bus.seats}
                        </p>
                        <p>
                          <span>Price </span>
                          {Bus.fare}
                        </p>
                      </p>
                    </Card.Text>
                    <a href={`/bus/view/${Bus.id}`} className="btn btn-primary">
                      Book Now
                    </a>
                  </Card.Body>
                </Card>
              </div>
            ))}
        </div>
      </div>
    </Container>
  );
};

export default BusList;
