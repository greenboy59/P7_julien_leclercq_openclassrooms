// Déclaration des Regex pour obliger l'utilisation d'un mot de passe fort lors de la création d'un compte (min: 1 Maj, 1 Min, 1 caractère spécial, 1 chiffre, 8 caractères)
const regExpStrongPassword = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

module.exports = regExpStrongPassword;