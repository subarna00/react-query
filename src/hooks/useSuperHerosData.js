import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { request } from "../utils/axios-utils";
const fetchedSuperHeroes = () => {
  return request({ url: "/superheroes" });
  // return axios.get("http://localhost:4000/superheroes");
};
const addSuperHero = (hero) => {
  return request({ url: "/superheroes", method: "post", data: hero });

  // return axios.post(`http://localhost:4000/superheroes`, hero);
};
export const useSuperHerosData = (onSuccess, onError) => {
  //const { data, isLoading, isError, error, refetch } = \\
  return useQuery("super-heroes", fetchedSuperHeroes, {
    onSuccess: onSuccess,
    onError: onError,
    // select: (data) => { //called data transformation of filteration
    //   const names = data.data.map((name) => name.name);
    //   return names;
    // },
    // cacheTime: 5000,
    // staleTime: 30000,
    // refetchOnMount: true /false/'always'
    // refetchOnWindowFocus: true, //'always'/false //fetch data if changed remotely
    // refetchInterval: 2000, // fetch data again and again at some interval of time called pooling
    // refetchIntervalInBackground: true  refetch data when window is not in focus
    // enabled: false, //disable data fetching
  });
};
export const useAddSuperHeroData = () => {
  const queryClient = useQueryClient();
  return useMutation(addSuperHero, {
    // onSuccess: (data) => {
    //   // queryClient.invalidateQueries("super-heroes");
    //   queryClient.setQueryData("super-heros", (oldData) => {
    //     return {
    //       ...oldData,
    //       data: [...oldData, data.data],
    //     };
    //   });
    // },
    onMutate: async (newHero) => {
      await queryClient.cancelQueries("super-heroes");
      const previousData = queryClient.getQueryData("super-heroes");
      queryClient.setQueryData("super-heroes", (oldQueryData) => {
        console.log({ oldQueryData });
        return {
          ...oldQueryData,
          data: [
            ...oldQueryData.data,
            { id: oldQueryData?.data?.length + 1, ...newHero },
          ],
        };
      });
      return {
        previousData,
      };
    },
    onError: (_error, _hero, context) => {
      queryClient.setQueryData("super-heroes", context.previousData);
    },
    onSettled: () => {
      queryClient.invalidateQueries("super-heroes");
    },
  });
};
