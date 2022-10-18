import { useContext } from "react";
import { GameContext } from "../../contexts/GameContext";
import { CatalogGames } from "./CatalogGames";

export const Catalog = () => {
    const { games } = useContext(GameContext);

    return (
        <section id="catalog-page">
            <h1>All Games</h1>
            {games.length > 0
                ? games.map(game => <CatalogGames key={game._id} game={game} />)
                : <h3 className="no-articles">No articles yet</h3>}
        </section>
    );
}