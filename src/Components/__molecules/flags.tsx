import { useEffect, useState } from "react";
import search1 from "../../assets/search.png";

interface Country {
  name: { common: string; nativeName: { [key: string]: { common: string } } };
  population: number;
  region: string;
  subregion: string;
  capital?: string[];
  flags: { png: string };
  topLevelDomain: string[];
  currencies: { [key: string]: { name: string } };
  languages: { [key: string]: string };
  borders?: string[];
}

interface FlagsProps {
  darkMode: boolean;
}

function Flags({ darkMode }: FlagsProps) {
  const [allCountries, setAllCountries] = useState<Country[]>([]);
  const [initialCountries, setInitialCountries] = useState<Country[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [regionFilter, setRegionFilter] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [borderCountries, setBorderCountries] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>(""); // ✅

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data: Country[] = await response.json();
        setAllCountries(data);

        const initial = data.filter((country) =>
          [
            "Germany",
            "United States",
            "Brazil",
            "Iceland",
            "Afghanistan",
            "Åland Islands",
            "Albania",
            "Algeria",
          ].includes(country.name.common)
        );
        setInitialCountries(initial);
        setFilteredCountries(initial);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let filtered = regionFilter
      ? allCountries.filter((country) => country.region === regionFilter)
      : initialCountries;

    if (searchQuery.trim() !== "") {
      filtered = filtered.filter((country) =>
        country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredCountries(filtered);
  }, [regionFilter, searchQuery, allCountries, initialCountries]);

  const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRegionFilter(e.target.value);
  };

  const handleCountryClick = async (countryName: string) => {
    try {
      const response = await fetch(
        `https://restcountries.com/v3.1/name/${countryName}`
      );
      const data: Country[] = await response.json();
      setSelectedCountry(data[0]);

      if (data[0].borders && data[0].borders.length > 0) {
        const borderData = await Promise.all(
          data[0].borders.map(async (border) => {
            const borderResponse = await fetch(
              `https://restcountries.com/v3.1/alpha/${border}`
            );
            const borderJson = await borderResponse.json();
            return borderJson[0].name.common;
          })
        );
        setBorderCountries(borderData);
      } else {
        setBorderCountries([]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleBackToFlags = () => {
    setSelectedCountry(null);
    setBorderCountries([]);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="mx-auto container px-4 sm:px-6 lg:px-8">
      {!selectedCountry && (
        <div className="w-full flex flex-col sm:flex-row justify-between gap-4 pt-5">
          <div
            className={`flex items-center w-full sm:w-auto gap-2 ${
              darkMode ? "bg-gray-700 text-white" : "bg-white text-black"
            } p-2 rounded-lg shadow-lg`}
          >
            <img
              className="w-[18px] h-[18px]"
              src={search1}
              alt="Search Icon"
            />
            <input
              type="text"
              placeholder="Search for a country…"
              className="w-full sm:w-[300px] h-[40px] bg-transparent outline-none"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          <select
            onChange={handleRegionChange}
            className={`w-full sm:w-[200px] h-[40px] p-2 rounded-lg shadow-lg ${
              darkMode
                ? "bg-gray-700 text-white border-gray-600"
                : "bg-white text-black border-white"
            }`}
          >
            <option value="">Filter by Region</option>
            <option value="Africa">Africa</option>
            <option value="Americas">America</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
          </select>
        </div>
      )}

      {!selectedCountry ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pt-4 pb-6 sm:pt-6 sm:pb-10">
          {filteredCountries.map((country, index) => (
            <div
              key={index}
              className={`p-5 rounded-lg shadow-lg cursor-pointer ${
                darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
              }`}
              onClick={() => handleCountryClick(country.name.common)}
            >
              <img
                className="w-full h-[160px] sm:h-[140px] rounded-lg object-cover"
                src={country.flags.png}
                alt={country.name.common}
              />
              <h1 className="font-bold text-lg mt-4">{country.name.common}</h1>
              <p>
                <strong>Population:</strong>{" "}
                {country.population.toLocaleString()}
              </p>
              <p>
                <strong>Region:</strong> {country.region}
              </p>
              <p>
                <strong>Capital:</strong>{" "}
                {country.capital ? country.capital[0] : "Can't Find Value"}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-6 pt-10 sm:pt-16">
          <div className="flex mb-4">
            <button
              className={`justify-center flex p-2 rounded-md w-[104px] h-[40px] ${
                darkMode
                  ? "bg-[#2B3844] text-white"
                  : "bg-white shadow-lg text-black"
              }`}
              onClick={handleBackToFlags}
            >
              Back
            </button>
          </div>
          <div className="flex flex-col sm:flex-row sm:gap-8">
            <div className="w-full sm:w-[320px] mb-6 sm:mb-0">
              <img
                className="w-full h-[401px] sm:h-[300px] rounded-lg object-cover"
                src={selectedCountry.flags.png}
                alt={selectedCountry.name.common}
              />
            </div>
            <div className="sm:w-[calc(100%-340px)]">
              <div className="namediv mb-6 sm:mb-4">
                <h1 className="font-bold text-2xl mb-4">
                  {selectedCountry.name.common}
                </h1>
              </div>
              <div className="flex flex-col sm:flex-row sm:gap-8">
                <div className="natives mb-6 sm:mb-0">
                  <p>
                    <strong>Native Name:</strong>{" "}
                    {selectedCountry.name.nativeName
                      ? Object.values(selectedCountry.name.nativeName)[0].common
                      : "Can't Find Value"}
                  </p>
                  <p>
                    <strong>Population:</strong>{" "}
                    {selectedCountry.population.toLocaleString()}
                  </p>
                  <p>
                    <strong>Region:</strong> {selectedCountry.region}
                  </p>
                  <p>
                    <strong>Subregion:</strong> {selectedCountry.subregion}
                  </p>
                  <p>
                    <strong>Capital:</strong>{" "}
                    {selectedCountry.capital
                      ? selectedCountry.capital[0]
                      : "Can't Find Value"}
                  </p>
                </div>
                <div className="tops">
                  <p>
                    <strong>Top-Level Domain:</strong>{" "}
                    {selectedCountry.topLevelDomain &&
                    selectedCountry.topLevelDomain.length > 0
                      ? selectedCountry.topLevelDomain.join(", ")
                      : "Can't Find Value"}
                  </p>
                  <p>
                    <strong>Currencies:</strong>{" "}
                    {Object.values(selectedCountry.currencies)
                      .map((currency) => currency.name)
                      .join(", ")}
                  </p>
                  <p>
                    <strong>Languages:</strong>{" "}
                    {Object.values(selectedCountry.languages).join(", ")}
                  </p>
                </div>
              </div>
              <div className="pt-6 sm:pt-10">
                <p className="">
                  <strong>Border Countries: </strong>
                  <span className="bg-[white] shadow-lg w-[96px] h-[28px] rounded-[2px] border-[gray] text-wrap">
                    {borderCountries.length > 0
                      ? borderCountries.join(", ")
                      : "No Borders"}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Flags;
