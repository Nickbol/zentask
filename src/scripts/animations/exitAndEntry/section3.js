export default {
  desktop: {
    up: [
      {
        selector: '.section-3__wave',
        style: {
          transform: 'translateY(0)',
          bottom: '70%',
          opacity: 1
        }
      },
      {
        selector: '.section-3__phone',
        style: {
          transform: 'translateY(10%)',
          opacity: 0
        }
      },
      {
        selector: '.section-3__dash',
        style: {
          transform: 'scaleX(0)',
          opacity: 0
        }
      },
      {
        selector: '.section-3__title',
        style: {
          transform: 'translateY(-20px)',
          opacity: 0
        }
      },
      {
        selector: '.section-3__text',
        style: {
          transform: 'translateY(20px)',
          opacity: 0
        }
      },
      {
        selector: '.section-3__circle-1',
        style: {
          opacity: 0,
          transform: 'scale(1)'
        }
      },
      {
        selector: '.section-3__circle-2',
        style: {
          opacity: 0,
          transform: 'translateX(0)'
        }
      }
    ],
    center: [
      {
        selector: '.section-3__phone',
        style: {
          transform: 'translateY(0)',
          opacity: 1
        }
      },
      {
        selector: '.section-3__dash',
        style: {
          transform: 'scaleX(1)',
          opacity: 1
        }
      },
      {
        selector: '.section-3__title',
        style: {
          transform: 'translateY(0)',
          opacity: 1
        }
      },
      {
        selector: '.section-3__text',
        style: {
          transform: 'translateY(0)',
          opacity: 1
        }
      },
      {
        selector: '.section-3__circle-1',
        style: {
          transform: 'scale(1)',
          opacity: 1
        }
      },
      {
        selector: '.section-3__circle-2',
        style: {
          opacity: 1
        }
      },
      {
        selector: '.section-3__content',
        style: {
          transform: 'translateY(0)',
          opacity: 1
        }
      }
    ],
    down: [
      {
        selector: '.section-3__content',
        style: {
          transform: 'translateY(-70%)',
          opacity: 0
        }
      },
      {
        selector: '.section-3__circle-1',
        style: {
          transform: 'scale(16)'
        }
      },
    ]
  },
  tablet: {
    up: [],
      center: [],
      down: []
  },
  mobile: {
    up: [],
      center: [],
      down: []
  }
};
