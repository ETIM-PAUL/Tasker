import React, { forwardRef, useState, useImperativeHandle } from "react";
import { Formik, Form, ErrorMessage, useFormik, useField } from "formik";
import * as Yup from "yup";
import { Space, DatePicker } from "antd";
import { Select } from "formik-antd";

const MyTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};
const MyDescInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <textarea className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

const MySelect = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <Select {...field} {...props} />
      {meta.touched && meta.error ? (
        <div class="error">{meta.error}</div>
      ) : null}
    </>
  );
};

const MyCheckbox = ({ children, ...props }) => {
  const [field, meta] = useField({ ...props, type: "checkbox" });
  return (
    <>
      <label className="checkbox">
        <input {...field} {...props} type="checkbox" />
        {children}
      </label>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};
export const FormikForm = forwardRef((props, ref) => {
  const [toggle, setToggle] = useState(false);
  const [type, setType] = useState("time");
  // const PickerWithType = ({ type, onChange }) => {
  //   if (type === "time") return <TimePicker onChange={onChange} />;
  //   if (type === "date") return <DatePicker onChange={onChange} />;
  //   return <DatePicker picker={type} onChange={onChange} />;
  // };

  const MyDateInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
      <>
        {/* <DatePicker renderExtraFooter={() => "extra footer"} showTime /> */}
        <input {...field} {...props} type="datetime-local" />
        {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null}
      </>
    );
  };

  useImperativeHandle(ref, () => ({
    flipForm() {
      setToggle(!toggle);
    },
  }));

  return (
    <div>
      {toggle && (
        <div>
          <Formik
            initialValues={{
              taskTitle: "",
              remainder: true, // added for our checkbox
              taskType: "", // added for our select
              taskDesc: "", // added for our text-area
              taskDeadline: "", // added for our date
            }}
            onSubmit={async (values, { setSubmitting }) => {
              await new Promise((r) => setTimeout(r, 500));
              console.log(values);
              setSubmitting(false);
            }}
            validationSchema={Yup.object({
              taskTitle: Yup.string()
                .max(35, "Must be not exceed 45 characters ")
                .min(10, "Must not be less than 10 characters")
                .required("Required"),
              taskDeadline: Yup.date().min(Date()).required("Required"),
              deadlineFormat: Yup.string(),
              taskType: Yup.mixed()
                .required("Required")
                .oneOf([
                  "extremely important",
                  "very important",
                  "important",
                  "average",
                  "less important",
                ]),
              remainder: Yup.boolean().oneOf([true], "Field must be checked"),
              taskDesc: Yup.string()
                .min(15, "Must be at least 15 characters")
                .notRequired(),
            })}
          >
            <Form>
              <MyTextInput
                label="Task Title"
                name="taskTitle"
                type="text"
                placeholder="Title of Task"
              />
              {/* <MyDateInput
                label="Task Deadline"
                name="deadlineDate"
                type="date"
                placeholder="Select Task Deadline"
              /> */}

              <label>Task Importance Level</label>
              <MySelect label="Task Type" name="taskType" className="select">
                <Select.Option value="extremely important">
                  Extremely Important
                </Select.Option>
                <Select.Option value="very important">
                  Very Important
                </Select.Option>
                <Select.Option value="important">Important</Select.Option>
                <Select.Option value="avarage">Average</Select.Option>
                <Select.Option value="less important">
                  Less Important
                </Select.Option>
              </MySelect>

              <MyDescInput
                label="Task Description (optional)"
                name="taskDesc"
                type="text"
                placeholder="Give a brief description of the task."
              />

              <label>Task Deadline</label>

              <MyDateInput
                name="taskDeadline"
                // onChange={(value) => value._d}
              />

              <MyCheckbox name="remainder">
                Add Reminder, when the Task Deadline approaches
              </MyCheckbox>
              <button type="submit">
                <span className="addButton">Add Task</span>
              </button>
            </Form>
          </Formik>
        </div>
      )}
    </div>
  );
});
