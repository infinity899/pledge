import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/Home.vue';

import UserPrivate from '@/views/UserPrivate.vue';
import UserPublic from '@/views/UserPublic.vue';
import Settings from '@/views/Settings.vue';
import Account from '@/components/user_private/Account.vue';
import Verification from '@/components/user_private/Verification.vue';
import SettingsSubscriptions from '@/components/user_private/SettingsSubscriptions.vue';
import Payment from '@/components/user_private/Payment.vue';
import ForgotPassword from '@/components/auth/ForgotPassword.vue';
import ResetPassword from '@/components/auth/ResetPassword.vue';

import NotFound from '@/views/NotFound.vue';
import Auth from '@/views/Auth.vue';

import store from './store';

const Project = () => import('@/views/Project.vue');
const Dashboard = () => import(/* webpackChunkName: "dashboard" */'@/views/Dashboard.vue');
const DashboardBasics = () => import(/* webpackChunkName: "dashboard" */'@/views/DashboardBasics.vue');
const DashboardOverview = () => import(/* webpackChunkName: "dashboard" */'@/views/DashboardOverview.vue');
const DashboardRewards = () => import(/* webpackChunkName: "dashboard" */'@/views/DashboardRewards.vue');
const DashboardTimeline = () => import(/* webpackChunkName: "dashboard" */'@/views/DashboardTimeline.vue');
const DashboardAccount = () => import(/* webpackChunkName: "dashboard" */'@/views/DashboardAccount.vue');
const DashboardFaq = () => import(/* webpackChunkName: "dashboard" */'@/views/DashboardFaq.vue');
const Learn = () => import(/* webpackChunkName: "learn" */'@/views/Learn.vue');
const Questions = () => import(/* webpackChunkName: "learn" */'@/components/learn/Questions.vue');
const Question = () => import(/* webpackChunkName: "learn" */'@/components/learn/Question.vue');
const Search = () => import('@/views/Search.vue');
const Category = () => import('@/views/Category.vue');
const Notifications = () => import('@/views/Notifications.vue');
const Manager = () => import('@/views/Manager.vue');
const Checkout = () => import('@/views/Checkout.vue');
const Wallet = () => import('@/views/Wallet.vue');
const Authenticated = () => import('@/views/Authenticated.vue');
const About = () => import(/* webpackChunkName: "about" */'@/views/About.vue');
const Whitepaper = () => import(/* webpackChunkName: "about" */'@/views/Whitepaper.vue');

Vue.use(Router);

const router = new Router({
  mode: 'history',
  scrollBehavior(to, from, savedPosition) {
    if(to.hash) {
      return {
        selector: to.hash,
      };
    }
    if(savedPosition) {
      return savedPosition;
    }
    if(to.meta.noScroll && from.meta.noScroll) {
      return {};
    }
    return { x: 0, y: 0 };
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: { title: 'Pledgecamp' },
      alias: ['/confirmemail', '/create', '/create/continue'],
    },
    {
      path: '/about',
      name: 'about',
      component: About,
      meta: { title: 'About' },
    },
    {
      path: '/whitepaper',
      name: 'whitepaper',
      component: Whitepaper,
      meta: { title: 'Whitepaper' },
    },
    {
      path: '/login',
      name: 'login',
      component: Auth,
      meta: { title: 'Pledgecamp Login' },
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: ForgotPassword,
      meta: { title: 'Pledgecamp Forgot Password' },
    },
    {
      path: '/reset-password',
      name: 'reset-password',
      component: ResetPassword,
      meta: { title: 'Pledgecamp Reset Password' },
    },
    {
      path: '/signup',
      name: 'signup',
      component: Auth,
      meta: { title: 'Pledgecamp Signup' },
    },
    {
      path: '/user/me',
      name: 'user',
      meta: { requiresAuth: true },
      component: UserPrivate,
    },
    {
      path: '/user/:id',
      name: 'user-public',
      component: UserPublic,
      meta: { title: 'Pledgecamp About' },
      // children: [
      //   {
      //     path: 'about',
      //     name: 'user-about',
      //     component: UserAbout,
      //     meta: { title: 'Pledgecamp About', noScroll: true },
      //   },
      //   {
      //     path: 'references',
      //     name: 'user-reference',
      //     component: UserReferences,
      //     meta: { title: 'Pledgecamp References', noScroll: true },
      //   },
      //   {
      //     path: 'projects',
      //     name: 'user-project',
      //     component: UserProjects,
      //     meta: { title: 'Pledgecamp Projects', noScroll: true },
      //   },
      //   {
      //     path: 'uploads',
      //     name: 'user-upload',
      //     component: UserUploads,
      //     meta: { title: 'Pledgecamp Uploads', noScroll: true },
      //   },
      // ],
    },
    {
      path: '/settings',
      redirect: '/settings/account',
      name: 'settings',
      component: Settings,
      meta: {
        title: 'Settings',
        requiresAuth: true,
      },
      children: [
        {
          path: 'account',
          name: 'settings-account',
          component: Account,
          meta: {
            title: 'Settings Account',
          },
        },
        {
          path: 'verification',
          name: 'settings-verification',
          component: Verification,
          meta: {
            title: 'Settings Verification',
          },
        },
        {
          path: 'notifications',
          name: 'settings-notifications',
          component: SettingsSubscriptions,
          meta: {
            title: 'Settings Notifications',
          },
        },
        {
          path: 'payment',
          name: 'settings-payment',
          component: Payment,
          meta: {
            title: 'Settings Payment',
          },
        },
      ],
    },
    {
      path: '/dashboard/:id',
      name: 'dashboard',
      component: Dashboard,
      meta: {
        title: 'Project Dashboard',
        requiresAuth: true,
      },
    },
    {
      path: '/dashboard/:id/basics',
      name: 'dashboard-basics',
      component: DashboardBasics,
      meta: {
        title: 'Project Basics',
        requiresAuth: true,
      },
    },
    {
      path: '/dashboard/:id/overview',
      name: 'dashboard-overview',
      component: DashboardOverview,
      meta: {
        title: 'Project Overview',
        requiresAuth: true,
      },
    },
    {
      path: '/dashboard/:id/rewards',
      name: 'dashboard-rewards',
      component: DashboardRewards,
      meta: {
        title: 'Project Rewards',
        requiresAuth: true,
      },
    },
    {
      path: '/dashboard/:id/timeline',
      name: 'dashboard-timeline',
      component: DashboardTimeline,
      meta: {
        title: 'Project Timeline',
        requiresAuth: true,
      },
    },
    {
      path: '/dashboard/:id/account',
      name: 'dashboard-account',
      component: DashboardAccount,
      meta: {
        title: 'Project Account',
        requiresAuth: true,
      },
    },
    {
      path: '/dashboard/:id/faq',
      name: 'dashboard-faq',
      component: DashboardFaq,
      meta: {
        title: 'Project FAQ',
        requiresAuth: true,
      },
    },
    {
      path: '/wallet/:tab?',
      name: 'wallet',
      component: Wallet,
      meta: {
        title: 'Pledgecamp Wallet',
        requiresAuth: true,
      },
    },
    {
      path: '/learn',
      redirect: '/learn/questions',
      name: 'learn',
      component: Learn,
      meta: { title: 'Pledgecamp Learn' },
      children: [
        {
          path: 'questions',
          name: 'questions',
          component: Questions,
        },
        {
          path: 'question/:id',
          name: 'question',
          component: Question,
        },
      ],
    },
    {
      path: '/project/:id(\\d+)/checkout',
      name: 'checkout',
      component: Checkout,
      meta: {
        title: 'Pledgecamp Pledge',
        requiresAuth: true,
      },
    },
    {
      path: '/project/:id(\\d+)/:tab?',
      name: 'project',
      component: Project,
      props: true,
      meta: { title: 'Pledgecamp Project', noScroll: true },
    },
    {
      path: '/projects/categories/:categoryId',
      name: 'projects-category',
      component: Category,
    },
    {
      path: '/search',
      name: 'search',
      component: Search,
      meta: { title: 'Pledgecamp Search' },
    },
    {
      path: '/notifications',
      name: 'notifications',
      component: Notifications,
      meta: {
        title: 'Pledgecamp Notifications',
        requiresAuth: true,
      },
    },
    {
      path: '/manager/:id(\\d+)/:tab?',
      name: 'manager',
      component: Manager,
      meta: {
        title: 'Pledgecamp Project Manager',
        noScroll: true,
        requiresAuth: true,
      },
    },
    // {
    //   path: '/manager/:id(\\d+)/updates/new',
    //   name: 'new_update',
    //   component: NewUpdate,
    //   meta: {
    //     title: 'Pledgecamp Project Update',
    //     noScroll: true,
    //     requiresAuth: true,
    //   },
    // },
    { path: '/google_authenticated', component: Authenticated },
    { path: '/facebook_authenticated', component: Authenticated },
    { path: '/404', component: NotFound },
    { path: '*', component: NotFound },
  ],
});

router.beforeEach((to, _from, next) => {
  const authenticated = store.getters.isAuthenticated;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if(requiresAuth && !authenticated) {
    const targetPath = window.location.pathname;
    next({ name: 'login', query: { from: targetPath } });
  } else {
    next();
  }
});

router.afterEach((to, _from) => {
  Vue.nextTick(() => {
    const parentTitle = to.matched.some(record => record.meta.title);
    document.title = to.meta.title || parentTitle || 'Pledgecamp';
  });
});

export default router;
