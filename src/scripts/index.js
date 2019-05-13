import '../styles/index.scss';

import $ from 'jquery';
import * as fullpage from 'fullpage.js/dist/fullpage.min.js';
import { TweenMax, Expo } from "gsap/TweenMax";
import debounce from 'debounce';

import { mouseMoveAnimations } from './mouseMoveAnimations';
import {exitAndEntryAnimations} from './exitAndEntryAnimations';

// Use one duration for exit and entry animation
const duration = 2500;

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
    console.log('Screen type changed', screenType);
    repeatAnimation();
  }
}

const debouncedDefineScreenParams = debounce(defineScreenParams, 300);

window.onresize = function () {
  debouncedDefineScreenParams();
};

$(document).ready(function () {
  defineScreenParams();

  new fullpage('#landing', {
    scrollingSpeed: 0,
    navigation: true,
    loopBottom: true,
    onLeave: handleSlideChange
  });

  $(document).on('mousemove', (event) => {
    if (exitAnimation.isInProgress || isEntryAnimationInProgress || screenType !== 'desktop') {
      return;
    }

    const offsets = {
      horizontalOffsetFromCenter: containerWidth/2 - event.pageX,
      horizontalOffsetFromRight: 0.5 + (containerWidth - event.pageX)/containerWidth
    };

    const activeSlideNum = fullpage_api.getActiveSection().index + 1;
    const sectionAnimations = mouseMoveAnimations[`section${activeSlideNum}`];

    sectionAnimations.forEach(item => {
      const transformString = item.animations.reduce((res, current) => {
        const dimension = current.type !== 'scale' ? 'px' : '';
        return res + ` ${current.type}(${offsets[current.reactTo] * current.ratio + dimension})`;
      }, '');
      TweenMax.to(
        $(item.selector),
        1,
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

  const sectionAnimations = (exitAndEntryAnimations[`section${index + 1}`][screenType] || {})[direction];
  (sectionAnimations || []).forEach(item => {
    TweenMax.to(
      $(item.selector),
      duration/1000,
      {
        css: item.style,
        ease: Expo.easeOut,
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
  const entryDirection = exitAnimation.direction === 'down' ? 'up' : 'down';
  const activeSlideNum = fullpage_api.getActiveSection().index + 1;

  if (!repeatOnScreenTypeChange) {
    const entryAnimations = (exitAndEntryAnimations[`section${activeSlideNum}`][screenType] || {})[entryDirection];
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

  const centerAnimations = (exitAndEntryAnimations[`section${activeSlideNum}`][screenType] || {})['center'];
  (centerAnimations || []).forEach(item => {
    TweenMax.to(
      $(item.selector),
      duration/1000,
      {
        css: item.style,
        ease: Expo.easeOut,
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
  console.log('Handle slide change', destination.index);

  const length = $('.section').length;
  const currentIndex = fullpage_api.getActiveSection().index;
  const isLastSection = currentIndex === length - 1;

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
    return false;
  }
}

