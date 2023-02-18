import { atom } from 'recoil';

export const loaderAtom = atom({
  key: 'loaderAtom',
  default: {
    isLoading: false,
  },
});
