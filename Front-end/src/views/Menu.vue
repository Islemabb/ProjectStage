<template>
  <div class="menu-page">
    <!-- Search Bar -->
    <div class="search-bar">
      <input type="text" v-model="searchQuery" placeholder="Rechercher un plat ou une boisson..." />
    </div>

    <!-- Categories -->
    <div class="categories">
      <!-- Pizzas -->
      <h2>Pizzas</h2>
      <div class="menu-category">
        <div
          v-for="(pizza, index) in filteredItems('pizza')"
          :key="'pizza-' + index"
          class="menu-item"
        >
          <h3>{{ pizza.name }}</h3>
          <p>{{ pizza.price }} €</p>
          <button @click="addToCart(pizza)">Ajouter <i class="fas fa-cart-plus"></i></button>
        </div>
      </div>

      <!-- Hamburgers -->
      <h2>Burgers</h2>
      <div class="menu-category">
        <div
          v-for="(burger, index) in filteredItems('burger')"
          :key="'burger-' + index"
          class="menu-item"
        >
          <h3>{{ burger.name }}</h3>
          <p>{{ burger.price }} €</p>
          <button @click="addToCart(burger)">Ajouter <i class="fas fa-cart-plus"></i></button>
        </div>
      </div>

      <!-- Tacos -->
      <h2>Tacos</h2>
      <div class="menu-category">
        <div
          v-for="(taco, index) in filteredItems('taco')"
          :key="'taco-' + index"
          class="menu-item"
        >
          <h3>{{ taco.name }}</h3>
          <p>{{ taco.price }} €</p>
          <button @click="addToCart(taco)">Ajouter <i class="fas fa-cart-plus"></i></button>
        </div>
      </div>

      <!-- Drinks -->
      <h2>Boissons</h2>
      <div class="menu-category">
        <div
          v-for="(drink, index) in filteredItems('drink')"
          :key="'drink-' + index"
          class="menu-item"
        >
          <h3>{{ drink.name }}</h3>
          <p>{{ drink.price }} €</p>
          <button @click="addToCart(drink)">Ajouter <i class="fas fa-cart-plus"></i></button>
        </div>
      </div>

      <!-- Sauces -->
      <h2>Sauces</h2>
      <div class="menu-category sauces">
        <div
          v-for="(sauce, index) in filteredItems('sauce')"
          :key="'sauce-' + index"
          class="menu-item"
        >
          <h3>{{ sauce.name }}</h3>
          <p>{{ sauce.price }} €</p>
          <button @click="addToCart(sauce)">Ajouter <i class="fas fa-cart-plus"></i></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

// Menu Data
const menuItems = ref([
  // Pizzas
  { name: "Margherita", price: 8, category: "pizza" },
  { name: "Pepperoni", price: 10, category: "pizza" },
  { name: "Quatre Fromages", price: 12, category: "pizza" },
  { name: "Végétarienne", price: 9, category: "pizza" },
  { name: "Calzone", price: 11, category: "pizza" },
  { name: "Hawaïenne", price: 10, category: "pizza" },

  // Burgers
  { name: "Cheeseburger", price: 7, category: "burger" },
  { name: "Double Bacon", price: 9, category: "burger" },
  { name: "Vegan Burger", price: 8, category: "burger" },
  { name: "Chicken Burger", price: 8.5, category: "burger" },
  { name: "BBQ Burger", price: 9, category: "burger" },
  { name: "Fish Burger", price: 8.5, category: "burger" },

  // Tacos
  { name: "Beef Taco", price: 6, category: "taco" },
  { name: "Chicken Taco", price: 6, category: "taco" },
  { name: "Pork Taco", price: 6.5, category: "taco" },
  { name: "Veggie Taco", price: 5.5, category: "taco" },
  { name: "Shrimp Taco", price: 7, category: "taco" },
  { name: "Fish Taco", price: 7, category: "taco" },

  // Drinks
  { name: "Coca-Cola", price: 2, category: "drink" },
  { name: "Pepsi", price: 2, category: "drink" },
  { name: "Sprite", price: 2, category: "drink" },
  { name: "Red Bull", price: 3, category: "drink" },
  { name: "Monster Energy", price: 3, category: "drink" },
  { name: "Fanta", price: 2, category: "drink" },

  // Sauces
  { name: "Ketchup", price: 0.5, category: "sauce" },
  { name: "Mayonnaise", price: 0.5, category: "sauce" },
  { name: "Barbecue Sauce", price: 0.5, category: "sauce" },
]);

const searchQuery = ref("");

const filteredItems = (category) => {
  return menuItems.value.filter(
    (item) =>
      item.category === category &&
      item.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
};

const addToCart = (item) => {
  alert(`${item.name} ajouté au panier !`);
};
</script>

<style scoped>
.menu-page {
  padding: 20px;
  font-family: 'Roboto Slab', serif;
}

.search-bar {
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
}

.search-bar input {
  padding: 10px;
  font-size: 16px;
  border: 2px solid lightgreen;
  border-radius: 5px;
  width: 300px;
}

.categories {
  margin-top: 20px;
}

h2 {
  color: darkgreen;
  text-align: left;
  margin-bottom: 10px;
}

.menu-category {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 40px;
}

.menu-item {
  border: 1px solid lightgreen;
  padding: 20px;
  text-align: center;
  border-radius: 10px;
  background-color: #f9fff9;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.menu-item h3 {
  margin: 0 0 10px;
  color: darkgreen;
}

.menu-item p {
  margin: 0 0 20px;
  font-size: 18px;
  font-weight: bold;
}

.menu-item button {
  padding: 10px 20px;
  background-color: lightgreen;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
}

.menu-item button:hover {
  background-color: green;
}

@media (max-width: 768px) {
  .menu-category {
    grid-template-columns: 1fr;
  }
}
</style>
