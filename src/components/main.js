import React, { useEffect, useState, useRef } from "react";
import { FormikForm } from "./formikForm";
import Texty from "rc-texty";
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
const MainApp = () => {
  const toggleForm = useRef(null);
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
        {/* <div className="texty-demo add-task-form" style={{ marginTop: 64 }}>
          <h1>
            <Texty ref={tween}>Add Task</Texty>
          </h1>
        </div> */}
        <div className="toggleForm">
          <Button
            size="large"
            className="toggleFormButton"
            shape="round"
            onClick={() => {
              toggleForm.current.flipForm();
            }}
          >
            Add New Task
          </Button>
        </div>
        <div className="formik">
          <div>
            <FormikForm ref={toggleForm} />
          </div>
        </div>
      </section>
    </>
  );
};

export default MainApp;
