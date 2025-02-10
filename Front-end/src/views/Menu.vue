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
          <img :src="pizzaImage" alt="Pizza {{ pizza.name }}" class="menu-image" />
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
          <img :src="BurgerImage" alt="Pizza {{ burger.name }}" class="menu-image" />
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
          <img :src="TacoImage" alt="Pizza {{ taco.name }}" class="menu-image" />
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
          <img :src="DrinkImage" alt="Pizza {{ drink.name }}" class="menu-image" />
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
          <img :src="SauceImage" alt="Pizza {{ sauce.name }}" class="menu-image" />
          <p>{{ sauce.price }} €</p>
          <button @click="addToCart(sauce)">Ajouter <i class="fas fa-cart-plus"></i></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import pizzaImage from '@/imgs/pizza.png';
import BurgerImage from '@/imgs/burger.png';
import TacoImage from '@/imgs/taco.png';
import DrinkImage from '@/imgs/drink.png';
import SauceImage from '@/imgs/Sauce.png';



// Menu Data
const menuItems = ref([
  // Pizzas
  { name: "Pizza Margherita", price: 8, category: "pizza", image: "../imgs/pizza.png" },
  { name: "Pizza Pepperoni", price: 10, category: "pizza", image: "../imgs/Pizza.png" },
  { name: "Pizza Quatre Fromages", price: 12, category: "pizza", image: "../imgs/Pizza.png" },
  { name: "Pizza Végétarienne", price: 9, category: "pizza", image: "../imgs/Pizza.png" },
  { name: "Pizza Calzone", price: 11, category: "pizza", image: "../imgs/Pizza.png" },
  { name: "Pizza Hawaïenne", price: 10, category: "pizza", image: "../imgs/Pizza.png" },

  // Burgers
  { name: "Burger Cheeseburger", price: 7, category: "burger", image: "../imgs/burger.png" },
  { name: "Burger Double Bacon", price: 9, category: "burger", image: "../imgs/burger.png" },
  { name: "Burger Végétarien", price: 8, category: "burger", image: "../imgs/burger.png" },
  { name: "Burger Poulet", price: 8.5, category: "burger", image: "../imgs/burger.png" },
  { name: "Burger BBQ", price: 9, category: "burger", image: "../imgs/burger.png" },
  { name: "Burger Poisson", price: 8.5, category: "burger", image: "../imgs/burger.png" },

  // Tacos
  { name: "Tacos Bœuf", price: 6, category: "taco", image: "../imgs/taco.png" },
  { name: "Tacos Poulet", price: 6, category: "taco", image: "../imgs/taco.png" },
  { name: "Tacos Dinde", price: 6.5, category: "taco",image: "../imgs/taco.png" },
  { name: "Tacos Végétarien", price: 5.5, category: "taco",image: "../imgs/taco.png" },
  { name: "Tacos Crevettes", price: 7, category: "taco", image: "../imgs/taco.png" },
  { name: "Tacos Poisson", price: 7, category: "taco",image: "../imgs/taco.png" },

  // Drinks
  { name: "Coca-Cola", price: 2, category: "drink", image: "../imgs/drink.png" },
  { name: "Pepsi", price: 2, category: "drink", image: "../imgs/drink.png" },
  { name: "Sprite", price: 2, category: "drink", image: "../imgs/drink.png" },
  { name: "Red Bull", price: 3, category: "drink", image: "../imgs/drink.png" },
  { name: "Monster Energy", price: 3, category: "drink", image: "../imgs/drink.png" },
  { name: "Fanta", price: 2, category: "drink", image: "../imgs/drink.png" },

  // Sauces
  { name: "Sauces Ketchup", price: 0.5, category: "sauce" , image: "../imgs/sauce.png" },
  { name: "Sauces Mayonnaise", price: 0.5, category: "sauce" ,image: "../imgs/sauce.png" },
  { name: "Sauces Barbecue", price: 0.5, category: "sauce",image: "../imgs/sauce.png" },
]);

const searchQuery = ref("");
const isLoggedIn = ref(false);

const filteredItems = (category) => {
  return menuItems.value.filter(
    (item) =>
      item.category === category &&
      item.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
};

const addToCart = (item) => {
  if(!isLoggedIn.value){
    alert(`Vous devez se connecter !`);
    return ;
  }
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
  padding: 45px;
  text-align: center;
  border-radius: 10px;
  background-color: #f9fff9;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.menu-image {
  max-width: 100%;
  max-height: 150px; /* Adjust this value to your desired image height */
  object-fit: contain;
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
