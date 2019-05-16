export default {
  desktop: {
    up: [
      {
        selector: '.section-5__content',
        style: {
          transform: 'translateY(0)',
        }
      },
      {
        selector: '.section-5__phone',
        style: {
          transform: 'translateY(10%)',
          opacity: 0
        }
      },
      {
        selector: '.section-5__dash',
        style: {
          transform: 'scaleX(0)',
          opacity: 0
        }
      },
      {
        selector: '.section-5__title',
        style: {
          transform: 'translateY(-20px)',
          opacity: 0
        }
      },
      {
        selector: '.section-5__text',
        style: {
          transform: 'translateY(20px)',
          opacity: 0
        }
      },
      {
        selector: '.section-5__circle-1',
        style: {
          transform: 'scale(1)',
          margin: '0 -310px -330px 0',
          opacity: 0
        }
      },
      {
        selector: '.section-5__circle-2',
        style: {
          opacity: 0
        }
      },
      {
        selector: '.section-5__circle-3',
        style: {
          opacity: 0
        }
      },
      {
        selector: '.section-5__footer',
        style: {
          opacity: 0
        }
      }
    ],
    center: [
      {
        selector: '.section-5__phone',
        style: {
          transform: 'translateY(0)',
          opacity: 1
        }
      },
      {
        selector: '.section-5__dash',
        style: {
          transform: 'scaleX(1)',
          opacity: 1
        }
      },
      {
        selector: '.section-5__title',
        style: {
          transform: 'translateY(0)',
          opacity: 1
        }
      },
      {
        selector: '.section-5__text',
        style: {
          transform: 'translateY(0)',
          opacity: 1
        }
      },
      {
        selector: '.section-5__content',
        style: {
          transform: 'translateY(0)',
          opacity: 1
        }
      },
      {
        selector: '.section-5__circle-1',
        style: {
          opacity: 1
        }
      },
      {
        selector: '.section-5__circle-2',
        style: {
          opacity: 1
        }
      },
    ],
    down: [
      {
        selector: '.section-5__circle-1',
        style: {
          transform: 'scaleX(20)',
          margin: '0 -75px -500px 0',
          opacity: 0
        }
      },
      {
        selector: '.section-5__circle-3',
        style: {
          transform: 'scaleX(20)',
          opacity: 1
        }
      },
      {
        selector: '.section-5__content',
        style: {
          transform: 'translateY(-50px)',
        }
      },
      {
        selector: '.section-5__footer',
        style: {
          opacity: 1
        }
      }
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
