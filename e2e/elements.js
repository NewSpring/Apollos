const elements = (element, by) => {
  const homeTab = element(by.id('homeTab'));
  const profileTab = element(by.id('profileTab'));
  const sectionTab = element(by.id('sectionTab'));
  const welcomeBanner = element(by.id('welcomeBanner'));
  const loginForm = element(by.id('loginForm'));
  const loginEmailInput = element(by.id('email'));
  const loginPasswordInput = element(by.id('password'));
  const loginFormGoButton = element(by.id('go'));

  return {
    homeTab,
    profileTab,
    sectionTab,
    loginForm,
    loginEmailInput,
    loginPasswordInput,
    loginFormGoButton,
    welcomeBanner,
  };
};

export default elements;
