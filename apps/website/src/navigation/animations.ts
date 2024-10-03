const transition = `transition-all duration-300`;

export const applyDesktopShrinkAnimation = (apply: boolean) => {
  return apply
    ? `md:!max-w-0 md:!mx-0 md:overflow-hidden md:${transition}`
    : `md:max-w-48 md:${transition}`;
};
