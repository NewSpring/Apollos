let { amplitude } = window; // eslint-disable-line

// keep things from breaking if Amplitude didn't load
if (!amplitude) {
  amplitude = {
    setUserId: () => {},
    setUserProperties: () => {},
    clearUserProperties: () => {},
    logEvent: () => {},
    logEventWithProperties: () => {},
    setGroup: () => {},
  };
}

// compatibility with native api:
amplitude.logEventWithProperties = amplitude.logEvent;

export default amplitude;
