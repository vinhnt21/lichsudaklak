document.addEventListener('DOMContentLoaded', function() {
  const darkModeToggle = document.getElementById('darkModeToggle');
  const body = document.body;
  let isDark = body.classList.contains('dark-mode');

  // Tạo containers cho cả hai transition
  const darkTransition = document.createElement('div');
  darkTransition.className = 'dark-mode-transition';
  
  const lightTransition = document.createElement('div');
  lightTransition.className = 'light-mode-transition';

  // Tạo mặt trăng và mặt trời
  const moon = document.createElement('div');
  moon.className = 'moon';
  darkTransition.appendChild(moon);

  const sun = document.createElement('div');
  sun.className = 'sun';
  const sunRay = document.createElement('div');
  sunRay.className = 'sun-ray';
  sun.appendChild(sunRay);
  lightTransition.appendChild(sun);

  // Tạo container cho sao và mây
  const starsContainer = document.createElement('div');
  starsContainer.className = 'stars';
  darkTransition.appendChild(starsContainer);

  const cloudsContainer = document.createElement('div');
  cloudsContainer.className = 'clouds';
  lightTransition.appendChild(cloudsContainer);

  // Thêm các ngôi sao
  for (let i = 0; i < 50; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.width = `${Math.random() * 3}px`;
    star.style.height = star.style.width;
    starsContainer.appendChild(star);
  }

  // Thêm các đám mây
  for (let i = 0; i < 10; i++) {
    const cloud = document.createElement('div');
    cloud.className = 'cloud';
    cloud.style.left = `${Math.random() * 100}%`;
    cloud.style.top = `${Math.random() * 100}%`;
    cloud.style.width = `${50 + Math.random() * 100}px`;
    cloud.style.height = `${20 + Math.random() * 30}px`;
    cloudsContainer.appendChild(cloud);
  }

  // Thêm vào body
  document.body.appendChild(darkTransition);
  document.body.appendChild(lightTransition);

  darkModeToggle.addEventListener('click', function() {
    isDark = !isDark;
    
    if (isDark) {
      body.classList.add('dark-mode-active');
      setTimeout(() => {
        body.classList.add('dark-mode');
        body.classList.remove('light-mode');
        setTimeout(() => {
          body.classList.remove('dark-mode-active');
        }, 750);
      }, 750);
    } else {
      body.classList.add('light-mode-active');
      setTimeout(() => {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        setTimeout(() => {
          body.classList.remove('light-mode-active');
        }, 750);
      }, 750);
    }

    // Cập nhật icon
    const icon = darkModeToggle.querySelector('i');
    icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
  });
}); 