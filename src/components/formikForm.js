import React, { forwardRef, useState, useImperativeHandle } from "react";
import { Formik, Form, ErrorMessage, useFormik, useField } from "formik";
import * as Yup from "yup";

import {
  Button,
  Cascader,
  DatePicker,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
  TreeSelect,
  Row,
  Col,
} from "antd";
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
const MyDateInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className="date-input" {...field} {...props} />
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
      <div htmlFor={props.id || props.name}>{label}</div>
      <div {...field} {...props} />
      {meta.touched && meta.error ? (
        <div class="error-message">{meta.error}</div>
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
  const [toggleForm, setToggleForm] = useState(false);

  useImperativeHandle(ref, () => ({
    flipForm() {
      setToggleForm(!toggleForm);
    },
  }));

  return (
    <div>
      {toggleForm && (
        <div>
          <Formik
            initialValues={{
              taskTitle: "",
              remainder: true, // added for our checkbox
              taskType: "", // added for our select
              taskDesc: "", // added for our text-area
            }}
            validationSchema={Yup.object({
              taskTitle: Yup.string()
                .max(35, "Must be not exceed 45 characters ")
                .min(10, "Must not be less than 10 characters")
                .required("Required"),
              deadlineDate: Yup.date().min(Date()).required("Required"),
              remainder: Yup.boolean().required("Required"),
              taskType: Yup.string()
                .oneOf(
                  [
                    "extremly importnat",
                    "very important",
                    "important",
                    "average",
                    "less important",
                  ],
                  "Invalid Task Type"
                )
                .required("Required"),
              taskDesc: Yup.string()
                .min(25, "Must be at least 15 characters")
                .notRequired(),
            })}
            onSubmit={async (values, { setSubmitting }) => {
              await new Promise((r) => setTimeout(r, 500));
              console.log(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }}
          >
            <Form>
              <MyTextInput
                label="Task Title"
                name="taskTitle"
                type="text"
                placeholder="Title of Task"
              />

              <MyDateInput
                label="Task Deadline"
                name="deadlineDate"
                type="date"
                placeholder="Select Task Deadline"
              />

              <label>Task Level</label>
              <Select
                placeholder="select your task importance level"
                className="select"
                name="taskType"
              >
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
              </Select>

              <MyDescInput
                label="Task Description (optional)"
                name="taskDesc"
                type="text"
                placeholder="Give a brief description of the task."
              />
              <MyCheckbox name="remainder">
                Do you want to add Reminder, when the Task Deadline approaches
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
