<template>
  <div class="profile-container">
    <h1>Mon Compte</h1>
    <div v-if="user">
      <p class="champs"><strong>Nom :</strong> {{ user.nom }}</p>
      <p class="champs"><strong>Prénom :</strong> {{ user.prenom }}</p>
      <p class="champs"><strong>Email :</strong> {{ user.email }}</p>
      <p class="champs"><strong>Téléphone :</strong> {{ user.tel }}</p>
      <p class="champs"><strong>Adresse :</strong> {{ user.adresse }}</p>
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
  width: 600px;
  margin: 30px auto;
  padding: 30px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.champs {
  border: 1px solid #333; /* 3px continuous border */
  border-radius: 5px;
  padding: 6px;
  margin-top: 10px; /* Space between the champs blocks */
}

h1 {
  font-size: 2.4rem;
  color: #333;
  margin-bottom: 30px;
  text-align: center;
  font-weight: bold;
}

.profile-container p {
  font-size: 1.2rem;
  color: #333;
}

strong {
  color: #ff6f61;
  font-weight: bold;
}


</style>
