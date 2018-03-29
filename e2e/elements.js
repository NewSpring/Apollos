const elements = (element, by) => {
  const homeTab = element(by.id('homeTab'));
  const profileTab = element(by.id('profileTab'));
  const sectionTab = element(by.id('sectionTab'));
  const loginForm = element(by.id('loginForm'));
  const loginEmailInput = element(by.id('loginForm').withDescendant(by.label('Email')));
  const loginPasswordInput = element(by.id('loginForm').withDescendant(by.label('Password')));
  const loginFormGoButton = element(by.id('loginForm').withDescendant(by.text('Go')));

  return {
    homeTab,
    profileTab,
    sectionTab,
    loginForm,
    loginEmailInput,
    loginPasswordInput,
    loginFormGoButton,
  };
};

export default elements;
