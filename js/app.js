const container = document.querySelector(".container");
const resultado = document.querySelector("#resultado");
const formulario = document.querySelector("#formulario");

window.addEventListener("load", () => {
  formulario.addEventListener("submit", buscarClima);
});

function buscarClima(e) {
  e.preventDefault();

  // Validar
  const ciudad = document.querySelector("#ciudad").value;
  const pais = document.querySelector("#pais").value;

  if (!ciudad || !pais) return mostrarError("Ambos campos son obligatorios");
  //  console.log(ciudad, pais);

  // Consultal la API
  consultarAPI(ciudad, pais);
}

function mostrarError(mensaje) {
  const alerta = document.querySelector(".bg-red-100");

  if (!alerta) {
    // Crear una alerta
    const alerta = document.createElement("div");
    alerta.classList.add(
      "bg-red-100",
      "border-red-400",
      "text-red-700",
      "px-4",
      "py-3",
      "rounded",
      "max-w-md",
      "mx-auto",
      "mt-6",
      "text-center"
    );
    alerta.innerHTML = `
      <strong class="font-bold">Error!</strong>
      <strong class="block">${mensaje}</strong>
      `;

    container.appendChild(alerta);

    // Eliminar la alerta
    setTimeout(() => {
      alerta.remove();
    }, 3000);
  }
}

function consultarAPI(ciudad, pais) {
  const apiKey = "9a05d42093bb16a3962839dfa057b873";

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${apiKey}`;

  Spinner();

  fetch(url)
    .then((data) => data.json())
    .then((data) => {
      limpiarHTML(); // limpiar HTML previo
      if (data.cod === "404") return mostrarError("Ciudad no encontrada");

      // Imprime la respuesta en el HTML
      mostrarClima(data);
    });
}

function mostrarClima(data) {
  const {
    name,
    main: { temp, temp_max, temp_min },
  } = data;

  const ciudad = document.createElement("p");
  ciudad.textContent = `Clima en ${name}`;
  ciudad.classList.add("font-bold", "text-2xl");

  const centrigrado = kelvinACentrigrado(temp);
  const max = kelvinACentrigrado(temp_max);
  const min = kelvinACentrigrado(temp_min);

  const actual = document.createElement("p");
  actual.innerHTML = `${centrigrado} &#8451;`;
  actual.classList.add("font-bold", "text-6xl");

  const tempMax = document.createElement("p");
  tempMax.innerHTML = `Max: ${max} &#8451;`;
  tempMax.classList.add("text-xl");

  const tempMin = document.createElement("p");
  tempMin.innerHTML = `Min: ${min} &#8451;`;
  tempMin.classList.add("text-xl");

  const div = document.createElement("div");
  div.classList.add("text-center", "text-white");
  div.appendChild(ciudad);
  div.appendChild(tempMax);
  div.appendChild(actual);
  div.appendChild(tempMin);

  resultado.appendChild(div);
}

const kelvinACentrigrado = (grados) => parseInt(grados - 273.15);

function limpiarHTML() {
  while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild);
  }
}

function Spinner() {
  limpiarHTML();

  const divSpinner = document.createElement("div");
  divSpinner.classList.add("sk-cube-grid");

  divSpinner.innerHTML = `
  <div class="sk-cube sk-cube1"></div>
  <div class="sk-cube sk-cube2"></div>
  <div class="sk-cube sk-cube3"></div>
  <div class="sk-cube sk-cube4"></div>
  <div class="sk-cube sk-cube5"></div>
  <div class="sk-cube sk-cube6"></div>
  <div class="sk-cube sk-cube7"></div>
  <div class="sk-cube sk-cube8"></div>
  <div class="sk-cube sk-cube9"></div>
  `;

  resultado.appendChild(divSpinner);
}
