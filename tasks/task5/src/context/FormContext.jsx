import { createContext, useContext, useState, useEffect } from "react";

const FormContext = createContext(null);

const STORAGE_KEY = "multiStepFormData";

const initialFormData = {
  personalDetails: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  },
  academicBackground: {
    highestDegree: "",
    fieldOfStudy: "",
    institution: "",
    graduationYear: "",
    gpa: "",
    achievements: "",
    certifications: "",
  },
  professionalBackground: {
    currentJobTitle: "",
    company: "",
    industry: "",
    yearsOfExperience: "",
    skills: "",
    jobDescription: "",
    linkedinUrl: "",
    portfolioUrl: "",
  },
};

const loadFromStorage = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return {
        ...initialFormData,
        ...parsed,
        personalDetails: {
          ...initialFormData.personalDetails,
          ...parsed.personalDetails,
        },
        academicBackground: {
          ...initialFormData.academicBackground,
          ...parsed.academicBackground,
        },
        professionalBackground: {
          ...initialFormData.professionalBackground,
          ...parsed.professionalBackground,
        },
      };
    }
  } catch (e) {
    console.error("Error loading form data from localStorage:", e);
  }
  return initialFormData;
};

const FormContextProvider = ({ children }) => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState(loadFromStorage);
  const [errors, setErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const stepLabels = [
    "Personal Details",
    "Academic Background",
    "Professional Background",
  ];

  // Sync to localStorage whenever formData changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }, [formData]);

  const updatePersonalDetails = (data) => {
    setFormData((prev) => ({
      ...prev,
      personalDetails: { ...prev.personalDetails, ...data },
    }));
  };

  const updateAcademicBackground = (data) => {
    setFormData((prev) => ({
      ...prev,
      academicBackground: { ...prev.academicBackground, ...data },
    }));
  };

  const updateProfessionalBackground = (data) => {
    setFormData((prev) => ({
      ...prev,
      professionalBackground: { ...prev.professionalBackground, ...data },
    }));
  };

  const clearFormData = () => {
    setFormData(initialFormData);
    localStorage.removeItem(STORAGE_KEY);
    setStep(0);
  };

  const value = {
    step,
    setStep,
    stepLabels,
    formData,
    setFormData,
    updatePersonalDetails,
    updateAcademicBackground,
    updateProfessionalBackground,
    errors,
    setErrors,
    isModalOpen,
    setIsModalOpen,
    clearFormData,
  };

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
};

export function useFormContext() {
  const context = useContext(FormContext);
  return context;
}

export default FormContextProvider;
