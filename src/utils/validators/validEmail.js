import validator from 'validator';
import axios from '../configs/axiosConfig';

let timer;

export default (email, verifyUniqueness = true) => new Promise((resolve, _reject) => {
  if (!validator.isEmail(email)) {
    return resolve('Please enter a valid email address');
  }

  if (!verifyUniqueness) {
    return resolve(null);
  }

  clearTimeout(timer);
  timer = setTimeout(async () => {
    const { data: emailOccupied } = await axios.post('/users/emailOccupied', { email });

    let error = emailOccupied ? 'Email already taken' : null;
    return resolve(error);
  }, 300);
});