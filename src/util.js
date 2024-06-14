import valid from 'card-validator';

export default {
  toAlpha: (hex, alpha) => {
    const alphas = {
      100: 'FF',
      95: 'F2',
      90: 'E6',
      85: 'D9',
      80: 'CC',
      75: 'BF',
      70: 'B3',
      65: 'A6',
      60: '99',
      55: '8C',
      50: '80',
      45: '73',
      40: '66',
      35: '59',
      30: '4D',
      25: '40',
      20: '33',
      15: '26',
      10: '1A',
      5: '0D',
    };

    return hex + alphas[alpha];
  },
  isValidCreditCard: creditCard => {
    //{"cvv": "", "holder_name": "", "number": "", "valid_date": ""}
    // HOLDER NAME
    if (!valid.cardholderName(creditCard.holder_name).isValid) {
      return {error: true, message: 'Invalid holder name.'};
    }

    // CARD NUMBER
    if (!valid.number(creditCard.number).isValid) {
      return {error: true, message: 'Invalid card number.'};
    }

    // EXPIRATION DATE
    if (!valid.expirationDate(creditCard.valid_date).isValid) {
      return {error: true, message: 'Invalid expiration date.'};
    }

    // CVV
    if (!valid.cvv(creditCard.cvv).isValid) {
      return {error: true, message: 'Invalid CVV.'};
    }

    return {error: false};
  },
};
