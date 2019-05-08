import '../styles/index.scss';

import $ from 'jquery';
import * as fullpage from 'fullpage.js/dist/fullpage.min.js';
import { TweenMax, Expo } from "gsap/TweenMax";
import debounce from 'debounce';

import { mouseMoveAnimations } from './mouseMoveAnimations';
import {exitAndEntryAnimations} from './exitAndEntryAnimations';

// Use one duration for exit and entry animation
const duration = 1000;

const initialAnimationState = {
  index: null,
  nextIndex: null,
  inProgress: false,
  direction: null,
  isDone: false
};

let exitAnimation = { ...initialAnimationState },
  isEntryAnimationInProgress = false,
  exitAnimationTimeout,
  screenType,
  containerWidth,
  containerHeight;

function defineScreenParams () {
  const width = window.innerWidth;
  screenType = width >= 1200 ? 'desktop' : width >= 768 && width < 1200 ? 'tablet' : 'mobile';
  containerWidth = document.documentElement.clientWidth;
  containerHeight = document.documentElement.clientHeight;
}

const debouncedDefineScreenParams = debounce(defineScreenParams, 300);

window.onresize = function() {
  debouncedDefineScreenParams();
};

$(document).ready(function() {
  defineScreenParams();

  new fullpage('#landing', {
    scrollingSpeed: 0,
    navigation: true,
    onLeave: handleSlideChange
  });

  $(document).on('mousemove', (event) => {
    if (exitAnimation.inProgress || isEntryAnimationInProgress) {
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
  const sectionAnimations = exitAndEntryAnimations[`section${index+1}`][screenType][direction];
  sectionAnimations.forEach(item => {
    TweenMax.to(
      $(item.selector),
      duration/1000,
      {
        css: item.style,
        ease: Expo.easeOut,
        overwrite: 'all'
      });
  });
  exitAnimation = {
    ...exitAnimation,
    inProgress: true,
    direction
  };

  clearTimeout(exitAnimationTimeout);
  exitAnimationTimeout = setTimeout(() => {
    exitAnimation.isDone = true;
    exitAnimation.inProgress = false;
    fullpage_api.moveTo(nextIndex + 1);
    animateEntry();
  }, duration);
}

function animateEntry (repeatOnScreenTypeChange = false) {
  isEntryAnimationInProgress = true;
  const entryDirection = exitAnimation.direction === 'down' ? 'up' : 'down';
  const activeSlideNum = fullpage_api.getActiveSection().index + 1;

  if (!repeatOnScreenTypeChange) {
    const entryAnimations = exitAndEntryAnimations[`section${activeSlideNum}`][screenType][entryDirection];
    entryAnimations.forEach(item => {
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

  const centerAnimations = exitAndEntryAnimations[`section${activeSlideNum}`][screenType]['center'];
  centerAnimations.forEach(item => {
    TweenMax.to(
      $(item.selector),
      duration/1000,
      {
        css: item.style,
        ease: Expo.easeOut,
        overwrite: 'all'
      });
  });

  setTimeout(() => {
    isEntryAnimationInProgress = false;
    exitAnimation = { ...initialAnimationState };
  }, duration)
}

function handleSlideChange(origin, destination, direction) {
  console.log('Handle slide change', destination.index);
  if (exitAnimation.inProgress || isEntryAnimationInProgress) {
    return false;
  }
  if (!exitAnimation.isDone) {
    animateExit(origin.index, destination.index, direction);
    return false;
  }
}

