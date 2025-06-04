const container = document.getElementById("Features");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

let position = 0;
const slideAmount = 266; // Card width + margin-right
let totalCards = container.querySelectorAll('.Card').length;

nextBtn.onclick = () => {
  const maxShift = slideAmount * (totalCards - 1);
  if (Math.abs(position) >= maxShift) {
    position = 0; // quay về đầu
  } else {
    position -= slideAmount;
  }
  container.style.transform = `translateX(${position}px)`;
};

prevBtn.onclick = () => {
  if (position >= 0) {
    position = -slideAmount * (totalCards - 1); // quay về cuối
  } else {
    position += slideAmount;
  }
  container.style.transform = `translateX(${position}px)`;
};
