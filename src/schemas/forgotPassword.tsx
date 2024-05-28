import * as Yup from "yup";

const forgotPassword = () => {
  let schema = Yup.object();
  schema = schema.shape({
    username: Yup.string()
      .trim()
      .required("Please enter Username or Email address"),
  });
  return schema;
};

export default forgotPassword;
