import {
    CLEAR_SEARCH_ITEM,
    DELETE_COLLECTION, SEARCH_ITEM,
    SET_ALL_COLLECTIONS,
    SET_ALL_ITEMS,
    SET_ERROR,
    SET_LOADING,
    SET_LOADING_DETAIL
} from "../keys";

const initialState = {
    allItems: [],
    allItemsOrigin: [],
    allCollections: [],
    isLoading: false,
    isLoadingDetail: false,
    isError: null,
}

export default function reducer(state = initialState, action) {
    const {type, payload} = action
    switch (type) {
        case SET_ALL_ITEMS:
            return {...state, allItems: payload, allItemsOrigin: payload}
        case SET_ALL_COLLECTIONS:
            let newPayload = state.allCollections.slice()
            newPayload.unshift(payload)
            return {...state, allCollections: newPayload}
        case SET_LOADING:
            return {...state, isLoading: payload}
        case SET_LOADING_DETAIL:
            return {...state, isLoadingDetail: payload}
        case SET_ERROR:
            return {...state, isError: payload}
        case DELETE_COLLECTION:
            let deleteCollection = state.allCollections.filter(el => el.idCollection !== payload)
            return {...state, allCollections: deleteCollection}
        case SEARCH_ITEM:
            let result = [];
            let data = state.allItemsOrigin
            data.forEach((list) => {
                if (list.name.toLocaleLowerCase().search(payload.toLocaleLowerCase()) > -1) {
                    result.push(list);
                }
            });
            return {...state, allItems: result}
        case CLEAR_SEARCH_ITEM:
            let newData = state.allItemsOrigin.slice()
            return {...state, allItems: newData}
        default:
            return state
    }
}