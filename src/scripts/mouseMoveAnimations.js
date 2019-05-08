export const mouseMoveAnimations = {
  section1 : [
    {
      selector: '.section-1__item-1',
      animations: [
        {
          type: 'translateY',
          reactTo: 'horizontalOffsetFromCenter',
          ratio: -0.05
        },
        {
          type: 'scale',
          reactTo: 'horizontalOffsetFromRight',
          ratio: 1
        }
      ]
    },
    {
      selector: '.section-1__item-2',
      animations: [
        {
          type: 'scale',
          reactTo: 'horizontalOffsetFromRight',
          ratio: 2
        }
      ]
    }
  ],
  section2 : [
    {
      selector: '.section-2__item-1',
      animations: [
        {
          type: 'translateX',
          reactTo: 'horizontalOffsetFromCenter',
          ratio: 0.2
        }
      ]
    },
    {
      selector: '.section-2__item-2',
      animations: [
        {
          type: 'translateX',
          reactTo: 'horizontalOffsetFromCenter',
          ratio: -1.5
        }
      ]
    }
  ],
  section3 : [
    {
      selector: '.section-3__item-1',
      animations: [
        {
          type: 'translateX',
          reactTo: 'horizontalOffsetFromCenter',
          ratio: 0.2
        }
      ]
    },
    {
      selector: '.section-3__item-2',
      animations: [
        {
          type: 'translateY',
          reactTo: 'horizontalOffsetFromCenter',
          ratio: -0.1
        }
      ]
    }
  ],
  section4 : [
    {
      selector: '.section-4__item-1',
      animations: [
        {
          type: 'scale',
          reactTo: 'horizontalOffsetFromRight',
          ratio: 2
        }
      ]
    },
    {
      selector: '.section-4__item-2',
      animations: [
        {
          type: 'translateX',
          reactTo: 'horizontalOffsetFromCenter',
          ratio: 0.1
        }
      ]
    }
  ],
  section5 : [
    {
      selector: '.section-5__item-1',
      animations: [
        {
          type: 'translateY',
          reactTo: 'horizontalOffsetFromCenter',
          ratio: 0.1
        }
      ]
    },
    {
      selector: '.section-5__item-2',
      animations: [
        {
          type: 'translateX',
          reactTo: 'horizontalOffsetFromCenter',
          ratio: 0.1
        }
      ]
    }
  ]
};
