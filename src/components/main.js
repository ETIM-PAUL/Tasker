import React, { useState, useRef } from "react";
import { FormikForm } from "./addTask.js";
import Texty from "rc-texty";
import { TaskProvider, useTask } from "../context/context";
import "rc-texty/assets/index.css";
import { Button, Alert } from "antd";
import TaskComponent from "./taskComponent";
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
          <div>kskks</div>
        </div>
      </header>
      {showInfo && (
        <Alert message="Info Text" type="info" closeText="Close Now"></Alert>
      )}

      <br />
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
