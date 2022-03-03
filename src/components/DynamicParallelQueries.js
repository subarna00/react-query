import axios from "axios";
import { useQueries } from "react-query";

const fetchedSuperHero = (heroId) => {
  return axios.get(`http://localhost:4000/superheroes/${heroId}`);
};
export const DynamicParallelQueries = ({ heroIds }) => {
  const result = useQueries(
    heroIds.map((id) => {
      return {
        queryKey: ["super-hero", id],
        queryFn: () => fetchedSuperHero(id),
      };
    })
  );
  console.log({ result });
  return <div>DynamicParallelQueries</div>;
};
