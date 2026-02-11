import { createContext, useContext, useState, useEffect } from "react";

const FormContext = createContext(null);

const STORAGE_KEY = "multiStepFormData";
const APPLICATIONS_KEY = "multiStepFormApplications";

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
    skills: [],
    jobDescription: "",
    linkedinUrl: "",
    portfolioUrl: "",
  },
};

const normalizeFormData = (raw = {}) => {
  const normalizedProfessional = {
    ...initialFormData.professionalBackground,
    ...raw.professionalBackground,
  };
  if (!Array.isArray(normalizedProfessional.skills)) {
    const skillSource = normalizedProfessional.skills || "";
    normalizedProfessional.skills = skillSource
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return {
    ...initialFormData,
    ...raw,
    personalDetails: {
      ...initialFormData.personalDetails,
      ...raw.personalDetails,
    },
    academicBackground: {
      ...initialFormData.academicBackground,
      ...raw.academicBackground,
    },
    professionalBackground: normalizedProfessional,
  };
};

const loadFromStorage = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return normalizeFormData(parsed);
    }
  } catch (e) {
    console.error("Error loading form data from localStorage:", e);
  }
  return initialFormData;
};

const loadApplications = () => {
  try {
    const stored = localStorage.getItem(APPLICATIONS_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) {
        return parsed
          .filter((entry) => entry && entry.id)
          .map((entry) => ({
            ...entry,
            data: normalizeFormData(entry.data || {}),
          }));
      }
    }
  } catch (e) {
    console.error("Error loading applications from localStorage:", e);
  }
  return [];
};

const FormContextProvider = ({ children }) => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState(loadFromStorage);
  const [errors, setErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [applications, setApplications] = useState(loadApplications);
  const [selectedApplicationId, setSelectedApplicationId] = useState(null);
  const [editingApplicationId, setEditingApplicationId] = useState(null);

  const stepLabels = [
    "Personal Details",
    "Academic Background",
    "Professional Background",
  ];

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    localStorage.setItem(APPLICATIONS_KEY, JSON.stringify(applications));
  }, [applications]);

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
    setEditingApplicationId(null);
  };

  const createApplicationId = () =>
    `${Date.now()}-${Math.random().toString(16).slice(2)}`;

  const saveApplication = (data) => {
    const normalized = normalizeFormData(data);
    if (editingApplicationId) {
      setApplications((prev) =>
        prev.map((entry) =>
          entry.id === editingApplicationId
            ? {
                ...entry,
                data: normalized,
                updatedAt: new Date().toISOString(),
              }
            : entry,
        ),
      );
      return editingApplicationId;
    }

    const newId = createApplicationId();
    const newEntry = {
      id: newId,
      data: normalized,
      submittedAt: new Date().toISOString(),
    };
    setApplications((prev) => [...prev, newEntry]);
    return newId;
  };

  const removeApplication = (id) => {
    setApplications((prev) => prev.filter((entry) => entry.id !== id));
    if (selectedApplicationId === id) {
      setSelectedApplicationId(null);
    }
    if (editingApplicationId === id) {
      setEditingApplicationId(null);
    }
  };

  const selectApplication = (id) => {
    setSelectedApplicationId(id);
  };

  const startEditingApplication = (id) => {
    const target = applications.find((entry) => entry.id === id);
    if (!target) return;
    setFormData(normalizeFormData(target.data));
    setEditingApplicationId(id);
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
    applications,
    selectedApplicationId,
    editingApplicationId,
    saveApplication,
    removeApplication,
    selectApplication,
    startEditingApplication,
  };

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
};

export function useFormContext() {
  const context = useContext(FormContext);
  return context;
}

export default FormContextProvider;
