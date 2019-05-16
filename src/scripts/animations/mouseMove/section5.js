export default [
  {
    selector: '.section-5__circle-1',
    animations: [
      {
        type: 'translateX',
        reactTo: 'horizontalOffsetFromCenter',
        ratio: .2
      },
      {
        type: 'translateY',
        reactTo: 'horizontalOffsetFromCenter',
        ratio: -.1
      }
    ]
  },
  {
    selector: '.section-5__circle-2',
    animations: [
      {
        type: 'translateX',
        reactTo: 'horizontalOffsetFromCenter',
        ratio: -.15
      }
    ]
  }
];
