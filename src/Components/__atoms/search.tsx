import search from "../../assets/search.png";

interface SearchProps {
  darkMode: boolean;
}

function Search({ darkMode }: SearchProps) {
  return (
    <div className="max-w-[1359px] w-full pt-5 mx-auto h-auto flex flex-col md:flex-row items-center justify-between px-5 md:px-10 gap-4">
      <div
        className={`flex items-center w-full md:w-auto gap-[10px] ${
          darkMode ? "bg-gray-700 text-white" : "bg-white text-black"
        } p-2 rounded-lg shadow-lg`}
      >
        <img className="w-[18px] h-[18px]" src={search} alt="Search Icon" />
        <input
          type="text"
          placeholder="Search for a country…"
          className="w-[480px] h-[40px] md:h-[56px] bg-transparent"
        />
      </div>
      <select
        className={`w-[200px] md:w-[200px] h-[40px] md:h-[56px] p-2 rounded-lg shadow-lg ${
          darkMode
            ? "bg-gray-700 text-white border-gray-600"
            : "bg-white text-black border-white"
        }`}
      >
        <option>Filter by Region</option>
        <option>Africa</option>
        <option>America</option>
        <option>Asia</option>
        <option>Europe</option>
        <option>Oceania</option>
      </select>
    </div>
  );
}

export default Search;
