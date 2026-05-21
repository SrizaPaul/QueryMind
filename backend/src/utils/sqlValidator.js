const validateSQL = (query) => {

  if (!query) {
    return false;
  }

  const upperCaseQuery =
    query.toUpperCase();

  const forbidden = [
    'DROP',
    'DELETE',
    'UPDATE',
    'INSERT',
    'ALTER',
    'TRUNCATE'
  ];

  for (const word of forbidden) {

    if (upperCaseQuery.includes(word)) {

      return false;

    }

  }

  return true;

};

module.exports = {
  validateSQL
};