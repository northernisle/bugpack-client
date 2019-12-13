import validator from 'validator';

export default (value, fieldName, min, max) => {
  const errorMessage = `${fieldName} must be between ${min} and ${max} characters`;
  return validator.isLength(value, { min, max })
    ? null
    : errorMessage.charAt(0).toUpperCase() + errorMessage.slice(1);
}