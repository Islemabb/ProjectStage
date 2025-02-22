import { db } from "../server.js";
import bcrypt from "bcryptjs";

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
    const { email, phone, address, order } = req.body;
    if (!email || !phone || !address || !order || order.length === 0) {
      return res.status(400).json({ error: "Tous les champs sont requis ❌" });
    }
    const sql = "INSERT INTO commandes (email, tel, adresse, commande) VALUES (?, ?, ?, ?)";
    db.query(sql, [email, phone, address, JSON.stringify(order)], (err) => {
      if (err) return res.status(500).json({ error: "Erreur de base de données ❌" });
      res.status(201).json({ message: "Commande passée avec succès ✅" });
    });
  };