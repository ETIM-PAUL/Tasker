import React from "react";
import { useField } from "formik";
import { Select } from "formik-antd";

export const MyTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className="text-input" {...field} {...props} />
      {(meta.touched && meta.error) || (meta.error && meta.value === "") ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};
export const MyDescInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <textarea className="text-input" {...field} {...props} />
      {(meta.touched && meta.error) || (meta.error && meta.value === "") ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

export const MySelect = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <Select {...field} {...props} />
      {(meta.touched && meta.error) || (meta.error && meta.value === "") ? (
        <div class="error">{meta.error}</div>
      ) : null}
    </>
  );
};

export const MyDateInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <input
        {...field}
        {...props}
        type="datetime-local"
        className="date-input"
      />
      {(meta.touched && meta.error) || (meta.error && meta.value === "") ? (
        <>
          <div className="error error-date">{meta.error}</div>
        </>
      ) : null}
    </>
  );
};
export const MyCheckbox = ({ children, ...props }) => {
  const [field, meta] = useField({ ...props });
  return (
    <>
      <label className="checkbox">
        <input {...field} {...props} />
        {children}
      </label>
      {(meta.touched && meta.error) || (meta.error && meta.value === "") ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};
