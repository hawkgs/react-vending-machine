export const classes = (...classes: (string | undefined)[]) =>
  classes.filter((c) => !!c).join(' ');
