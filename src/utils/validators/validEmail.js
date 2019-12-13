import validator from 'validator';
// import axios from 'axios';

export default async (email) => {
  if (!validator.isEmail(email)) {
    return 'Please enter a valid email address';
  }
  
  // TODO: Add a remote validation to check email availability

  return null;
}