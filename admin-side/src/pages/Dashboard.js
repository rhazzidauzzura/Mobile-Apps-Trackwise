// import Home from "./Location";
import { useDispatch, useSelector } from "react-redux";
import Table from "../components/TableReport";
import { useEffect, useState } from "react";
import { fetchReports } from "../store";
import ClipLoader from "react-spinners/ClipLoader";
import { useTranslation } from "react-i18next";

export default function Dashboard(params) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const reports = useSelector((state) => state.reports);
  const { t } = useTranslation();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
    dispatch(fetchReports());
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
      {!loading && reports && reports.data && (
        <div className="flex justify-center mt-10">
          <div className="overflow-x-auto w-[90%] ">
            <table className="table w-full ml-16">
              {/* head */}
              <thead>
                <tr>
                  <th>No</th>
                  <th>{t("photo")}</th>
                  <th>{t("name")}</th>
                  <th>{t("phoneNumber")}</th>
                  <th>{t("message")}</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {reports?.data?.map((el, index) => {
                  return <Table key={el.id} reports={el} index={index} />;
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}
