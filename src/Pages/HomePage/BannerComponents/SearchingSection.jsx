import React, { useContext, useRef, useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MyContext } from "src/Context/ListingDataContext";

const SearchDropdown = ({ config, setSelectedCats }) => {
  const { key, placeholder } = config;
  const [activeDD, setActiveDD] = useState(false);
  const [selectedCat, setSelectedCat] = useState("");
  const { listings } = useContext(MyContext);

  useEffect(() => {
    setSelectedCats((prevCats) => {
      if (selectedCat && !prevCats.includes(selectedCat)) {
        return [...prevCats, { [key]: [selectedCat] }];
      }
      return prevCats;
    });
  }, [selectedCat]);

  const uniqueItems = [...new Set(listings.map((listing) => listing[key]))];
  const handleRemoveCat = (key, selectedCat) => {
    setSelectedCats((prevSelectedCats) =>
      prevSelectedCats.filter((cat) => cat[key] !== selectedCat)
    );
  };
  return (
    <div className="relative w-full group flex flex-col gap-2 col-span-12 md:col-span-3">
      <button
        className={`h-16 px-4 text-md w-full capitalize text-white bg-custom-dark-blue hover:bg-custom-heading-color transition-all duration-250 focus:bg-custom-heading-color focus:outline-none focus:ring-0 peer flex items-center justify-between font-semibold ${
          selectedCat ? "text-xs" : ""
        }`}
        onClick={() => setActiveDD(!activeDD)}
      >
        {selectedCat && selectedCat !== "" ? (
          <>
            {selectedCat}
            <svg
              onClick={() => {
                setActiveDD(false);
                setSelectedCat("");
                handleRemoveCat(key, selectedCat);
              }}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </>
        ) : (
          <>
            {placeholder}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="white"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="white"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 5.25l7.5 7.5 7.5-7.5m-15 6l7.5 7.5 7.5-7.5"
              />
            </svg>
          </>
        )}
      </button>
      <div
        className={`absolute z-[99] top-[100%] left-[50%] translate-x-[-50%] shadow-lg w-full ${
          activeDD ? "h-[300px]" : "h-0 opacity-0"
        } duration-200 bg-white border border-dimmed text-sm md:text-sm overflow-x-hidden overflow-scroll ]`}
      >
        {uniqueItems.map((item, index) => (
          <div className="flex justify-between items-center" key={index}>
            <div
              onClick={() => {
                setActiveDD(false);
                setSelectedCat(item);
              }}
              className="text-black w-full block cursor-pointer hover:text-link px-3 
              py-2 hover:bg-slate-200"
            >
              <span>{item}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const SearchingSection = () => {
  const searchConfigs = [
    {
      key: "category",
      placeholder: "Select Category",
      buttonBgColor: "#4d85ff",
    },
    {
      key: "FranchiseFee",
      placeholder: "Select Investment Fee",
      buttonBgColor: "#1a62ff",
    },
    {
      key: "franchisedUnits",
      placeholder: "Select Units",
      buttonBgColor: "#0048e6",
    },
    {
      key: "Single",
      placeholder: "Select Single",
      buttonBgColor: "#0038b3",
    },
  ];

  const ref = useRef();
  const { setFilters } = useContext(MyContext);
  const [selectedCats, setSelectedCats] = useState([]);
  const history = useNavigate();

  const handleSearchInputChange = () => {
    const searchValue = ref.current.value;

    // Usage
    // Convert the uniqueFiltersArray to a single object
    const uniqueFilters = selectedCats.reduce((acc, current) => {
      return { ...acc, ...current };
    }, {});

    if (searchValue === "") {
      setFilters({ ...uniqueFilters });
    } else {
      setFilters({
        ...uniqueFilters,
        search: [searchValue],
      });
    }

    history("/listings");
  };

  const isMobile = window.innerWidth < 768 ? true : false;

  return (
    <div id="searching-contianer" className="flex flex-col gap-2">
      <div className="relative col-span-12 md:col-span-12  flex items-center">
        <input
          type="search"
          id="search-field"
          placeholder="Search Any Listing"
          ref={ref}
          className="block w-full px-2 py-3 text-sm   focus:border-custom-heading-color border-2 text-black pr-10 rounded-none outline-none bg-white"
        />

        <button className=" absolute right-2.5 top-5.5 w-4 h-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlSpace="preserve"
            viewBox="0 0 487.95 487.95"
          >
            <path d="m481.8 453-140-140.1c27.6-33.1 44.2-75.4 44.2-121.6C386 85.9 299.5.2 193.1.2S0 86 0 191.4s86.5 191.1 192.9 191.1c45.2 0 86.8-15.5 119.8-41.4l140.5 140.5c8.2 8.2 20.4 8.2 28.6 0 8.2-8.2 8.2-20.4 0-28.6zM41 191.4c0-82.8 68.2-150.1 151.9-150.1s151.9 67.3 151.9 150.1-68.2 150.1-151.9 150.1S41 274.1 41 191.4z"></path>
          </svg>
        </button>
      </div>
      <div className="grid grid-cols-12 gap-2">
        {searchConfigs.map((config, index) => (
          <SearchDropdown
            key={index}
            config={config}
            setSelectedCats={setSelectedCats}
          />
        ))}
      </div>

      <button
        onClick={handleSearchInputChange}
        className={`${
          isMobile ? "w-full" : "md:w-1/2"
        }  relative items-center justify-start overflow-hidden font-medium transition-all duration-500 bg-white hover:bg-custom-heading-color hover:text-white group py-1.5 px-2.5 mx-auto h-12 text-center`}
      >
        Search
      </button>
    </div>
  );
};

export default SearchingSection;
