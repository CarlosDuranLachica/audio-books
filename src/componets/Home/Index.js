import { useEffect, useState } from "react";
import { Redirect, Link } from "react-router-dom";

import "./style.css";
import { Button } from "@material-ui/core";
import ButtonDelete from "./ButtonDelete";

import { useDispatch, useSelector } from "react-redux";

import {
  ObtenerBooks,
  BuscarBooks,
} from "../Redux/Reducers/BooksReducer";

const Index = () => {
  const dispatch = useDispatch();
  const Data = useSelector((store) => store.DataBooks.Details);
  console.log(Data);
  const [Buscar, setBuscar] = useState("");

  useEffect(() => {
    if (Data === null) {
      dispatch(ObtenerBooks());
    } else {
      dispatch(BuscarBooks(Buscar));
    }
  }, [Buscar]);
  /* if (Data !== null) {
        return <Redirect to="/Details" />
    } */
  return (
    <div className="books">
      <div className="status">
        <h1>Books</h1>
        <Link to="/BookDetails">
          <Button color="primary">
            Añadir nuevo libro <b>+</b>
          </Button>
        </Link>
        <div>
          <input
            type="text"
            placeholder=" Buscar:"
            onChange={(e) => setBuscar(e.target.value)}
          />
        </div>
      </div>
      <div className="cards">
        {Data ? (
          Data.map((Books, index) => (
            <div key={index} className="card">
              <img src={Books.fields.cover["es-MX"]} alt="actor" />
              <div className="details flex-column">
                <h3>{Books.fields.title["es-MX"]}</h3>
                <div className="flex-column">
                  <div>
                    <p>Autor: {Books.fields.authors["es-MX"]}</p>
                    <p>Narrador: {Books.fields.narrators["es-MX"]}</p>
                  </div>
                  <div className="flex-row justify">
                    <h4>Tiempo: {Books.fields.duration["es-MX"]}</h4>
                    <h4>${Books.fields.cost_per_play["es-MX"]}</h4>
                  </div>
                </div>
              </div>
              <div className="actions center">
                <Link
                  to={`/BookDetails/Editar/${Books.sys.id}`}
                  style={{ marginRight: "10px" }}
                >
                  <Button color="primary">Editar</Button>
                </Link>
                <ButtonDelete /* Borrar */ ID={Books.sys.id} Index={index}/>
              </div>
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Index;
