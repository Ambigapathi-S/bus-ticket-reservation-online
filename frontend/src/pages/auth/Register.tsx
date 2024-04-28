import Container from "react-bootstrap/Container";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import { RegisterApi, logout } from "../../service/AuthService";
import { useNavigate } from "react-router-dom";

const RegisterSchema = yup
  .object({
    name: yup.string().required("Name is Required!"),
    username: yup.string().required("Username is Required!"),
    email: yup.string().email().required("Email Address is Required!"),
    password: yup
      .string()
      .required("Password is Required!")
      .min(4, "Enter atleast 4 characters")
      .max(15, "Maximum length is 15 Characters"),
  })
  .required();

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(RegisterSchema),
  });

  const navigate = useNavigate();

  const onSubmit = async (register: {}) => {
    try {
      const response = await RegisterApi(register);
      let resMsg = response.data.message;
      if (response.status === 200) {
        toast("Registered Successfully!", { type: "success" });
        navigate("/login");
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
      <div className="FormUI">
        <ToastContainer />
        <h3 className="title">Create Account</h3>
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
            />
            <p className="error">{errors.email?.message}</p>
          </div>
          <div className="form-group">
            <input
              {...register("password")}
              type="password"
              placeholder="Password"
              className={`form-control ${errors.password ? "error" : ""} `}
            />
            <p className="error">{errors.password?.message}</p>
          </div>
          <div className="text-center">
            <input type="submit" className="btn btn-primary" />
          </div>
        </form>
      </div>
    </Container>
  );
};

export default Register;
