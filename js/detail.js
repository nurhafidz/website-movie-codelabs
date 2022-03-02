const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const Getid = urlParams.get("id");
function convertToSlug(Text) {
    let data = Text.toUpperCase().split("-");
    return data.join(" ");
}
document.title = convertToSlug(urlParams.get("title"));

const getname = (arr) => {
    return arr.name;
};

const showData = (movies) => {
    let HTMLCard = "";
    const container = document.getElementById("container");

    const data = movies;
    const genre = data.genres.map(getname);

    let companies = [];
    console.log(data);
    for (let i = 0; i < data.production_companies.length; i++) {
        companies += `<div class="width100 max-width250">
            <img
                src="${IMAGEBASEURL}/${data.production_companies[i].logo_path}"
                alt="${data.production_companies[i].name}"
                class="card__image"
            />
            <p class="text-l justify-center text-center pd-2">${data.production_companies[i].name}</p>
        </div>;`;
    }

    HTMLCard += `
        <div class="card-2 flex flex-row">
                <div class="width100 max-width250">
                    <img
                        src="${IMAGEBASEURL}/${data.poster_path}"
                        alt="${data.original_title}"
                        class="card__image rounded"
                    />
                </div>
                <div class="flex flex-row pd-5 align-items-center">
                    <div>
                        <p id="title" class="text-xl pd-2 font-bold">${
                            data.original_title
                        }</p>
                        <p id="genre" class="pdy-2"> Release : ${
                            data.release_date
                        } , Genre : ${genre.join(" ,")}</p>
                        <p id="rate" class="pdy-2">Rating : ⭐ ${
                            data.vote_average
                        } from ${data.vote_count}</p>
                        <p id="description">
                            ${data.overview}
                        </p>
                    </div>
                </div>
            </div>
            <div class="mx-8 justify-center">
                <p class="pd-2 my-5 text-xl font-bold">Production Companies</p>
                <div class="container">
                    ${companies.split(";").join(" ")}
                </div>
            </div>
        `;

    container.innerHTML = HTMLCard;
};

window.addEventListener("DOMContentLoaded", () => {
    fetch(
        `https://api.themoviedb.org/3/movie/${Getid}?api_key=${APIKEY}&language=en-US`
    )
        .then((res) => res.json())
        .then((data) => {
            const results = data.results;
            showData(data);
        });
});
