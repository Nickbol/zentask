import '../styles/index.scss';

import $ from 'jquery';
import * as fullpage from 'fullpage.js/dist/fullpage.min.js';
import { TweenMax, Expo } from "gsap/TweenMax";
import debounce from 'debounce';

import animations from './animations';

// Use one duration for exit and entry animation
const duration = 1000;

const initialAnimationState = {
  index: null,
  nextIndex: null,
  direction: null,
  isInProgress: false,
  isDone: false
};

let exitAnimation = { ...initialAnimationState },
  isEntryAnimationInProgress = false,
  exitAnimationTimeout,
  entryAnimationTimeout,
  screenType,
  containerWidth,
  containerHeight,
  isScrolledToBottom = false;

function defineScreenParams () {
  const previousScreenType = screenType;
  const width = window.innerWidth;
  screenType = width >= 1200 ? 'desktop' : width >= 768 && width < 1200 ? 'tablet' : 'mobile';
  containerWidth = document.documentElement.clientWidth;
  containerHeight = document.documentElement.clientHeight;
  if (previousScreenType && screenType !== previousScreenType) {
    repeatAnimation();
  }
}

const debouncedDefineScreenParams = debounce(defineScreenParams, 300);

window.onresize = function () {
  debouncedDefineScreenParams();
};

$(document).ready(function () {
  defineScreenParams();
  $('#landing').fadeIn(1000);
  $('.main-logo').fadeIn(1000);

  new fullpage('#landing', {
    scrollingSpeed: 0,
    navigation: true,
    navigationPosition: 'left',
    loopBottom: true,
    onLeave: handleSlideChange
  });

  animateEntry();

  $(document).on('mousemove', (event) => {
    if (exitAnimation.isInProgress || isEntryAnimationInProgress || screenType !== 'desktop') {
      return;
    }

    const offsets = {
      horizontalOffsetFromCenter: containerWidth/2 - event.pageX,
      horizontalOffsetFromRight: 0.5 + (containerWidth - event.pageX)/containerWidth
    };

    const activeSlideNum = fullpage_api.getActiveSection().index + 1;
    const sectionAnimations = animations.mouseMove[`section${activeSlideNum}`];

    sectionAnimations.forEach(item => {
      const transformString = item.animations.reduce((res, current) => {
        const dimension = !current.type.includes('scale') ? 'px' : '';
        return res + ` ${current.type}(${offsets[current.reactTo] * current.ratio + dimension})`;
      }, '');
      TweenMax.to(
        $(item.selector),
        3,
        {
          css: { transform: transformString },
          ease: Expo.easeOut,
          overwrite: 'all'
        });
    });
  });
});

function animateExit (index, nextIndex, direction) {
  exitAnimation = {
    ...exitAnimation,
    isInProgress: true,
    index,
    nextIndex,
    direction
  };

  const sectionAnimations = (animations.exitAndEntry[`section${index + 1}`][screenType] || {})[direction];
  (sectionAnimations || []).forEach(item => {
    TweenMax.to(
      $(item.selector),
      duration/1000,
      {
        css: item.style,
        ease: Expo.easeInOut,
        overwrite: 'all'
      });
  });

  clearTimeout(exitAnimationTimeout);
  if (nextIndex !== null) {
    exitAnimationTimeout = setTimeout(() => {
      exitAnimation.isDone = true;
      exitAnimation.isInProgress = false;
      fullpage_api.moveTo(nextIndex + 1);
      animateEntry();
    }, duration);
  } else {
    exitAnimationTimeout = setTimeout(() => {
      exitAnimation = { ...initialAnimationState };
      isScrolledToBottom = true;
    }, duration);
  }

}

function animateEntry (repeatOnScreenTypeChange = false) {
  isEntryAnimationInProgress = true;
  let entryDirection;
  if (exitAnimation.direction) {
    entryDirection = exitAnimation.direction === 'down' ? 'up' : 'down';
  } else {
    // Occurs when the page loads (entry on the first slide)
    entryDirection = 'down';
  }

  const activeSlideNum = fullpage_api.getActiveSection().index + 1;

  if (!repeatOnScreenTypeChange) {
    const entryAnimations = (animations.exitAndEntry[`section${activeSlideNum}`][screenType] || {})[entryDirection];
    (entryAnimations || []).forEach(item => {
      TweenMax.to(
        $(item.selector),
        0,
        {
          css: item.style,
          ease: Expo.easeOut,
          overwrite: 'all'
        });
    });
  }

  const centerAnimations = (animations.exitAndEntry[`section${activeSlideNum}`][screenType] || {})['center'];
  (centerAnimations || []).forEach(item => {
    TweenMax.to(
      $(item.selector),
      duration/1000,
      {
        css: item.style,
        ease: Expo.easeInOut,
        overwrite: 'all'
      });
  });

  clearTimeout(entryAnimationTimeout);
  entryAnimationTimeout = setTimeout(() => {
    isEntryAnimationInProgress = false;
    exitAnimation = { ...initialAnimationState };
  }, duration);
}

function repeatAnimation () {
  const { index, nextIndex, direction } = exitAnimation;

  if (exitAnimation.isInProgress) {
    animateExit(index, nextIndex, direction);
  }
  if (isEntryAnimationInProgress) {
    animateEntry(true);
  }
}

function handleSlideChange(origin, destination, direction) {
  const isLastSection = origin.index === $('.section').length - 1;

  if (exitAnimation.isInProgress || isEntryAnimationInProgress) {
    return false;
  }

  if (isLastSection && direction === 'down') {
    if (!isScrolledToBottom) {
      animateExit(origin.index, null, direction);
      return false;
    } else {
      return false;
    }
  }

  if (!exitAnimation.isDone) {
    animateExit(origin.index, destination.index, direction);
    isScrolledToBottom = false;
    return false;
  }
}

