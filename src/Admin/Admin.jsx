import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import AdminDashboard from "./Dashboard/AdminDashboard.jsx";
import AdminSidebar from "./AdminSidebar";
import RestaurantDashboard from "./Dashboard/RestaurantDashboard.jsx";
import RestaurantsOrder from "./Orders/RestaurantsOrder.jsx";
import RestaurantsMenu from "./Food/RestaurantsMenu.jsx";
import AddMenuForm from "./Food/AddMenuForm.jsx";
import CreateRestaurantForm from "./AddRestaurants/CreateRestaurantForm.jsx";
import IngredientTable from "./Events/Events.jsx";
import Category from "./Category/Category.jsx";
import Ingredients from "./Ingredients/Ingredients.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  getIngredientCategory,
  getIngredientsOfRestaurant,
} from "../State/Admin/Ingredients/Action";
import { getRestaurantsCategory } from "../State/Customers/Restaurant/restaurant.action";
import Details from "./Details/Details.jsx";
import AdminNavbar from "./AdminNavbar.jsx";
import { getUsersOrders } from "../State/Customers/Orders/Action";
import { fetchRestaurantsOrder } from "../State/Admin/Order/restaurants.order.action";
import Navbar from "../customers/components/Navbar/Navbar.jsx";

const Admin = () => {
  const dispatch = useDispatch();
  const [openSideBar, setOpenSideBar] = useState(false);
  const handleOpenSideBar = () => setOpenSideBar(true);
  const handleCloseSideBar = () => setOpenSideBar(false);
  const { auth, restaurant, ingredients } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");
  useEffect(() => {
    if (restaurant.usersRestaurant) {
      dispatch(
        getIngredientCategory({ jwt, id: restaurant.usersRestaurant?.id })
      );
      dispatch(
        getIngredientsOfRestaurant({ jwt, id: restaurant.usersRestaurant?.id })
      );
      dispatch(
        getRestaurantsCategory({
          jwt: auth.jwt || jwt,
          restaurantId: restaurant.usersRestaurant?.id,
        })
      );

      dispatch(
        fetchRestaurantsOrder({
          restaurantId: restaurant.usersRestaurant?.id,
          jwt: auth.jwt || jwt,
        })
      );
    }
  }, [restaurant.usersRestaurant]);
  return (
    <div>
      <AdminNavbar handleOpenSideBar={handleOpenSideBar} />
      <div className="lg:flex justify-between">
        <div className="">
          <AdminSidebar handleClose={handleCloseSideBar} open={openSideBar} />
        </div>

        <div className="lg:w-[80vw]">
          <div>
            <Navbar/>
          </div>
          <Routes>
            <Route path="/" element={<RestaurantDashboard />} />
            <Route path="/orders" element={<RestaurantsOrder />} />
            <Route path="/menu" element={<RestaurantsMenu />} />
            <Route path="/add-menu" element={<AddMenuForm />} />
            <Route path="/add-restaurant" element={<CreateRestaurantForm />} />
            <Route path="/event" element={<IngredientTable />} />
            <Route path="/ingredients" element={<Ingredients />} />
            <Route path="/category" element={<Category />} />
            <Route path="/details" element={<Details />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Admin;
