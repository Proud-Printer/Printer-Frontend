import { atom } from 'recoil';

export const detailsAtom = atom({
  key: 'detailsAtom',
  default: {
    name: '',
    email: '',
    password: '',
    password2: '',
  },
});
