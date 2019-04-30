import '../styles/index.scss';

import $ from 'jquery';
import * as fullpage from 'fullpage.js/dist/fullpage.min.js';
import { TweenMax, Expo } from "gsap/TweenMax";
const initialAnimationState = {
  inProgress: null,
  direction: null,
  isDone: false
};
let exitAnimation = { ...initialAnimationState };
let enterAnimation = { ...initialAnimationState };
let timeoutId;

$(document).ready(function() {
  new fullpage('#landing', {
    autoScrolling:true,
    scrollHorizontally: true,
    onLeave: handleSlideChange,
    afterSlideLoad: function (section, origin, destination, direction) {
      debugger;
      console.log('After slide load');
    }
  });

  $(document).on('mousemove', (event) => {
    if (exitAnimation.inProgress) {
      return;
    }
    TweenMax.to(
      $('.follower'),
      1,
      {
        css: {
          left: event.clientX,
          top: event.clientY,
        },
        ease: Expo.easeOut,
        overwrite: 'all'
      });
  });
});

function animateExit (index, direction) {
  if (exitAnimation.inProgress && direction === exitAnimation.direction) {
    return;
  }
  switch (index) {
    case 0:
      if (direction === 'up') {

      } else if (direction === 'down') {
        TweenMax.to(
          $('.follower'),
          1,
          {
            css: {
              left: 500,
              top: 500,
            },
            ease: Expo.easeOut,
            overwrite: 'all'
          });
      }
      break;
    default:
      break;
  }

  exitAnimation = {
    ...exitAnimation,
    inProgress: true,
    direction
  };

  timeoutId && clearTimeout(timeoutId);
  timeoutId = setTimeout(function() {
    exitAnimation.isDone = true;
    const currentSlideNum = index + 1;
    const nextSlideNum = direction === 'up'
      ? currentSlideNum - 1
      : currentSlideNum + 1;
    fullpage_api.moveTo(nextSlideNum);
    exitAnimation = { ...initialAnimationState };
  }, 1000);
}

function handleSlideChange(origin, destination, direction) {
  if (!exitAnimation.isDone) {
    animateExit(origin.index, direction);
    return false;
  }
}

