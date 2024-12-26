document.addEventListener('DOMContentLoaded', function() {
  const sections = document.querySelectorAll('.event-section');
  
  // Thêm các class ẩn ban đầu cho các section
  sections.forEach((section, index) => {
    if (index % 4 === 0) {
      section.classList.add('hidden-left');
    } else if (index % 4 === 1) {
      section.classList.add('hidden-right');
    } else if (index % 4 === 2) {
      section.classList.add('hidden-zoom');
    } else {
      section.style.transform = 'translateY(50px)';
    }
  });

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

  // Hàm xử lý animation khi scroll
  function handleScroll() {
    sections.forEach((section, index) => {
      if (isElementInViewport(section)) {
        if (index % 4 === 0) {
          section.classList.add('slide-left');
        } else if (index % 4 === 1) {
          section.classList.add('slide-right');
        } else if (index % 4 === 2) {
          section.classList.add('zoom-in');
        } else {
          section.classList.add('fade-in');
        }
      } else {
        if (index % 4 === 0) {
          section.classList.remove('slide-left');
          section.classList.add('hidden-left');
        } else if (index % 4 === 1) {
          section.classList.remove('slide-right');
          section.classList.add('hidden-right');
        } else if (index % 4 === 2) {
          section.classList.remove('zoom-in');
          section.classList.add('hidden-zoom');
        } else {
          section.classList.remove('fade-in');
        }
      }
    });
  }

  // Thêm event listener cho scroll
  window.addEventListener('scroll', handleScroll);
  // Kích hoạt lần đầu để kiểm tra các phần tử đã hiển thị
  handleScroll();
}); 