import React from "react";
import { Formik, Form } from "formik";
import { Select, SubmitButton } from "formik-antd";
import { useTask } from "../../context/context.js";
import uniqid from "uniqid";
import {
  MyTextInput,
  MyDescInput,
  MySelect,
  MyDateInput,
  MyCheckbox,
} from "./formField";
import { yupValidation } from "./yupSchema.js";

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
          taskType: props.type === "edit" ? taskType : "important", // added for our select
          taskDesc: props.type === "edit" ? taskDesc : "", // added for our text-area
          taskDeadline: props.type === "edit" ? taskDeadline : "",
          taskStartDate: props.type === "edit" ? taskStartDate : "",
          taskStatus: props.type === "edit" ? taskStatus : "pending",
          key: props.type === "edit" ? key : "",
          index: props.type === "edit" ? index : 0,
        }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
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
        validationSchema={yupValidation}
      >
        <Form>
          {new Date(taskDeadline) < Date.now() && props.type === "edit" && (
            <p style={{ fontSize: "10px", color: "red" }}>
              Your task has expired, so you can only change the status
            </p>
          )}
          <MyTextInput
            label="Task Title"
            name="taskTitle"
            type="text"
            placeholder="Title of Task"
            disabled={new Date(taskDeadline) < Date.now() ? true : false}
          />

          {/* Task Importance Selection */}
          <label>Task Importance Level</label>
          <MySelect
            label="Task Type"
            name="taskType"
            className="select"
            disabled={new Date(taskDeadline) < Date.now() ? true : false}
          >
            <Select.Option value="extremely important">
              Extremely Important
            </Select.Option>
            <Select.Option value="very important">Very Important</Select.Option>
            <Select.Option value="important">Important</Select.Option>
            <Select.Option value="less important">Less Important</Select.Option>
          </MySelect>

          {/* Task Status Selection, which only shows, when you are editing a task*/}
          {props.type === "edit" && new Date(taskStartDate) < Date.now() && (
            <>
              <label>Task Status</label>
              <MySelect label="Task Type" name="taskStatus" className="select">
                {new Date(taskDeadline) > Date.now() || taskDeadline === "" ? (
                  <Select.Option value="on-going">On-going</Select.Option>
                ) : null}
                <Select.Option value="completed">Completed</Select.Option>
                <Select.Option value="cancelled">Cancelled</Select.Option>
              </MySelect>
            </>
          )}

          {/* Task Description Input */}
          <MyDescInput
            label="Task Description (optional)"
            name="taskDesc"
            type="text"
            placeholder="Give a brief description of the task."
            disabled={new Date(taskDeadline) < Date.now() ? true : false}
          />

          {/* Starting Date Input */}
          <div className="date-flex">
            <div className="date-block">
              <label className="date-label-first">Task Starting Date</label>
              <div className="date-input">
                <MyDateInput
                  name="taskStartDate"
                  disabled={
                    new Date(taskStartDate) > Date.now() || props.type === "add"
                      ? false
                      : true
                  }
                />
              </div>
            </div>

            {/* Deadline Date Input */}
            <div className="date-block">
              <label className="date-label">Task Deadline</label>
              <div className="date-input">
                <MyDateInput
                  name="taskDeadline"
                  disabled={
                    (new Date(taskDeadline) > Date.now() &&
                      props.type === "edit") ||
                    taskDeadline === "" ||
                    props.type === "add"
                      ? false
                      : true
                  }
                />
              </div>
            </div>
          </div>

          {/* Add Reminder for starting and deadline Input */}
          <MyCheckbox
            name="remainder"
            type="checkbox"
            disabled={
              new Date(taskStartDate) < Date.now() &&
              new Date(taskDeadline) < Date.now()
                ? true
                : false
            }
          >
            Add a remainder for both starting and deadline time
          </MyCheckbox>

          {/* Submit Form */}
          <SubmitButton type="submit" className="add-task-button">
            {props.type === "edit" ? (
              <span className="addButton" onClick={() => console.log(props)}>
                Edit Task
              </span>
            ) : (
              <span className="addButton">Add Task </span>
            )}
          </SubmitButton>
        </Form>
      </Formik>
    </div>
  );
};
