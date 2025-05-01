function animateCounter(id, target, duration = 2000) {
    const element = document.getElementById(id);
    const start = 0;
    const startTime = performance.now();
  
    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const value = Math.floor(progress * target);
      element.textContent = value.toLocaleString(); 
      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }
  
    requestAnimationFrame(update);
  }
  

  document.addEventListener("DOMContentLoaded", function () {
    animateCounter("counter", 265517237); 
  });