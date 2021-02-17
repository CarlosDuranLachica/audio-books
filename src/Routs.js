import React from 'react'

import {BrowserRouter, Route, Redirect, Switch} from "react-router-dom"

/* Vistas */
import Home from "./componets/Home/Index";
import BookDetails from "./componets/BookDetails/Index"; 
import Test from "./componets/Test/Index";

export default function Routs() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/Home" component={Home}/>
                <Route exact path="/BookDetails" component={BookDetails}/>
                <Route exact path="/BookDetails/Editar/:id" component={BookDetails}/>  
                <Route exact path="/Test" component={Test}/>  
                <Redirect from="/" to="/Home"/>
            </Switch>
        </BrowserRouter>
    )
}
