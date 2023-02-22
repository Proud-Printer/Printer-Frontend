import { atom } from 'recoil';

// persist the state of the button to disable it after 5 minutes if the user requests for another song in local storage
const localStorageEffect =
  (key) =>
  ({ setSelf, onSet, trigger }) => {
    // If there's a persisted value - set it on load
    const loadPersisted = async () => {
      const savedValue = await localStorage.getItem(key);

      if (savedValue != null) {
        setSelf(JSON.parse(savedValue));
      }
    };

    // Asynchronously set the persisted data
    if (trigger === 'get') {
      loadPersisted();
    }

    // Subscribe to state changes and persist them to localForage
    onSet((newValue, _, isReset) => {
      isReset
        ? localStorage.removeItem(key)
        : localStorage.setItem(key, JSON.stringify(newValue));
    });
  };

export const disableButtonAtom = atom({
  key: 'disableButtonAtom',
  default: false,
  effects_UNSTABLE: [localStorageEffect('disable_button')],
});
