<template>
  <!-- ############ Header START-->
  <header
    id="header"
    :class="{'sticky': setting.stickyHeader }"
    class="page-header  box-shadow animate bg-white"
  >
    <div class="navbar navbar-expand-lg">
      <!-- btn to toggle sidenav on small screen -->
      <a
        class="d-lg-none i-con-h-a px-1"
        @click="openMobileMenu"
      >
        <i class="i-con i-con-menu text-muted"/>
      </a>
      <!-- brand -->
      <router-link
        :to="{ name: 'creative.catalog' }"
        class="navbar-brand base-logo mr-4">
        <span
          class="d-inline-block base-logo m-0 text-center"
          style="width: 3rem">
          <img
            :class="{'normal': !setting.bgColor, 'inverted': setting.bgColor && false}"
            src="../assets/img/logo-vertical-w.png"
            alt="">
        </span>

        <img
          :class="{'normal': !setting.bgColor, 'inverted': setting.bgColor && false}"
          class="d-none d-sm-inline"
          src="../assets/img/logo-vertical-text.png"
          style="margin-left: -7px"
          alt="">
      </router-link>
      <!-- / brand -->

      <!-- Navbar collapse -->
      <div
        v-if="menus"
        id="navbarToggler"
        class="collapse navbar-collapse order-2 order-lg-1 pt-0">
        <ul
          class="navbar-nav"
          data-nav>
          <router-link
            v-for="menu in menus"
            :key="menu.routeName"
            :to="{ name: menu.routeName }"
            :class="{activeNavItem: changeRouter === menu.changeRouter}"
            active-class="active"
            class="nav-item"
            tag="li"
          >
            <a class="nav-link">{{ menu.name }}</a>
          </router-link>
        </ul>
      </div>

      <ul class="nav navbar-menu order-1 order-lg-2">
        <!-- User dropdown menu -->
        <li class="nav-item dropdown">
          <a
            href="#"
            data-toggle="dropdown"
            class="nav-link d-flex align-items-center py-0 px-lg-0 px-2 text-color">
            <span class="mx-2 l-h-1x d-lg-block text-right">
              <span>{{ account.firstName }} {{ account.lastName }}</span>
              <small class="text-fade d-block mt-1">
                {{ labelName }}
              </small>
            </span>
            <span
              v-if="!isRightholder"
              class="avatar w-36 d-none">
              <img
                v-if="account.photo"
                :src="account.photo"
                alt="...">
            </span>
          </a>
          <div class="user-menu dropdown-menu dropdown-menu-right w pt-0 mt-3 animate fadeIn">
            <div v-if="Array.isArray(account.labels) && (account.labels).length > 1">
              <a
                v-for="label in account.labels"
                :key="label.id"
                :class="['dropdown-item', {'active': label.id == account.currentLabel}]"
                class="d-flex align-items-center justify-content-start"
                @click="$store.dispatch('account/setCurrentLabel', label.id)">
                <img
                  v-if="label.logo !== ''"
                  :src="label.logo"
                  alt=""
                  width="32"
                  height="32"
                  class="mr-2">
                <span
                  v-else
                  class="w-32 avatar circle bg-warning-lt mr-2">{{ label.name | firstLetter | Capitalize }}</span>
                <span>{{ label.name }}</span>
              </a>
              <div class="dropdown-divider"/>
            </div>
            <router-link
              :to="{ name: 'account.index' }"
              class="dropdown-item pt-2">
              <span>Profile</span>
            </router-link>
            <a
              class="dropdown-item"
              @click.stop.prevent="logout">Sign out</a>
          </div>
        </li>

        <!-- Navarbar toggle btn -->
        <li
          v-if="!isRightholder"
          class="nav-item d-lg-none">
          <a
            href="#"
            class="nav-link i-con-h-a px-1"
            data-toggle="collapse"
            data-toggle-class
            data-target="#navbarToggler">
            <i class="i-con i-con-nav text-muted"><i/></i>
          </a>
        </li>
      </ul>

    </div>
  </header>
  <!-- ############ Header END-->
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import Setting from './Setting.vue';
import { RESOURCE } from '../routes/const';

/* ============
   * Header Component
   * ============
   *
   * Main header component.
   *
   */


export default {
  /**
     * The name of the component.
     */
  name: 'Header',
  components: { Setting },
  /**
   * The computed properties that the component can use.
   */
  data() {
    return {
      menuList: [
        {
          name: 'Creative',
          routeName: 'creative.catalog',
          changeRouter: 'creative',
          resource: RESOURCE.creative.main,
        },
        {
          name: 'Back office',
          routeName: 'backoffice.index',
          changeRouter: 'backoffice',
          resource: RESOURCE.backoffice.main,
        },
        {
          name: 'Finance',
          routeName: 'finance.index',
          changeRouter: 'finance',
          resource: RESOURCE.finance.main,
        },
      ],
    };
  },
  computed: {
    ...mapState(['account', 'setting']),
    ...mapGetters({ labelName: 'account/currentLabelName' }),
    changeRouter() {
      const nameOfRoute = this.$route.name.split('.');
      return nameOfRoute[0];
    },
    menus() {
      const menu = this.menuList
        .filter(item => this.$can(item.action || 'manage', item.resource));
      return Array.isArray(menu) && menu.length > 1 ? menu : [];
    },
    isRightholder() {
      return this
        .account
        .isRightholder || this
        .account
        .permissions
        .finance
        .includes(this.account.currentLabel);
    },
  },
  methods: {
    openMobileMenu() {
      const main = $('#app');
      const aside = main.find('#aside');
      aside.addClass('show');
      aside.show();

      const body = main.find('.layout-column');
      body.addClass('modal-open');

      const ovarlay = main.find('.modal-backdrop');
      ovarlay.show();
    },
    logout() {
      this.$store.dispatch('auth/logout');
    },
  },
};
</script>
<style scoped>
  .nav {
    flex-wrap: nowrap;
  }
  .user-menu {
    background-color: #272727;
    color: #fff;
  }
  .activeNavItem{
    background: #262626;
    font-weight: bold;
  }
  .box-shadow{
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.55), 0 -1px 0 rgba(0,0,0,.015) !important;
  }
</style>
