import {
    CLEAR_SEARCH_ITEM,
    DELETE_COLLECTION, SEARCH_ITEM,
    SET_ALL_COLLECTIONS,
    SET_ALL_ITEMS,
    SET_ERROR,
    SET_LOADING,
    SET_LOADING_DETAIL
} from "../keys";
import apiPokemon from "../../apis/apiPokemon";

export function setAllItem(payload) {
    return {
        type: SET_ALL_ITEMS,
        payload,
    };
}

export function setAllCollections(payload) {
    return {
        type: SET_ALL_COLLECTIONS,
        payload,
    };
}

export function setLoading(payload) {
    return {
        type: SET_LOADING,
        payload,
    };
}

export function setLoadingDetail(payload) {
    return {
        type: SET_LOADING_DETAIL,
        payload,
    };
}

export function setError(payload) {
    return {
        type: SET_ERROR,
        payload,
    };
}

export function deleteCollection(payload) {
    return {
        type: DELETE_COLLECTION,
        payload,
    };
}

export function searchItem(payload) {
    return {
        type: SEARCH_ITEM,
        payload,
    };
}

export function clearSearchItem() {
    return {
        type: CLEAR_SEARCH_ITEM,
    };
}


export function fetchPokemonList() {
    return async function (dispatch) {
        dispatch(setError(null));
        dispatch(setLoading(true));
        try {
            const {data} = await apiPokemon({
                method: "GET",
                params: {
                    offset: 0,
                    limit: 30,
                },
            });
            if (!data) {
                dispatch(setLoading(false));
                console.log("ERR-001")
            }
            dispatch(setLoading(false));
            dispatch(setAllItem(data.results));
            return Promise.resolve(data.results);
        } catch (err) {
            dispatch(setLoading(false));
            if (err.response === undefined) {
                console.log("ERR-002")
                dispatch(setError("Internal server error!"));
                return Promise.reject(false);
            }
            if (err.response.status === 500) {
                console.log("ERR-003")
                dispatch(setError("Internal server error!"));
                return Promise.reject(false);
            }
            console.log("ERR-004")
            console.log(err.response)
            dispatch(setError(err.response.data));
            return Promise.reject(false);
        }
    };
}

export function fetchPokemonDetail(pokemonName) {
    return async function (dispatch) {
        dispatch(setLoadingDetail(true));
        try {
            const {data} = await apiPokemon({
                method: "GET",
                url: `/${pokemonName}`
            });
            // console.log(data, "ini data pokemon detail")
            if (!data) {
                dispatch(setLoadingDetail(false));
                console.log("ERR-001")
            }
            dispatch(setLoadingDetail(false));
            return Promise.resolve(data);
        } catch (err) {
            dispatch(setLoadingDetail(false));
            if (err.response === undefined) {
                console.log("ERR-002")
                dispatch(setError("Internal server error!"));
                return Promise.reject(false);
            }
            if (err.response.status === 500) {
                console.log("ERR-003")
                dispatch(setError("Internal server error!"));
                return Promise.reject(false);
            }
            console.log("ERR-004")
            console.log(err.response)
            dispatch(setError(err.response.data));
            return Promise.reject(false);
        }
    };
}
