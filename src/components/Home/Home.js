import { LatestGames } from './LatestGames';
import { useContext } from 'react';
import { GameContext } from '../../contexts/GameContext';

export const Home = () => {
    const { games } = useContext(GameContext);

    return (
        <section id="welcome-world">
            <div className="welcome-message">
                <h2>ALL new games are</h2>
                <h3>Only in GamesPlay</h3>
            </div>
            <img src="./images/four_slider_img01.png" alt="hero" />
            <div id="home-page">
                <h1>Latest Games</h1>
                {games.length > 0
                    ? games.map(game => <LatestGames key={game._id} game={game} />)
                    : <p className="no-articles">No games yet</p>}
            </div>
        </section>
    );
}