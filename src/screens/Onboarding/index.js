import React, { useContext } from "react";
import UserContext from "../../config/userContext";

import { NoHeaderLayout } from "../../layouts";

const Onboarding = (props) => {
  const userContext = useContext(UserContext);

  const { newUser } = userContext;

  const [values, setValues] = React.useState({
    name: "",
    spreadsheetId: "",
    jsonFile: "",
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  return <NoHeaderLayout>
    <div>TESTt</div>
  </NoHeaderLayout>;
};

export default Onboarding;
