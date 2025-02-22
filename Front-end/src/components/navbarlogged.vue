<template>
    <nav class="navbar">
      <div class="navbar-left">
        <router-link to="/accueillogged" class="nav-link">Accueil</router-link>
        <router-link to="/menu-logged" class="nav-link">Menu</router-link>
        <router-link to="/a-propos-logged" class="nav-link">À propos</router-link>
        <router-link to="/contactlogged" class="nav-link">Contact</router-link>
      </div>
      <div class="navbar-right">
        <router-link to="/profile" class="auth-link">Mon Compte</router-link>
        <button @click="logout" class="auth-link">Déconnecter</button>
      </div>
    </nav>
  </template>
  
  <script>
  export default {
    name: 'Navbar',
    methods: {
        logout() {
          axios.post('/logout');
          this.$router.push("/connexion");
        },
    },
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

  /* Style for "Déconnecter" button */
button.auth-link {
  background-color:red;
  color: lightgreen;
  border: 2px solid white;
  padding: 5px 15px;
  border-radius: 10px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
}


  </style>
  