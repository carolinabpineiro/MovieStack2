// index.js

const contenedor = document.getElementById("contenedor");
const API_KEY = "0ff70d54-dc0b-4262-9c3d-776cb0f34dbd";
let dataMovies = []; // Variable global para almacenar las películas

// Función para inicializar la carga de películas desde la API
function cargarPeliculas() {
    fetch("https://moviestack.onrender.com/api/movies", {
        method: "GET",
        headers: {
            "x-api-key": API_KEY,
        },
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error('Error al cargar las películas');
        }
        return response.json();
    })
    .then((data) => {
        dataMovies = data.movies; // Asignar los datos a la variable global
        dataMovies.forEach((movie) => {
            movie.image = `https://moviestack.onrender.com/static/${movie.image}`;
            movie.favorito = esFavorita(movie.id); // Agregar propiedad favorito inicialmente como false
        });
        imprimirCardHtml(dataMovies);
    })
    .catch((error) => {
        console.error("Hubo un error:", error);
    })
    .finally(() => {
        console.log("La carga de películas ha finalizado.");
    });
}

// Función para estructurar la tarjeta de película
function estructuraCard(movie) {
    return `<div class="gap-4 mt-4">
        <div class="relative flex flex-wrap w-80 bg-white rounded-lg shadow-lg overflow-hidden gap-3">
            <button data-fav="si" data-id="${movie.id}" class="corazon-btn absolute top-2 right-2 text-3xl font-bold text-white outline-none" onclick="toggleFavorito('${movie.id}')">
                <span id="corazon-icon-${movie.id}" class="heart-icon ${movie.favorito ? 'text-red-500' : 'text-white'}">&#9825;</span>
            </button>
            <img class="w-full h-48 object-cover" src="${movie.image}" alt="Card Image">
            <div class="p-4 flex flex-col justify-between">
                <div>
                    <h2 class="text-lg font-bold text-gray-800 mb-2">${movie.title}</h2>
                    <span class="text-sm text-gray-500">${movie.tagline}</span>
                    <p class="text-gray-700 mt-2 line-clamp-3 overflow-hidden overflow-ellipsis">${movie.overview}</p>
                </div>
                <a href="./details.html?id=${movie.id}" class="bg-rose-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded mt-2 text-center">Ver +</a>
            </div>
        </div>
    </div>`;
}

// Función para imprimir las tarjetas HTML de las películas
function imprimirCardHtml(listaMovies) {
    let cards = "";
    listaMovies.forEach((movie) => {
        cards += estructuraCard(movie);
    });
    contenedor.innerHTML = cards;
}

// Manejar el evento de cambio en el selector de género
const selector = document.getElementById("select");
selector.addEventListener("change", () => {
    const generoSeleccionado = selector.value;
    const busqueda = inputBusqueda.value.trim().toLowerCase();
    const peliculasFiltradas = filtrarPeliculas(dataMovies, generoSeleccionado, busqueda);
    imprimirCardHtml(peliculasFiltradas);
});

// Manejar el evento de búsqueda por título
const inputBusqueda = document.getElementById("search");
inputBusqueda.addEventListener("input", () => {
    const generoSeleccionado = selector.value;
    const busqueda = inputBusqueda.value.trim().toLowerCase();
    const peliculasFiltradas = filtrarPeliculas(dataMovies, generoSeleccionado, busqueda);
    imprimirCardHtml(peliculasFiltradas);
});

// Función para filtrar películas por género y búsqueda
function filtrarPeliculas(array, generoSeleccionado, busqueda) {
    return array.filter((movie) => {
        const cumpleGenero = generoSeleccionado === "default" || movie.genres.some((g) => g.toLowerCase() === generoSeleccionado.toLowerCase());
        const cumpleBusqueda = !busqueda || movie.title.toLowerCase().includes(busqueda);
        return cumpleGenero && cumpleBusqueda;
    });
}

// Obtener el select
const select = document.getElementById('select');

// Datos de géneros (simulación de datos)
const generos = [
  { value: 'default', text: 'All' },
  { value: 'horror', text: 'Horror' },
  { value: 'mystery', text: 'Mystery' },
  { value: 'thriller', text: 'Thriller' },
  { value: 'action', text: 'Action' },
  { value: 'drama', text: 'Drama' },
  { value: 'crime', text: 'Crime' },
  { value: 'fantasy', text: 'Fantasy' },
  { value: 'comedy', text: 'Comedy' },
  { value: 'adventure', text: 'Adventure' },
  { value: 'animation', text: 'Animation' },
  { value: 'family', text: 'Family' },
  { value: 'romance', text: 'Romance' },
  { value: 'science fiction', text: 'Science Fiction' },
  { value: 'history', text: 'History' }
];

// Función para crear opciones
function crearOpciones(options) {
  return options.map(option => {
    const { value, text } = option;
    const optionEl = document.createElement('option');
    optionEl.value = value;
    optionEl.textContent = text;
    return optionEl;
  });
}

// Generar las opciones y agregarlas al select
const opcionesGeneradas = crearOpciones(generos);
opcionesGeneradas.forEach(opcion => select.appendChild(opcion));

// Función para verificar si una película es favorita
const esFavorita = (idMovie) => {
    const favoritas = JSON.parse(localStorage.getItem('favoritas')) || [];
    return favoritas.some(movie => movie.id === idMovie);
};

// Función para marcar una película como favorita
function toggleFavorito(idMovie) {
    console.log("ID de película recibido:", idMovie);

    const movie = dataMovies.find((movie) => movie.id === idMovie);
    if (!movie) {
        console.error(`No se encontró ninguna película con el ID: ${idMovie}`);
        return;
    }

    movie.favorito = !movie.favorito; // Cambiar el estado de favorito

    // Actualizar el ícono del corazón
    const corazonIcon = document.getElementById(`corazon-icon-${idMovie}`);
    if (corazonIcon) {
        corazonIcon.classList.toggle('text-red-500', movie.favorito);
    } else {
        console.error(`No se encontró ningún ícono de corazón con el ID: corazon-icon-${idMovie}`);
    }

    // Guardar el estado en localStorage
    let arrayFavoritas = JSON.parse(localStorage.getItem("favoritas")) || [];
    const index = arrayFavoritas.findIndex((favMovie) => favMovie.id === idMovie);
    if (index !== -1) {
        arrayFavoritas.splice(index, 1);
    } else {
        arrayFavoritas.push(movie);
    }
    localStorage.setItem("favoritas", JSON.stringify(arrayFavoritas));
}

// Inicializar la carga de películas al cargar la página
document.addEventListener('DOMContentLoaded', cargarPeliculas);
