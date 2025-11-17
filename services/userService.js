const User = require('../models/user');

exports.getAllUsers = async () => {
  return User.find({}, { password: 0 }).sort({ email: 1 });
};

exports.getUserByEmail = async (email) => {
  return User.findOne({ email });
};

// Ajoute un nouvel utilisateur avec mot de passe hashé automatiquement (via pre-save)
exports.addUser = async (data) => {
  if (!data.password) throw new Error("Le mot de passe est requis");
  return User.create(data); // ✅ Mongoose fera le hashage tout seul
};

exports.updateUser = async (email, data) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Utilisateur introuvable");

  if (data.password) {
  user.password = data.password;
}

  // Mise à jour uniquement des champs reçus
  Object.keys(data).forEach(key => {
    user[key] = data[key];
  });

  return user.save();
};

exports.deleteUser = async (email) => {
  const result = await User.deleteOne({ email });
  if (result.deletedCount === 0) throw new Error("Utilisateur introuvable");
  return result;
};