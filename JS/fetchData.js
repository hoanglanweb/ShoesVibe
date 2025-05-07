const featureslist = document.getElementById("Features");

fetch("/Data/Data.json")
  .then((res) => res.json())
  .then((data) => {
    console.log("du lieu da day len.", data);
    data.Nike.forEach((product) => {
      const FeaturesDiv = document.createElement("div");
      FeaturesDiv.innerHTML = `

              <div class="Card">
                <img src="${product.thumbail}" alt="#" />
                <div class="Card_content">
                    <h3>${product.title}</h3>
                   <div class="content-2">
                    <a href="#" class="">Add to cart</a>
                    <p>${product.Price}</p>
                  </div>
                </div>
              </div>    

        `;
      featureslist.appendChild(FeaturesDiv);
    });
  })
  .catch((err) => console.log("error", err));

const featureslist2 = document.getElementById("Features2");

fetch("/Data/Data.json")
  .then((res) => res.json())
  .then((data) => {
    console.log("du lieu da day len.", data);
    data.Nike.forEach((product) => {
      const FeaturesDiv = document.createElement("div");
      FeaturesDiv.innerHTML = `

              <div class="Card">
                <img src="${product.thumbail}" alt="#" />
                <div class="Card_content">
                    <h3>${product.title}</h3>
                   <div class="content-2">
                    <a href="#" class="">Add to cart</a>
                    <p>${product.Price}</p>
                  </div>
                </div>
              </div>    

        `;
      featureslist2.appendChild(FeaturesDiv);
    });
  })
  .catch((err) => console.log("error", err));
