import express from "express";
import mysql from "mysql2";
import cors from "cors";

import passport from "passport";
import session from "express-session";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs";

import { routes } from "./src/route.js";

const app = express();
const PORT = 5000;

app.use(express.json()); 
app.use(
  session({
    secret: "monsecret", // Change le secret !
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false, // ⚠️ Mettre `true` en production avec HTTPS
      httpOnly: true,
      sameSite: "lax", // Change à "none" si HTTPS (ex: pour déploiement)
      maxAge: 1000 * 60 * 60, // 1 heure
    },
  })
);

// Initialiser Passport
app.use(passport.initialize());
app.use(passport.session());

// Configuration de la stratégie Passport-Local
passport.use(new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
  const sql = "SELECT * FROM clients WHERE email = ?";
  db.query(sql, [email], (err, results) => {
    if (err) return done(err);
    if (results.length === 0) return done(null, false, { message: "Email introuvable ❌" });

    const user = results[0];

    // Vérifier le mot de passe
    bcrypt.compare(password, user.mdp, (err, isMatch) => {
      console.log('**',err,isMatch);
      if (err) return done(err);
      if (!isMatch) return done(null, false, { message: "Mot de passe incorrect ❌" });
      return done(null, user);
    });
  });
}));

// Sérialisation & Désérialisation de l'utilisateur
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  const sql = "SELECT * FROM clients WHERE id = ?";
  db.query(sql, [id], (err, results) => {
    if (err) return done(err);
    done(null, results[0]);
  });
});

// Middleware
// ✅ Configurer CORS pour autoriser les cookies
app.use(
  cors({
    origin: "http://localhost:5173", // Change selon ton frontend
    credentials: true, // Autorise l'envoi des cookies de session
  })
);
app.use(express.json());

// MySQL connection
export const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "project",
});

db.connect((err) => {
  if (err) {
    console.error("❌ Database Connection Error:", err);
    process.exit(1);
  }
  console.log("✅ Connected to MySQL Database");
});



// Start Server
routes(app);
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
