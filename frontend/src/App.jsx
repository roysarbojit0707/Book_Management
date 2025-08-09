import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import {
  Layout,
  Home,
  UserLogin,
  UserRegister,
  UserRegisterSuccess,
  MainHeader,
  MainLayout,
  MainFooter,
  MainHome,
  About,
  SellerLogin,
  SellerRegister,
  SellerRegisterSuccess,
  SellerFeature,
  Contact,
  MailSuccess,
  Product,
  ProductDetails,
  ContactSeller,
  DeliveryAddress,
  AddAddress,
  PaymentGetWay,
  EditSection,
  LibraryLoginPage,
  LibrarySection,
  LibraryPage,
  LibrarianRegister,
  LibraryLayout,
  HomeLibrary,
  AddLibrary,
} from "./Component/index";
import { ThemeProvider } from "./Contexts/theme.jsx"; // Add `.jsx`
import SettingSectionLayout from "./SettingSectionLayout.jsx";

function App() {
  const MyRouter = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          //for when / hit the url then home page automaticly loaded
          <Route path="home" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="Contact" element={<Contact />} />
        </Route>
        <Route path="/LibraryLoginPage" element={<LibraryLoginPage />} />
        <Route path="/userLogin" element={<UserLogin />} />
        <Route path="/userRegister" element={<UserRegister />} />
        <Route path="/UserRegisterSuccess" element={<UserRegisterSuccess />} />
        <Route path="/SellerLogin" element={<SellerLogin />} />
        <Route path="/SellerRegister" element={<SellerRegister />} />
        <Route path="MailSuccess" element={<MailSuccess />} />
        <Route path="/PaymentGetWay" element={<PaymentGetWay />} />
        <Route path="/LibrarianRegister" element={<LibrarianRegister />} />
        <Route
          path="/SellerRegisterSuccess"
          element={<SellerRegisterSuccess />}
        />
        <Route path="/Main" element={<MainLayout />}>
          <Route path="Setting" element={<SettingSectionLayout />}>
            <Route path="EditSection" element={<EditSection />} />
          </Route>
          <Route path="LibrarySection" element={<LibrarySection />} />
          <Route index element={<MainHome />} />
          <Route path="MainHome" element={<MainHome />} />
          <Route path="about" element={<About />} />
          <Route path="Contact" element={<Contact />} />
          <Route path="Product" element={<Product />} />
          <Route path="DeliveryAddress" element={<DeliveryAddress />} />
          <Route path="ProductDetails" element={<ProductDetails />} />
          <Route path="ContactSeller" element={<ContactSeller />} />
          <Route path="SellerFeature" element={<SellerFeature />} />
          <Route path="AddAddress" element={<AddAddress />} />
        </Route>
        <Route path="/Library" element={<LibraryLayout />}>
          <Route index element={<HomeLibrary />} />
          <Route path="HomeLibrary" element={<HomeLibrary />} />
          <Route path="AddLibrary" element={<AddLibrary />} />
        </Route>
      </>
    )
  );
  return (
    <ThemeProvider>
      <RouterProvider router={MyRouter} />
    </ThemeProvider>
  );
}

export default App;
