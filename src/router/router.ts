import { createRouter, createWebHistory } from 'vue-router'

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'main',
      component: () => import('../views/mainViews.vue'),
      meta: {
        layout: 'defaultLayout',
      },
    },
    {
      path: '/addNote',
      name: 'addNote',
      component: () => import('../views/addNoteViews.vue'),
      meta: {
        layout: 'defaultLayout',
      },
    },
    {
      path: '/item/:id',
      name: 'item',
      component: () => import('../views/itemNote.vue'),
      meta: {
        layout: 'defaultLayout',
      },
    },
  ],
})
