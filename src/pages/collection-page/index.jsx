import React from 'react';
import "./collection-page.scss"
import {PokeCardCollection} from "../../components";
import {useSelector} from "react-redux";

const CollectionPage = () => {
    const {
        allCollections
    } = useSelector((state) => state.itemState);

    return (
        <div id="collection-page" className="flex flex-col gap-2">
            <div className="title-page shadow-md">
                <span>Your Pokémon</span>
            </div>
            <div className="poke-collection-card-wrapper flex flex-col gap-3">
                {(() => {
                    if (allCollections.length !== 0) {
                        return (
                            allCollections?.map((item) => (
                                <PokeCardCollection key={item.idCollection} item={item}></PokeCardCollection>
                            ))
                        )
                    } else {
                        return (
                            <span className="no-pokemon">You have no collection!</span>
                        )
                    }
                })()}
            </div>
        </div>
    );
};

export default CollectionPage;