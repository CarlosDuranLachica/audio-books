import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "./Style.css";
import { useStyles } from "./Style";

import clsx from "clsx";
import {
  TextField,
  Button,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@material-ui/core";
import Radio, { RadioProps } from "@material-ui/core/Radio";

import imgprueba from "../../images/Beek.svg";

import { useDispatch, useSelector } from "react-redux";
import {
  CrearBooks,
  ObtenerUnBook,
  EditarBooks,
} from "../Redux/Reducers/BooksReducer";

const Index = ({ match }) => {
  const [titulo, setTitulo] = useState("");
  const [URL, setURL] = useState("");
  const [autor, setAutor] = useState("");
  const [narrador, setNarrador] = useState("");
  const [original, setOriginal] = useState("false");
  const [duracion, setDuracion] = useState("");
  const [costo, setCosto] = useState("");
  const [view, setView] = useState("Nuevo Libro");
  const dispatch = useDispatch();

  const Data = useSelector((store) => store.DataBooks.Detail);

  useEffect(() => {
    if (match.params.id) {
      dispatch(ObtenerUnBook(match.params.id));
      setView("Editar");
    }
  }, [view]);

  useEffect(() => {
    if (view === "Editar" && Data) {
      Data.map((items) => {
        setTitulo(items.fields.title["es-MX"]);
        setURL(items.fields.cover["es-MX"]);
        setAutor(items.fields.authors["es-MX"]);
        setNarrador(items.fields.narrators["es-MX"]);
        setOriginal(items.fields.is_original["es-MX"]);
        setDuracion(items.fields.duration["es-MX"]);
        setCosto(items.fields.cost_per_play["es-MX"]);
      });
    }
  }, [Data]);

  const guardar = () => {
    if (match.params.id) {
      const id = match.params.id;
      dispatch(
        EditarBooks({ titulo, URL, autor, narrador, original, duracion, costo, id})
      );
    } else if (view === "Nuevo Libro") {
      dispatch(
        CrearBooks({ titulo, URL, autor, narrador, original, duracion, costo })
      );
    }
    setTitulo("");
    setURL("");
    setAutor("");
    setNarrador("");
    setOriginal("false");
    setDuracion("");
    setCosto("");
  };
  const classes = useStyles();
  return (
    <div className="details-form flex-row col-11 col-sm-10">
      <div className="col-sm-8 col-md-6">
        <h1>{view}</h1>
        <div className="container">
          <form className={classes.root} noValidate autoComplete="off">
            <TextField
              className={classes.allLine}
              id="outlined-secondary"
              label="Nombre:"
              variant="outlined"
              color="primary"
              value={titulo}
              onChange={(e) => {
                setTitulo(e.target.value);
              }}
            />
            <TextField
              className={classes.allLine}
              id="outlined-secondary"
              label="URL Imagen:"
              variant="outlined"
              color="primary"
              value={URL}
              onChange={(e) => {
                setURL(e.target.value);
              }}
            />
            <TextField
              id="outlined-secondary"
              label="Autor:"
              variant="outlined"
              color="primary"
              value={autor}
              onChange={(e) => {
                setAutor(e.target.value);
              }}
            />
            <TextField
              id="outlined-secondary"
              label="Narrador:"
              variant="outlined"
              color="primary"
              value={narrador}
              onChange={(e) => {
                setNarrador(e.target.value);
              }}
            />
            <TextField
              type="number"
              id="outlined-secondary"
              label="Duracion:"
              variant="outlined"
              color="primary"
              value={duracion}
              onChange={(e) => {
                setDuracion(e.target.value);
              }}
            />
            <TextField
              type="number"
              id="outlined-secondary"
              label="Costo:"
              variant="outlined"
              color="primary"
              value={costo}
              onChange={(e) => {
                setCosto(e.target.value);
              }}
            />
            <FormControl className={classes.boxCheck} component="fieldset">
              <FormLabel component="legend">¿Es original?</FormLabel>
              <RadioGroup
                aria-label="gender"
                name="gender1"
                defaultValue={original ? original : "false"}
                onChange={(e) => setOriginal(e.target.value)}
              >
                <FormControlLabel
                  value="false"
                  control={
                    <Radio
                      className={classes.check}
                      disableRipple
                      color="default"
                      checkedIcon={
                        <span
                          className={clsx(classes.icon, classes.checkedIcon)}
                        />
                      }
                      icon={<span className={classes.icon} />}
                    />
                  }
                  label="no"
                />
                <FormControlLabel
                  value="true"
                  control={
                    <Radio
                      className={classes.check}
                      disableRipple
                      color="default"
                      checkedIcon={
                        <span
                          className={clsx(classes.icon, classes.checkedIcon)}
                        />
                      }
                      icon={<span className={classes.icon} />}
                    />
                  }
                  label="si"
                />
              </RadioGroup>
            </FormControl>
            <div className={classes.boxButton}>
                <Button
                  onClick={() => {
                    guardar();
                  }}
                  variant="outlined"
                  color="primary"
                  style={{
                    marginRight:"10px",
                    padding: "17px 14px",
                    backgroundColor: "rgba(2, 152, 252, 0.5)",
                    fontSize: "0.7rem",
                    fontWeight: "bold",
                  }}
                >
                  Guardar
                </Button>
              <Link to="/Home">
                <Button
                  variant="outlined"
                  color="secondary"
                  style={{
                    padding: "17px 14px",
                    backgroundColor: "rgba(245, 0, 87, 0.5)",
                    fontSize: "0.7rem",
                    fontWeight: "bold",
                  }}
                >
                  Cancelar
                </Button>
              </Link>
            </div>
          </form>
        </div>
      </div>

      <img
        className="container col-sm-3"
        src={URL === "" ? imgprueba : URL}
        width="20%"
        height="300px"
        alt=""
      />
    </div>
  );
};

export default Index;
