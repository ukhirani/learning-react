import { RestartAltOutlined } from "@mui/icons-material";
import { Box } from "@mui/material";
import BackwardButton from "../buttons/backwardButton/BackwardButton.jsx";
import dayjs from "dayjs";
import { useFormContext } from "../../context/FormContext";
import { countries, states } from "../../constants/options";
import {
  isValidEmail,
  isValidMobile,
  isValidName,
  isValidPinCode,
  sanitizeAlpha,
  sanitizeDigits,
} from "../../utils/formUtils";
import ForwardButton from "../buttons/forwardButton/ForwardButton.jsx";
import BottomBar from "../bottomBar/BottomBar.jsx";
import FormStep from "../formStep/FormStep.jsx";
import BasicInformation from "./Step1/BasicInformation.jsx";
import ContactDetails from "./Step1/ContactDetails.jsx";
import Address from "./Step1/Address.jsx";
import formStyles from "../formStep/formStep.module.css";
import { useEffect } from "react";

const Step1 = () => {
  const {
    clearFormData,
    setStep,
    formData,
    updatePersonalDetails,
    errors,
    setErrors,
    editingApplicationId,
  } = useFormContext();

  useEffect(() => {
    setErrors({});
  }, [editingApplicationId]);

  const personalDetails = formData.personalDetails;

  const handleChange = (event) => {
    const { name, value } = event.target;
    const nextValue =
      name === "phone"
        ? sanitizeDigits(value, 10)
        : name === "zipCode"
          ? sanitizeDigits(value, 6)
          : ["firstName", "lastName", "city"].includes(name)
            ? sanitizeAlpha(value)
            : value;
    updatePersonalDetails({ [name]: nextValue });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleAutocompleteChange = (name) => (event, value) => {
    const sanitized =
      name === "state" || name === "country"
        ? sanitizeAlpha(value || "")
        : value || "";
    updatePersonalDetails({ [name]: sanitized });
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleAutocompleteInputChange = (name) => (event, value) => {
    const sanitized =
      name === "state" || name === "country"
        ? sanitizeAlpha(value || "")
        : value || "";
    updatePersonalDetails({ [name]: sanitized });
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validatePersonalDetails = () => {
    const newErrors = {};

    if (!personalDetails.firstName.trim()) {
      newErrors.firstName = "First name is required";
    } else if (!isValidName(personalDetails.firstName)) {
      newErrors.firstName = "First name should contain only letters";
    }

    if (!personalDetails.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    } else if (!isValidName(personalDetails.lastName)) {
      newErrors.lastName = "Last name should contain only letters";
    }

    if (!personalDetails.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!isValidEmail(personalDetails.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!personalDetails.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!isValidMobile(personalDetails.phone)) {
      newErrors.phone = "Enter a valid 10-digit mobile number";
    }

    if (!personalDetails.dateOfBirth) {
      newErrors.dateOfBirth = "Date of birth is required";
    } else {
      const dobCheck = new dayjs(personalDetails.dateOfBirth);
      if (new dayjs() < dobCheck) {
        newErrors.dateOfBirth = "Date of birth cannot be in future"; // validation for when user enters the date via keyboard
      } else {
        console.log("it passed");
      }
    }

    if (!personalDetails.gender) {
      newErrors.gender = "Gender is required";
    }

    if (!personalDetails.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (!personalDetails.city.trim()) {
      newErrors.city = "City is required";
    } else if (!isValidName(personalDetails.city)) {
      newErrors.city = "City should contain only letters";
    }

    if (!personalDetails.state.trim()) {
      newErrors.state = "State is required";
    }

    if (!personalDetails.zipCode.trim()) {
      newErrors.zipCode = "Zip code is required";
    } else if (!isValidPinCode(personalDetails.zipCode)) {
      newErrors.zipCode = "Enter a valid 6-digit PIN code";
    }

    if (!personalDetails.country.trim()) {
      newErrors.country = "Country is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (!validatePersonalDetails()) return;
    setStep((step) => step + 1);
  };

  return (
    <FormStep title="Personal Details *">
      <Box component="form" className={formStyles.form}>
        <BasicInformation
          personalDetails={personalDetails}
          errors={errors}
          handleChange={handleChange}
          updatePersonalDetails={updatePersonalDetails}
          setErrors={setErrors}
        />
        <ContactDetails
          personalDetails={personalDetails}
          errors={errors}
          handleChange={handleChange}
        />
        <Address
          personalDetails={personalDetails}
          errors={errors}
          handleChange={handleChange}
          handleAutocompleteChange={handleAutocompleteChange}
          handleAutocompleteInputChange={handleAutocompleteInputChange}
          states={states}
          countries={countries}
        />
      </Box>
      <BottomBar>
        <BackwardButton
          color={"error"}
          icon={<RestartAltOutlined />}
          editingApplicationId={editingApplicationId}
          onClick={clearFormData}
        >
          Reset
        </BackwardButton>
        <ForwardButton onClick={nextStep}>Next Step</ForwardButton>
      </BottomBar>
    </FormStep>
  );
};
export default Step1;
