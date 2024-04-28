import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { Container, ToastContainer } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { searchBusByLocation } from "../../service/BusService";
import { logout } from "../../service/AuthService";
import BusList from "../bus/BusList";

const searchSchema = yup
  .object({
    source: yup.string().required("Source is Required!"),
    destination: yup.string().required("Destination is Required!"),
  })
  .required();

const SearchBusForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(searchSchema),
  });

  const navigate = useNavigate();
  const [searchBusList, setSearchBusList] = useState<any[]>([]);
  const onSubmit = async (data: { source: string; destination: string }) => {
    try {
      const response = await searchBusByLocation(data.source, data.destination);
      let resMsg = response.data.message;
      if (response.status === 200) {
        setSearchBusList(response.data);
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

  function resetValues(e: any) {
    e.preventDefault();
    setValue("source", "");
    setValue("destination", "");
    setSearchBusList([]);
  }
  return (
    <Container>
      <div className="searchForm">
        <ToastContainer />
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <input
              {...register("source")}
              placeholder="Source"
              className={`form-control ${errors.source ? "error" : ""} `}
            />
          </div>
          <div className="form-group">
            <input
              {...register("destination")}
              placeholder="Destination"
              className={`form-control ${errors.destination ? "error" : ""} `}
            />
          </div>
          <div className="text-center">
            <input
              type="submit"
              value="Search Buses"
              className="btn btn-primary"
            />
          </div>
          <div className="text-center">
            <input
              type="reset"
              value="Refresh"
              className="btn btn-refresh"
              onClick={(e) => resetValues(e)}
            />
          </div>
        </form>
      </div>
      <BusList data={searchBusList} />
    </Container>
  );
};

export default SearchBusForm;
