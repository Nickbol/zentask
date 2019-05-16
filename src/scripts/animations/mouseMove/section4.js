export default [
  {
    selector: '.section-4__fly-1',
    animations: [
      {
        type: 'scale',
        reactTo: 'horizontalOffsetFromRight',
        ratio: 1
      },
      {
        type: 'translateX',
        reactTo: 'horizontalOffsetFromCenter',
        ratio: .05
      }
    ]
  },
  {
    selector: '.section-4__fly-2',
    animations: [
      {
        type: 'scale',
        reactTo: 'horizontalOffsetFromRight',
        ratio: 1
      },
      {
        type: 'translateX',
        reactTo: 'horizontalOffsetFromCenter',
        ratio: -.05
      }
    ]
  }
];
