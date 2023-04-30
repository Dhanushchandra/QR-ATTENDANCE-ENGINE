import * as Yup from "yup";

export const signUpValidationSchema = Yup.object({
  username: Yup.string()
    .min(3, "Must be 3 characters or more")
    .max(25, "Must be 25 characters or less")
    .required("User name is required"),
  email: Yup.string().required("Email is required").email("Invalid email"),
  organization: Yup.string()
    .min(3, "Musy be 3 characters or more")
    .max(25, "Must be 25 characters or less")
    .required("Organization name is required"),
  password: Yup.string()
    .min(6, "Must be 6 characters or more")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

export const signInValidationSchema = Yup.object({
  email: Yup.string().required("Email is required").email("Invalid email"),
  password: Yup.string().required("Password is required"),
});

export const forgotPasswordValidationSchema = Yup.object({
  email: Yup.string().required("Email is required").email("Invalid email"),
});
