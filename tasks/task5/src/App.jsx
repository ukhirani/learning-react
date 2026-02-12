import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import FormContextProvider from "./context/FormContext.jsx";
import Layout from "./components/layout/Layout.jsx";
import HomePage from "./components/pages/home/HomePage.jsx";
import ApplicationsPage from "./components/pages/applications/ApplicationsPage.jsx";
import SuccessModal from "./components/successModal/SuccessModal.jsx";
import ConfirmDialog from "./components/confirmDialog/ConfirmDialog.jsx";
import NotFoundPage from "./components/pages/notFound/NotFoundPage.jsx";
import ApplicantProfile from "./components/applicantProfile/ApplicantProfile.jsx";

function App() {
  return (
    <FormContextProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<ApplicationsPage />} />
          <Route path="/form" element={<HomePage />} />
          <Route
            path="/applications/:applicationID"
            element={<ApplicantProfile />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
      <SuccessModal />
      <ConfirmDialog />
    </FormContextProvider>
  );
}

export default App;
