import { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GameContext } from "../../contexts/GameContext";
import * as gameService from '../../services/gameService';

export const Edit = () => {
    const navigate = useNavigate();
    const { games, onEdit } = useContext(GameContext);
    const { gameId } = useParams();
    const game = games.find(x => x._id === gameId);

    const [values, setValues] = useState({
        title: game.title,
        category: game.category,
        maxLevel: game.maxLevel,
        imageUrl: game.imageUrl,
        summary: game.summary
    })

    const changeHandler = (e) => {
        setValues(oldState => ({
            ...oldState,
            [e.target.name]: e.target.value
        }));
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const userdata = Object.fromEntries(new FormData(e.target));

        gameService.edit(gameId, userdata)
        .then(result => {
            onEdit(gameId, result);
            navigate(`/details/${gameId}`);
        })

    }

    return (
        <section id="edit-page" className="auth">
            <form id="edit" onSubmit={onSubmit}>
                <div className="container">
                    <h1>Edit Game</h1>
                    <label htmlFor="leg-title">Legendary title:</label>
                    <input type="text" id="title" name="title" value={values.title} onChange={changeHandler} />
                    <label htmlFor="category">Category:</label>
                    <input type="text" id="category" name="category" value={values.category} onChange={changeHandler}/>
                    <label htmlFor="levels">MaxLevel:</label>
                    <input
                        type="number"
                        id="maxLevel"
                        name="maxLevel"
                        min={1}
                        value={values.maxLevel} onChange={changeHandler}
                    />
                    <label htmlFor="game-img">Image:</label>
                    <input type="text" id="imageUrl" name="imageUrl" value={values.imageUrl} onChange={changeHandler}/>
                    <label htmlFor="summary">Summary:</label>
                    <textarea name="summary" id="summary" value={values.summary} onChange={changeHandler}/>
                    <input className="btn submit" type="submit" value="Edit Game" />
                </div>
            </form>
        </section>
    );
}