<template>
  <div class="commande-page">
  <div class="container">
    <h1>🛒 Votre Panier</h1>

    <ul class="cart-list">
      <li v-for="item in cart" :key="item.id" class="cart-item">
        <span>{{ item.name }}</span>
        <span>{{ item.quantity }} × {{ item.price }}€</span>
      </li>
    </ul>

    <h3 class="total">Total : {{ totalPrice }}€</h3>

    <h2>📧 Email</h2>
    <input v-model="email" type="email" class="address-input" placeholder="Entrez votre email" />

    <h2>📞 Numéro de téléphone</h2>
    <input v-model="phone" type="tel" class="address-input" placeholder="Entrez votre numéro de téléphone" />


    <h2>📍 Adresse de livraison</h2>
    <input v-model="address" type="text" class="address-input" placeholder="Entrez votre adresse">

    <button @click="placeOrder" class="order-button">
      🛍️ Passer la commande
    </button>
  </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";

// Mock des produits (Remplace ceci par un appel API)
const cart = ref([]);
    const address = ref(window.profile?.adresse);
    const email = ref(window.profile?.email);
    const phone = ref(window.profile?.tel);
const router = useRouter();


const fetchCart = async () => {
  try {
      const res = await fetch("http://localhost:5000/api/list", {
                method: "get",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
              });
      const list = await res.json();
       list.map(prod => cart.value.push({ ...prod.item, quantity: prod.quantity }));
  } catch (error) {
    console.error("Erreur lors du chargement du panier :", error);
  }
};

// Calcul du total
const totalPrice = computed(() =>
  cart.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
);

// Passer la commande
const placeOrder = async () => {

      const orderData = {
        email: email.value,
        phone: phone.value,
        address: address.value,
        cart: cart.value,
      };

  if (!address.value) {
    alert("Veuillez entrer une adresse de livraison !");
    return;
  }

  try {
    const response = await fetch("http://localhost:5000/api/commander", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(orderData),
    });

    if (response.ok) {
      alert("Commande passée avec succès !");
      cart.value = [];
      router.push("/");
    } else {
      alert("Erreur lors de la commande.");
    }
  } catch (error) {
    console.error("Erreur lors de la commande :", error);
  }
};

// Charger le panier au montage
onMounted(fetchCart);
</script>

<style scoped>
.commande-page {
  font-family: Arial, sans-serif;
  padding: 20px;
  
  color: #333;
  
  
  margin: 0 auto;
  


/* Style général */
body {
  font-family: "Arial", sans-serif;
  background-color: #f8f9fa;
  margin: 0;
  padding: 0;
}

/* Conteneur principal */
.container {
  max-width: 600px;
  margin: 40px auto;
  padding: 20px;
  background: #fff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

/* Titre */
h1 {
  text-align: center;
  color: #333;
}

/* Liste des produits */
.cart-list {
  list-style: none;
  padding: 0;
}

.cart-item {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

.cart-item:last-child {
  border-bottom: none;
}

.cart-item span {
  font-size: 16px;
}

/* Total */
.total {
  font-size: 18px;
  font-weight: bold;
  text-align: right;
  margin-top: 15px;
}

/* Formulaire */
.address-input {
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
}

/* Bouton de commande */
.order-button {
  width: 100%;
  padding: 12px;
  margin-top: 15px;
  background-color: lightgreen;
  color: white;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease-in-out;
}

.order-button:hover {
  background-color: lightgreen;
}

}


</style>
