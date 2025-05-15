document.addEventListener("DOMContentLoaded", () => {
    const elements = document.querySelectorAll(
      '.section__wrapper-animated, .section-wrapper__left-content, .section-wrapper__right, .banner-slide, .features, #text, #img1, #img2, #img3, .Product-seller, #seller-1, #ex1, #ex2, #testimonials, .Lastest'
    );
  
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
          observer.unobserve(entry.target); // chỉ chạy 1 lần
        }
      });
    }, {
      threshold: 0.1
    });
  
    elements.forEach(el => observer.observe(el));
  });
  