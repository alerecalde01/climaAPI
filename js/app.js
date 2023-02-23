// Traemos del DOM (HTML) 
const container = document.querySelector(".container");
const resultado = document.querySelector("#resultado");
const formulario = document.querySelector("#formulario");

window.addEventListener("load", () => {
    formulario.addEventListener("submit", buscarClima);
})

let buscarClima = (e) => {
    e.preventDefault();

    // Validar

    // Traemos el valor que escribe el usuario
    const ciudad = document.querySelector("#ciudad").value;
    const pais = document.querySelector("#pais").value;

    if (ciudad === "" || pais === "") {
        mostrarError("Ambos campos son obligatorios")

        return;
    }


    // Consultar api
    consultarAPI(ciudad, pais);
};

let mostrarError = (msj) => {
    const alerta = document.querySelector(".bg-red-100");

    if (!alerta) {

        //Creamos alerta de error
        const alerta = document.createElement("div");

        alerta.classList.add("bg-red-100", "border-red-400", "text-red-700", "px-4", "py-3", "rounded",
            "max-w-md", "mx-auto", "mt-6", "text-center");

        alerta.innerHTML = `
        <strong class="font-bold">Error!</strong>
        <span class="block">${msj}</span>
        `;

        container.appendChild(alerta);

        // Eliminar alerta pasado los 5 segundos
        setTimeout(() => {
            alerta.remove();
        }, 5000)
    }

};

let consultarAPI = (ciudad, pais) => {

    const appID = "8d03e167c96a2e47fb5ded926c2b4bb8";

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appID}`;

    Spinner(); // Llamo al spinner antes de consultar al servidor

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(datos => {
            //Limpiamos HTML anterior
            limpiarHTML();

            // console.log(datos);
            if (datos.cod === "404") {
                mostrarError("Ciudad no encontrada")
                return;
            }

            // Mostrar respuesat en el HTML
            mostrarClima(datos);
        });



};

let mostrarClima = (datos) => {
    const { name, main: { temp, temp_max, temp_min }, sys : {country} } = datos;

    console.log(datos)

    const centigrados = kelvinACentigrados(temp);
    const max = kelvinACentigrados(temp_max);
    const min = kelvinACentigrados(temp_min);


    const nomCiudad = document.createElement("p");
    nomCiudad.textContent = `Clima en ${name}, ${country}`;
    nomCiudad.classList.add("font-bold", "text-2xl");

    const tempActual = document.createElement("p");
    tempActual.innerHTML = `${centigrados} &#8451;`;
    tempActual.classList.add("font-bold", "text-6xl");

    const tempMaxima = document.createElement("p");
    tempMaxima.innerHTML = `Max: ${max} &#8451;`;
    tempMaxima.classList.add("text.xl");


    const tempMinima = document.createElement("p");
    tempMinima.innerHTML = `Min: ${min} &#8451;`;
    tempMinima.classList.add("text.xl");

    const resultadoDiv = document.createElement("div");
    resultadoDiv.classList.add("text-center", "text-white");
    resultadoDiv.appendChild(nomCiudad);
    resultadoDiv.appendChild(tempActual);
    resultadoDiv.appendChild(tempMaxima);
    resultadoDiv.appendChild(tempMinima);



    resultado.appendChild(resultadoDiv);

};

const kelvinACentigrados = grados => parseInt(grados - 273.15);


// const kelvinACentigrados = (grados) => {
//     return parseInt(grados - 273.15);
// };


let limpiarHTML = () => {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
};

let Spinner = () => {

    limpiarHTML();
    
    const divSpinner = document.createElement("div");
    divSpinner.classList.add("sk-fading-circle");

    divSpinner.innerHTML = `
        <div class="sk-circle1 sk-circle"></div>
        <div class="sk-circle2 sk-circle"></div>
        <div class="sk-circle3 sk-circle"></div>
        <div class="sk-circle4 sk-circle"></div>
        <div class="sk-circle5 sk-circle"></div>
        <div class="sk-circle6 sk-circle"></div>
        <div class="sk-circle7 sk-circle"></div>
        <div class="sk-circle8 sk-circle"></div>
        <div class="sk-circle9 sk-circle"></div>
        <div class="sk-circle10 sk-circle"></div>
        <div class="sk-circle11 sk-circle"></div>
        <div class="sk-circle12 sk-circle"></div>
    `;

    resultado.appendChild(divSpinner); 
};