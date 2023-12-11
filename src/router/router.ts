import { createRouter, createWebHistory } from 'vue-router'

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'main',
      component: () => import('../views/MainViews.vue'),
      meta: {
        layout: 'defaultLayout',
      },
    },
    {
      path: '/addNote',
      name: 'addNote',
      component: () => import('../views/AddNoteViews.vue'),
      meta: {
        layout: 'defaultLayout',
      },
    },
    {
      path: '/item/:id',
      name: 'item',
      component: () => import('../views/ItemNote.vue'),
      meta: {
        layout: 'defaultLayout',
      },
    },
  ],
})
