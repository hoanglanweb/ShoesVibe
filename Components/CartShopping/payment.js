document.addEventListener("DOMContentLoaded", function () {
  const overlay = document.getElementById("paymentOverlay");
  const cancelBtn = document.getElementById("cancelPayment");
  const form = document.getElementById("paymentForm");

  if (!overlay || !cancelBtn || !form) return;

  // Đảm bảo overlay ẩn khi tải trang
  overlay.style.display = "none";
  document.body.classList.remove("modal-open");

  // Mở form khi click checkout
  document.addEventListener("click", function (e) {
    if (
      e.target &&
      (e.target.id === "guestCheckout" || e.target.id === "memberCheckout")
    ) {
      e.preventDefault();
      form.reset();
      overlay.style.display = "flex";
      document.body.classList.add("modal-open");
    }

    // Đóng nếu click ra ngoài form
    if (e.target === overlay) {
      overlay.style.display = "none";
      document.body.classList.remove("modal-open");
    }
  });

  // Đóng khi nhấn Cancel
  cancelBtn.addEventListener("click", function () {
    overlay.style.display = "none";
    document.body.classList.remove("modal-open");
  });

  // Xử lý thanh toán
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    alert("Thanh toán thành công!");
    overlay.style.display = "none";
    document.body.classList.remove("modal-open");
    localStorage.removeItem("cart");
    renderCart();
  });
});
