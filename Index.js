function displayCountry (country) {
    const request = new XMLHttpRequest();
    request.open('GET', `https://restcountries.com/v3.1/name/${country}`, true);
    request.send();



    request.addEventListener('load', function () {
        // this.responseText --> Metin olarak görüntülenmesini sağlar.
        const data = JSON.parse(this.responseText); // Gelen JSON veri tipini Javascript'in anlayacağı bir hale çevirir.
        console.log(data);
        setCountry(data[0]);
    });
}
function setCountry(data) {
    const html =
    `
    <div class="col-3">
        <div class="card h-100">
            <img src="${data.flags["png"]}" class="card-img-top" alt="">
                <div class="card-body">
                    <h5 class="card-title">
                        ${data["name"]["common"]}
                </h5>
                    <ul>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item"> Population: ${((data["population"]) / 1000000).toFixed(1) }M  </li>
                        <li class="list-group-item"> Capital: ${data["capital"]}  </li>
                        <li class="list-group-item"> Languages: ${Object.values(data["languages"])}</li>
                    </ul>
                </ul>
            </div>
        </div>
    </div>
    `;
    document.querySelector(".container .row").insertAdjacentHTML("beforeend", html);
}

displayCountry("turkey")
displayCountry("uk")