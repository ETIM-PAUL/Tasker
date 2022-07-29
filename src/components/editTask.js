import React, { forwardRef, useState, useImperativeHandle } from "react";
import { useTask } from "../context/context";
import { Formik, Form, useField } from "formik";
import { Modal } from "antd";
import { Select, SubmitButton } from "formik-antd";
import * as Yup from "yup";
import { FormContainer } from "./formComponent";
import {
  MyTextInput,
  MyDescInput,
  MySelect,
  MyDateInput,
} from "./formComponent";
const EditTask = forwardRef((props, ref) => {
  const [modalVisible, setModalVisible] = useState(false);
  // console.log(props.task);
  const { state, dispatch } = useTask();

  const { task } = props;
  const MyCheckbox = ({ children, ...props }) => {
    const [field, meta] = useField({ ...props });
    return (
      <>
        <label className="checkbox">
          <input
            {...field}
            {...props}
            type="checkbox"
            checked={task.remainder}
          />
          {children}
        </label>
        {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null}
      </>
    );
  };
  useImperativeHandle(ref, () => ({
    modalVisible() {
      setModalVisible(!modalVisible);
    },
  }));
  return (
    <div>
      <Modal
        title="Update Task"
        centered
        visible={modalVisible}
        okButtonProps={{
          disabled: true,
        }}
        // onOk={() => setModalVisible(false), dispatch({

        // })}
        onCancel={() => {
          setModalVisible(false);
          // dispatch({
          //   type: "resetTaskToBeEdited",
          //   payload: taskToBeEdited,
          // });
        }}
      >
        {/* <FormContainer
          type="edit"
          setModalVisible={setModalVisible}
          modalVisible={modalVisible}
        /> */}
        <div>
          <Formik
            enableReinitialize
            initialValues={{
              taskTitle: task.taskTitle,
              remainder: task.remainder, // added for our checkbox
              taskType: task.taskType, // added for our select
              taskDesc: task.taskDesc, // added for our text-area
              taskDeadline: task.taskDeadline,
              taskStartDate: task.taskStartDate,
              taskStatus: task.Status,
              key: task.key,
              index: task.index,
            }}
            onSubmit={(values, { setSubmitting }) => {
              // await new Promise((r) => setTimeout(r, 500));

              setTimeout(() => {
                dispatch({ type: "editTask", payload: values });
                setSubmitting();
                props.setModalVisible(!props.modalVisible);
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
                <Select.Option value="very important">
                  Very Important
                </Select.Option>
                <Select.Option value="important">Important</Select.Option>
                <Select.Option value="less important">
                  Less Important
                </Select.Option>
              </MySelect>

              {props.type === "edit" && (
                <>
                  <label>Task Status</label>
                  <MySelect
                    label="Task Type"
                    name="taskStatus"
                    className="select"
                  >
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
                <span className="addButton">Edit Task</span>
              </SubmitButton>
            </Form>
          </Formik>
        </div>
      </Modal>
    </div>
  );
});

export default EditTask;
