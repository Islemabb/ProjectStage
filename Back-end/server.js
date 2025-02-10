const http = require("http");
const mysql = require("mysql2");

// CORS Middleware
const allowCors = (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return true;
  }
  return false;
};

// MySQL connection with error handling
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "project",
});

db.connect((err) => {
  if (err) {
    console.error("❌ Database Connection Error:", err);
    process.exit(1); // Stop the server if database fails
  } else {
    console.log("✅ Connected to MySQL Database");
  }
});

const server = http.createServer((req, res) => {
  if (allowCors(req, res)) return;

  let body = "";
  req.on("data", (chunk) => (body += chunk));
  req.on("end", () => {
    try {
      const parsedBody = body ? JSON.parse(body) : null;

      // 🔹 Handle User Registration (/api/inscription)
      if (req.method === "POST" && req.url === "/api/inscription") {
        const { firstName, lastName, email, phone, address, password } = parsedBody;

        if (!firstName || !lastName || !email || !phone || !address || !password) {
          res.writeHead(400, { "Content-Type": "application/json" });
          return res.end(JSON.stringify({ error: "Tous les champs sont requis ❌" }));
        }

        const sql = "INSERT INTO clients (prenom, nom, email, tel, adresse, mdp) VALUES (?, ?, ?, ?, ?, ?)";
        db.query(sql, [firstName, lastName, email, phone, address, password], (err) => {
          if (err) {
            console.error("Database Error:", err);
            res.writeHead(500, { "Content-Type": "application/json" });
            return res.end(JSON.stringify({ error: "Erreur de base de données ❌" }));
          }
          res.writeHead(201, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: "Utilisateur enregistré avec succès ✅" }));
        });
        return;
      }

      // 🔹 Handle User Login (/api/connexion)
      if (req.method === "POST" && req.url === "/api/connexion") {
        const { email, password } = parsedBody;

        if (!email || !password) {
          res.writeHead(400, { "Content-Type": "application/json" });
          return res.end(JSON.stringify({ error: "Email et mot de passe requis ❌" }));
        }

        const sql = "SELECT * FROM clients WHERE email = ? AND mdp = ?";
        db.query(sql, [email, password], (err, results) => {
          if (err) {
            console.error("Database Error:", err);
            res.writeHead(500, { "Content-Type": "application/json" });
            return res.end(JSON.stringify({ error: "Erreur de base de données ❌" }));
          }

          if (results.length > 0) {
            res.writeHead(200, { "Content-Type": "application/json" });
            return res.end(JSON.stringify({ message: "Connexion réussie ✅", client: results[0] }));
          } else {
            res.writeHead(401, { "Content-Type": "application/json" });
            return res.end(JSON.stringify({ error: "Email ou mot de passe incorrect ❌" }));
          }
        });
        return;
      }

      // 🔹 Handle Contact Form (/api/contact)
      if (req.method === "POST" && req.url === "/api/contact") {
        const { name, email, message } = parsedBody;

        if (!name || !email || !message) {
          res.writeHead(400, { "Content-Type": "application/json" });
          return res.end(JSON.stringify({ error: "Tous les champs sont requis ❌" }));
        }

        const sql = "INSERT INTO contact (Nom, Email, Message) VALUES (?, ?, ?)";
        db.query(sql, [name, email, message], (err) => {
          if (err) {
            console.error("Database Error:", err);
            res.writeHead(500, { "Content-Type": "application/json" });
            return res.end(JSON.stringify({ error: "Erreur de base de données ❌" }));
          }
          res.writeHead(201, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: "Message envoyé avec succès ✅" }));
        });
        return;
      }

      // 🔹 Handle Order Placement (/api/commander)
      if (req.method === "POST" && req.url === "/api/commander") {
        const { email, phone, address, order } = parsedBody;

        if (!email || !phone || !address || !order || order.length === 0) {
          res.writeHead(400, { "Content-Type": "application/json" });
          return res.end(JSON.stringify({ error: "Tous les champs sont requis ❌" }));
        }

        const sql = "INSERT INTO commandes (email, tel, adresse, commande) VALUES (?, ?, ?, ?)";
        db.query(sql, [email, phone, address, JSON.stringify(order)], (err) => {
          if (err) {
            console.error("Database Error:", err);
            res.writeHead(500, { "Content-Type": "application/json" });
            return res.end(JSON.stringify({ error: "Erreur de base de données ❌" }));
          }
          res.writeHead(201, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: "Commande passée avec succès ✅" }));
        });
        return;
      }

      // Handle 404 Not Found
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Route non trouvée ❌" }));
    } catch (error) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Format JSON invalide ❌" }));
    }
  });
});

server.listen(5000, () => console.log("🚀 Server running at http://localhost:5000"));
