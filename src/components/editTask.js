import React, { forwardRef, useState, useImperativeHandle } from "react";
import { useTask } from "../context/context";
import { Modal } from "antd";
import { FormContainer } from "./FormComponent/formComponent";

const EditTask = forwardRef((props, ref) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { dispatch } = useTask();

  useImperativeHandle(ref, () => ({
    //Function to toggle the visibility of the Edit Task Form
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
        onCancel={() => {
          setModalVisible(false);
          dispatch({
            type: "resetTaskToBeEdited",
            payload: {},
          });
        }}
      >
        <FormContainer
          type="edit"
          setModalVisible={setModalVisible}
          modalVisible={modalVisible}
        />
      </Modal>
    </div>
  );
});

export default EditTask;
