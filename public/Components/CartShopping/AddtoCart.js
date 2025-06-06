function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartCountElem = document.querySelector(".cart-count");

  if (cartCountElem) {
    cartCountElem.textContent = totalQty;
    cartCountElem.style.display = totalQty > 0 ? "inline-block" : "none";
  }
}

// Gọi hàm khi trang tải xong
document.addEventListener("DOMContentLoaded", updateCartCount);

// Nếu bạn thêm sản phẩm vào giỏ hàng thì gọi updateCartCount() luôn
// Ví dụ trong đoạn code thêm giỏ hàng của bạn:
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("btn-cart")) {
    // ...code thêm giỏ hàng...
    updateCartCount(); // Cập nhật số lượng ngay sau khi thêm
  }
});
