<template>
  <div class="menu-page">
    <!-- Search Bar -->
    <div class="search-bar">
      <input type="text" v-model="searchQuery" placeholder="Rechercher un plat ou une boisson..." />
    </div>

    <!-- Categories -->
    <div class="categories">
      <div v-for="category in categories" :key="category.id">
        <h2>{{ category.label }}</h2>
        <div class="menu-category">
          <div
            v-for="(item, index) in filteredItems(category.id)"
            :key="category.id + '-' + index"
            class="menu-item"
          >
            <h3>{{ item.name }}</h3>
            <img :src="getImage(category.id)" :alt="`${category.label} ${item.name}`" class="menu-image" />
            <p>{{ item.price }} €</p>
            <button @click="addToCart(item)">Ajouter <i class="fas fa-cart-plus"></i></button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Cart Icon -->
  <div class="cart-icon" @click="toggleCart">
    <img src="@/imgs/cart1.png" alt="Cart" />
  </div>

  <!-- Shopping Cart -->
  <div class="cart" v-if="isCartVisible">
    <h3>Panier</h3>
    <div v-for="(item, index) in cart" :key="index" class="cart-item">
      <span>{{ item.name }} (x{{ item.quantity }})</span>
      <span>{{ item.price * item.quantity }} €</span>
      <button class="remove-btn" @click="removeFromCart(index,item)">
        ❌
      </button>
    </div>
    <hr />
    <p>Total: {{ totalPrice }} €</p>
    <button @click="commander" class="order-button">Commander</button>
    <button @click="closeCart" class="close-btn">Fermer</button>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import pizzaImage from "@/imgs/pizza.png";
import BurgerImage from "@/imgs/burger.png";
import TacoImage from "@/imgs/taco.png";
import DrinkImage from "@/imgs/drink.png";
import SauceImage from "@/imgs/sauce.png";
import { useRouter } from "vue-router";

export default {
  setup() {
 
const searchQuery = ref("");
const cart = ref([]);
const isCartVisible = ref(false);
const isLogged = ref(window.isLogged);
const router = useRouter();

const categories = [
  { id: "pizza", label: "Pizzas", image: pizzaImage },
  { id: "burger", label: "Burgers", image: BurgerImage },
  { id: "taco", label: "Tacos", image: TacoImage },
  { id: "drink", label: "Boissons", image: DrinkImage },
  { id: "sauce", label: "Sauces", image: SauceImage }
];

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
    { name: "Burger Salami", price: 9, category: "burger", image: "../imgs/burger.png" },
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

const filteredItems = (category) =>
  computed(() =>
    menuItems.value.filter(
      (item) =>
        item.category === category && item.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  ).value;

const getImage = (category) => {
  const foundCategory = categories.find((cat) => cat.id === category);
  return foundCategory ? foundCategory.image : "";
};

const toggleCart = () => {
  isCartVisible.value = !isCartVisible.value;
};

const closeCart = () => {
  isCartVisible.value = false;
};

const commander = () => {
  if(window.isLogged){
    router.push("/commander");
  }
  else{
    router.push('/connexion');
  }
  
}

const addToCart = async (item) => {
  try {
    await fetch("http://localhost:5000/api/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body:JSON.stringify({
                  item
                })
              });
      const existingItem = cart.value.find((cartItem) => cartItem.name === item.name);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.value.push({ ...item, quantity: 1 });
  }
  } catch(err) {
    alert(`${item.name} n'est ajouté au panier suité à un erreur system!`);
  }
};

const removeFromCart = async (index, item) => {
 try {
      await fetch("http://localhost:5000/api/remove", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body:JSON.stringify({
                  item
                })
              });
      cart.value.splice(index, 1);
  } catch(err) {
    alert(`${item.name} un erreur system!`);
  }

};

const totalPrice = computed(() =>
  cart.value.reduce((total, item) => total + item.price * item.quantity, 0)
);

    onMounted(async () => {
      const res = await fetch("http://localhost:5000/api/list", {
                method: "get",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
              });
      const list = await res.json();
      list.map(prod => cart.value.push({ ...prod.item, quantity: prod.quantity }));
    });

  return { commander, isLogged, totalPrice, searchQuery, cart, isCartVisible, categories, menuItems, filteredItems, getImage, toggleCart, closeCart, addToCart, removeFromCart}
  }
}
</script>

<style scoped>
.menu-page {
  padding: 20px;
  font-family: "Roboto Slab", serif;
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

.cart {
  position: fixed;
  top: 70px;
  right: 20px;
  background-color: #f5f5f5;
  padding:15px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 300px;
  z-index: 1000;
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

.cart-icon {
  position: fixed;
  top: 70px;
  right: 20px;
  cursor: pointer;
  z-index: 1001;
}

.cart-icon img {
  width: 50px;
  height: 50px;
}

.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 0;
}

.remove-btn {
  background: none;
  border: none;
  color: red;
  cursor: pointer;
  font-size: 16px;
}

.order-button {
  width: 100%;
  padding: 10px;
  background-color: lightgreen;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
  margin-top: 10px;
}

.order-button:hover {
  background-color: green;
}

.close-btn {
  width: 100%;
  padding: 10px;
  background-color: rgb(255, 146, 146);
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
  margin-top: 10px;
}

.close-btn:hover {
  background-color: red;
}
</style>
