import React, { forwardRef, useState, useImperativeHandle } from "react";
import { FormContainer } from "./FormComponent/formComponent";

export const FormikForm = forwardRef((props, ref) => {
  const [toggle, setToggle] = useState(false);
  useImperativeHandle(ref, () => ({
    //Function to toggle the visibility of the Add Task Form
    flipForm() {
      setToggle(!toggle);
    },
  }));

  return (
    <div>
      {toggle && (
        <FormContainer type="add" setToggle={setToggle} toggle={toggle} />
      )}
    </div>
  );
});
