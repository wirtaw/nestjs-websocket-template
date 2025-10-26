const mockedConfigService = {
  get(key: string) {
    switch (key) {
      case 'OPEN_AI_KEY':
        return 'sd-226262';
      case 'MINIMAL_SYMBOLS_OPEN_AI':
        return '5';
    }
  },
};

export default mockedConfigService;
