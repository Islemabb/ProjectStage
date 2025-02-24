<template>
  <nav class="navbar">
    <div class="navbar-left">
      <router-link to="/" class="nav-link">Accueil</router-link>
      <router-link to="/menu" class="nav-link">Menu</router-link>
      <router-link to="/a-propos" class="nav-link">À propos</router-link>
      <router-link to="/contact" class="nav-link">Contact</router-link>
    </div>

    <div v-if="isLogged" class="navbar-right">
        <router-link to="/profile" class="auth-link">Mon Compte</router-link>
        <button @click="logout" class="auth-link">Déconnecter</button>
    </div>

    <div v-else class="navbar-right">
      <router-link to="/inscription" class="auth-link">S'inscrire</router-link>
      <router-link to="/connexion" class="auth-link">Se connecter</router-link>
    </div>

  </nav>
</template>

<script>

import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const isLogged = ref(false);
    const router = useRouter();
    onMounted(async () => {
      try {
         const res = await fetch("http://localhost:5000/api/me", {
                method: "get",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
              });
         const { user } = await res.json();
         if (user) {
         window.profile = user;
         window.isLogged = true;
         isLogged.value = true;
         }else{
             window.profile = null;
            window.isLogged = false;
            isLogged.value = false;
         }
      } catch(err) {
        console.log(err)
      }
    });

    const logout = async () => {
          await fetch("http://localhost:5000/api/logout", {
                method: "post",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
              });
         window.profile = null;
         window.isLogged = false;
         isLogged.value = false;
          router.push("/");
    };

    return { logout, isLogged }
  }
}
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
