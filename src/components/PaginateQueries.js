import axios from "axios";
import { useState } from "react";
import { useQuery } from "react-query";
const fetchColors = (pageNumber) => {
  return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageNumber}`);
};
export const PaginateQueries = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const { data, isLoading, error, isError } = useQuery(
    ["colors", pageNumber],
    () => fetchColors(pageNumber),
    {
      keepPreviousData: true,
    }
  );

  if (isLoading) {
    return <h1>Loading</h1>;
  }
  if (isError) {
    return <h1>{error}</h1>;
  }
  return (
    <>
      <div>
        {data?.data.map((color) => {
          return (
            <div key={color.id}>
              <h2>
                {color.id} .{color.name}
              </h2>
            </div>
          );
        })}
      </div>
      <div className="">
        <button
          onClick={() => setPageNumber((page) => page - 1)}
          disabled={pageNumber === 1}
        >
          previous
        </button>
        <button onClick={() => setPageNumber((page) => page + 1)}>next</button>
      </div>
    </>
  );
};
