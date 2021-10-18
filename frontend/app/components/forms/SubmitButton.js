import React from "react";
import { useFormikContext } from "formik";

import Button from "../Button";

function SubmitButton({ title, ...other }) {
  const { handleSubmit } = useFormikContext();

  return <Button title={title} onPress={handleSubmit} {...other} />;
}

export default SubmitButton;
