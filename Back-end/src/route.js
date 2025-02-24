import { inscription, contact, commander, logout, add, remove, list } from "./handler.js";
import passport from "passport";

// Routes
export const routes = (app)=>{
    app.post("/api/inscription", inscription);

    app.post("/api/logout", logout);
  
    app.post("/api/connexion", passport.authenticate("local"), (req, res) => {
        res.json({ message: "Connexion réussie ✅", client: req.user });
      });
  
  app.post("/api/contact", contact);
  
  app.post("/api/commander", commander);

  app.post('/api/add', add);
  app.post('/api/remove', remove);
  app.get('/api/list', list);

  app.get("/api/me", (req, res) => {
    if (!req.user) {
      return res.status(401).json({ error: "Utilisateur non connecté ❌" });
    }
    res.json({ user: req.user });
  });

  
  
  // Route Not Found
  app.use((req, res) => {
    res.status(404).json({ error: "Route non trouvée ❌" });
  });
} 
