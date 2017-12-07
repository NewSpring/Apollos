// Generates theme overrides for a given content item
const getThemeOverrides = ({ isLight = true, colors = [], theme }) => {
  const overrides = {};

  colors.forEach((color) => {
    overrides[`${color.description}Color`] = `#${color.value}`;
  });

  if (!isLight) {
    overrides.baseFontColor = overrides.lightPrimaryColor || theme.lightPrimaryColor;
  }

  return overrides;
};

export default getThemeOverrides;
