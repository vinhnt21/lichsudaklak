function scrollToIntro() {
  document.getElementById("intro").scrollIntoView({ behavior: "smooth" });
}

function scrollToEvent(eventId) {
  document.getElementById(eventId).scrollIntoView({ behavior: "smooth" });
}

// Hàm kiểm tra element có trong viewport không
function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Hàm xử lý hiệu ứng scroll
function handleScrollAnimation() {
  const timelineItems = document.querySelectorAll('.timeline-item');
  
  timelineItems.forEach(item => {
    if (isElementInViewport(item)) {
      item.classList.add('visible');
    }
  });
}

// Thêm event listener cho scroll
window.addEventListener('scroll', handleScrollAnimation);
// Chạy một lần khi trang load để kiểm tra các phần tử ban đầu
handleScrollAnimation();
