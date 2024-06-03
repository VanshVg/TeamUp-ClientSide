import * as Yup from "yup";

const updateProfile = () => {
  let schema = Yup.object();
  schema = schema.shape({
    first_name: Yup.string().trim().required("Please enter Firstname"),
    last_name: Yup.string().trim().required("Please enter Lastname"),
    username: Yup.string().trim().required("Please enter Username"),
    email: Yup.string()
      .trim()
      .required("Please enter email address")
      .email("Please enter valid email address"),
  });
  return schema;
};

export default updateProfile;
