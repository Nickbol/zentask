export default {
  desktop: {
    up: [
      {
        selector: '.section-4__phone',
        style: {
          transform: 'translateY(10%)',
          opacity: 0
        }
      },
      {
        selector: '.section-4__dash',
        style: {
          transform: 'scaleX(0)',
          opacity: 0
        }
      },
      {
        selector: '.section-4__title',
        style: {
          transform: 'translateY(-20px)',
          opacity: 0
        }
      },
      {
        selector: '.section-4__text',
        style: {
          transform: 'translateY(20px)',
          opacity: 0
        }
      },
      {
        selector: '.section-4__fly-1',
        style: {
          opacity: 0
        }
      },
      {
        selector: '.section-4__fly-2',
        style: {
          opacity: 0
        }
      }
    ],
    center: [
      {
        selector: '.section-4__phone',
        style: {
          transform: 'translateY(0)',
          opacity: 1
        }
      },
      {
        selector: '.section-4__dash',
        style: {
          transform: 'scaleX(1)',
          opacity: 1
        }
      },
      {
        selector: '.section-4__title',
        style: {
          transform: 'translateY(0)',
          opacity: 1
        }
      },
      {
        selector: '.section-4__text',
        style: {
          transform: 'translateY(0)',
          opacity: 1
        }
      },
      {
        selector: '.section-4__content',
        style: {
          transform: 'translateY(0)',
          opacity: 1
        }
      },
      {
        selector: '.section-4__fly-1',
        style: {
          opacity: .6
        }
      },
      {
        selector: '.section-4__fly-2',
        style: {
          opacity: .15
        }
      }
    ],
    down: [
      {
        selector: '.section-4__content',
        style: {
          transform: 'translateY(-30%)',
          opacity: 0
        }
      },
      {
        selector: '.section-4__fly-1',
        style: {
          opacity: 0
        }
      },
      {
        selector: '.section-4__fly-2',
        style: {
          opacity: 0
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
