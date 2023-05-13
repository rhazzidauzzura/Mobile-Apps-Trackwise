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
  const { t } = useTranslation();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    NIK: "",
    birthPlace: "",
    birthDate: "",
    phoneNumber: "",
    address: "",
    role: "",
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
        title: t("admin-create"),
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
    <div className="container w-[50%] mx-auto mt-[5rem] shadow-lg shadow-black p-7 rounded-2xl">
      <h1 className="font-serif text-2xl text-center mb-16">{t("admin-new")}</h1>
      <form onSubmit={submitForm}>
        <div className="form-control   w-full">
          <label className="label">
            <span className="label-text">{t("username")}:</span>
          </label>
          <input name="username" value={form.username} onChange={changeInputHandler} type="text" className="input input-bordered w-full " />
          <label className="label">
            <span className="label-text">Email:</span>
          </label>
          <input name="email" value={form.email} onChange={changeInputHandler} type="email" className="input input-bordered w-full " />
          <label className="label">
            <span className="label-text">{t("password")}:</span>
          </label>
          <input name="password" value={form.password} onChange={changeInputHandler} type="password" className="input input-bordered w-full " />
          <label className="label">
            <span className="label-text">{t("phone-number")}:</span>
          </label>
          <input name="phoneNumber" value={form.phoneNumber} onChange={changeInputHandler} type="number" className="input input-bordered w-full " />
          <label className="label">
            <span className="label-text">{t("NIK")}:</span>
          </label>
          <input name="NIK" value={form.NIK} onChange={changeInputHandler} type="number" className="input input-bordered w-full " />
          <label className="label">
            <span className="label-text">{t("birth-place")}:</span>
          </label>
          <input name="birthPlace" value={form.birthPlace} onChange={changeInputHandler} type="text" className="input input-bordered w-full " />
          <label className="label">
            <span className="label-text">{t("birth-date")}:</span>
          </label>
          <input name="birthDate" value={form.birthDate} onChange={changeInputHandler} type="date" className="input input-bordered w-full " />
          <label className="label">
            <span className="label-text">{t("address")}:</span>
          </label>
          <input name="address" value={form.address} onChange={changeInputHandler} type="text" className="input input-bordered w-full " />
          <label className="label">
            <span className="label-text">{t("role")}:</span>
          </label>
          <select onChange={changeInputHandler} value={form.role} name="role" className="select select-bordered w-full ">
            <option disabled value="">
              --Select Role--
            </option>
            <option value="penindak">Penindak</option>
          </select>
          <button className="btn border-white hover:border-white hover:bg-indigo-600  bg-blue-600 mt-5">{t("save")}</button>
        </div>
      </form>
    </div>
  );
}
