import { db } from "../server.js";
import bcrypt from "bcryptjs";

export const logout = (req, res) => {
  req.logout((err) => {
      if (err) {
          return res.status(500).json({ message: "Erreur lors de la déconnexion." });
      }
      req.session.destroy(() => {
          res.clearCookie("connect.sid"); // Supprime le cookie de session
          res.status(200).json({ message: "Déconnexion réussie." });
      });
  });
}
export const inscription = (req, res) => {
    const { firstName, lastName, email, phone, address, password } = req.body;

  if (!firstName || !lastName || !email || !phone || !address || !password) {
    return res.status(400).json({ error: "Tous les champs sont requis ❌" });
  }
  console.log('password',password)
  // Hashage du mot de passe
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      console.error("Erreur de hashage :", err);
      return res.status(500).json({ error: "Erreur interne du serveur ❌" });
    }

    const sql = "INSERT INTO clients (prenom, nom, email, tel, adresse, mdp) VALUES (?, ?, ?, ?, ?, ?)";
    db.query(sql, [firstName, lastName, email, phone, address, hash], (err) => {
      if (err) {
        console.error("Erreur MySQL :", err);
        return res.status(500).json({ error: "Erreur de base de données ❌" });
      }
      res.status(201).json({ message: "Utilisateur enregistré avec succès ✅" });
    });
  });
};



export const contact = (req, res) => {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: "Tous les champs sont requis ❌" });
    }
    const sql = "INSERT INTO contact (Nom, Email, Message) VALUES (?, ?, ?)";
    db.query(sql, [name, email, message], (err) => {
      if (err) return res.status(500).json({ error: "Erreur de base de données ❌" });
      res.status(201).json({ message: "Message envoyé avec succès ✅" });
    });
  };

export const commander = (req, res) => {
    const { email, phone, address, cart } = req.body;
    if (!email || !phone || !address || !cart || cart.length === 0) {
      return res.status(400).json({ error: "Tous les champs sont requis ❌" });
    }
    const sql = "INSERT INTO commandes (email, tel, adresse, commande) VALUES (?, ?, ?, ?)";
    db.query(sql, [email, phone, address, JSON.stringify(cart)], (err) => {
      if (err) return res.status(500).json({ error: "Erreur de base de données ❌" });
      req.session.cart = [];
      res.status(201).json({ message: "Commande passée avec succès ✅" });
    });
  };

export const add = (req, res) => {
  const { item } = req.body;

  if (!item.name) {
      return res.status(400).json({ message: "Produit ou quantité invalide" });
  }

  // Vérifier si le panier existe dans la session, sinon l'initialiser
  if (!req.session.cart) {
      req.session.cart = [];
  }

  // Vérifier si le produit est déjà dans le panier
  const existingProduct = req.session.cart.find(p => p.item.name === item.name);
  if (existingProduct) {
      existingProduct.quantity += 1;
  } else {
      req.session.cart.push({ item, quantity: 1 });
  }

  res.json({ message: "Produit ajouté au panier", cart: req.session.cart });
}
export const remove = (req, res) => {
  const { item } = req.body;

  if (!item.name) {
      return res.status(400).json({ message: "ID du produit requis" });
  }

  if (!req.session.cart) {
      return res.status(400).json({ message: "Le panier est vide" });
  }

  req.session.cart = req.session.cart.filter(p => p.item.name !== item.name);

  res.json({ message: "Produit supprimé du panier", cart: req.session.cart });
}

export const list = (req, res) => {
  console.log("req.session.cart", req.session.cart)
  res.json(req.session.cart || []);
}