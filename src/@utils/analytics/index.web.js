let { Amplitude } = window;

// keep things from breaking if Amplitude didn't load
if (!Amplitude) {
  Amplitude = {
    getInstance: () => ({
      setUserId: () => {},
      setUserProperties: () => {},
      clearUserProperties: () => {},
      logEvent: () => {},
      logEventWithProperties: () => {},
      setGroup: () => {},
    }),
  };
}

return Amplitude.getInstance();
