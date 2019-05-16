export default [
  {
    selector: '.section-3__wave',
    animations: [
      {
        type: 'translateY',
        reactTo: 'horizontalOffsetFromCenter',
        ratio: -0.1
      }
    ]
  },
  {
    selector: '.section-3__circle-1',
    animations: [
      {
        type: 'scale',
        reactTo: 'horizontalOffsetFromRight',
        ratio: 1
      }
    ]
  },
  {
    selector: '.section-3__circle-2',
    animations: [
      {
        type: 'translateX',
        reactTo: 'horizontalOffsetFromCenter',
        ratio: .2
      }
    ]
  },
];
