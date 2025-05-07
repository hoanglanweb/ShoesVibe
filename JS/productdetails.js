const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");

fetch("/Data/Data.json")
  .then((res) => res.json())
  .then((data) => {
    const product = data.Nike.find(p => p.id == productId);
    if (product) {
      document.getElementById("product-image").src = product.thumbail;
      document.getElementById("product-title").textContent = product.title;
      document.getElementById("price").textContent = product.Price;
    } else {
      document.getElementById("product-title").textContent = "Không tìm thấy sản phẩm!";
    }
  })
  .catch((err) => {
    console.error("Lỗi khi lấy dữ liệu:", err);
  });

  function changeQuantity(amount) {
    const input = document.getElementById('quantity');
    let value = parseInt(input.value) || 1;
    value += amount;
    if (value < 1) value = 1;
    input.value = value;
  }

