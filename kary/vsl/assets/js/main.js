/* =========================
   INGREDIENTS SLIDER
   ========================= */
class IngredientsSlider {
  constructor() {
    this.track = document.querySelector(".slider-track");
    this.prevBtn = document.querySelector(".slider-btn.prev");
    this.nextBtn = document.querySelector(".slider-btn.next");
    this.cards = document.querySelectorAll(".ingredient-card");

    if (!this.track || !this.prevBtn || !this.nextBtn) return;

    this.currentIndex = 0;
    this.cardsPerView = this.getCardsPerView();
    this.init();
  }

  getCardsPerView() {
    if (window.innerWidth <= 600) return 1;
    if (window.innerWidth <= 900) return 2;
    return 3;
  }

  init() {
    this.prevBtn.addEventListener("click", () => this.prev());
    this.nextBtn.addEventListener("click", () => this.next());

    let startX = 0;
    let currentX = 0;
    let isDragging = false;

    this.track.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
      isDragging = true;
    });

    this.track.addEventListener("touchmove", (e) => {
      if (!isDragging) return;
      currentX = e.touches[0].clientX;
    });

    this.track.addEventListener("touchend", () => {
      if (!isDragging) return;
      isDragging = false;
      const diff = startX - currentX;
      if (Math.abs(diff) > 50) diff > 0 ? this.next() : this.prev();
    });

    window.addEventListener("resize", () => {
      this.cardsPerView = this.getCardsPerView();
      this.updateSlider();
    });

    this.updateSlider();
  }

  next() {
    const maxIndex = this.cards.length - this.cardsPerView;
    if (this.currentIndex < maxIndex) {
      this.currentIndex++;
      this.updateSlider();
    }
  }

  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.updateSlider();
    }
  }

  updateSlider() {
    const containerWidth = this.track.parentElement.offsetWidth;
    const gap = 20;
    const cardWidth =
      (containerWidth - gap * (this.cardsPerView - 1)) / this.cardsPerView;

    const offset = this.currentIndex * (cardWidth + gap);
    this.track.style.transform = `translateX(-${offset}px)`;

    this.prevBtn.disabled = this.currentIndex === 0;
    this.nextBtn.disabled =
      this.currentIndex >= this.cards.length - this.cardsPerView;
  }
}

/* Init Slider */
document.addEventListener("DOMContentLoaded", () => {
  new IngredientsSlider();
});

/* =========================
   FAQ ACCORDION
   ========================= */
document.querySelectorAll(".accordion .item .header").forEach((header) => {
  header.addEventListener("click", function () {
    this.parentNode.classList.toggle("active");
  });
});

/* =========================
   COUNTDOWN TIMER
   ========================= */
class CountdownTimer {
  constructor() {
    this.hours = document.querySelectorAll(".countdown-hours");
    this.minutes = document.querySelectorAll(".countdown-minutes");
    this.seconds = document.querySelectorAll(".countdown-seconds");
    if (!this.hours.length) return;
    this.init();
  }

  init() {
    let endTime = localStorage.getItem("countdownEndTime");
    if (!endTime) {
      endTime = Date.now() + 3600000;
      localStorage.setItem("countdownEndTime", endTime);
    }
    this.update(endTime);
    setInterval(() => this.update(endTime), 1000);
  }

  update(endTime) {
    const diff = endTime - Date.now();
    const h = diff > 0 ? String(Math.floor(diff / 3600000)).padStart(2, "0") : "00";
    const m = diff > 0 ? String(Math.floor((diff % 3600000) / 60000)).padStart(2, "0") : "00";
    const s = diff > 0 ? String(Math.floor((diff % 60000) / 1000)).padStart(2, "0") : "00";

    this.hours.forEach(el => el.textContent = h);
    this.minutes.forEach(el => el.textContent = m);
    this.seconds.forEach(el => el.textContent = s);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new CountdownTimer();
});
