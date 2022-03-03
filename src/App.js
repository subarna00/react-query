import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import { HomePage } from "./components/Home.page";
import { RQSuperHeroesPage } from "./components/RQSuperHeroes.page";
import { SuperHeroesPage } from "./components/SuperHeroes.page";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { RqSuperHero } from "./components/RqSuperHero";
import { ParallelQueries } from "./components/ParallelQueries.page";
import { DynamicParallelQueries } from "./components/DynamicParallelQueries";
import { DependentQueries } from "./components/DependentQueries";
import { PaginateQueries } from "./components/PaginateQueries";
import { InfiniteQueries } from "./components/InfiniteQueries";
const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/super-heroes">Traditional Super Heroes</Link>
              </li>
              <li>
                <Link to="/rq-super-heroes">RQ Super Heroes</Link>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route path="/infinite-queries">
              <InfiniteQueries />
            </Route>
            <Route path="/paginate">
              <PaginateQueries />
            </Route>
            <Route path="/dependent">
              <DependentQueries email="subarnauprety@gmail.com" />
            </Route>
            <Route path="/dynamic-parallel">
              <DynamicParallelQueries heroIds={[1, 2, 3]} />
            </Route>
            <Route path="/parallel">
              <ParallelQueries />
            </Route>
            <Route path="/rq-super-hero/:heroId">
              <RqSuperHero />
            </Route>
            <Route path="/super-heroes">
              <SuperHeroesPage />
            </Route>
            <Route path="/rq-super-heroes">
              <RQSuperHeroesPage />
            </Route>
            <Route path="/">
              <HomePage />
            </Route>
          </Switch>
        </div>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
}

export default App;
