import React, { useEffect, useState } from "react";
import Location from "./Location";
import { useDispatch, useSelector } from "react-redux";
import { reportById } from "../store";
import { useParams } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

const Details = () => {
  const [loading, setLoading] = useState(false);
  const report = useSelector((state) => state.report);
  const dispatch = useDispatch();
  const { id } = useParams();

  console.log(report);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    dispatch(reportById(id));
  }, []);

  return (
    <>
      {loading && (
        <div className="relative shadow-md sm:rounded-lg mt-[15%] w-full md:w-full sm:[50%]">
          <div className="flex content-center justify-center  ">
            <ClipLoader color={"gray-900"} loading={loading} size={100} aria-label="Loading Spinner" data-testid="loader" />
          </div>
        </div>
      )}
      {!loading && report && report.data && (
        <div className="mx-auto max-w-5xl my-14 space-y-6">
          <h1 className="text-center mb-[5rem] font-bold font-serif text-2xl dark:text-white">DETAIL TRACKER HISTORY REPORT</h1>
          <div className="flex gap-7">
            <div className="w-72 h-48">
              <img className="w-full h-full" src={report.data.photo} alt="Avatar Tailwind CSS Component" />
            </div>
            <div className="space-y-5 flex-grow">
              <div>
                <p className="dark:text-white">Name :</p>
                <p className="font-semibold text-lg uppercase dark:text-white">{report.data.name}</p>
              </div>
              <div>
                <p className="dark:text-white">Age :</p>
                <p className="font-semibold text-lg uppercase dark:text-white">{report.data.age} years old</p>
              </div>
              <div>
                <p className="dark:text-white">Description :</p>
                <p className="font-semibold text-lg uppercase dark:text-white">{report.data.characteristic}</p>
              </div>
              <div className="!mt-10">
                <Location lat={report.data.lat} long={report.data.long} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Details;
