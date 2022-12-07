import React from "react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function Register() {
  let history = useNavigate();
  const [newobject, setnewobject] = useState({
    name: "",
    email: "",
    password: "",
  });

  // console.log(newobject)

  function handlechange(e) {
    // console.log(e.target.value);
    // console.log(e.target.name);
    setnewobject({ ...newobject, [e.target.name]: e.target.value });
    // console.log(newobject)
  }

  async function handlesubmit(e) {
    e.preventDefault();
    //console.log(newobject)
    let f = false;

    for (let field in newobject) {
      if (!newobject[field]) {
        alert("plese fill all fields");
        f = true;
        break;
      }
    }
    if (f) {
      return;
    }

    let password = String(newobject.password);
    //console.log(phone1*1)

    if (password.length > 0) {
      const response = await fetch("http://localhost:8000/createuser", {
        method: "POST",
        body: JSON.stringify(newobject),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      const data = await response.json();

      console.log(data);

      if (data.success) {
        localStorage.setItem("token", data.authtoken);
        localStorage.setItem("user", JSON.stringify(newobject));

        history("/");
      } else {
        console.log(data);
        alert(data.error);
      }
    } else {
      alert("choose correct password");
    }
  }

  return (
    <div className="Auth-form-container">
      <form className="Auth-form" action="" onSubmit={handlesubmit}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="text-center">
            Already registered?{" "}
            <NavLink className="li" to={"/"}>
              <button className="btn btn-primary">SignIn</button>
            </NavLink>
          </div>
          <div className="form-group mt-3">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={handlechange}
              required
              className="form-control mt-1"
              placeholder="e.g Jane Doe"
            />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              id="password"
              name="email"
              onChange={handlechange}
              className="form-control mt-1"
              placeholder="Email Address"
            />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type={"password"}
              name="password"
              onChange={handlechange}
              className="form-control mt-1"
              placeholder="Password"
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
          <p className="text-center mt-2">
            Forgot <a href="#">password?</a>
          </p>
        </div>
      </form>
    </div>
  );
}
