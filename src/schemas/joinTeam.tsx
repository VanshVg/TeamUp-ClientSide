import * as Yup from "yup";

const joinTeam = () => {
  let schema = Yup.object();
  schema = schema.shape({
    teamCode: Yup.string().trim().required("Please enter team code"),
  });
  return schema;
};

export default joinTeam;
