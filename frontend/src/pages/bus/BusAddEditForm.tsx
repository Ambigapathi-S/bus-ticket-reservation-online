import React, { useEffect, useState } from "react";
import { Container, ToastContainer } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { getBusById, saveBus, updateBus } from "../../service/BusService";
import { toast } from "react-toastify";
import { logout } from "../../service/AuthService";

const BusSchema = yup
  .object({
    name: yup.string().required("Name is Required!"),
    source: yup.string().required("Source is Required!"),
    destination: yup.string().required("Destination is Required!"),
    departureTime: yup.string().required("Departure Time is Required!"),
    arrivalTime: yup.string().required("Arrival Time is Required!"),
    seats: yup.number().required("Seats is Required!"),
    fare: yup.number().required("Fare is Required!"),
    amenities: yup.string().required("Amenities is Required!"),
    operators: yup.string().required("Operators is Required!"),
  })
  .required();

const BusAddEditForm = () => {
  const navigate = useNavigate();
  const [isAdd, setAdd] = useState(true);
  const { id } = useParams();
  let ids = Number(id);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(BusSchema),
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          let ids = Number(id);
          const response = await getBusById(ids);
          if (response.data) {
            setAdd(false);
            setValues(response.data);
          } else {
            setAdd(true);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [id]);

  function setValues(data: any) {
    setValue("name", data.name);
    setValue("source", data.source);
    setValue("destination", data.destination);
    setValue("departureTime", data.departureTime);
    setValue("arrivalTime", data.arrivalTime);
    setValue("seats", data.seats);
    setValue("fare", data.fare);
    setValue("amenities", data.amenities);
    setValue("operators", data.operators);
  }
  const onSubmit = async (register: {}) => {
    try {
      if (isAdd) {
        const response = await saveBus(register);
        let resMsg = response.data.message;
        if (response.status === 200 || response.status === 201) {
          toast("Bus Added Successfully!", { type: "success" });
          navigate("/bus/list");
        } else if (response.status === 403) {
          logout();
          navigate("/login");
        } else {
          toast(resMsg);
        }
      } else {
        let ids = Number(id);
        const response = await updateBus(ids, register);
        let resMsg = response.data.message;
        if (response.status === 200 || response.status === 201) {
          toast("Bus Details Updated Successfully!", { type: "success" });
          navigate("/bus/list");
        } else if (response.status === 403) {
          logout();
          navigate("/login");
        } else {
          toast(resMsg);
        }
      }
    } catch (error: any) {
      let resMsg = error?.response?.data.message;
      toast(resMsg);
    }
  };

  return (
    <Container>
      <div className="FormUI">
        <ToastContainer />
        <div className="head d-flex justify-content-between align-items-center">
          <h3 className="title">{isAdd ? "Add" : "Update"} Bus</h3>
          <a href="/bus/list" className="btn btn-back mb-3">
            Back to List
          </a>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <input
              {...register("name")}
              placeholder="Name"
              className={`form-control ${errors.name ? "error" : ""} `}
            />
            <p className="error">{errors.name?.message}</p>
          </div>
          <div className="form-group">
            <input
              {...register("source")}
              placeholder="Source"
              className={`form-control ${errors.source ? "error" : ""} `}
            />
            <p className="error">{errors.source?.message}</p>
          </div>
          <div className="form-group">
            <input
              {...register("destination")}
              placeholder="Destination"
              className={`form-control ${errors.destination ? "error" : ""} `}
            />
            <p className="error">{errors.destination?.message}</p>
          </div>
          <div className="form-group">
            <input
              {...register("departureTime")}
              placeholder="Departure Time"
              type="time"
              className={`form-control ${errors.departureTime ? "error" : ""} `}
            />
            <p className="error">{errors.departureTime?.message}</p>
          </div>
          <div className="form-group">
            <input
              {...register("arrivalTime")}
              placeholder="Arrival Time"
              type="time"
              className={`form-control ${errors.arrivalTime ? "error" : ""} `}
            />
            <p className="error">{errors.arrivalTime?.message}</p>
          </div>
          <div className="form-group">
            <input
              {...register("seats")}
              placeholder="Seats"
              className={`form-control ${errors.seats ? "error" : ""} `}
            />
            <p className="error">{errors.seats?.message}</p>
          </div>
          <div className="form-group">
            <input
              {...register("fare")}
              placeholder="Fare"
              className={`form-control ${errors.fare ? "error" : ""} `}
            />
            <p className="error">{errors.fare?.message}</p>
          </div>
          <div className="form-group">
            <input
              {...register("amenities")}
              placeholder="Amenities"
              className={`form-control ${errors.amenities ? "error" : ""} `}
            />
            <p className="error">{errors.amenities?.message}</p>
          </div>
          <div className="form-group">
            <input
              {...register("operators")}
              placeholder="Operators"
              className={`form-control ${errors.operators ? "error" : ""} `}
            />
            <p className="error">{errors.operators?.message}</p>
          </div>
          <div className="text-center">
            <input type="submit" className="btn btn-primary" />
          </div>
        </form>
      </div>
    </Container>
  );
};

export default BusAddEditForm;
