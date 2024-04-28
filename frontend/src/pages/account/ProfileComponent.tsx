import Container from "react-bootstrap/Container";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import {
  findUserByEmail,
  findUserById,
  logout,
  updateUserDetails,
} from "../../service/AuthService";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const RegisterSchema = yup
  .object({
    name: yup.string().required("Name is Required!"),
    username: yup.string().required("Username is Required!"),
    email: yup.string().email().required("Email Address is Required!"),
  })
  .required();

const ProfileComponent = () => {
  const location = useLocation();
  const { id } = useParams();
  const [userProfile, setUserProfile]: any = useState(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(RegisterSchema),
  });

  useEffect(() => {
    if (location) {
      const searchParams = new URLSearchParams(location.search);
      const queryParameters = searchParams.getAll("email");
      if (queryParameters.length > 0) {
        const emailAddr: string = queryParameters[0];
        fetchData(emailAddr);
      }
    }
    if (id) {
      fetchDataById(id);
    }
  }, [location, id]);

  const fetchData = async (emailAddr: string) => {
    try {
      if (emailAddr) {
        const response = await findUserByEmail(emailAddr);
        setUserProfile(response.data);
        setValues(response.data);
      }
    } catch (error: any) {
      if (error.response.status === 403) {
        logout();
        navigate("/login");
      } else {
        let resMsg = error.response.data.message;
        toast(resMsg);
      }
    }
  };

  const fetchDataById = async (id: string) => {
    try {
      let ids = Number(id);

      if (ids) {
        const response = await findUserById(ids);
        setUserProfile(response.data);
        setValues(response.data);
      }
    } catch (error: any) {
      if (error?.response?.status === 403) {
        logout();
        navigate("/login");
      } else {
        let resMsg = error?.response?.data?.message;
        toast(resMsg);
      }
    }
  };

  function setValues(data: any) {
    setValue("name", data.name);
    setValue("username", data.username);
    setValue("email", data.email);
  }

  const onSubmitForm = async (register: {}) => {
    try {
      const response = await updateUserDetails(userProfile.id, register);
      let resMsg = response.data.message;
      if (response.status === 200) {
        toast("Details Updated Successfully!", { type: "success" });
        fetchData(userProfile.email);
      } else if (response.status === 403) {
        logout();
        navigate("/login");
      } else {
        toast(resMsg);
      }
    } catch (error: any) {
      if (error?.response.status === 403 || error?.request.status) {
        logout();
        navigate("/login");
      } else {
        let resMsg = error.response.data.message;
        toast(resMsg);
      }
    }
  };
  return (
    <Container>
      <div className="FormUI">
        <ToastContainer />
        <h3 className="title">Account Details</h3>
        <form onSubmit={handleSubmit(onSubmitForm)}>
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
              {...register("username")}
              placeholder="Username"
              className={`form-control ${errors.username ? "error" : ""} `}
            />
            <p className="error">{errors.username?.message}</p>
          </div>
          <div className="form-group">
            <input
              {...register("email")}
              placeholder="Email Address"
              className={`form-control ${errors.email ? "error" : ""} `}
              readOnly
            />
            <p className="error">{errors.email?.message}</p>
          </div>

          <div className="text-center">
            <input type="submit" className="btn btn-primary" />
          </div>
        </form>
      </div>
    </Container>
  );
};

export default ProfileComponent;
