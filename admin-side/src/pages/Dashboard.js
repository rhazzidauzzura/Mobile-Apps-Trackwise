// import Home from "./Location";

export default function Dashboard(params) {
  return (
    <div className="my-10">
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th>No.</th>
              <th>Foto</th>
              <th>Name</th>
              <th>Ages</th>
              <th>Description</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <tr>
              <td>1</td>
              <td>
                <div className="flex items-center space-x-3">
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img src="https://images.prismic.io/moreapp/0556644b-3d4b-45e5-8cc1-a74d45288673_EN+visit+report.png?auto=compress,format" alt="Avatar Tailwind CSS Component" />
                    </div>
                  </div>
                </div>
              </td>
              <td>
                Zemlak, Daniel and Leannon
              </td>
              <td>18</td>
              <td>Description</td>
              <th>
                <button className="btn btn-ghost btn-xs">See Details</button>
              </th>
            </tr>
          </tbody>

        </table>
      </div>
    </div>
  );
}
