import { useEffect, useState, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { GameContext } from '../../contexts/GameContext';

import * as gameService from '../../services/gameService';

export const Details = () => {
    const navigate = useNavigate();
    const { auth } = useContext(AuthContext);
    const { onDelete } = useContext(GameContext);
    const { gameId } = useParams();
    const [currentGame, setCurrentGame] = useState({});

    useEffect(() => {
        gameService.getOne(gameId)
            .then(result => setCurrentGame(result))
    }, [gameId]);

    const isOwner = auth._id === currentGame._ownerId;

    const deleteHanlder = () => {
        const confirmation = window.confirm('Are you sure you want to delete this game?');

        if (confirmation) {
            gameService.remove(gameId)
            .then(() => {
                onDelete(gameId);
                navigate('/catalog');
            })
        }
    }

    return (
        <section id="game-details">
            <h1>Game Details</h1>
            <div className="info-section">
                <div className="game-header">
                    <img className="game-img" src={currentGame.imageUrl} />
                    <h1>{currentGame.title}</h1>
                    <span className="levels">MaxLevel: {currentGame.maxLevel}</span>
                    <p className="type">{currentGame.category}</p>
                </div>
                <p className="text">
                    {currentGame.summary}
                </p>
                {/* Bonus ( for Guests and Users ) */}
                <div className="details-comments">
                    <h2>Comments:</h2>
                    <ul>
                        {/* list all comments for current game (If any) */}
                        <li className="comment">
                            <p>Content: I rate this one quite highly.</p>
                        </li>
                        <li className="comment">
                            <p>Content: The best game.</p>
                        </li>
                    </ul>
                    {/* Display paragraph: If there are no games in the database */}
                    <p className="no-comment">No comments.</p>
                </div>
                {/* Edit/Delete buttons ( Only for creator of this game )  */}
                {isOwner
                    ? <div className="buttons">
                        <Link to={`/edit/${currentGame._id}`} className="button">
                            Edit
                        </Link>
                        <button onClick={deleteHanlder} className="button">
                            Delete
                        </button>
                    </div>
                    : ''}
            </div>
            {/* Bonus */}
            {/* Add Comment ( Only for logged-in users, which is not creators of the current game ) */}
            {!isOwner
                ? <article className="create-comment">
                    <label>Add new comment:</label>
                    <form className="form">
                        <textarea name="comment" placeholder="Comment......" defaultValue={""} />
                        <input className="btn submit" type="submit" defaultValue="Add Comment" />
                    </form>
                </article>
                : ''}
        </section>
    );
}