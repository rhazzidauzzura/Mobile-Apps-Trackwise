// import Home from "./Location";
import { useDispatch, useSelector } from "react-redux";
import Table from "../components/TableReport";
import { useEffect, useState } from "react";
import { fetchReports } from "../store";
import ClipLoader from "react-spinners/ClipLoader";

export default function Dashboard(params) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const reports = useSelector((state) => state.reports);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
    dispatch(fetchReports());
  }, []);
  return (
    <>
      {loading ? (
        <div className="relative shadow-md sm:rounded-lg mt-[15%] w-full md:w-full sm:[50%]">
          <div className="flex content-center justify-center  ">
            <ClipLoader color={"gray-900"} loading={loading} size={100} aria-label="Loading Spinner" data-testid="loader" />
          </div>
        </div>
      ) : (
        <div className="flex justify-center mt-10">
          <div className="overflow-x-auto w-[80%] ">
            <table className="table w-full ml-16">
              {/* head */}
              <thead>
                <tr>
                  <th>No</th>
                  <th>Foto</th>
                  <th>Name</th>
                  <th>Ages</th>
                  <th>Description</th>
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
        // <div className="my-10">
        //   <div className="flex overflow-x-auto w-full justify-centen">
        //     <table className="table w-full">
        //       {/* head */}
        //       <thead>
        //         <tr>
        //           <th>No.</th>
        //           <th>Foto</th>
        //           <th>Name</th>
        //           <th>Ages</th>
        //           <th>Description</th>
        //           <th></th>
        //         </tr>
        //       </thead>
        //       <tbody>
        //         {/* row 1 */}
        //         {reports?.data?.map((el, index) => {
        //           return <Table key={el.id} reports={el} index={index} />;
        //         })}
        //       </tbody>
        //     </table>
        //   </div>
        // </div>
      )}
    </>
  );
}
