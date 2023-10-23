document.addEventListener("DOMContentLoaded", function() {

    async function main() {

        let movies = await loadMovies();
        renderMovies(movies);

        document.querySelector("#addMovie")
            .addEventListener('click', function() {
                const movieTitleElement = document.querySelector("#movieTitle");
                const movieTitle = movieTitleElement.value;

                const movieRatingElement = document.querySelector("#movieRating");
                const movieRating = parseInt(movieRatingElement.value, 10);

                if (!isNaN(movieRating) && movieRating >= 0 && movieRating <= 10) {
                    addMovie(movies, movieTitle, movieRating);
                    renderMovies(movies); 
                } else {
                    alert("Please enter a valid rating between 0 and 10.");
                }
            })

        document.querySelector("#save-btn")
            .addEventListener("click", async function() {
                await saveMovies(movies);
                alert("Movies have been saved");
            })
    }

    function renderMovies(movies) {
        const moviesListElement = document.querySelector("#moviesList");
        moviesListElement.innerHTML = ""; // reset the content 

        for (let m of movies) {
            const cardDiv = document.createElement('div');
            cardDiv.className = "col-sm-4 mb-4";

            const cardHTML = `
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${m.title}</h5>
                        <p class="card-text">Rating: ${m.rating}/10</p>
                        <button data-id="${m.id}" class="btn btn-primary btn-sm edit-btn">Edit</button>
                        <button data-id="${m.id}" class="btn btn-danger btn-sm delete-btn">Delete</button>
                    </div>
                </div>
            `;

            cardDiv.innerHTML = cardHTML;

            cardDiv.querySelector(".edit-btn").addEventListener("click", function() {
                const movieId = this.getAttribute("data-id");
                
                const newMovieTitle = prompt("Please enter the new movie title: ", m.title);
                const newMovieRating = prompt("Please enter the new movie rating", m.rating);

                modifyMovie(movies, movieId, newMovieTitle, newMovieRating);
                renderMovies(movies);
            });

            cardDiv.querySelector(".delete-btn").addEventListener("click", function() {
                const movieId = this.getAttribute("data-id");
                deleteMovie(movies, movieId);
                renderMovies(movies);
            });

            moviesListElement.appendChild(cardDiv);
        }
    }

    main();
});
