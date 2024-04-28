import Container from "react-bootstrap/Container";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import {
  LoginApi,
  storeToken,
  saveLoggedInUser,
  logout,
  isAdminUser,
} from "../../service/AuthService";
import { useNavigate } from "react-router-dom";

const loginSchema = yup
  .object({
    email: yup.string().email().required("Email Address is Required!"),
    password: yup
      .string()
      .min(4, "Enter atleast 4 characters")
      .max(15, "Maximum length is 15 Characters")
      .required("Password is Required!"),
  })
  .required();

const LoginComponent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const navigate = useNavigate();
  
  const onSubmit = async (data: { email: string; password: string }) => {
    try {
      const response = await LoginApi(data.email, data.password);
      let resMsg = response.data.message;
      if (response.status === 200) {
        toast("LoggedIn Successfully!", { type: "success" });
        const token: any = "Bearer " + response.data.accessToken;
        const role: string = response.data.role;
        storeToken(token);
        saveLoggedInUser(data.email, role);
        const isAdmin = isAdminUser();
        if (isAdmin) {
          navigate(`/user/profile?email=${data.email}`);
        } else {
          navigate(`/`);
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

  return (
    <Container>
      <div className="FormUI">
        <ToastContainer />
        <h3 className="title">Login</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
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

export default LoginComponent;
