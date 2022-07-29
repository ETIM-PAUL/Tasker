import React from "react";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import { Select, SubmitButton } from "formik-antd";
import { useTask } from "../context/context";
import uniqid from "uniqid";

export const MyTextInput = ({ label, ...props }) => {
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
export const MyDescInput = ({ label, ...props }) => {
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

export const MySelect = ({ label, ...props }) => {
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

export const MyDateInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      {/* <DatePicker renderExtraFooter={() => "extra footer"} showTime /> */}
      <input
        {...field}
        {...props}
        type="datetime-local"
        className="date-input"
      />
      {meta.touched && meta.error ? (
        <div className="error error-date">{meta.error}</div>
      ) : null}
    </>
  );
};

export const FormContainer = ({ ...props }) => {
  const { dispatch, state } = useTask();
  let selectedTask;
  // console.log(state.tasks[task]);
  if (props.type === "edit") {
    const task = state?.tasks.findIndex(
      (task) => task.key === state.taskToBeEdited.key
    );
    if (task >= 0) {
      selectedTask = state.tasks[task];
      console.log(selectedTask.taskType);
    }
  }

  const MyCheckbox = ({ children, ...props }) => {
    const [field, meta] = useField({ ...props });
    return (
      <>
        <label className="checkbox">
          <input
            {...field}
            {...props}
            type="checkbox"
            // checked={selectedTask ? selectedTask.remainder : false}
          />
          {children}
        </label>
        {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null}
      </>
    );
  };
  return (
    <div>
      <Formik
        initialValues={{
          taskTitle: "",
          remainder: false, // added for our checkbox
          taskType: "", // added for our select
          taskDesc: "", // added for our text-area
          taskDeadline: "",
          taskStartDate: "",
          taskStatus: "pending",
          index: 0,
        }}
        onSubmit={(values, { setSubmitting }) => {
          // await new Promise((r) => setTimeout(r, 500));
          const valuesAppended = {
            ...values,
            key: uniqid("task-"),
          };
          setTimeout(() => {
            dispatch({ type: "addNewTask", payload: valuesAppended });
            setSubmitting();
          }, 1500);
        }}
        validationSchema={Yup.object({
          taskTitle: Yup.string()
            .max(35, "Must be not exceed 45 characters ")
            .min(10, "Must not be less than 10 characters")
            .required("Required"),
          taskDeadline: Yup.date().min(Date()),
          taskStartDate: Yup.date().min(Date()).required("Required"),
          taskType: Yup.mixed()
            .required("Required")
            .oneOf([
              "extremely important",
              "very important",
              "important",
              "less important",
            ]),
          remainder: Yup.boolean(),
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

          <label>Task Importance Level</label>
          <MySelect label="Task Type" name="taskType" className="select">
            <Select.Option value="extremely important">
              Extremely Important
            </Select.Option>
            <Select.Option value="very important">Very Important</Select.Option>
            <Select.Option value="important">Important</Select.Option>
            <Select.Option value="less important">Less Important</Select.Option>
          </MySelect>

          {props.type === "edit" && (
            <>
              <label>Task Status</label>
              <MySelect label="Task Type" name="taskStatus" className="select">
                <Select.Option value="pending">Pending</Select.Option>
                <Select.Option value="on-going">On-going</Select.Option>
                <Select.Option value="completed">Completed</Select.Option>
                <Select.Option value="cancelled">Cancelled</Select.Option>
              </MySelect>
            </>
          )}

          <MyDescInput
            label="Task Description (optional)"
            name="taskDesc"
            type="text"
            placeholder="Give a brief description of the task."
          />
          <div className="date-flex">
            <label className="date-label-first">Task Starting Date</label>
            <label className="date-label">Task Deadline(optional)</label>
          </div>
          <div className="date-inline-flex">
            <div className="date-input">
              <MyDateInput
                name="taskStartDate"
                // onChange={(value) => value._d}
              />
            </div>
            <div className="date-input">
              <MyDateInput
                name="taskDeadline"
                // onChange={(value) => value._d}
              />
            </div>
          </div>

          <MyCheckbox name="remainder">
            Remind me, few minutes before both starting and deadline time
          </MyCheckbox>
          <SubmitButton type="submit" className="add-task-button">
            {props.type === "edit" ? (
              <span className="addButton">Edit Task</span>
            ) : (
              <span className="addButton">Add Task </span>
            )}
          </SubmitButton>
        </Form>
      </Formik>
    </div>
  );
};
