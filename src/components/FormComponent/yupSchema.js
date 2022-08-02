import * as Yup from "yup";

export const yupValidation = Yup.object().shape({
  taskTitle: Yup.string()
    .max(35, "Must be not exceed 45 characters ")
    .min(10, "Must not be less than 10 characters")
    .required("Required")
    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
  taskStartDate: Yup.date().min(new Date()).required("Required"),
  taskDeadline: Yup.date().when(
    "taskStartDate",
    (taskStartDate, Yup) =>
      taskStartDate &&
      Yup.min(taskStartDate, `Deadline has to be after ${taskStartDate}`).when(
        "remainder",
        (remainder, schema) =>
          remainder
            ? schema.required("required when remainder is checked")
            : schema
      )
  ),
  taskType: Yup.mixed()
    .required("Required")
    .oneOf([
      "extremely important",
      "very important",
      "important",
      "less important",
    ]),
  remainder: Yup.boolean(),
  taskStatus: Yup.mixed().notRequired(),
  taskDesc: Yup.string()
    .min(15, "Must be at least 15 characters")
    .max(50, "Must not be more than 50 characters")
    .notRequired(),
});
