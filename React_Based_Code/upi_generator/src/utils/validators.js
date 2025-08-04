import { isValidPhoneNumber } from 'libphonenumber-js';

export const validateMobile = (number) => {
    const re = /^[6-9]{1}[0-9]{9}$/;
    if (!re.test(number)) return false;
    return isValidPhoneNumber(number, 'IN');
};

export const luhnCheck = (cardNumber) => {
    const digits = String(cardNumber).split('').map(Number);
    let checksum = 0;
    let double = false;
    for (let i = digits.length - 1; i >= 0; i--) {
        let d = digits[i];
        if (double) {
            d = d * 2;
            if (d > 9) d -= 9;
        }
        checksum += d;
        double = !double;
    }
    return checksum % 10 === 0;
};

export const getCardNetwork = (cardNumber) => {
    if (!cardNumber || cardNumber.length < 2) return null;
    const firstTwo = parseInt(cardNumber.slice(0, 2), 10);
    const firstSix = cardNumber.length >= 6 ? parseInt(cardNumber.slice(0, 6), 10) : 0;
    if (cardNumber[0] === '4') return 'visa';
    if ((51 <= firstTwo && firstTwo <= 55) || (2221 <= firstSix && firstSix <= 2720)) return 'mastercard';
    if ([34, 37].includes(firstTwo)) return 'amex';
    if (firstTwo === 36) return 'diners';
    if ([60, 65, 81, 82].includes(firstTwo)) return 'rupay';
    return null;
};

export const validateCardNumber = (number) => {
    return /^\d{12,19}$/.test(number) && luhnCheck(number);
};
