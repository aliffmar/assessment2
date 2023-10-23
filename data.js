const BASE_JSON_BIN_URL = "https://api.jsonbin.io/v3";
const BIN_ID = "653350cf0574da7622bbaada";
const MASTER_KEY="$2a$10$sgNYxBTOWr4.OrHdI5gu9OH.xkpTW6vSL4U7cpK9uI7Vf1SQIfqOq";

// load all the movies from the bin
async function loadMovies() {
    const response = await axios.get(`${BASE_JSON_BIN_URL}/b/${BIN_ID}/latest`);
    console.log(response.data);
    return response.data.record;
}

async function saveMovies(movies) {
    const response = await axios.put(`${BASE_JSON_BIN_URL}/b/${BIN_ID}`, movies, {
        "content-type":"application/json",
        "X-Master-Key": MASTER_KEY
    });
    console.log(response.data);
}

function addMovie(movies, name, rating) {
    const newMovie = {
        'id': Math.floor(Math.random() * 1000000 + 1),
        'title': name,
        'rating': rating
    }
    movies.push(newMovie);
}

function modifyMovie(movies, id, newName, newRating) {
    let modifiedMovie = {
        "id": id,
        "title": newName,
        "rating": newRating
    }

    const indexToReplace = movies.findIndex(function(m) {
        return m.id == id;
    });

    if (indexToReplace > -1) {
        movies[indexToReplace] = modifiedMovie;
    }
}

function deleteMovie(movies, id) {
    const indexToDelete = movies.findIndex(function(m) {
        return m.id == id;
    });

    if (indexToDelete > -1) {
        movies.splice(indexToDelete, 1);
    }
}
