import React, { useContext, useState, useRef, useMemo, useEffect } from "react";
import { FormikForm } from "./addTask.js";
import Texty from "rc-texty";
import { TaskProvider } from "../context/context";
import "rc-texty/assets/index.css";
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
import TaskComponent from "./taskComponent";
const MainApp = () => {
  const toggleForm = useRef(null);
  const [buttonText, setButtonText] = useState(true);
  // const {} = useContext
  // useEffect(() => {
  //   console.log(tasks);
  // }, [tasks]);

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
            <TaskComponent />
          </section>
        </TaskProvider>
      </section>
    </>
  );
};

export default MainApp;
