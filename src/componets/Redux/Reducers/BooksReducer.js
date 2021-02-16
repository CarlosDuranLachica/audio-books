//Constantes
const dataInicial_Books = {
  Details: null,
  Detail: null,
};

const API_TOKEN = "CFPAT-LBtveUvtDi7YjAhsyNzZURthngcrVnIr53eOZjYnxuc";
const SPACE_ID = "1t4hjzo7y0kb";
const ENVIRONMENT = "master";
const CONTENT_TYPE_ID = "audiocontent-v10";

//Types
const OBTENER = "OBTENER";
const OBTENERUNO = "OBTENERUNO";
const BUSCAR = "BUSCAR";
const CREAR = "CREAR";
const EDITAR = "EDITAR";
const BORRAR = "BORRAR";

//Reducers
export default function BooksRedux(state = dataInicial_Books, action) {
  switch (action.type) {
    case OBTENER:
      return { ...state, Details: action.payload.Details };
    case OBTENERUNO:
      return { ...state, Detail: action.payload.Detail };
    case BUSCAR:
      return { ...state, Details: action.payload.Details };
    case CREAR:
      return { ...state, /* Details: action.payload.Details */ };
    case BORRAR:
      return { ...state, Details: action.payload.Details };
    default:
      return state;
  }
}

//Acciones

/* OBTENER LIBROS */
export const ObtenerBooks = () => async (dispatch, getState) => {
  try {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      `Bearer ${API_TOKEN}`
    );

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    await fetch(
      `https://api.contentful.com/spaces/${SPACE_ID}/environments/${ENVIRONMENT}/entries?select=fields,sys.id,sys.version&locale=es-MX&content_type=${CONTENT_TYPE_ID}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        dispatch({
          type: OBTENER,
          payload: {
            Details: result.items,
          },
        });
      })
      .catch((error) => console.log("error", error));
  } catch (error) {
    console.log(error);
  }
};

/* OBTENER UN LIBRO */
export const ObtenerUnBook = (BuscarID) => async (dispatch, getState) => {
  try {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      `Bearer ${API_TOKEN}`    );

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    await fetch(
      `https://api.contentful.com/spaces/${SPACE_ID}/environments/${ENVIRONMENT}/entries?sys.id=${BuscarID}&select=fields,sys.id,sys.version&locale=es-MX`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        dispatch({
          type: OBTENERUNO,
          payload: {
            Detail: result.items,
          },
        });
      })
      .catch((error) => console.log("error", error));
  } catch (error) {
    console.log(error);
  }
};

/* BUSCAR LIBROS */
export const BuscarBooks = (Buscar) => async (dispatch, getState) => {
  try {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      `Bearer ${API_TOKEN}`    );

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    await fetch(
      `https://api.contentful.com/spaces/${SPACE_ID}/environments/${ENVIRONMENT}/entries?query=${Buscar}&select=fields,sys.id&locale=es-MX&content_type=${CONTENT_TYPE_ID}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        dispatch({
          type: BUSCAR,
          payload: {
            Details: result.items,
          },
        });
      })
      .catch((error) => console.log("error", error));
  } catch (error) {
    console.log(error);
  }
};

/* CREAR LIBROS */
export const CrearBooks = (Guardar) => async (dispatch, getState) => {
  var fecha = new Date();
  try {
    var myHeaders = new Headers();
    myHeaders.append("X-Contentful-Content-Type", "audiocontent-v10");
    myHeaders.append(
      "Authorization",
      `Bearer ${API_TOKEN}`    );
    myHeaders.append("Content-Type", "text/plain");
   
    var raw =
    `{ \"fields\": {\"title\": { \"es-MX\": \"${Guardar.titulo}\" }, \"is_original\": { \"es-MX\": ${Guardar.original} }, \"street_date\": { \"es-MX\": \"${fecha.toISOString()}\" }, \"cost_per_play\": { \"es-MX\": ${Guardar.costo} }, \"authors\": { \"es-MX\": [ \ "${Guardar.autor}" ] }, \"narrators\": { \"es-MX\": [ \"${Guardar.narrador}" ] }, \"duration\": { \"es-MX\": ${Guardar.duracion} }, \"cover\": { \"es-MX\": \"${Guardar.URL}" } } }`;
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    await fetch(
      `https://api.contentful.com/spaces/${SPACE_ID}/environments/${ENVIRONMENT}/entries`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        dispatch({
          type: CREAR,
          payload: {
            Details: result.items,
          },
        });
      })
      .catch((error) => console.log("error", error));
  } catch (error) {
    console.log(error);
  }
};

/* EDITAR LIBROS */
export const EditarBooks = (Guardar) => async (dispatch, getState) => {
  var fecha = new Date();
  try {
    var myHeaders = new Headers();
    myHeaders.append("X-Contentful-Content-Type", "audiocontent-v10");
    myHeaders.append("X-Contentful-Version", "1");
    myHeaders.append(
      "Authorization",
      `Bearer ${API_TOKEN}`);
    myHeaders.append("Content-Type", "text/plain");
   
    var raw =
    `{ \"fields\": {\"title\": { \"es-MX\": \"${Guardar.titulo}\" }, \"is_original\": { \"es-MX\": ${Guardar.original} }, \"street_date\": { \"es-MX\": \"${fecha.toISOString()}\" }, \"cost_per_play\": { \"es-MX\": ${Guardar.costo} }, \"authors\": { \"es-MX\": [ \ "${Guardar.autor}" ] }, \"narrators\": { \"es-MX\": [ \"${Guardar.narrador}" ] }, \"duration\": { \"es-MX\": ${Guardar.duracion} }, \"cover\": { \"es-MX\": \"${Guardar.URL}" } } }`;
    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    await fetch(
      `https://api.contentful.com/spaces/${SPACE_ID}/environments/${ENVIRONMENT}/entries/${Guardar.id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        dispatch({
          type: EDITAR,
          payload: {
            Details: result.items,
          },
        });
      })
      .catch((error) => console.log("error", error));
  } catch (error) {
    console.log(error);
  }
};

/* ELIMINAR LIBROS */
export const BorrarBooks = (id, index) => async (dispatch, getState) => {
  try {
    console.log(id, index);
    var myHeaders = new Headers();
    myHeaders.append("X-Contentful-Content-Type", "audiocontent-v10");
    myHeaders.append(
      "Authorization",
      `Bearer ${API_TOKEN}`    );
    myHeaders.append("Content-Type", "text/plain");

    var raw = "";

    var requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    await fetch( 
      `https://api.contentful.com/spaces/${SPACE_ID}/environments/${ENVIRONMENT}/entries/${id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => { console.log(result); })
      .catch((error) => console.log("error", error));
      var Books = getState().DataBooks.Details;
      var Borrar = Books.filter(item => item !== Books[index]);
      dispatch({
        type: BORRAR,
        payload: {
          Details: Borrar,
        },
      });
      console.log(Borrar)
  } catch (error) {
    console.log(error);
  }
};