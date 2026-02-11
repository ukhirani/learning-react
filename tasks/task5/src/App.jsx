import "./App.css";
import { Routes, Route } from "react-router-dom";
import FormContextProvider from "./context/FormContext.jsx";
import Layout from "./components/layout/Layout.jsx";
import HomePage from "./components/pages/home/HomePage.jsx";
import ApplicationsPage from "./components/pages/applications/ApplicationsPage.jsx";
import SuccessModal from "./components/successModal/SuccessModal.jsx";
import ConfirmDialog from "./components/confirmDialog/ConfirmDialog.jsx";

function App() {
  return (
    <FormContextProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/applications" element={<ApplicationsPage />} />
        </Route>
      </Routes>
      <SuccessModal />
      <ConfirmDialog />
    </FormContextProvider>
  );
}

export default App;
