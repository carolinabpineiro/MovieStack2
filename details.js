// Realizar la solicitud a la API
fetch('https://moviestack.onrender.com/api/movies', {
    method: "GET",
    headers: {
        'x-api-key': API_KEY,
    },
})
.then(response => response.json())
.then((data) => {
  dataMovies = data.movies; // Asignar los datos a la variable global
  dataMovies.forEach((movie) => {
      movie.image = `https://moviestack.onrender.com/static/${movie.image}`;
  });
    // Lógica para encontrar la película por su ID desde los parámetros de la URL
    let urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has("id")) {
        let movieId = urlParams.get("id");
        let movie = dataMovies.find(movie => movie.id == movieId);

        if (movie) {
            // Actualizar el contenido de verMas con los detalles de la película
            verMas.innerHTML = `
           <div class="container mx-auto p-8 bg-white rounded-lg shadow-lg flex flex-col items-center">
    <div class="mb-4 text-center">
        <h1 class="text-3xl font-bold text-rose-700 mb-4 hover:scale-105 transition-transform duration-300">${
          movie.title
        }</h1>
    </div>
    <div class="flex flex-wrap gap-4 w-full">
        <div class="w-full md:w-2/3 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 items-center">
            <img src="${
              movie.image
            }" alt="Imagen de la película" class="w-full h-auto object-cover rounded-lg mb-4 md:w-1/2 hover:scale-105 transition-transform duration-300">


            <div class="flex-1 text-center md:text-left">
                <h3 class="text-lg font-bold text-gray-800 mb-2">Tagline:</h3>
                <p class="text-gray-600 mb-4">${movie.tagline}</p>
                <h3 class="text-lg font-bold text-gray-800 mb-2">Genres:</h3>
                <p class="text-gray-700 mb-4">${movie.genres.join(", ")}</p>
                <h3 class="text-lg font-bold text-gray-800 mb-2">Overview:</h3>
                <p class="text-gray-700 mb-4">${movie.overview}</p>
            </div>
        </div>

        <div class="w-full md:w-1/3 flex flex-col md:flex-row gap-4">
            <div class="w-full mb-8 md:w-1/2">
                <table class="w-full border-collapse border border-gray-200">
                    <tbody class="text-gray-700">
                        <tr>
                            <td class="border border-gray-200 p-2 font-bold">Original Languaje</td>
                            <td class="border border-gray-200 p-2">${
                              movie.original_language
                            }</td>
                        </tr>
                        <tr>
                            <td class="border border-gray-200 p-2 font-bold">Release Date</td>
                            <td class="border border-gray-200 p-2">${
                              movie.release_date
                            }</td>
                        </tr>
                        <tr>
                            <td class="border border-gray-200 p-2 font-bold">Runtime</td>
                            <td class="border border-gray-200 p-2">${
                              movie.runtime
                            } min</td>
                        </tr>
                        <tr>
                            <td class="border border-gray-200 p-2 font-bold">Status</td>
                            <td class="border border-gray-200 p-2">${
                              movie.status
                            }</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="w-full mb-8 md:w-1/2">
                <table class="w-full border-collapse border border-gray-200">
                    <tbody class="text-gray-700">
                        <tr>
                            <td class="border border-gray-200 p-2 font-bold">Votos</td>
                            <td class="border border-gray-200 p-2">${
                              movie.vote_average
                            }%</td>
                        </tr>
                        <tr>
                            <td class="border border-gray-200 p-2 font-bold">Presupuesto</td>
                            <td class="border border-gray-200 p-2">USD ${
                              movie.budget.toLocaleString('es-ES')
                            }</td>
                        </tr>
                        <tr>
                            <td class="border border-gray-200 p-2 font-bold">Ingresos generados</td>
                            <td class="border border-gray-200 p-2">USD ${
                              movie.revenue.toLocaleString('es-ES')
                            }</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>

`;

        } else {
            console.error("No se encontró ninguna película con el ID:", movieId);
        }
    } else {
        console.error("No se proporcionó ningún ID de película en la URL.");
    }
})
.catch(error => {
    console.error("Hubo un error:", error);
})
.finally(() => {
    console.log("Finally is here");
});
