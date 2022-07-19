export const regExpStrongPassword = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})");
export const regExpEmail = new RegExp("^[a-zA-Z0-9.-_-]+[@]{1}[a-zA-Z0-9.-_-]+[.]{1}[a-z]{2,10}$");
export const regName = new RegExp("^[a-zA-Zà-ùÀ-Ù- -']+$");