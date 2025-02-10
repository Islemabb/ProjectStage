import { createRouter, createWebHistory } from 'vue-router';

// Import views (lazy loading as well)
const Accueil = () => import('../views/Accueil.vue');
const Menu = () => import('../views/Menu.vue');
const APropos = () => import('../views/APropos.vue');
const Contact = () => import('../views/Contact.vue');
const Inscription = () => import('../views/Inscription.vue');
const Connexion = () => import('../views/Connexion.vue');
const PageIntrouvable = () => import('../views/PageIntrouvable.vue'); // Updated import
const MenuLogged = () => import('../views/MenuLogged.vue');
const Profile = () => import('../views/Profile.vue');
const AccueilLogged = () => import('../views/Accueillogged.vue');
const AProposLogged = () => import('../views/AProposLogged.vue'); 
const ContactLogged = () => import('../views/ContactLogged.vue');

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
      path: '/accueillogged',
      name: 'accueil-logged',
      component: AccueilLogged, 
    },
    {
      path: '/menu',
      name: 'menu',
      component: Menu, // Lazy-loaded Menu view
    },
    {
      path: '/menu-logged',
      name: 'menu-logged',
      component: MenuLogged, // Lazy-loaded MenuLogged view for logged-in users
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile, // Lazy-loaded Profile view
    },
    {
      path: '/a-propos',
      name: 'a-propos',
      component: APropos, // Lazy-loaded APropos view
    },
    {
      path: '/a-propos-logged',
      name: 'a-propos-logged',
      component: AProposLogged, 
    },
    {
      path: '/contact',
      name: 'contact',
      component: Contact, // Lazy-loaded Contact view
    },
    {
      path: '/contactlogged',
      name: 'contact-logged',
      component: ContactLogged, 
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
