import { Outlet } from "react-router-dom";
import Footer from "../footer/footer";
import Header from "../header/header";

const UserLayout = () => {
  return <>
      <Header />
      <Outlet/>
      <Footer />
    </>
};

export default UserLayout;
