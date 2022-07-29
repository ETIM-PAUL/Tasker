import { MenuOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Space, Table, Tag } from "antd";
import { useTask } from "../context/context";
import { arrayMoveImmutable } from "array-move";
import React, { useEffect, useState, useRef } from "react";
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
} from "react-sortable-hoc";
import EditTask from "./editTask";

const DragHandle = SortableHandle(() => (
  <MenuOutlined
    style={{
      cursor: "grab",
      color: "black",
    }}
  />
));

const SortableItem = SortableElement((props) => <tr {...props} />);
const SortableBody = SortableContainer((props) => <tbody {...props} />);
const App = () => {
  const { state, dispatch } = useTask();
  const toggleModal = useRef(null);
  const [data, setData] = useState([]);
  const [task, setTask] = useState({});
  let formatedDate;
  let color, shade;

  //updates our data, at each
  useEffect(() => {
    setData(state.tasks);
  }, [state.tasks]);

  // deletes task from our state
  const deleteTask = (key) => {
    const deletingElement = data.findIndex((task) => task.key === key);
    state.tasks.splice(deletingElement, 1);
    dispatch({ type: "deleteTask", payload: state.tasks });
  };

  const columns = [
    {
      title: "Sort",
      dataIndex: "sort",
      width: 20,
      className: "drag-visible",
      render: () => <DragHandle />,
    },
    {
      title: "Title",
      dataIndex: "taskTitle",
      key: "taskTitle",
    },
    {
      title: "Start Time",
      key: "taskStartDate",
      render: (record) => (
        <span>{new Date(record.taskStartDate).toUTCString()}</span>
      ),
    },
    {
      title: "Deadline",
      key: "taskDeadline",
      render: (record) => (
        (function () {
          if (record.taskDeadline === "") {
            formatedDate = "no deadline";
          } else {
            formatedDate = new Date(record.taskDeadline).toUTCString();
          }
        })(),
        (<span>{formatedDate}</span>)
      ),
    },

    {
      title: "Status",
      key: "taskStatus",
      render: (record) => (
        (function () {
          if (record.taskStatus === "cancelled") {
            shade = "rgb(255 6 0)";
          }
          if (record.taskStatus === "on-going") {
            shade = "green";
          }
          if (record.taskStatus === "completed") {
            shade = "blue";
          }
          if (record.taskStatus === "pending") {
            shade = "yellow";
          }
        })(),
        (<Tag color={shade}>{record.taskStatus.toUpperCase()}</Tag>)
      ),
    },
    {
      title: "Degree of Importance",
      key: "taskType",
      render: (record) => (
        (function () {
          if (record.taskType === "extremely important") {
            color = "rgb(255 6 0)";
          }
          if (record.taskType === "very important") {
            color = "#ee5d66 ";
          }
          if (record.taskType === "important") {
            color = "rgb(237 132 129)";
          }
          if (record.taskType === "less important") {
            color = "yellow";
          }
        })(),
        (<Tag color={color}>{record.taskType.toUpperCase()}</Tag>)
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <Space size="middle" style={{ display: "grid" }}>
          <EditOutlined
            className="edit-icon"
            onClick={() => {
              // dispatch({ type: "setTaskToBeEdited", payload: record });
              toggleModal.current.modalVisible();
              setTask(record);
            }}
          />
          <DeleteOutlined
            className="delete-icon"
            onClick={() => deleteTask(record.key)}
          />
        </Space>
      ),
    },
  ];
  const onSortEnd = ({ oldIndex, newIndex }) => {
    if (oldIndex !== newIndex) {
      const newData = arrayMoveImmutable(
        data.slice(),
        oldIndex,
        newIndex
      ).filter((el) => !!el);
      dispatch({ type: "sortedTasks", payload: newData });
    }
  };

  const DraggableContainer = (props) => (
    <SortableBody
      useDragHandle
      disableAutoscroll
      helperClass="row-dragging"
      onSortEnd={onSortEnd}
      {...props}
    />
  );

  const DraggableBodyRow = ({ className, style, ...restProps }) => {
    // function findIndex base on Table rowKey props and should always be a right array index
    const index = data.findIndex((x) => x.index === restProps["data-row-key"]);
    return <SortableItem index={index} {...restProps} />;
  };

  return (
    <>
      <EditTask ref={toggleModal} task={task} />
      <Table
        dataSource={data}
        columns={columns}
        rowKey="index"
        components={{
          body: {
            wrapper: DraggableContainer,
            row: DraggableBodyRow,
          },
        }}
        expandable={{
          expandedRowRender: (record) => (
            <p
              style={{
                margin: 0,
              }}
            >
              {record.taskDesc}
            </p>
          ),
          rowExpandable: (record) => record.taskDesc,
        }}
        style={{ overflow: "auto" }}
      />
    </>
  );
};

export default App;
