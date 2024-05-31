import * as Yup from "yup";

const createTeam = () => {
  let schema = Yup.object();
  schema = schema.shape({
    teamName: Yup.string().trim().required("Please enter team name"),
  });
  return schema;
};

export default createTeam;
