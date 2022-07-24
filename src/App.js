import "./App.css";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import MainApp from "./components/main";
import "./styles/signin.css";
import "antd/dist/antd.css";
const App = () => {
  // const {
  //   register,
  //   handleSubmit,
  //   watch,
  //   formState: { errors },
  // } = useForm();

  // const [r, setR] = useState(false);
  // const [boo, setBoo] = useState();
  // const onSubmit = (data) => {
  //   alert(JSON.stringify(data));
  //   console.log(data.Name);
  // };

  // const sRe = (e) => {
  //   e.preventDefault();
  //   setBoo(e.target.value);
  //   if (e === "") {
  //     setR(false);
  //   } else if (e !== "") {
  //     setR(true);
  //   }
  //   console.log("value");
  // };
  return (
    <>
      <MainApp />
      {/* <div className="App">
        <header>Form Validation with React-Hook-Form</header>
        <form onSubmit={handleSubmit(onSubmit)}>
          {errors.Name && <span>*This field is required</span>}
          <br />
          <input
            value={boo}
            onChange={(e) => sRe(e.target.value)}
            placeholder="Full Name"
            {...register("Name", { required: true })}
            className="inputValue"
          />
          <br />
          {errors.Password && <span>*This field is required</span>}
          <br />
          <input
            placeholder="Password"
            type="password"
            {...register("Password", { required: r })}
            className="inputValue"
          />
          <br />
          <input type="submit" value={"Submit Data"} />
        </form>

        <p>Password is {boo}</p>
      </div> */}
    </>
  );
};

// class NameForm extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { value: "", boo: "", r: false, pass: "" };

//     this.handleChange = this.handleChange.bind(this);
//     this.handleChang = this.handleChang.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//     const {
//       register,
//       handleSubmit,
//       watch,
//       formState: { errors },
//     } = useForm();
//   }

//   handleChange(event) {
//     this.setState({ value: event.target.value });
//   }

//   handleChang(event) {
//     this.setState({ pass: event.target.value });
//   }

//   handleSubmit(event) {
//     alert(
//       "A name was submitted: " +
//         this.state.value +
//         "A pass was submitted: " +
//         this.state.pass
//     );
//     event.preventDefault();
//   }

//   render() {
//     return (
//       <form onSubmit={this.handleSubmit}>
//         <label>
//           Name:
//           <input
//             type="text"
//             value={this.state.value}
//             onChange={this.handleChange}
//           />
//         </label>
//         <label>
//           Password:
//           <input
//             type="password"
//             value={this.state.pass}
//             onChange={this.handleChang}
//             {...register("Password", { required: r })}
//             className="inputValue"
//           />
//         </label>
//         <input type="submit" value="Submit" />
//       </form>
//     );
//   }
// }

export default App;
