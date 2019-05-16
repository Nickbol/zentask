export default {
  desktop: {
    up: [
      {
        selector: '.section-2__phone',
        style: {
          bottom: '-10%',
          opacity: 0
        }
      },
      {
        selector: '.section-2__wave',
        style: {
          bottom: '-20%',
          opacity: 0
        }
      },
      {
        selector: '.section-2__dash',
        style: {
          transform: 'scaleX(0)',
          opacity: 0
        }
      },
      {
        selector: '.section-2__title',
        style: {
          transform: 'translateY(-20px)',
          opacity: 0
        }
      },
      {
        selector: '.section-2__text',
        style: {
          transform: 'translateY(20px)',
          opacity: 0
        }
      },
      {
        selector: '.section-2__cards',
        style: {
          transform: 'scale(.9)',
          opacity: 0
        }
      }
    ],
      center: [
      {
        selector: '.section-2__wave',
        style: {
          bottom: '-8%',
          opacity: 1
        }
      },
      {
        selector: '.section-2__phone',
        style: {
          bottom: 0,
          opacity: 1
        }
      },
      {
        selector: '.section-2__dash',
        style: {
          transform: 'scaleX(1)',
          opacity: 1
        }
      },
      {
        selector: '.section-2__title',
        style: {
          transform: 'translateY(0)',
          opacity: 1
        }
      },
      {
        selector: '.section-2__text',
        style: {
          transform: 'translateY(0)',
          opacity: 1
        }
      },
      {
        selector: '.section-2__cards',
        style: {
          transform: 'scale(1)',
          opacity: 1
        }
      },
      {
        selector: '.section-2__content',
        style: {
          transform: 'translateY(0)',
          opacity: 1
        }
      }
    ],
      down: [
      {
        selector: '.section-2__wave',
        style: {
          transform: 'translateY(0)',
          bottom: '70%',
          opacity: 1
        }
      },
      {
        selector: '.section-2__content',
        style: {
          transform: 'translateY(-100%)',
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
