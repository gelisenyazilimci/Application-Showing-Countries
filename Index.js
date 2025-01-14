function displayCountry (country) {
    const request = new XMLHttpRequest();
    request.open('GET', `https://restcountries.com/v3.1/name/${country}`, true);
    request.send();



    request.addEventListener('load', function () {
        // this.responseText --> Metin olarak görüntülenmesini sağlar.
        const data = JSON.parse(request.responseText); // Gelen JSON veri tipini Javascript'in anlayacağı bir hale çevirir.
        setCountry(data);

        // komsu country'ler
        const neighborsRequest = new XMLHttpRequest();
        const countries = data[0]["borders"].toString();
        neighborsRequest.open('GET', `https://restcountries.com/v3.1/alpha?codes=${countries}`, true);
        neighborsRequest.send();
        neighborsRequest.addEventListener('load', function () {
            const data = JSON.parse(neighborsRequest.responseText);
            setCountry(data);
        });
    });
}
function setCountry(data) {

    for (let country of data ) {

        const html =
        `
                <div class="col-3">
                    <div class="card h-100">
                        <img src="${country.flags["png"]}" class="card-img-top" alt="">
                            <div class="card-body">
                                <h5 class="card-title">
                                    ${country["name"]["common"]}
                            </h5>
                                <ul>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item"> Population: ${((country["population"]) / 1000000).toFixed(1)}M  </li>
                                    <li class="list-group-item"> Capital: ${country["capital"]}  </li>
                                    <li class="list-group-item"> Languages: ${Object.values(country["languages"])}</li>
                                </ul>
                            </ul>
                        </div>
                    </div>
                </div>
    `;
        document.querySelector(".container .row").insertAdjacentHTML("beforeend", html);
    }

}
displayCountry("turkey")