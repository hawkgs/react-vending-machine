/**
 * Helper function for React class names management.
 *
 * @param classes
 * @returns
 */
export const classes = (...classes: (string | undefined)[]) =>
  classes.filter((c) => !!c).join(' ');
