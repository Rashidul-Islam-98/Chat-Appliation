import React, { useState } from "react";
import Add from "../img/addAvatar.png";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import server from "../server";

const Register = () => {
  const [err, setErr] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [avatarSizeError, setAvatarSizeError] = useState(false);
  const navigate = useNavigate();

  const handelFileReader = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.result && file.size <= 100 * 1024) {
          setAvatar(reader.result);
          setAvatarSizeError(false);
        } else {
          setAvatarSizeError(true);
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!avatarSizeError) {
      try {
        const result = axios.post(`${server}/register`, { name, email, avatar });
        setName("");
        setEmail("");
        setAvatar("");
        if (result) navigate("/login");
      } catch (err) {
        setErr(true);
      }
    } else {
      alert("Insert a image less than 100kb");
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="title">Register</span>
        <form onSubmit={handleSubmit}>
          <input required type="text" placeholder="name" onChange={(e) => setName(e.target.value)} />
          <input required type="email" placeholder="email" onChange={(e) => setEmail(e.target.value)} />
          <input required style={{ display: "none" }} type="file" id="file" onChange={handelFileReader} />
          <label htmlFor="file">
            {avatar ? (
              <img src={avatar} alt="" />
            ) : (
              <>
                <img src={Add} alt="" />
                <span>Add an avatar</span>
              </>
            )}
          </label>
          {avatarSizeError && <span>Avatar size exceeds 100KB. Please choose a smaller image.</span>}
          <button>Sign up</button>
          {err && <span>Something went wrong</span>}
        </form>
        <p>
          You do have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
