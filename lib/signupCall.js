import axios from '../axios';

export const signupCall = async (details) => {
  try {
    const { data } = await axios.post('/api/dj/signup', details);
    return data;
  } catch (error) {
    console.log(error);
  }
};
