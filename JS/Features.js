const container = document.getElementById("Features");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

let position = 0;
const slideAmount = 266; // Card width + gap
let totalCards = 0;

fetch("/Data/Product.json")
  .then(res => res.json())
  .then(data => {
    totalCards = data.Nike.length;

    data.Nike.forEach(product => {
      const div = document.createElement("div");
      div.className = "Card";
      div.innerHTML = `
        <img src="${product.thumbail}" alt="${product.title}" />
        <div class="Card_content">
          <h3>${product.title}</h3>
        </div>
      `;
      container.appendChild(div);
    });
  });

nextBtn.onclick = () => {
  const maxShift = slideAmount * (totalCards - 1);
  if (Math.abs(position) >= maxShift) {
    // quay về đầu
    position = 0;
  } else {
    position -= slideAmount;
  }
  container.style.transform = `translateX(${position}px)`;
};

prevBtn.onclick = () => {
  if (position >= 0) {
    // quay về cuối
    position = -slideAmount * (totalCards - 1);
  } else {
    position += slideAmount;
  }
  container.style.transform = `translateX(${position}px)`;
};
