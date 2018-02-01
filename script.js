const ANIMATION_DURATION = 300;

// Document ready
if (document.attachEvent ? document.readyState === 'complete' : document.readyState !== 'loading') {
  main();
} else {
  document.addEventListener('DOMContentLoaded', main);
}

function main() {
  bindThumbnail();
}

function bindThumbnail() {
  const thumbnails = document.querySelectorAll('.carousel__thumbnail');
  Array.prototype.forEach.call(thumbnails, function(el) {
    el.addEventListener('click', onThumbnailClick);
  });
}

function onThumbnailClick(e) {
  e.preventDefault();

  const prevThumbnail = document.querySelector('.carousel__thumbnail--selected');
  const nextThumbnail = e.currentTarget;

  hideImage(prevThumbnail);
  setTimeout(function() {
    showImage(nextThumbnail);
  }, ANIMATION_DURATION);
}

function showImage(thumbnail) {
  const first = thumbnail.getBoundingClientRect();

  // Move to main
  const image = document.querySelector('.carousel__image img');
  image.src = thumbnail.href;
  const last = image.getBoundingClientRect();
  thumbnail.classList.add('carousel__thumbnail--selected');

  // Calculate deltas
  const dx = first.x - last.x;
  const dy = first.y - last.y;
  const dw = first.width / last.width;
  const dh = first.height / last.height;

  image.animate([{
    opacity: 1,
    transformOrigin: 'top left',
    transform: `
      translate(${dx}px, ${dy}px)
      scale(${dw}, ${dh})
    `,
  }, {
    opacity: 1,
    transformOrigin: 'top left',
    transform: 'none',
  }], {
    duration: ANIMATION_DURATION,
    easing: 'ease-out',
    fill: 'both',
  });
}

function hideImage(thumbnail) {
  if (!thumbnail) {
    return;
  }

  const image = document.querySelector('.carousel__image img');
  const first = thumbnail.getBoundingClientRect();
  const last = image.getBoundingClientRect();

  // Calculate deltas
  const dx = first.x - last.x;
  const dy = first.y - last.y;
  const dw = first.width / last.width;
  const dh = first.height / last.height;

  image.animate([{
    opacity: 1,
    transformOrigin: 'top left',
    transform: 'none',
  }, {
    opacity: 1,
    transformOrigin: 'top left',
    transform: `
      translate(${dx}px, ${dy}px)
      scale(${dw}, ${dh})
    `,
    offset: 0.999999,
  }, {
    opacity: 0,
    transformOrigin: 'top left',
    transform: 'none',
  }], {
    duration: ANIMATION_DURATION,
    easing: 'ease-out',
    fill: 'both',
  });

  setTimeout(function() {
    thumbnail.classList.remove('carousel__thumbnail--selected');
  }, ANIMATION_DURATION);
}
