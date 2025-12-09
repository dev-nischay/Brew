import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import { Home } from "./components/home/HomePage";
import { SignUp } from "./components/auth/SignupPage";
import SignIn from "./components/auth/SigninPage";
import { Error } from "./components/error/ErrorPage";
import { Purchases } from "./components/payment/PurchasesPage";
import { Payment } from "./components/payment/PaymentPage";

function App() {
  return (
    <BrowserRouter>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<SignUp />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="home" element={<Home />} />
        <Route path="payment" element={<Payment />} />
        <Route path="purchases" element={<Purchases />} />
        <Route path="*" element={<Error />} />
      </Route>
    </BrowserRouter>
  );
}

// routes may be changed after devlopment

export default App;
