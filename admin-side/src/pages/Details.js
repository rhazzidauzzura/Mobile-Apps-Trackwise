import React, { useEffect, useState } from "react";
import Location from "./Location";
import { useDispatch, useSelector } from "react-redux";
import { reportById } from "../store";
import { useParams } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { useTranslation } from "react-i18next";

const Details = () => {
  const [loading, setLoading] = useState(false);
  const report = useSelector((state) => state.report);
  const dispatch = useDispatch();
  const { id } = useParams();
  const { t } = useTranslation()

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
        <>
          <h1 className="text-center mb-[5rem] font-bold font-serif text-2xl dark:text-white">{t("detail-title")}</h1>
          <div className="flex flex-col justify-between lg:flex-row gap-16 lg:items-center">
            <div className="flex flex-col gap-4 lg:w-2/4">
              <Location lat={report.data.lat} long={report.data.long} />
            </div>

            <div className="flex flex-col gap-4 lg:w-2/4 items-center">
              <a href={report.data.photo}>
                <img src={report.data.photo} alt="" className="w-24 h-24 rounded-md cursor-pointer" />
              </a>
              <div>
                <h1 className="text-2xl font-semibold font-serif">{t('name')}: {report.data.name}</h1>
                <h1 className="text-2xl font-semibold mt-4 font-serif">{t('age')}: {report.data.age}</h1>
                <h1 className="text-2xl font-semibold mt-4 font-serif">{t('description')}: </h1>
              </div>
              <p className="text-gray-800">{report.data.description}</p>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Details;

// <>
//   {loading && (
//     <div className="relative shadow-md sm:rounded-lg mt-[15%] w-full md:w-full sm:[50%]">
//       <div className="flex content-center justify-center  ">
//         <ClipLoader color={"gray-900"} loading={loading} size={100} aria-label="Loading Spinner" data-testid="loader" />
//       </div>
//     </div>
//   )}
//   {!loading && report && report.data && (
//     <div className="mx-auto max-w-5xl my-14 space-y-6">
//       <h1 className="text-center mb-[5rem] font-bold font-serif text-2xl dark:text-white">DETAIL TRACKER HISTORY REPORT</h1>
//       <div className="flex gap-7">
//         <div className="w-72 h-48">
//           <a href={report.data.photo}>
//             <img className="w-full h-full" src={report.data.photo} alt="Avatar Tailwind CSS Component" />
//           </a>
//         </div>
//         <div className="space-y-5 flex-grow">
//           <div>
//             <p className="dark:text-white">Name :</p>
//             <p className="font-semibold text-lg uppercase dark:text-white">{report.data.name}</p>
//           </div>
//           <div>
//             <p className="dark:text-white">Age :</p>
//             <p className="font-semibold text-lg uppercase dark:text-white">{report.data.age} years old</p>
//           </div>
//           <div>
//             <p className="dark:text-white">Description :</p>
//             <p className="font-semibold text-lg uppercase dark:text-white">{report.data.characteristic}</p>
//           </div>
//           <div className="!mt-10">
//             <Location lat={report.data.lat} long={report.data.long} />
//           </div>
//         </div>
//       </div>
//     </div>
//   )}
// </>
