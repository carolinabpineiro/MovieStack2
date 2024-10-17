// favorites.js

const moviesFavs = document.getElementById('movies-favs');

const initFavorites = () => {
    renderFavs(); // Llama a renderFavs al inicio para cargar las películas favoritas
};

const loadFavorites = () => {
    const favorites = JSON.parse(localStorage.getItem('favoritas')) || [];
    return favorites;
}

const renderFavs = () => {
    const favorites = loadFavorites();

    if (favorites.length === 0) {
        moviesFavs.innerHTML = '<p class="text-center">No hay películas favoritas.</p>';
    } else {
        const cardsCreadasHTML = favorites.map(movie => {
            return `<div class="gap-4 mt-4">
        <div class="relative flex flex-wrap w-80 bg-white rounded-lg shadow-lg overflow-hidden gap-3">
            
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
        }).join('');

        moviesFavs.innerHTML = cardsCreadasHTML;
    }
}

function deleteFav(movieId) {
    let arrayFavoritas = JSON.parse(localStorage.getItem("favoritas")) || [];
    let index = arrayFavoritas.findIndex(movie => movie.id === movieId);
    if (index !== -1) {
        arrayFavoritas.splice(index, 1);
        localStorage.setItem("favoritas", JSON.stringify(arrayFavoritas));
        renderFavs(); // Volver a renderizar las tarjetas después de eliminar
    }
}

// Función para limpiar todas las películas favoritas y el Local Storage
const resetFavorites = () => {
    localStorage.removeItem('favoritas');
    renderFavs(); // Volver a renderizar para actualizar la vista
};

// Event listener para el botón de reset
const resetButton = document.getElementById('reset-favorites');
if (resetButton) {
    resetButton.addEventListener('click', resetFavorites);
}

document.addEventListener('DOMContentLoaded', initFavorites);
