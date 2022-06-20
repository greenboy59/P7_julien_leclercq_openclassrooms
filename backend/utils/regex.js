// Déclaration des Regex pour obliger l'utilisation d'un mot de passe fort lors de la création d'un compte (min: 1 Maj, 1 Min, 1 caractère spécial, 1 chiffre, 8 caractères)
exports.regExpStrongPassword = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
exports.regExpEmail = new RegExp("^[a-zA-Z0-9.-_-]+[@]{1}[a-zA-Z0-9.-_-]+[.]{1}[a-z]{2,10}$");
exports.regName = new RegExp("^[a-zA-Zà-ùÀ-Ù- -']+$");