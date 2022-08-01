import React, { forwardRef, useState, useImperativeHandle } from "react";
import { FormContainer } from "./formComponent";

export const FormikForm = forwardRef((props, ref) => {
  const [toggle, setToggle] = useState(false);
  //  useEffect(() => {
  //    console.log(tasks)
  //  }, [tasks])

  // const [type, setType] = useState("time");
  // const PickerWithType = ({ type, onChange }) => {
  //   if (type === "time") return <TimePicker onChange={onChange} />;
  //   if (type === "date") return <DatePicker onChange={onChange} />;
  //   return <DatePicker picker={type} onChange={onChange} />;
  // };

  useImperativeHandle(ref, () => ({
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
