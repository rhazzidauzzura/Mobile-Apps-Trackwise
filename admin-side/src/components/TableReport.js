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
              <a href={reports.photo} target="_blank" rel="noreferrer">
                <img src={reports.photo} alt="Avatar Tailwind CSS Component" />
              </a>
            </div>
          </div>
        </div>
      </td>
      <td>
        <p className="font-semibold text-lg uppercase dark:text-white">{reports.name}</p>
      </td>
      <td>{reports.age}</td>
      <td className="text-[#ff0000]">{reports.description}</td>
      <Link to={`/details/${reports.id}`}>
        <td>
          <button className="btn btn-ghost btn-xs">details</button>
        </td>
      </Link>
    </tr>
  );
}
