<template>
  <div class="inscription-page">
    <div class="background-image"></div>
    <div class="inscription-box">
      <h1>S'inscrire</h1>
      <form @submit.prevent="handleSignup">
        <!-- First Name -->
        <div class="form-group">
          <label for="first-name">Prénom</label>
          <input
            type="text"
            id="first-name"
            v-model="firstName"
            placeholder="Entrez votre prénom"
            required
          />
        </div>
        <!-- Last Name -->
        <div class="form-group">
          <label for="last-name">Nom</label>
          <input
            type="text"
            id="last-name"
            v-model="lastName"
            placeholder="Entrez votre nom"
            required
          />
        </div>
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
        <!-- Phone Number -->
        <div class="form-group">
          <label for="phone">Numéro de téléphone</label>
          <input
            type="tel"
            id="phone"
            v-model="phone"
            placeholder="Entrez votre numéro de téléphone"
            required
          />
        </div>
        <!-- Address -->
        <div class="form-group">
          <label for="address">Adresse</label>
          <input
            type="text"
            id="address"
            v-model="address"
            placeholder="Entrez votre adresse"
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
            placeholder="Créez un mot de passe"
            required
          />
        </div>
        <!-- Confirm Password -->
        <div class="form-group">
          <label for="confirm-password">Confirmez le mot de passe</label>
          <input
            type="password"
            id="confirm-password"
            v-model="confirmPassword"
            placeholder="Confirmez votre mot de passe"
            required
          />
        </div>
        <!-- Signup Button -->
        <button type="submit" class="signup-button">S'inscrire</button>
      </form>
      <!-- Log in text -->
      <p class="login-text">
        Vous avez déjà un compte ? 
        <router-link to="/connexion" class="login-link">Connectez-vous</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios"; // Import axios to make HTTP requests
import { useRouter } from "vue-router"; // Import useRouter to navigate

const router = useRouter(); // Initialize router for navigation

const firstName = ref("");
const lastName = ref("");
const email = ref("");
const phone = ref("");
const address = ref("");
const password = ref("");
const confirmPassword = ref("");

const handleSignup = async () => {
  if (password.value !== confirmPassword.value) {
    alert("Les mots de passe ne correspondent pas !");
    return;
  }

  try {
    // Send a POST request to the server
    await axios.post("http://localhost:5000/api/inscription", {
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      phone: phone.value,
      address: address.value,
      password: password.value
    });
    alert("Compte a été crée")

    // Redirect to the login page after successful signup
    router.push("/Connexion");
  } catch (error) {
    // Handle error response from the server
    console.error("Error during signup:", error);
  }
};
</script>

<style scoped>
/* Full page styling */
.inscription-page {
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: flex-start; /* Align the box further up */
  justify-content: center;
  padding-top: 50px; /* Reduced padding to bring the box closer to the top */
}

/* Overlay box */
.inscription-box {
  background-color: #ffffff;
  padding: 50px 60px; /* Increased padding for larger inputs */
  border-radius: 10px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 800px; /* Set box width to 800px */
  position: relative;
}

.inscription-box h1 {
  font-size: 32px;
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
.signup-button {
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

.signup-button:hover {
  background-color: #27ae60;
}

/* Login text */
.login-text {
  margin-top: 20px;
  font-size: 16px; /* Larger text */
  color: #333;
}

.login-link {
  color: #2ecc71;
  font-weight: bold;
  text-decoration: none;
}

.login-link:hover {
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
