import * as Yup from "yup";

const updateTeam = () => {
  let schema = Yup.object();
  schema = schema.shape({
    name: Yup.string().trim().required("Please enter team name"),
  });
  return schema;
};

export default updateTeam;
