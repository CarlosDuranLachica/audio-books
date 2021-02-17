import React from "react";
import { costs, plays } from "./tech_test_jr.json";

function Costo() {
    var CostoTotalLibro = 0;
    var CostoTotal = 0;
    costs.map((itemC) => {
        var Time = 0;
        var Lectores = 0;
        plays.map((itemP) => {
            if (itemC.audiobook_id === itemP.audiobook_id) {
                Time = Time + itemP.seconds;
                Lectores = Lectores + 1;
            }
        });
        const Nombre = itemC.audiobook_title;
        CostoTotalLibro = itemC.cost_per_second * Time;
        console.log(itemC.id+" el Libro " + Nombre);
        console.log("cuesta $" + CostoTotalLibro);
        console.log("Fue leido por: " + Lectores + " Usuarios")
        CostoTotal = CostoTotal + CostoTotalLibro;

    });
    console.log("Costo Total $" + CostoTotal);
}

export default function Index() {
    Costo();

    return <div className="flex-column center"> Test </div>;
}
