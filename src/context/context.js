import { useContext, useReducer, createContext } from "react";

const TaskerContext = createContext();

function taskReducer(state, { type, payload }) {
  switch (type) {
    case "addNewTask": {
      let count;

      if (payload.remainder === true) {
        count = "started";
      }
      if (payload.remainder === false) {
        count = "not required";
      }
      const lastElement = state.tasks[state.tasks.length - 1];
      if (lastElement !== undefined) {
        payload.index = lastElement.index + 1;
      } else {
        payload.index = 0;
      }

      return {
        tasks: [...state.tasks, { ...payload, count }],
        taskToBeEdited: {},
      };
    }
    case "editTask": {
      let count;
      if (payload.remainder === true) {
        count = "started";
      }
      if (payload.remainder === false) {
        count = null;
      }
      const taskIndex = state.tasks.findIndex(
        (task) => task.key === state.taskToBeEdited.key
      );
      state.tasks[taskIndex] = {
        remainder: payload.remainder,
        taskDeadline: payload.taskDeadline,
        taskDesc: payload.taskDesc,
        taskStartDate: payload?.taskStartDate,
        taskStatus: payload.taskStatus,
        taskType: payload.taskType,
        taskTitle: payload.taskTitle,
        index: payload.index,
        key: payload.key,
        count: count,
      };

      return {
        tasks: [...state.tasks],
        taskToBeEdited: {},
      };
    }
    case "deleteTask": {
      return {
        tasks: [...state.tasks],
        taskToBeEdited: {},
      };
    }
    case "sortedTasks": {
      return {
        tasks: payload,
        taskToBeEdited: {},
      };
    }
    case "setTaskToBeEdited": {
      return {
        taskToBeEdited: payload,
        tasks: [...state.tasks],
      };
    }
    case "resetTaskToBeEdited": {
      return {
        taskToBeEdited: payload,
        tasks: [...state.tasks],
      };
    }
    case "endCountDown":
      const taskIndex = state.tasks.findIndex((task) => task.key === payload);
      state.tasks[taskIndex].count = "finished";

      return {
        taskToBeEdited: {},
        tasks: [...state.tasks],
      };
    default: {
      throw new Error(`Unhandled action type: ${type}`);
    }
  }
}
const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, {
    tasks: [],
    taskToBeEdited: {},
  });

  const value = { state, dispatch };
  return (
    <TaskerContext.Provider value={value}>{children}</TaskerContext.Provider>
  );
};

function useTask() {
  const context = useContext(TaskerContext);
  if (context === undefined) {
    throw new Error("useTask must be used within a TaskProvider");
  }
  return context;
}

export { TaskProvider, useTask };
