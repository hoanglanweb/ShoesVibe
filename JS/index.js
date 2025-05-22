document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".testimonials");
  const items = document.querySelectorAll(".task");
  const containerWidth = container.offsetWidth;
  const spacing = 40; // Khoảng cách giữa các task
  const speed = 1; // Tốc độ di chuyển

  let positions = [];

  // Lấy từ localStorage nếu có
  const saved = localStorage.getItem("task_positions");
  if (saved) {
    positions = JSON.parse(saved);
  } else {
    items.forEach((item, index) => {
      let x = containerWidth + index * (item.offsetWidth + spacing);
      positions.push(x);
    });
  }

  // Áp dụng vị trí
  items.forEach((item, index) => {
    item.style.left = positions[index] + "px";
  });

  let paused = false;


  function animate() {
    if (!paused) {
      items.forEach((item, index) => {
        positions[index] -= speed;

        if (positions[index] < -item.offsetWidth) {
          // Tìm vị trí lớn nhất trong danh sách hiện tại để xếp lại cuối
          const max = Math.max(...positions);
          positions[index] = max + item.offsetWidth + spacing;
        }

        item.style.left = positions[index] + "px";
      });

      // Lưu lại vị trí mỗi nửa giây
      if (
        !window._taskUpdateTimer ||
        Date.now() - window._taskUpdateTimer > 500
      ) {
        localStorage.setItem("task_positions", JSON.stringify(positions));
        window._taskUpdateTimer = Date.now();
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
});






