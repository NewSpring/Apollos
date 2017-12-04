import { INITIAL_STATE } from './constants';

export function contributions() {
  return {
    __typename: 'GiveContributions',
    ...INITIAL_STATE,
  };
}

