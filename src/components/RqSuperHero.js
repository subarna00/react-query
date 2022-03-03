import { useParams } from "react-router-dom";
import { useSuperHeroData } from "../hooks/useSuperHeroData";

export const RqSuperHero = () => {
  const { heroId } = useParams();
  const { data, isLoading } = useSuperHeroData(heroId);
  return <div>{data?.data.name}</div>;
};
