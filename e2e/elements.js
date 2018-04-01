const elements = (element, by) => {
  const homeTab = element(by.id('homeTab'));
  const profileTab = element(by.id('profileTab'));
  const sectionTab = element(by.id('sectionTab'));
  const welcomeBanner = element(by.id('welcomeBanner'));
  const loginForm = element(by.id('loginForm'));
  const loginEmailInput = element(by.id('email'));
  const loginPasswordInput = element(by.id('password'));
  const loginFormGoButton = element(by.id('go'));
  const giveSectionLink = element(by.id('navLinkGive'));
  const firstContributionInput = element(by.id('firstContributionInput'));
  const secondContributionInput = element(by.id('secondContributionInput'));
  const giveNowView = element(by.id('giveNowView'));
  const reviewContributionButton = element(by.id('reviewContribution'));
  const firstContributionInputLabel = element(by.id('firstContributionInputLabel'));
  const paymentConfirmButton = element(by.id('paymentConfirmButton'));

  return {
    homeTab,
    profileTab,
    sectionTab,
    loginForm,
    loginEmailInput,
    loginPasswordInput,
    loginFormGoButton,
    welcomeBanner,
    giveSectionLink,
    firstContributionInput,
    secondContributionInput,
    giveNowView,
    reviewContributionButton,
    firstContributionInputLabel,
    paymentConfirmButton,
  };
};

export default elements;
