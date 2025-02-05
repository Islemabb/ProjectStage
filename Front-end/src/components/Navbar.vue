<template>
  <nav class="navbar">
    <div class="navbar-left">
      <router-link to="/" class="nav-link">Accueil</router-link>
      <router-link to="/menu" class="nav-link">Menu</router-link>
      <router-link to="/a-propos" class="nav-link">À propos</router-link>
      <router-link to="/contact" class="nav-link">Contact</router-link>
    </div>
    <div class="navbar-right">
      <router-link to="/inscription" class="auth-link">S'inscrire</router-link>
      <router-link to="/connexion" class="auth-link">Se connecter</router-link>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
};
</script>

<style scoped>
/* Navbar container */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: lightgreen;  /* Background color */
  padding: 10px 20px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
}

/* Left side of navbar (links) */
.navbar-left {
  display: flex;
  gap: 20px;
}

.navbar-left .nav-link {
  text-decoration: none;
  color: white;  /* Text color */
  font-size: 18px;
  padding: 5px;
}

.navbar-left .nav-link:hover {
  cursor: pointer;
  border-bottom: 2px solid white;  /* Underline effect */
}

/* Right side of navbar (auth links) */
.navbar-right {
  display: flex;
  gap: 20px;
}

.navbar-right .auth-link {
  text-decoration: none;
  color: white;  /* Text color */
  font-size: 18px;
  padding: 5px;
}

.navbar-right .auth-link:hover {
  cursor: pointer;
  border-bottom: 2px solid white;  /* Underline effect */
}

/* Ensuring the links are well spaced and readable */
.navbar-left .nav-link, .navbar-right .auth-link {
  font-weight: bold;
}
</style>
