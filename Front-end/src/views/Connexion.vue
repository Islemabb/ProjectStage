<template>
  <div class="connexion-page">
    <div class="background-image"></div>
    <div class="connexion-box">
      <h1>Se connecter</h1>
      <form @submit.prevent="handleLogin">
        <!-- Email -->
        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            v-model="email"
            placeholder="Entrez votre email"
            required
          />
        </div>
        <!-- Password -->
        <div class="form-group">
          <label for="password">Mot de passe</label>
          <input
            type="password"
            id="password"
            v-model="password"
            placeholder="Entrez votre mot de passe"
            required
          />
        </div>
        <!-- Login Button -->
        <button type="submit" class="login-button">Connexion</button>
      </form>
      <!-- Sign up text -->
      <p class="signup-text">
        Vous n'avez pas encore de compte ? 
        <router-link to="/inscription" class="signup-link">Inscrivez-vous</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const router = useRouter();

const handleLogin = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/connexion", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // Important pour envoyer les cookies de session
      body: JSON.stringify({ email: email.value, password: password.value }),
    });

    const data = await response.json();

    if (response.ok) {
      window.location = "/";
    } else {
      alert(data.error || "Email ou mot de passe incorrect ❌");
    }
  } catch (error) {
    console.error("Erreur de connexion:", error);
    alert("Une erreur est survenue, veuillez réessayer ❌");
  }
};
</script>

<style scoped>
/* Full page styling */
.connexion-page {
  position: relative;
  width: 100%;
  height: 100vh;
  background: url('../imgs/restaurant1.png') no-repeat center center/cover;
  display: flex;
  align-items: flex-start; /* Align the box closer to the top */
  justify-content: center;
  padding-top: 50px; /* Reduced padding to bring the box closer to the top */
}

/* Overlay box */
.connexion-box {
  background-color: #ffffff;
  padding: 50px 60px; /* Increased padding for a larger box */
  border-radius: 10px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 800px; /* Set box width to 800px */
  position: relative;
}

.connexion-box h1 {
  font-size: 32px; /* Larger title */
  color: #2ecc71;
  margin-bottom: 30px;
}

/* Form group styling */
.form-group {
  margin-bottom: 20px;
  text-align: left;
}

label {
  font-size: 18px; /* Larger labels for better readability */
  color: #2ecc71;
  display: block;
  margin-bottom: 8px;
}

input {
  width: 100%;
  padding: 14px; /* Larger input fields */
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

input:focus {
  border-color: #2ecc71;
  outline: none;
}

/* Button styling */
.login-button {
  background-color: #2ecc71;
  color: #fff;
  padding: 16px 20px; /* Larger button */
  border: none;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.3s;
}

.login-button:hover {
  background-color: #27ae60;
}

/* Sign up link */
.signup-text {
  margin-top: 20px;
  font-size: 16px; /* Larger text */
  color: #333;
}

.signup-link {
  color: #2ecc71;
  font-weight: bold;
  text-decoration: none;
}

.signup-link:hover {
  text-decoration: underline;
}

/* Background image container */
.background-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}
</style>
