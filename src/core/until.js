export const emailValidator = (email) => {
    const re = /\S+@\S+\.\S+/;
    if (!email || email.length <= 0) return 'אופסס!, שכחת למלא אימייל';
    if (!re.test(email)) return 'אופסס!, ניראה שהאימייל שהכנסת אינו חוקי';
    return null;
};

export const stringValidator = (string, count, msg) => {
    if (string?.length === 0) return `אתה חייב למלא ${msg}!`;
    if(string?.length < count) return `${msg} חייבת להית בת ${count} תווים`;
    return null;
}

export const passwordValidator = (password) => {
    if (!password || password.length <= 6) return 'סיסמא חייבת להכיל לפחות 8 תווים';
    return null;
};

export const nameValidator = (name) => {
    const pattern = /^[\u05D0-\u05EA\u05F0-\u05F2\u05F3-\u05F4]+$/;
    if (!name || name.length <= 1) return 'שם חייב להיות לפחות עם 2 תווים!';
    if (pattern.test(name)) {
        return null; // Return null if the n is valid
    } else {
        return '!שם חייב להכיל רק תווים בעברית'; // Return 'error' if the input contains unwanted characters
    }
};

export const validatePhoneNumber = (phoneNumber) => {
    // Regular expression pattern for a valid phone number
    const pattern = /^\d{10}$/;
    // Check if the phoneNumber matches the pattern
    if (pattern.test(phoneNumber)) {
        return null;
    } else {
        return "הזן מספר פלאפון חוקי!"
    }
}
