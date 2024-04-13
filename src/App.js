import { BiAddToQueue, BiTrash } from "react-icons/bi";
import Search from "./components/Search";
import AddAppointment from "./components/AddAppointment";
import Appointment from "./components/data.json";

const App = () => {
  return (
    <div className="App container mx-auto mt-3 font-thin">
      <h1 className="text-5xl mb-5">
        <BiAddToQueue className="inline-block text-red-400 align-top" /> Your
        Appointment
      </h1>
      <AddAppointment />
      <Search />
      <ul className="divide-y divide-gray-300">
        {Appointment.map((appoint) => (
          <li key={appoint.id} className="px-3 py-3 flex items-start">
            <button
              type="button"
              className="p-1.5 mr-1.5 mt-1 rounded text-white bg-red-500 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <BiTrash />
            </button>x
            <div className="flex-grow">
              <div className="flex items-center">
                <span className="flex-none font-medium text-2xl text-blue-500">
                  {appoint.petName}
                </span>
                <span className="flex-grow text-right">{appoint.aptDate}</span>
              </div>
              <div>
                <b className="font-bold text-blue-500">Owner:</b>
                {appoint.ownerName}
              </div>
              <div className="leading-tight">{appoint.aptNotes}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
