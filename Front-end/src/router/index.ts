import { createRouter, createWebHistory } from 'vue-router';

// Import views (lazy loading as well)
const Accueil = () => import('../views/Accueil.vue');
const Menu = () => import('../views/Menu.vue');
const APropos = () => import('../views/APropos.vue');
const Contact = () => import('../views/Contact.vue');
const Inscription = () => import('../views/Inscription.vue');
const Connexion = () => import('../views/Connexion.vue');
const PageIntrouvable = () => import('../views/PageIntrouvable.vue'); // Updated import

// Create router instance
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'accueil',
      component: Accueil, // Root route - Accueil view
    },
    {
      path: '/menu',
      name: 'menu',
      component: Menu, // Lazy-loaded Menu view
    },
    {
      path: '/a-propos',
      name: 'a-propos',
      component: APropos, // Lazy-loaded APropos view
    },
    {
      path: '/contact',
      name: 'contact',
      component: Contact, // Lazy-loaded Contact view
    },
    {
      path: '/inscription',
      name: 'inscription',
      component: Inscription, // Lazy-loaded Inscription view
    },
    {
      path: '/connexion',
      name: 'connexion',
      component: Connexion, // Lazy-loaded Connexion view
    },
    // Catch-all route for undefined routes (404)
    {
      path: '/:pathMatch(.*)*', // This will catch any undefined routes
      name: '404',
      component: PageIntrouvable, // Updated route
    },
  ],
});

export default router;
