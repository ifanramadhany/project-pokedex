import React from 'react';
import "./loading-skeleton-poke-card.scss"

const LoadingSkeletonPokeCard = () => {
    return (
        <React.Fragment>
            <div id="skeleton-poke-card" className="animate-pulse"></div>
            <div id="skeleton-poke-card" className="animate-pulse"></div>
            <div id="skeleton-poke-card" className="animate-pulse"></div>
            <div id="skeleton-poke-card" className="animate-pulse"></div>
            <div id="skeleton-poke-card" className="animate-pulse"></div>
            <div id="skeleton-poke-card" className="animate-pulse"></div>
            <div id="skeleton-poke-card" className="animate-pulse"></div>
            <div id="skeleton-poke-card" className="animate-pulse"></div>
            <div id="skeleton-poke-card" className="animate-pulse"></div>
            <div id="skeleton-poke-card" className="animate-pulse"></div>
        </React.Fragment>
    );
};

export default LoadingSkeletonPokeCard;
