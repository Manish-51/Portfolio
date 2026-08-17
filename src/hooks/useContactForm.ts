import { useState } from "react";
import type { ContactFormValues } from "../types";

type Errors = Partial<Record<keyof ContactFormValues, string>>;

const initialValues: ContactFormValues = {
  name: "",
  email: "",
  mobile: "",
  subject: "",
  message: "",
};

// 1. Get a free access key at https://web3forms.com (enter your email,
//    they send you the key instantly — no account/login required).
// 2. Paste it below. Messages submitted through this form will be
//    emailed directly to the address you registered with Web3Forms.
const WEB3FORMS_ACCESS_KEY = "cc850962-ca01-4925-947c-75c9618e8b85";
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

function validate(values: ContactFormValues): Errors {
  const errors: Errors = {};
  if (!values.name.trim()) errors.name = "Please share your name.";
  if (!values.email.trim()) {
    errors.email = "An email address is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "That email doesn't look quite right.";
  }
  if (!values.mobile.trim()) {
    errors.mobile = "A mobile number is required.";
  } else if (!/^\+?[0-9]{7,15}$/.test(values.mobile.trim())) {
    errors.mobile = "Enter a valid mobile number.";
  }
  if (!values.subject.trim()) errors.subject = "Give it a short subject.";
  if (!values.message.trim()) {
    errors.message = "Don't forget your message.";
  } else if (values.message.trim().length < 10) {
    errors.message = "A few more details would help (10+ characters).";
  }
  return errors;
}

export type SubmitStatus = "idle" | "submitting" | "success" | "error";

export function useContactForm() {
  const [values, setValues] = useState<ContactFormValues>(initialValues);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (field: keyof ContactFormValues, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    if (errorMessage) {
      setErrorMessage(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setStatus("submitting");
    setErrorMessage(null);

    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name: values.name,
          email: values.email,
          phone: values.mobile,
          subject: values.subject,
          message: values.message,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setStatus("success");
        setValues(initialValues);
      } else {
        setStatus("error");
        setErrorMessage(result.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    }
  };

  const reset = () => {
    setStatus("idle");
    setValues(initialValues);
    setErrors({});
    setErrorMessage(null);
  };

  return {
    values,
    errors,
    status,
    errorMessage,
    handleChange,
    handleSubmit,
    reset,
  };
}