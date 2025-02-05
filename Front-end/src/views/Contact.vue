<template>
  <div class="contact-page">
    <header class="contact-header">
      <!-- Introductory paragraphs -->
      <div class="intro-paragraphs">
        <p>
          Bienvenue sur notre page de contact ! Nous sommes ravis de vous avoir parmi nous. 
          Notre équipe est dédiée à répondre à vos besoins et à vous offrir un service exceptionnel.
        </p>
        <p>
          Si vous avez des questions, des préoccupations ou des suggestions, nous sommes là pour écouter et répondre rapidement.
          N'hésitez pas à nous contacter par le biais des informations ci-dessous ou du formulaire.
        </p>
        <p>
          Faites partie de notre mission pour créer un avenir meilleur en collaborant avec nous. Votre satisfaction est notre priorité.
        </p>
      </div>

      <!-- Title and description -->
      <h1>Contactez-nous</h1>
      <p>
        Nous sommes ici pour vous aider. Remplissez le formulaire ou utilisez nos coordonnées
        ci-dessous pour entrer en contact.
      </p>
    </header>

    <!-- Contact information -->
    <section class="contact-info">
      <div class="info-block">
        <img
          src="../imgs/adresse.webp"
          alt="Adresse icon"
          class="info-icon"
        />
        <h3>Notre Adresse</h3>
        <p>123 Rue de l'Entreprise, Paris, France</p>
      </div>
      <div class="info-block">
        <img
          src="../imgs/tel2.png"
          alt="Téléphone icon"
          class="info-icon"
        />
        <h3>Appelez-nous</h3>
        <p>+33 1 23 45 67 89</p>
      </div>
      <div class="info-block">
        <img
          src="../imgs/email1.png"
          alt="Email icon"
          class="info-icon"
        />
        <h3>Email sur</h3>
        <p>contact@entreprise.com</p>
      </div>
    </section>

    <!-- Contact form -->
    <section class="contact-form">
      <h2>Formulaire de Contact</h2>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="name">Nom</label>
          <input
            type="text"
            id="name"
            v-model="formData.name"
            required
            placeholder="Votre nom complet"
          />
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            v-model="formData.email"
            required
            placeholder="Votre adresse email"
          />
        </div>
        <div class="form-group">
          <label for="message">Message</label>
          <textarea
            id="message"
            v-model="formData.message"
            required
            placeholder="Votre message"
          ></textarea>
        </div>
        <button type="submit" class="submit-button">Envoyer</button>
      </form>
    </section>
  </div>
  <section class="faq-section">
  <h2>Questions Fréquemment Posées</h2>
  <div class="faq-item" v-for="(item, index) in faq" :key="index">
    <div class="faq-question" @click="toggleAnswer(index)">
      <p>{{ item.question }}</p>
      <span class="faq-icon">{{ activeIndex === index ? '-' : '+' }}</span>
    </div>
    <div
      class="faq-answer"
      v-if="activeIndex === index"
    >
      <div v-if="index === 0">
        <div class="working-hours">
          <div>
            <p><strong>Lundi</strong></p>
            <p>9:00 - 23:00</p>
          </div>
          <div>
            <p><strong>Mardi</strong></p>
            <p>9:00 - 23:00</p>
          </div>
          <div>
            <p><strong>Mercredi</strong></p>
            <p>9:00 - 23:00</p>
          </div>
          <div>
            <p><strong>Jeudi</strong></p>
            <p>9:00 - 23:00</p>
          </div>
          <div>
            <p><strong>Vendredi</strong></p>
            <p>9:00 - 23:00</p>
          </div>
          <div>
            <p><strong>Samedi</strong></p>
            <p>10:30 - 23:00</p>
          </div>
          <div>
            <p><strong>Dimanche</strong></p>
            <p>10:30 - 23:00</p>
          </div>
        </div>
      </div>
      <div v-else>
        <p>{{ item.answer }}</p>
      </div>
    </div>
  </div>
</section>

</template>

<script setup>
import { reactive } from "vue";

// Reactive form data
const formData = reactive({
  name: "",
  email: "",
  message: "",
});

// Submit handler
const handleSubmit = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/contact", {

      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Erreur lors de l'envoi du message.");
    }

    alert(
      `Merci ${formData.name}, nous avons reçu votre message et nous vous répondrons bientôt.`
    );

    // Reset the form
    formData.name = "";
    formData.email = "";
    formData.message = "";
  } catch (error) {
    alert("Une erreur s'est produite. Veuillez réessayer plus tard.");
    console.error("Erreur:", error);
  }
};


import { ref } from "vue"; // Import only what isn't already declared

// Use the existing `reactive` if it's already available
const faq = reactive([
  { question: "Quels sont les horaires de travail ?", answer: "" },
  { question: "Livrez-vous dans toute la ville ? ", answer: "Oui, nous livrons dans toute la ville, sous réserve que votre adresse soit dans notre zone de livraison." },
  { question: "Proposez-vous des options végétariennes ou véganes ?", answer: "Absolument ! Nous avons une sélection de plats végétariens et véganes dans notre menu." },
  { question: "Puis-je organiser un événement dans votre restaurant ?", answer: "Oui, nous proposons des options pour les événements privés. Contactez-nous pour plus d'informations et pour vérifier les disponibilités." },
  { question: "Avez-vous des réductions pour les commandes groupées ou les événements ?", answer: "Oui, nous proposons des réductions spéciales pour les commandes groupées et les événements. Contactez-nous pour discuter des détails." },
]);

const activeIndex = ref(null);

const toggleAnswer = (index) => {
  activeIndex.value = activeIndex.value === index ? null : index;
};




</script>

<style scoped>
.contact-page {
  font-family: Arial, sans-serif;
  padding: 20px;
  
  color: #333;
  
  
  margin: 0 auto;
  
}

/* New intro paragraph styles */
.intro-paragraphs {
  margin-bottom: 30px;
}

.intro-paragraphs p {
  font-size: 16px;
  line-height: 1.5;
  color: #444;
  margin-bottom: 15px;
}

.contact-header {
  text-align: center;
  margin-bottom: 40px;
}

.contact-header h1 {
  font-size: 36px;
  color: #2ecc71; /* Light green */
}

.contact-header p {
  font-size: 18px;
  color: #555;
}

.contact-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
}

.info-block {
  text-align: center;
  max-width: 200px;
}

.info-icon {
  width: 80px;
  margin-bottom: 10px;
}

.info-block h3 {
  font-size: 20px;
  color: #2ecc71; /* Light green */
}

.info-block p {
  font-size: 14px;
  color: #666;
}

.contact-form {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.contact-form h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #2ecc71; /* Light green */
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #555;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.form-group textarea {
  resize: vertical;
}

.submit-button {
  display: block;
  width: 100%;
  background-color: #2ecc71; /* Light green */
  color: white;
  padding: 15px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-button:hover {
  background-color: #27ae60; /* Slightly darker green */
}

.faq-section {
  margin-top: 40px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.faq-section h2 {
  text-align: center;
  color: #2ecc71; /* Light green */
  margin-bottom: 20px;
}

.faq-item {
  margin-bottom: 15px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
}

.faq-question {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  font-weight: bold;
  color: #333;
}

.faq-icon {
  font-size: 24px;
  font-weight: bold;
  color: #2ecc71; /* Light green */
}

.faq-answer {
  margin-top: 10px;
  color: #555;
}

.working-hours {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 10px;
}

.working-hours div {
  text-align: center;
}

</style>
