<template>
  <div class="profile-container">
    <h1>Mon Compte</h1>
    <div v-if="user">
      <p><strong>Nom :</strong> {{ user.nom }}</p>
      <p><strong>Prénom :</strong> {{ user.prenom }}</p>
      <p><strong>Email :</strong> {{ user.email }}</p>
      <p><strong>Téléphone :</strong> {{ user.tel }}</p>
      <p><strong>Adresse :</strong> {{ user.adresse }}</p>
    </div>
    <div v-else>
      <p>Veuillez vous connecter.</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
 // components: { NavbarLogged },
  data() {
    return {
      user: null,
    };
  },
  async created() {
    try {
      const response = await axios.get("http://localhost:5000/api/me", { withCredentials: true });
      this.user = response.data.user;
    } catch (error) {
      console.error("Erreur lors de la récupération du profil :", error);
      this.user = null;
    }
  },
};
</script>

<style>
.profile-container {
  max-width: 600px;
  margin: auto;
  text-align: center;
}
</style>
