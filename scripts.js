document.addEventListener('DOMContentLoaded', function() {
    const searchButton = document.querySelector('input[type="button"]');
    const movieInput = document.querySelector('input[name="moviename"]');
    const infoDiv = document.querySelector('.info');

    searchButton.addEventListener('click', function() {
        const movieName = movieInput.value.trim();
        if (movieName) {
            fetchMovieDetails(movieName);
        } else {
            infoDiv.innerHTML = '<p>Please enter a movie name.</p>';
        }
    });

    async function fetchMovieDetails(movieName) {
        const apiKey = '82646223';
        const url = `https://www.omdbapi.com/?t=${encodeURIComponent(movieName)}&apikey=${apiKey}`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            if (data.Response === 'True') {
                displayMovieDetails(data);
            } else {
                infoDiv.innerHTML = `<p>${data.Error}</p>`;
            }
        } catch (error) {
            console.error('Error fetching movie details:', error);
            infoDiv.innerHTML = '<p>There was an error fetching the movie details. Please try again later.</p>';
        }
    }

    function displayMovieDetails(movie) {
        infoDiv.innerHTML = `
            <h2>${movie.Title} (${movie.Year})</h2>
            <p><strong>Genre:</strong> ${movie.Genre}</p>
            <p><strong>Director:</strong> ${movie.Director}</p>
            <p><strong>Actors:</strong> ${movie.Actors}</p>
            <p><strong>Plot:</strong> ${movie.Plot}</p>
            <img src="${movie.Poster}" alt="${movie.Title} Poster" class="img-fluid">
        `;
    }
});