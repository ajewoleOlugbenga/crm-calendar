import { BiAddToQueue, BiTrash } from "react-icons/bi";
import Search from "./components/Search";
import AddAppointment from "./components/AddAppointment";
import { useEffect, useState } from "react";

const App = () => {
  const [query, setQuery] = useState("");
  const [appointmentList, setAppointmentList] = useState([]);
  const [sortBy, setSortBy] = useState("petName");
  const [sortOrder, setSortOrder] = useState("asc");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("./data.json")
      .then((response) => response.json())
      .then((data) => setAppointmentList(data));
    setLoading(false);
  }, []);
  if (loading) {
    <div class="loader"></div>;
  }

  const onDeleteAppointmentList = (appointmentId) => {
    setAppointmentList((prevList) =>
      prevList.filter((appoint) => appoint.id !== appointmentId)
    );
  };

  const filteredAppointment = appointmentList
    .filter((item) => {
      return (
        item.petName.toLowerCase().includes(query.toLowerCase()) ||
        item.aptNotes.toLowerCase().includes(query.toLowerCase()) ||
        item.aptDate.toLowerCase().includes(query.toLowerCase()) ||
        item.ownerName.toLowerCase().includes(query.toLowerCase())
      );
    })
    .sort((a, b) => {
      const order = sortOrder === "asc" ? 1 : -1;
      return a[sortBy].toLowerCase() < b[sortBy].toLowerCase()
        ? -1 * order
        : 1 * order;
    });

  const changeQuery = (event) => {
    setQuery(event.target.value);
  };

  return (
    <div className="App container mx-auto mt-3 font-thin">
      <h1 className="text-5xl mb-5">
        <BiAddToQueue className="inline-block text-red-400 align-top" /> Your
        Appointment
      </h1>
      <AddAppointment />
      <Search
        Query={query}
        onQueryChange={changeQuery}
        sortBy
        sortOrder
        onSortOrder={(mySort) => setSortOrder(mySort)}
        onSortBy={(mySort) => setSortBy(mySort)}
      />
      <ul className="divide-y divide-gray-300">
        {filteredAppointment.map((appoint) => (
          <li key={appoint.id} className="px-3 py-3 flex items-start">
            <button
              onClick={() => onDeleteAppointmentList(appoint.id)}
              type="button"
              className="p-1.5 mr-1.5 mt-1 rounded text-white bg-red-500 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <BiTrash />
            </button>
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
