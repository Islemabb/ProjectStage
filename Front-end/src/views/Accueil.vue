<template>
  <div class="home-page">
    <!-- Video Background -->
    <section class="video-background">
      <video autoplay muted loop class="main-video">
        <source src="../videos/mainvideo.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </section>

    <!-- About Us Section -->
      <!-- test 1 -->
    <section class="about-us">
      <div class="content">
        <p>
          Notre équipe passionnée et dévouée s'efforce de créer une expérience unique pour nos clients.
          Chaque membre apporte une expertise exceptionnelle pour garantir un moment mémorable à chaque visite.
          Notre objectif est de dépasser les attentes et de fournir des souvenirs précieux.
          Nous croyons en l'importance de chaque détail pour offrir une expérience inoubliable.
        </p>
      </div>
      <img src="../imgs/employee1.jpg" alt="About Us" class="image-aligned" />
    </section>
    <hr>

    <!-- Customer Satisfaction Section -->
    <section class="satisfaction">
      <div class="satisfaction-content">
        <div class="content">
          <p>
            Nos clients sont notre plus grande fierté. Chaque sourire, chaque moment partagé et chaque plat dégusté
            reflète notre engagement à offrir une expérience gastronomique sans compromis.
          </p>
        </div>
        <img src="../imgs/happyc.webp" alt="Happy Customers" class="image-expanded" />
      </div>
    </section>
    <hr>
    <!-- Menu Section -->
    <section class="menu">
      <div class="content">
        <p>
          Notre menu est conçu pour satisfaire tous les goûts. Que vous soyez amateur de plats classiques
          ou à la recherche d'options végétariennes ou véganes, nous avons tout ce qu'il faut pour vous régaler.
          Explorez nos délicieuses créations culinaires, adaptées à toutes vos envies.
          Chaque plat est préparé avec amour et des ingrédients de qualité supérieure.
        </p>
      </div>
      <img src="../imgs/hamburger5.jpg" alt="Menu Options" class="image-aligned" />
    </section>
  </div>
</template>

<script >
import axios from "axios";
import { useRouter } from "vue-router";



export default {
  data() {
    return {
      user: null,
    };
  },
  async created() {
    const router = useRouter();
    try {

      const response = await axios.get("http://localhost:5000/api/me", { withCredentials: true });
      this.user = response.data.user;
      router.push("/accueillogged");
    } catch (error) {
      console.error("Erreur lors de la récupération du profil :", error);
      this.user = null;
    }
  },
};
</script>

<style scoped>

/* General Page Styling */
body {
  margin: 0;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  color: #333;
}

.home-page {
  text-align: center;
  background-color: transparent;
  margin: 0;
  padding: 0;
}

/* Video Background */
.video-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}

.main-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
}

/* About Us Section */
.about-us {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 20px 0;
  margin-top: 750px;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
}

.about-us .content {
  flex: 1;
  padding: 20px;
  text-align: left;
  font-size: 20px;;
  line-height: 1.6;
  margin-top: 10px;
  
}

.about-us .image-aligned {
  flex: 1;
  max-width: 300px;
  border-radius: 10px;
  align-self: center;
}

/* Customer Satisfaction Section */
.satisfaction {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  padding: 20px 0;
}

.satisfaction .content {
  flex: 1;
  padding: 20px;
  text-align: left;
  font-size: 20px;
  line-height: 1.6;
  margin-top: 7px;
  
}

.image-expanded {
  flex: 1;
  width: 100%; /* Full width */
  height: 500px; /* Increased height */
  object-fit: cover; /* Ensure the image looks good */
  border-radius: 10px;
}

/* Menu Section */
.menu {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-top: 20px;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  padding: 20px 0;
  position: relative;
}

.menu .content {
  flex: 1;
  padding: 20px;
  text-align: left;
  font-size: 20px;
  line-height: 1.6;
  margin-top: 10px;
}

.menu .image-aligned {
  flex: 1;
  max-width: 300px;
  border-radius: 10px;
  align-self: center;
}

/* Bold styling for all paragraphs */
.about-us .content p,
.satisfaction .content p,
.menu .content p {
  font-weight: bold; /* Make text bold */
}


/* Responsive Design */
@media (max-width: 768px) {
  .about-us,
  .menu,
  .satisfaction {
    flex-direction: column;
  }

  .about-us .image-aligned,
  .menu .image-aligned,
  .image-expanded {
    margin-top: 20px;
    width: 100%;
    height: auto; /* Maintain aspect ratio on small screens */
  }
}
</style>
