import React, { useState, useRef } from "react";
import { FormikForm } from "./addTask.js";
import { TaskProvider } from "../context/context";
import { Button, Alert } from "antd";
import TaskComponent from "./Table/tasksTableDisplay";
import { UserOutlined } from "@ant-design/icons";
const MainApp = () => {
  const toggleForm = useRef(null);
  const [buttonText, setButtonText] = useState(true);
  const [showInfo, setShowInfo] = useState(false);

  return (
    <>
      <header>
        <div class="header-nav">
          <div>
            <span class="header-text">Tasky</span>
          </div>
          <div>
            <UserOutlined />
          </div>
        </div>
      </header>
      {showInfo && (
        <Alert message="Info Text" type="info" closeText="Close Now"></Alert>
      )}

      <section>
        <div className="toggleForm">
          <Button
            size="large"
            className="toggleFormButton"
            shape="round"
            onClick={() => {
              toggleForm.current.flipForm();
              setButtonText(!buttonText);
            }}
          >
            {buttonText ? <span>Add New Task</span> : <span>Close Form</span>}
          </Button>
        </div>
        <TaskProvider>
          <div className="formik">
            <div>
              <FormikForm ref={toggleForm} />
            </div>
          </div>
          <section className="task">
            <TaskComponent showInfo={showInfo} setShowInfo={setShowInfo} />
          </section>
        </TaskProvider>
      </section>
    </>
  );
};

export default MainApp;
