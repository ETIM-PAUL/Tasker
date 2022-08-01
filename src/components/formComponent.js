import React from "react";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import { Select, SubmitButton } from "formik-antd";
import { useTask } from "../context/context";
import uniqid from "uniqid";

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

const MyDateInput = ({ label, ...props }) => {
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
const MyCheckbox = ({ children, ...props }) => {
  const [field, meta] = useField({ ...props });
  return (
    <>
      <label className="checkbox">
        <input {...field} {...props} />
        {children}
      </label>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

export const FormContainer = ({ ...props }) => {
  const { dispatch, state } = useTask();

  const {
    taskTitle,
    remainder,
    taskType,
    taskDesc,
    taskDeadline,
    taskStartDate,
    taskStatus,
    key,
    index,
  } = state.taskToBeEdited;
  return (
    <div>
      <Formik
        enableReinitialize
        initialValues={{
          taskTitle: props.type === "edit" ? taskTitle : "",
          remainder: props.type === "edit" ? remainder : false, // added for our checkbox
          taskType: props.type === "edit" ? taskType : "", // added for our select
          taskDesc: props.type === "edit" ? taskDesc : "", // added for our text-area
          taskDeadline: props.type === "edit" ? taskDeadline : "",
          taskStartDate: props.type === "edit" ? taskStartDate : new Date(),
          taskStatus: props.type === "edit" ? taskStatus : "pending",
          key: props.type === "edit" ? key : "",
          index: props.type === "edit" ? index : 0,
        }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          // await new Promise((r) => setTimeout(r, 500));
          if (props.type === "add") {
            const valuesAppended = {
              ...values,
              key: uniqid("task-"),
            };
            setTimeout(() => {
              dispatch({ type: "addNewTask", payload: valuesAppended });
              setSubmitting();
              resetForm();
            }, 1500);
          } else {
            setTimeout(() => {
              dispatch({ type: "editTask", payload: values });
              props.setModalVisible(!props.modalVisible);
              setSubmitting();
            }, 1500);
          }
        }}
        validationSchema={Yup.object({
          taskTitle: Yup.string()
            .max(35, "Must be not exceed 45 characters ")
            .min(10, "Must not be less than 10 characters")
            .required("Required"),
          taskStartDate: Object.values(state.taskToBeEdited).includes("started")
            ? Yup.date().min(new Date()).required("Required")
            : Yup.date(),
          taskDeadline: Yup.date().when(
            "taskStartDate",
            (taskStartDate, Yup) =>
              taskStartDate &&
              Yup.min(
                taskStartDate,
                `Deadline has to be after starting time, which if not set, is present time ${new Date()}`
              )
          ),
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
            .max(50, "Must not be more than 50 characters")
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
            {(Object.values(state.taskToBeEdited).includes("started") &&
              props.type === "edit") ||
            props.type === "add" ? (
              <label className="date-label-first">Task Starting Date</label>
            ) : null}
            <label className="date-label">Task Deadline(optional)</label>
          </div>

          <div className="date-inline-flex">
            {(Object.values(state.taskToBeEdited).includes("started") &&
              props.type === "edit") ||
            props.type === "add" ? (
              <div className="date-input">
                <MyDateInput name="taskStartDate" />
              </div>
            ) : null}

            <div className="date-input">
              <MyDateInput name="taskDeadline" />
            </div>
          </div>

          <MyCheckbox name="remainder" type="checkbox">
            Add a count-down timer for both starting and deadline time
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
