import React, { useEffect, useState } from "react";
import "./styles.scss";
import { FilterOptions } from "../../utils/data";
import Button from "../Button";
import arrow from "../../public/images/arrow.svg";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
import { NewsItem } from "../News";
import { useAuth0 } from "@auth0/auth0-react";
// import { addDays } from "date-fns";

const CategoryFilterItem = (props: any) => {
  return (
    <div className="item">
      <input
        type="radio"
        name="category"
        value={props.value}
        onChange={() => props.handleCategoryChange(props.value)}
      />
      <label>{props.text}</label>
    </div>
  );
};

const SourceFilterItem = (props: any) => {
  return (
    <div className="item">
      <input
        type="checkbox"
        name="sources"
        value={props.value}
        onChange={() => props.handleSourceChange(props.value)}
      />
      <label>{props.text} </label>
    </div>
  );
};

interface ResultObject {
  [key: string]: boolean | string[] | undefined;
}

const sourcesFormatting = (arr: any) => {
  return arr.reduce((acc: ResultObject, item: string) => {
    if (item.startsWith("newsapi_")) {
      const key: string = "newsapi";
      const value: string = item.replace("newsapi_", "");
      if (!acc[key]) {
        acc[key] = [];
      }
      if (Array.isArray(acc[key])) {
        acc[key].push(value);
      }
    } else {
      acc[item] = true;
    }
    return acc;
  }, {});
};

const getCorrectDateFormat = (dateString: any) => {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
};

const Filter = ({
  savedPreferences,
  filter,
  savePreferences,
  resetPreferences,
}: {
  savedPreferences?: FilterOptions;
  filter: (newFilters: FilterOptions) => void;
  savePreferences: () => void;
  resetPreferences: () => void;
}) => {
  const [toggleFilterSection, setToggleFilterSection] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const {isAuthenticated} = useAuth0()

  const [filters, setFilters] = useState<{
    dateRange: { startDate: Date; endDate: Date; key: string }[];
    selectedCategory: string;
    selectedSources: string[];
  }>({
    dateRange: [
      {
        startDate: new Date(),
        endDate: new Date(),
        key: "selection",
      },
    ],
    selectedCategory: "",
    selectedSources: [],
  });

  useEffect(() => {
    const filterData: FilterOptions = {
      from: getCorrectDateFormat(filters.dateRange[0].startDate),
      to: getCorrectDateFormat(filters.dateRange[0].endDate),
      category: filters.selectedCategory,
      sources: sourcesFormatting(filters.selectedSources),
    };

    filter(filterData);
  }, [filters]);

  const handleCategoryChange = (value: string) => {
    console.log(value);
    setFilters((prevFilters) => ({
      ...prevFilters,
      selectedCategory: value,
    }));
  };

  const handleSourceChange = (value: string) => {
    console.log(value);
    const updatedSources = filters.selectedSources.includes(value)
      ? filters.selectedSources.filter((source) => source !== value)
      : [...filters.selectedSources, value];

    setFilters((prevFilters) => ({
      ...prevFilters,
      selectedSources: updatedSources,
    }));
  };

  const setNewDate = (date: any) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      dateRange: [date.selection],
    }));
  };

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const categoryFilterList = [
    {
      value: "technology",
      text: "Technology",
    },
    {
      value: "health",
      text: "Health",
    },
    {
      value: "science",
      text: "Science",
    },
  ];

  const sourcesFilterList = [
    { value: "newsapi_politico", text: "Politico" },
    { value: "newsapi_axios", text: "Health" },
    { value: "newsapi_the-times-of-india", text: "The Times Of India" },
    { value: "newsapi_cbs-news", text: "CBS News" },
    { value: "newsapi_the-hill", text: "The-Hill" },
    { value: "newsapi_reuters", text: "Reuters" },
    { value: "newsapi_engadget", text: "EnGadget" },
    { value: "newsapi_google-news", text: "Google News" },
    { value: "newsapi_cnn", text: "CNN" },
    { value: "newsapi_the-washington-post", text: "The Washington Post" },
    { value: "guardian_api", text: "Guardian Post" },
    { value: "nyt_api", text: "New York Times Post" },
  ];

  return (
    <section className="filter-section">
      <Button
        className="advanced-search-button"
        onClick={() => {
          setToggleFilterSection((prev) => !prev);
        }}
      >
        <span>Advance Filters</span>
        <img
          className={`${toggleFilterSection && "open"}`}
          src={arrow}
          alt="Advanced Search"
        />
      </Button>

      {toggleFilterSection && (
        <>
          <div className="filterItems">
            {/* DATE RANGE */}
            <div className="filter-item calander-filter">
              <DateRange
                editableDateInputs={true}
                onChange={(item) => setNewDate(item)}
                moveRangeOnFirstSelection={false}
                months={screenWidth < 768 ? 1 : 2}
                direction="horizontal"
                ranges={filters.dateRange}
              />
            </div>

            {/* CATEGORY FILTER */}
            <div className="filter-item radio-filter">
              <legend>Select Category</legend>

              {categoryFilterList.map((item) => (
                <CategoryFilterItem
                  value={item.value}
                  text={item.text}
                  handleCategoryChange={handleCategoryChange}
                />
              ))}
            </div>

            {/* SELECT SOURCES   */}
            <div className="filter-item radio-filter">
              <legend>Select Sources</legend>
              {sourcesFilterList.map((item) => (
                <SourceFilterItem
                  value={item.value}
                  text={item.text}
                  handleSourceChange={handleSourceChange}
                />
              ))}
            </div>
          </div>

         
          {isAuthenticated && <div className="preference-buttons">
            <Button
              onClick={() => {
                savePreferences();
              }}
            >
              Save Preferences
            </Button>
            <Button
              onClick={() => {
                resetPreferences();
              }}
            >
              Reset Preferences
            </Button>
          </div>}


        </>
      )}
    </section>
  );
};

export default Filter;
