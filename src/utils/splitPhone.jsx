import { parsePhoneNumberFromString } from "libphonenumber-js";

export const splitPhone = (raw) => {
    if (!raw) return null;

    // Ensure it's a string and prepend +
    const phone = parsePhoneNumberFromString("+" + String(raw));

    if (!phone || !phone.countryCallingCode || !phone.nationalNumber) {
        return null;
    }

    return {
        countryCode: phone.countryCallingCode,
        nationalNumber: phone.nationalNumber,
        country: phone.country,
        formatted: `+${phone.countryCallingCode} ${phone.nationalNumber}`
    };
};
