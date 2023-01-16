import React, {useEffect, useState} from 'react';
import "./home-page.scss"
import {pokeball} from "../../assets";
import {LoadingSkeletonPokeCard, PokeCard} from "../../components";
import {useDispatch, useSelector} from "react-redux";
import {fetchPokemonList, searchItem} from "../../store/actions/itemAction";

const HomePage = () => {
    const dispatch = useDispatch();
    const {
        allItems,
        isLoading,
    } = useSelector((state) => state.itemState);
    const [textInput, setTextInput] = useState('');

    const handleTextInputChange = (event) => {
        dispatch(searchItem(event.target.value))
        setTextInput(event.target.value);
    };

    useEffect(() => {
        if (allItems.length === 0) {
            dispatch(fetchPokemonList())
                .then((result) => {
                })
                .catch((err) => {
                });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div id="home-page">
            <div className="header flex flex-col gap-2 shadow-md">
                <img className="pokeball-img" src={pokeball} alt="pokeball img"/>
                <span className="title-app">Pokédex</span>
                <input value={textInput} onChange={handleTextInputChange} placeholder="Search"/>
            </div>
            <div className="poke-card-wrapper grid grid-cols-2 gap-3">
                {
                    isLoading ? (
                        <LoadingSkeletonPokeCard></LoadingSkeletonPokeCard>
                    ) : (
                        (() => {
                            if (allItems.length !== 0) {
                                return (
                                    allItems?.map((item) => (
                                        <PokeCard key={item.name} item={item}></PokeCard>
                                    ))
                                )
                            } else {
                                return (
                                    <span className="pokemon-not-found">Pokemon not found!</span>
                                )
                            }
                        })()

                    )
                }
            </div>
        </div>
    );
};

export default HomePage;