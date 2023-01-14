import * as React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {HomePage, CollectionPage} from "./pages";
import {NavBar} from "./components";
import "./App.scss"

function App() {
    return (
        <div id="App">
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="collection" element={<CollectionPage/>}/>
                <Route path="*" element={<Navigate to={"/"}/>}/>
            </Routes>
            <NavBar></NavBar>
        </div>
    );
}

export default App;
