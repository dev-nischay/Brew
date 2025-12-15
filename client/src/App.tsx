import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import { Home } from "./components/home/HomePage";
import { SignUp } from "./components/auth/SignupPage";
import SignIn from "./components/auth/SigninPage";
import { Error } from "./components/error/ErrorPage";
import { Purchases } from "./components/payment/PurchasesPage";
import Payment from "./components/payment/PaymentPage";
import { GridsLayout } from "./layouts/GridsLayout";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<SignUp />} />
          <Route path="signin" element={<SignIn />} />
        </Route>
        <Route path="/home" element={<GridsLayout />}>
          <Route path="products" element={<Home />} />
          <Route path="payments" element={<Payment />} />
          <Route path="purchases" element={<Purchases />} />
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

// routes may be changed after devlopment

export default App;
