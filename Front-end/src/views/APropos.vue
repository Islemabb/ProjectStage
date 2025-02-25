<template>
  <div class="about-page">
    <!-- History Section -->
    <section class="history-section">
      <h2>Notre Histoire</h2>
      <div class="history-content">
        <img src="../imgs/history.png" alt="Restaurant History" class="history-image" />
        <p>
          Depuis notre ouverture en 2000, notre restaurant de fast-food s'est engagé à offrir des
          repas savoureux, rapides et accessibles à tous. Avec un menu conçu pour satisfaire tous
          les goûts, nous avons grandi pour devenir un nom de confiance dans la restauration rapide.
          Notre mission a toujours été de combiner qualité, service et convivialité dans tout ce que
          nous faisons.
        </p>
      </div>
    </section>

    <!-- Experience Section -->
    <section class="experience-section">
      <h2>Notre Expérience</h2>
      <div class="experience-content">
        <p>
          Avec plus de 20 ans d'expérience dans l'industrie de la restauration rapide, nous avons
          perfectionné l'art de préparer des repas qui allient goût, rapidité et qualité. Notre
          équipe d'experts travaille sans relâche pour innover et garantir une expérience
          inégalée. Nos spécialités, des burgers emblématiques aux desserts gourmands, ont fait la
          joie de milliers de clients fidèles.
        </p>
        <img src="../imgs/experience.png" alt="Experience" class="experience-image" />
      </div>
    </section>

    <!-- Team Section -->
    <section class="team-section">
      <h2>Notre Équipe</h2>
      <div class="team-container">
        <div class="team-box" v-for="(member, index) in team" :key="index">
          <img :src="getImagePath(member.image)" :alt="member.name" class="team-image" />
          <p class="team-position">{{ member.position }}</p>
          <p class="team-name">{{ member.name }}</p>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="faq-section">
      <h2>FAQ</h2>
      <div class="faq-item" v-for="(faq, index) in faqs" :key="index">
        <div class="faq-question" @click="toggleFaq(index)">
          <p>{{ faq.question }}</p>
          <span class="faq-icon">{{ faq.show ? '-' : '+' }}</span>
        </div>
        <div v-show="faq.show" class="faq-answer">
          <p>{{ faq.answer }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from "vue";

// Function to dynamically resolve image paths
const getImagePath = (imageName) => {
  try {
    return new URL(`../imgs/${imageName}`, import.meta.url).href;
  } catch (e) {
    console.error(`Error loading image: ${imageName}`);
    return "";
  }
};

// Team data
const team = ref([
  { image: "employee1.jpg", position: "Manageur", name: "Amélie Dupont" },
  { image: "employee2.jpeg", position: "Chef", name: "Claire Martin" },
  { image: "employee3.jpg", position: "Sous-Chef", name: "Sophie Lefevre" },
  { image: "employee4.jpg", position: "Serveur", name: "Camille Bernard" },
  { image: "employee5.jpg", position: "Serveur", name: "Isabelle Moreau" },
  { image: "employee6.jpg", position: "Cashier", name: "Julien Lefevre" },
]);

// FAQ data
const faqs = ref([
  { question: "Quelle est l'histoire de notre restaurant ?", answer: "Notre restaurant a été créé en 2000 avec la mission de servir des repas rapides et délicieux. Au fil des années, nous avons grandi et sommes devenus un nom de confiance dans l'industrie de la restauration rapide. Nous nous engageons à offrir un service de qualité et des repas qui répondent à tous les goûts, afin de garantir une expérience agréable à nos clients.", show: false },
  { question: "Qu'est-ce qui distingue votre restaurant des autres dans le secteur de la restauration rapide ?", answer: "Avec plus de 20 ans d'expérience, nous allions goût, rapidité et qualité dans chaque repas que nous préparons. Notre équipe d'experts travaille sans cesse pour innover tout en proposant des plats délicieux et abordables. Notre engagement envers le service et la qualité nous distingue dans le marché très compétitif de la restauration rapide.", show: false },
  { question: "Quelle est la philosophie derrière vos offres de restauration rapide ?", answer: "Nous croyons que la restauration rapide ne doit pas compromettre la qualité. Notre philosophie est simple : offrir des repas frais, savoureux et rapides préparés avec les meilleurs ingrédients. Que vous ayez envie d'un burger, de frites ou d'un dessert, nous mettons l'accent sur des repas qui répondent à vos attentes en matière de goût et de rapidité.", show: false },
  { question: "Quelle est l'expérience de votre équipe dans l'industrie de la restauration rapide ?", answer: "Notre équipe est très qualifiée, avec plus de 20 ans d'expérience collective dans le secteur de la restauration rapide. De la cuisine au service client, chaque membre de notre équipe joue un rôle essentiel pour garantir que chaque client vive une expérience agréable et satisfaisante lorsqu'il visite notre restaurant.", show: false },
  { question: "Quels sont les projets futurs pour votre restaurant ?", answer: "Nous prévoyons de continuer à nous développer et à améliorer nos offres tout en restant fidèles à nos valeurs fondamentales de qualité, rapidité et satisfaction client. Nous sommes impatients de vous proposer de nouveaux plats au menu et d'explorer d'autres emplacements, afin de rendre notre restaurant plus accessible à ceux qui apprécient une bonne restauration rapide.", show: false },
]);

// Toggle FAQ visibility
const toggleFaq = (index) => {
  faqs.value[index].show = !faqs.value[index].show;
};
</script>

<style scoped>
.about-page {
  padding: 20px;
}

/* Section Titles */
section h2 {
  font-size: 24px;
  color: #2ecc71;
  text-align: center;
  margin-bottom: 20px;
  cursor: pointer;
  transition: color 0.3s;
}

section h2:hover {
  color: #27ae60;
}

/* History Section */
.history-section {
  margin-bottom: 50px;
}

.history-content {
  display: flex;
  align-items: flex-start;
  gap: 30px; /* Spacing between image and text */
}

.history-image {
  width: 140px;
  height: auto;
  border-radius: 10px;
}

.history-content p {
  flex: 1;
  text-align: left;
  line-height: 1.8;
  font-size: 20px;
  font-family: Arial, sans-serif;
}

/* Experience Section */
.experience-section {
  margin-bottom: 50px;
}

.experience-content {
  display: flex;
  align-items: flex-start;
  gap: 30px; /* Spacing between image and text */
  flex-direction: row-reverse;
}

.experience-image {
  width: 160px; /* Slightly smaller */
  height: auto;
  border-radius: 50%; /* Circular image */
}

.experience-content p {
  flex: 1;
  text-align: left;
  line-height: 1.8;
  font-size: 20px;
  font-family: Arial, sans-serif;
}

/* Team Section */
.team-section {
  margin-bottom: 50px;
}

.team-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.team-box {
  text-align: center;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 10px;
  background-color: #f9f9f9;
}

.team-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
  margin-bottom: 10px;
}

.team-position {
  font-size: 16px;
  color: gray;
}

.team-name {
  font-size: 18px;
  font-weight: bold;
}

/* FAQ Section */
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
</style>
