import "./App.css";
import { Routes, Route } from "react-router-dom";
import FormContextProvider from "./context/FormContext.jsx";
import ConfirmDialogProvider from "./components/confirmDialog/ConfirmDialog.jsx";
import Layout from "./components/layout/Layout.jsx";
import HomePage from "./components/pages/home/HomePage.jsx";
import ApplicationsPage from "./components/pages/applications/ApplicationsPage.jsx";
import SuccessModal from "./components/successModal/SuccessModal.jsx";

function App() {
  return (
    <FormContextProvider>
      <ConfirmDialogProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/applications" element={<ApplicationsPage />} />
          </Route>
        </Routes>
        <SuccessModal />
      </ConfirmDialogProvider>
    </FormContextProvider>
  );
}

export default App;
