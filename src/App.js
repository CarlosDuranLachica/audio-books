import "./App.css";
import Logo from "./images/Beek.svg";
import imgDecoration1 from "./images/covers-mosaic.png";
import imgDecoration2 from "./images/25-razones.png";

import { Provider } from "react-redux";
import generateStore from "./componets/Redux/Store";

import Rousts from "./Routs";

function App() {
  const store = generateStore();

  return (
    <main className="App">
      <div className="Decoration">
        <img className="Decoration1" src={imgDecoration1} />
        <img className="Decoration2" src={imgDecoration2} />
      </div>
      <section className="glass col-11 col-xl-9">
        <img className="logo" src={Logo} />
        <Provider store={store}>
          <Rousts />
        </Provider>
      </section>
    </main>
  );
}

export default App;
