document.querySelector("#btnSearch").addEventListener("click", () => {
    let text = document.querySelector("#txtSearch").value;
    displayCountry(text);
});


function displayCountry (country) {
    const request = new XMLHttpRequest();
    request.open('GET', `https://restcountries.com/v3.1/name/${country}`, true);
    request.send();



    request.addEventListener('load', function () {
        // this.responseText --> Metin olarak görüntülenmesini sağlar.
        const data = JSON.parse(request.responseText); // Gelen JSON veri tipini Javascript'in anlayacağı bir hale çevirir.
        console.log(data)
        renderCountry(data[0]);

        // komsu country'ler
        const neighborsRequest = new XMLHttpRequest();
        const countries = data[0]["borders"].toString();
        neighborsRequest.open('GET', `https://restcountries.com/v3.1/alpha?codes=${countries}`, true);
        neighborsRequest.send();
        neighborsRequest.addEventListener('load', function () {
            const data = JSON.parse(neighborsRequest.responseText);
            renderNeighbors(data);
        });
    });
}
function renderCountry(data) {
    document.querySelector("#country-details").innerHTML = `
        <div class="card mb-3" id="country-details">
        <div class="card-header">
            Arama Sonucu
        </div>
        <div class="card-body">
            <div class="row">
                <div class="col-4"> <img src="${data.flags["png"]}" class="card-img-top" alt="" class="img-fluids"></div>
                <div class="col-8">
                    <h3 class="card-title">${data["name"]["common"]}</h3>
                    <hr>
                    <div class="row">
                        <div class="col-4">Nüfus:</div>
                        <div class="col-8">${((data["population"]) / 1000000).toFixed(1)}M</div>
                    </div>
                    <div class="row">
                        <div class="col-4">Resmi Dili:</div>
                        <div class="col-8">${data["languages"] ? Object.values(data["languages"]).join(", ") : "Bilgi yok"}</div>
                    </div>
                    <div class="row">
                        <div class="col-4">Baş Kenti:</div>
                        <div class="col-8">${data["capital"] ? data["capital"][0] : "Bilgi yok"}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
        `;
}


function renderNeighbors(data){
    let html = "";
    for(let country of data) {
        html += `
                <div class="col-2 mt-2">
                    <div class="card">
                        <img src="${country.flags["png"]}" class="card-img-top" alt="">
                        <div class="card-body">
                            <h6 class="card-title">${country.name["common"]}</h6>
                        </div>
                    </div>
                </div>
            `;

    }
    document.querySelector("#neighbors").innerHTML =  html;
}
