const params = new URLSearchParams(window.location.search);
const ProductSellerId = params.get("id");

async function loadProductSeller() {
  try {
    const res = await fetch("/public/Data/Product.json");
    const productseller = await res.json();

    const allProduct = Object.values(productseller.Product).flat();

    const randomProduct = allProduct
      .sort(() => 0.5 - Math.random())
      .slice(0, 8);
    console.log("Tổng số sản phẩm:", allProduct.length);

    const container = document.getElementById("ProductSeller");
    if (!container) {
      return;
    }

    randomProduct.forEach((item) => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `

                <a href="/public/Components/Product/ProductDetails.html?id=${item.id}">
                    <img
                      src="${item.thumbail}"
                      alt=""
                      class="card-img"
                    />
                    <div class="card-info">
                      <p class="text-title">${item.title}</p>
                      <p class="text-body">${item.description}</p>
                    </div>
                    <div class="card-footer">
                      <span class="text-title">${item.price}</span>
                      <div class="card-button">
                        <a href="#" class="fa-solid fa-cart-shopping"></a>
                      </div>
                    </div>
                </a>

            `;
      container.appendChild(card);
    });
  } catch (err) {
    console.log("error", err);
  }
}
loadProductSeller();
