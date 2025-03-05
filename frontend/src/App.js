import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./routes/PrivateRoute";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./styles/Global.css";

/* Admin Pages */
import AdminLogin from "./pages/Admin/AdminLogin";
import AdminRegister from "./pages/Admin/AdminRegister";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import ApproveProfessionals from "./pages/Admin/ApproveProfessionals";
import Reports from "./pages/Admin/Reports";

/* Professional Pages */
import ProfessionalDashboard from "./pages/Professional/ProfessionalDashboard";
import ProfessionalLogin from "./pages/Professional/ProfessionalLogin";
import ProfessionalRegister from "./pages/Professional/ProfessionalRegister";
import DocumentUpload from "./pages/Professional/DocumentUpload";
import ProfileEdit from "./pages/Professional/ProfileEdit";
import Availability from "./pages/Professional/Availability";
import RequestsManagement from "./pages/Professional/RequestsManagement";
import CheckInOut from "./pages/Professional/CheckInOut";
import CustomerReviews from "./pages/Professional/CustomerReviews";

/* Customer Pages */
import CustomerLogin from "./pages/Customer/CustomerLogin";
import CustomerRegister from "./pages/Customer/CustomerRegister";
import CustomerDashboard from "./pages/Customer/CustomerDashboard";
import ServiceSelection from "./pages/Customer/ServiceSelection";
import ProblemDetail from "./pages/Customer/ProblemDetail";
import TechnicianSelection from "./pages/Customer/TechnicianSelection";
import RequestConfirmation from "./pages/Customer/RequestConfirmation";
import PaymentSimulation from "./pages/Customer/PaymentSimulation";
import ReviewSubmission from "./pages/Customer/ReviewSubmission";


// Home page
import Home from "./pages/Home"; 

function App() {
  return (
    <Router>
    <AuthProvider>
      
        <Navbar />
        <div className="container">
          <Routes>
            {/* Public Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/register" element={<AdminRegister />} />
            <Route path="/professional/login" element={<ProfessionalLogin />} />
            <Route path="/professional/register" element={<ProfessionalRegister />} />
            <Route path="/customer/login" element={<CustomerLogin />} />
            <Route path="/customer/register" element={<CustomerRegister />} />

            
              {/* Admin Routes */}
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/approve-professionals" element={<ApproveProfessionals />} />
              <Route path="/admin/reports" element={<Reports />} />

              {/* Professional Routes */}
              <Route path="/professional/dashboard" element={<ProfessionalDashboard />} />
              <Route path="/professional/upload-docs/:id" element={<DocumentUpload />} />
              <Route path="/professional/edit-profile" element={<ProfileEdit />} />
              <Route path="/professional/availability" element={<Availability />} />
              <Route path="/professional/requests" element={<RequestsManagement />} />
              <Route path="/professional/check-in-out" element={<CheckInOut />} />
              <Route path="/professional/reviews" element={<CustomerReviews />} />

              {/* Customer Routes */}
              <Route path="/customer/dashboard" element={<CustomerDashboard />} />
              <Route path="/customer/service-selection" element={<ServiceSelection />} />
              <Route path="/customer/problem-detail" element={<ProblemDetail />} />
              <Route path="/customer/technician-selection" element={<TechnicianSelection />} />
              <Route path="/customer/request-confirmation" element={<RequestConfirmation />} />
              <Route path="/customer/payment" element={<PaymentSimulation />} />
              <Route path="/customer/review" element={<ReviewSubmission />} />

              <Route path="/" element={<Home />} />


            {/* Catch-all 404 page */}
            <Route path="*" element={<h2>404 - Page Not Found</h2>} />

            {/* Private Routes (Protected Areas) */}
            <Route element={<PrivateRoute />}>
            </Route>
          </Routes>
        </div>
        <Footer />
      
    </AuthProvider>
    </Router>
  );
}

export default App;
