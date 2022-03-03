import {
  useSuperHerosData,
  useAddSuperHeroData,
} from "../hooks/useSuperHerosData";
import { Link } from "react-router-dom";
import { useState } from "react";

export const RQSuperHeroesPage = () => {
  const [name, setName] = useState("");
  const [alterEgo, setAlterEgo] = useState("");
  const onSuccess = (data) => {
    console.log("Perform side effects after data fetching", data);
  };
  const onError = (error) => {
    console.log("Perform side effects after error", error);
  };
  const { data, isLoading, isError, error, refetch } = useSuperHerosData(
    onSuccess,
    onError
  );
  const { mutate: addHero } = useAddSuperHeroData();

  const handleAddHero = () => {
    const hero = { name, alterEgo };
    addHero(hero);
    setName("");
    setAlterEgo("");
  };
  if (isLoading) {
    return <h2>Loading</h2>;
  }
  if (isError) {
    return <h2>{error.message}</h2>;
  }
  return (
    <>
      <h2>RQ Super Heroes Page</h2>
      <div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          value={alterEgo}
          onChange={(e) => setAlterEgo(e.target.value)}
        />
        <button onClick={handleAddHero}>Add Hero hai guys</button>
      </div>

      <button onClick={() => refetch()}>Fetch heros</button>
      {data?.data.map((hero) => {
        return (
          <div key={hero.id}>
            <Link to={`/rq-super-hero/${hero.id}`}> {hero.name}</Link>
          </div>
        );
      })}
      {/* {data.map((hero) => {
        return <div key={hero}>{hero}</div>;
      })} */}
    </>
  );
};
