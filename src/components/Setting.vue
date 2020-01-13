<template>
  <li class="nav-item dropdown">
    <a
      class="nav-link px-2 i-con-h-a"
      data-toggle="dropdown">
      <i class="i-con i-con-droplet solid text-success"/>
    </a>
    <!-- ############ Setting START-->
    <div class="dropdown-menu dropdown-menu-center mt-3 w animate fadeIn">
      <div class="setting px-3">
        <div class="mb-2">
          <strong>Setting:</strong>
        </div>
        <div
          id="settingLayout"
          class="mb-3">
          <label class="ui-check my-1 d-block">
            <input
              v-model="stickyHeader_checked"
              type="checkbox"
              name="stickyHeader"
            >
            <i/>
            <small>Sticky header</small>
          </label>
          <label class="ui-check my-1 d-block">
            <input
              v-model="stickyAside_checked"
              type="checkbox"
              name="stickyAside">
            <i/>
            <small>Sticky aside</small>
          </label>
          <label class="ui-check my-1 d-block">
            <input
              v-model="foldedAside_checked"
              type="checkbox"
              name="foldedAside">
            <i/>
            <small>Folded Aside</small>
          </label>
          <label class="ui-check my-1 d-block">
            <input
              v-model="hideAside_checked"
              type="checkbox"
              name="hideAside">
            <i/>
            <small>Hide Aside</small>
          </label>
        </div>
        <div class="mb-2">
          <strong>Color:</strong>
        </div>
        <div>
          <label class="radio radio-inline ui-check ui-check-md">
            <input
              v-model="bgColorTheme"
              type="radio"
              name="bg"
              value="false"
            >
            <i/>
          </label>
          <label class="radio radio-inline ui-check ui-check-color ui-check-md">
            <input
              v-model="bgColorTheme"
              type="radio"
              name="bg"
              value="true"
            >
            <i class="bg-dark"/>
          </label>
        </div>
      </div>
    </div>
    <!-- ############ Setting END-->
  </li>
</template>

<script>
import { SETTINGS } from '../store/modules/setting/mutation-types';

export default {
  name: 'Setting',
  computed: {
    stickyHeader_checked: {
      get() {
        return this.$store.state.setting.stickyHeader;
      },
      set(checked) {
        this.$store.commit('update_Sticky_Header_Mutation', checked);
      },
    },
    stickyAside_checked: {
      get() {
        return this.$store.state.setting.stickyAside;
      },
      set(checked) {
        this.$store.commit('update_Sticky_Aside_Mutation', checked);
      },
    },
    foldedAside_checked: {
      get() {
        return this.$store.state.setting.foldedAside;
      },
      set(checked) {
        this.$store.commit('update_Folde_Aside_Mutation', checked);
      },
    },
    hideAside_checked: {
      get() {
        return this.$store.state.setting.hideAside;
      },
      set(checked) {
        this.$store.commit('update_Hide_Aside_Mutation', checked);
      },
    },
    bgColorTheme: {
      get() {
        return this.$store.state.setting.bgColor;
      },
      set(value) {
        this.$store.commit('update_Color_Theme', value === 'true');
      },
    },
  },
};
</script>
