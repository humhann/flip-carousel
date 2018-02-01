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

  hideImage(prevThumbnail, function() {
    showImage(nextThumbnail)
  });
}

function showImage(thumbnail, callback) {
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

  var animation = image.animate([{
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

  // Bind to animation finished event
  animation.addEventListener('finish', callback);

  return animation;
}

function hideImage(thumbnail, callback) {
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

  var animation = image.animate([{
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

  // Bind to animation finished event
  animation.addEventListener('finish', callback);
  animation.addEventListener('finish', function() {
    thumbnail.classList.remove('carousel__thumbnail--selected')
  });

  return animation;
}
