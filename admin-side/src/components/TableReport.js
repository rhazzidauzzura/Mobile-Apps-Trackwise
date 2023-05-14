import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { reportById } from "../store";

export default function Table(props) {
  const { reports, index } = props;

  return (
    <tr>
      <td>{index + 1}</td>
      <td>
        <div className="flex items-center space-x-3">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <a href={reports.photo}>
                <img src={reports.photo} alt="Avatar Tailwind CSS Component" />
              </a>
            </div>
          </div>
        </div>
      </td>
      <td>
        <p className="font-semibold  uppercase dark:text-white">{reports.name}</p>
      </td>
      <td>{reports.phoneNumber}</td>
      <td className="text-[#ff0000]">{reports.message}</td>
      <td className="text-blue-700">{reports.User.email}</td>
      <td>
        <Link to={`/details/${reports.id}`}>
          <button className="btn btn-ghost btn-xs">details</button>
        </Link>
      </td>
    </tr>
  );
}
