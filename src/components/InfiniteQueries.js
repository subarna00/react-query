import axios from "axios";
import { useInfiniteQuery } from "react-query";
const fetchColors = ({ pageParam = 1 }) => {
  return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageParam}`);
};
export const InfiniteQueries = () => {
  const {
    data,
    isLoading,
    error,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery(["colors"], fetchColors, {
    //   keepPreviousData: true,
    getNextPageParam: (_lastPage, pages) => {
      if (pages.length < 4) {
        return pages.length + 1;
      } else {
        return undefined;
      }
    },
  });

  if (isLoading) {
    return <h1>Loading</h1>;
  }
  if (isError) {
    return <h1>{error}</h1>;
  }
  return (
    <>
      <div>
        {data?.pages.map((colors, index) => {
          return (
            <div key={index}>
              {colors.data.map((color) => {
                return (
                  <h2 key={color.id}>
                    {color.id} .{color.name}
                  </h2>
                );
              })}
            </div>
          );
        })}
      </div>
      <div className="">
        <button disabled={!hasNextPage} onClick={fetchNextPage}>
          Load More
        </button>
      </div>
      <div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div>
    </>
  );
};
