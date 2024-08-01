API Access point: https://api.themoviedb.org/3
Image Access point: https://image.tmdb.org/t/p/w500/

### Params:
1. movie details: 
   - /movie/{movie_id} eg. 278
2. movie images:
   - /movie/{movie_id}/images eg. 278
3. Searching by movie keyword:
   - /movie?query={queryString}&include_adult=false&language=en-US&primary_release_year={releaseYear}&page=1
   - Params:
     - {queryString} -- for movie title
     - {releaseYear} -- for release year
4. Popular:
   - /movie/popular?language=en-US&page={pageNumber}
   - Params:
     - {pageNumber} -- for the page number
   - Trending: 
     - /trending/movie/week?language=en-US
5. Latest:
   - /movie/latest
6. List:
   - /genre/movie/list
   ```
   {
    "genres": [
    {
      "id": 28,
      "name": "Action"
    },
    {
      "id": 12,
      "name": "Adventure"
    },
    {
      "id": 16,
      "name": "Animation"
    },
    {
      "id": 35,
      "name": "Comedy"
    },
    {
      "id": 80,
      "name": "Crime"
    },
    {
      "id": 99,
      "name": "Documentary"
    },
    {
      "id": 18,
      "name": "Drama"
    },
    {
      "id": 10751,
      "name": "Family"
    },
    {
      "id": 14,
      "name": "Fantasy"
    },
    {
      "id": 36,
      "name": "History"
    },
    {
      "id": 27,
      "name": "Horror"
    },
    {
      "id": 10402,
      "name": "Music"
    },
    {
      "id": 9648,
      "name": "Mystery"
    },
    {
      "id": 10749,
      "name": "Romance"
    },
    {
      "id": 878,
      "name": "Science Fiction"
    },
    {
      "id": 10770,
      "name": "TV Movie"
    },
    {
      "id": 53,
      "name": "Thriller"
    },
    {
      "id": 10752,
      "name": "War"
    },
    {
      "id": 37,
      "name": "Western"
    }]}

   ```

   <% movies.forEach((movie, index) => { %>
                <% if (movie.genre === selectedGenre) { %>
                    <div class="carousel-item <%= index === 0 ? 'active' : '' %>">
                    <img src="<%= movie.image %>" class="d-block w-100" alt="<%= movie.title %>">
                    <div class="carousel-caption d-none d-md-block">
                        <h5><%= movie.title %></h5>
                    </div>
                    </div>
                <% } %>
                <% }) %>