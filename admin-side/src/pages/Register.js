import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { redirect } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";

// const baseUrl = "http://localhost:3000";
const baseUrl = "https://wild-flannel-shirt-foal.cyclic.app";

export default function Register(props) {
  const navigate = useNavigate();
  const { t } = useTranslation()

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    phoneNumber: "",
  });

  const changeInputHandler = (event) => {
    const { name, value } = event.target;

    const newForm = {
      ...form,
    };
    newForm[name] = value;

    setForm(newForm);
  };

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${baseUrl}/register`, form);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: t('admin-create'),
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/");
      console.log(response);
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.message,
      });
    }
  };
  return (
    <div className="container w-fit mx-auto mt-[5rem] shadow-lg shadow-black p-7 rounded-2xl">
      <h1 className="font-serif text-2xl text-center mb-16">{t('admin-new')}</h1>
      <form onSubmit={submitForm}>
        <div className="form-control  max-w-xs w-[20rem]">
          <label className="label">
            <span className="label-text">{t('username')}:</span>
          </label>
          <input name="username" value={form.username} onChange={changeInputHandler} type="text" className="input input-bordered w-full max-w-xs" />
          <label className="label">
            <span className="label-text">Email:</span>
          </label>
          <input name="email" value={form.email} onChange={changeInputHandler} type="email" className="input input-bordered w-full max-w-xs" />
          <label className="label">
            <span className="label-text">{t('password')}:</span>
          </label>
          <input name="password" value={form.password} onChange={changeInputHandler} type="password" className="input input-bordered w-full max-w-xs" />
          <label className="label">
            <span className="label-text">{t('phone-number')}:</span>
          </label>
          <input name="phoneNumber" value={form.phoneNumber} onChange={changeInputHandler} type="number" className="input input-bordered w-full max-w-xs" />
          <button className="btn border-white hover:border-white hover:bg-indigo-600  bg-blue-600 mt-5">{t('save')}</button>
        </div>
      </form>
    </div>
  );
}
