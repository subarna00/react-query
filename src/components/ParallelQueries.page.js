import axios from "axios";
import { useQuery } from "react-query";

const fetchedSuperHeroes = () => {
  return axios.get("http://localhost:4000/superheroes");
};
const fetchedFriends = () => {
  return axios.get("http://localhost:4000/friends");
};
export const ParallelQueries = () => {
  useQuery("super-heroes", fetchedSuperHeroes);
  useQuery("friends", fetchedFriends);
  return <div>ParallelQueries.page</div>;
};
