import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./pages/common/LayoutComponent";
import Home from "./pages/home/HomePage";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import PageNotFound from "./pages/common/PageNotFound";
import BusList from "./pages/bus/BusList";
import BusAddEditForm from "./pages/bus/BusAddEditForm";
import BusView from "./pages/bus/BusView";
import BookingList from "./pages/booking/BookingList";
import BookingEdit from "./pages/booking/BookingEdit";
import BookingView from "./pages/booking/BookingView";
import { isUserLoggedIn } from "./service/AuthService";
import HeaderComponent from "./pages/common/HeaderComponent";
import FooterComponent from "./pages/common/FooterComponent";
import ProfileComponent from "./pages/account/ProfileComponent";
function App() {
  function AuthenticatedRoute({ children }: any) {
    const isAuth = isUserLoggedIn();

    if (isAuth) {
      return children;
    }

    return <Navigate to="/" />;
  }
  return (
    <>
      <HeaderComponent />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>

          <Route path="/user/profile" element={<ProfileComponent />}></Route>

          <Route path="/bus/list" element={<BusList data={[]} />}></Route>
          <Route
            path="/bus/add"
            element={
              <AuthenticatedRoute>
                <BusAddEditForm />
              </AuthenticatedRoute>
            }
          ></Route>
          <Route
            path="/bus/update/:id"
            element={
              <AuthenticatedRoute>
                <BusAddEditForm />
              </AuthenticatedRoute>
            }
          ></Route>
          <Route path="/bus/view/:id" element={<BusView />}></Route>

          <Route
            path="/booking/list"
            element={
              <AuthenticatedRoute>
                <BookingList />
              </AuthenticatedRoute>
            }
          ></Route>
          <Route
            path="/booking/update/:id"
            element={
              <AuthenticatedRoute>
                <BookingEdit />
              </AuthenticatedRoute>
            }
          ></Route>
          <Route
            path="/booking/view/:id"
            element={
              <AuthenticatedRoute>
                <BookingView />
              </AuthenticatedRoute>
            }
          ></Route>
          <Route path="*" element={<PageNotFound />}></Route>
        </Route>
      </Routes>
      <FooterComponent />
    </>
  );
}

export default App;
