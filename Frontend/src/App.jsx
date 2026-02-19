import { BrowserRouter, Route, Routes } from "react-router-dom"
import Footer from "./globals/components/footer/Footer"
import Navbar from "./globals/components/navbar/Navbar"
import { Provider } from "react-redux"
import store from "./store/store"
import Home from "./pages/home/Home"
import Cart from "./pages/cart/Cart"
function App() {

  return (
    <>
    <Provider store={store}>
      {/* <RouterProvider router={router} /> */}
      <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
      <Footer/>
      </BrowserRouter>
    </Provider>
    </>
  )
}

export default App