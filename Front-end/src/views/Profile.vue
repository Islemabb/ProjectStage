<template>
    <div class="profile-container">
      <NavbarLogged />
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
  import NavbarLogged from "../components/navbarlogged.vue";
  
  export default {
    components: { NavbarLogged },
    data() {
      return {
        user: JSON.parse(localStorage.getItem("user")) || null,
      };
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
  