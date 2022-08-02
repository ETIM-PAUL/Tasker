import { MenuOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Space, Table, Tag, message } from "antd";
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
const App = ({ ...props }) => {
  const { state, dispatch } = useTask();
  const toggleModal = useRef(null);
  const countDownRef = useRef(null);
  const [data, setData] = useState([]);
  const [task, setTask] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  let formatedDate;
  let color, shade;

  //updates our data, at each
  useEffect(() => {
    setData(state.tasks);
    const record = state.tasks.find(
      (record) => record.count === "started" && record.taskStatus === "pending"
    );
    if (record) {
      setShowAlert(true);
      let startTime = new Date(record.taskStartDate).getTime();
      let endTime = new Date(record.taskDeadline).getTime();
      let x = setInterval(function () {
        // Get today's date and time
        let now = new Date().getTime();

        // Find the distance between now and the count down date
        let distance = startTime - now;

        // Time calculations for days, hours, minutes and seconds
        let days = Math.floor(distance / (1000 * 60 * 60 * 24));
        let hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);

        countDownRef.current =
          days + "d " + hours + "h " + minutes + "m " + seconds + "s ";

        let countDownTimer = days + hours + minutes + seconds;
        // If the count down is finished, write some text
        if (countDownTimer === 0) {
          clearInterval(x, setShowAlert(false));
          message.success(`time to begin "${record.taskTitle} " `, 5);
          dispatch({
            type: "endCountDown",
            payload: record.key,
          });
        }
        if (countDownTimer === 30) {
          message.info(`30s left to begin "${record.taskTitle}" `, 5);
        }
        if (record.taskStatus === "cancelled") {
          message.info(`"${record.taskTitle}" has been cancelled `, 5);
          clearInterval(x);
        }
        return countDownTimer;
      }, 1000);
    }
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
        <>
          <span style={{ fontSize: "12px" }}>
            {new Date(record.taskStartDate).toString()}
          </span>
          {record.count === "finished" && record.taskStatus === "pending" && (
            <p style={{ fontSize: "8px", color: "red" }}>
              You should have started this task, please kindly update your task
              status
            </p>
          )}
        </>
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
            formatedDate = new Date(record.taskDeadline).toString();
          }
        })(),
        (
          <>
            <span style={{ fontSize: "12px" }}>{formatedDate}</span>

            {new Date(record.taskDeadline) < Date.now() && (
              <p style={{ fontSize: "8px", color: "red" }}>
                This task has expired
              </p>
            )}
          </>
        )
      ),
    },

    {
      title: "Status",
      filters: [
        {
          text: "Pending",
          value: "Pending",
        },
        {
          text: "On-going",
          value: "On-going",
        },
        {
          text: "Completed",
          value: "Completed",
        },
        {
          text: "Cancelled",
          value: "Cancelled",
        },
      ],
      onFilter: (value, record) =>
        record.taskStatus.includes(value.toLowerCase()),
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
      filters: [
        {
          text: "Extremely Important",
          value: "extremely Important",
        },
        {
          text: "Very Important",
          value: "very Important",
        },
        {
          text: "Important",
          value: "important",
        },
        {
          text: "Less Important",
          value: "less Important",
        },
      ],
      onFilter: (value, record) =>
        record.taskType.includes(value.toLowerCase()),
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <Space size="middle" style={{ display: "block" }}>
          {record.taskStatus !== "cancelled" && (
            <EditOutlined
              className="edit-icon"
              onClick={() => {
                dispatch({ type: "setTaskToBeEdited", payload: record });
                toggleModal.current.modalVisible();
                setTask(record);
              }}
            />
          )}
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
        rowKey={(record) => record.index}
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
          rowExpandable: (record) => record.taskDesc !== "",
        }}
        style={{ overflow: "auto" }}
      />
    </>
  );
};

export default App;
