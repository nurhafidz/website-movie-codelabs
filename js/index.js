function convertToSlug(Text) {
    return Text.toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, "");
}

const showData = (movies) => {
    let HTMLCard = "";
    const container = document.getElementById("container");

    for (let index = 0; index < movies.length; index++) {
        const data = movies[index];

        const year = new Date(data.release_date).getFullYear();
        const slug = convertToSlug(data.title + " " + year);

        HTMLCard += `
        <a href="/website-movie-codelabs/detail.html?title=${slug}&id=${data.id}" class="card">
            <img class="card__image" src="${IMAGEBASEURL}/${data.poster_path}"/>
            <div class="card__content">
                <p class="card__title">${data.title} (${year})</p>
            </div>
        </a>
        `;
    }

    container.innerHTML = HTMLCard;
};

window.addEventListener("DOMContentLoaded", () => {
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${APIKEY}`)
        .then((res) => res.json())
        .then((data) => {
            const results = data.results;

            showData(results);
        });
});
