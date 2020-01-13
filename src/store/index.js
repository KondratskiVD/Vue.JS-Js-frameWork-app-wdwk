/* ============
 * Vuex Store
 * ============
 *
 * The store of the application.
 *
 * http://vuex.vuejs.org/en/index.html
 */

import Vuex from 'vuex';
import { Ability } from '@casl/ability';
import VuexPersistence from 'vuex-persist';
import createLogger from 'vuex/dist/logger';
import abilityPlugin from './ability/ability';

// Modules
import account from './modules/account';
import auth from './modules/auth';
import player from './modules/player';
import setting from './modules/setting';
import demobox from './modules/creative/demobox';
import finance from './modules/finance';
import toplines from './modules/creative/toplines';
import projects from './modules/creative/projects';
import rightholder from './modules/rightholder';
import rightholderPlugin from './plugins/rightholder';
import redirectSwitchLabel from './plugins/redirectSwitchLabel';
import defineAbilities from './ability/defineAbilities';


const debug = process.env.NODE_ENV !== 'production';

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  reducer: state => ({
    setting: state.setting,
    account: state.account,
    demobox: state.demobox,
    finance: state.finance,
    toplines: state.toplines,
    projects: state.projects,
    rightholder: state.rightholder,
  }),
});

export default new Vuex.Store({
  /**
   * Assign the modules to the store.
   */
  modules: {
    account,
    auth,
    player,
    setting,
    demobox,
    finance,
    toplines,
    projects,
    rightholder,
  },

  /**
   * If strict mode should be enabled.
   */
  strict: debug,
  getters: {
    ability(state) {
      const curAccount = state.account;
      const rules = defineAbilities(curAccount, curAccount.currentLabel);
      return new Ability(rules, {});
    },
  },

  /**
   * Plugins used in the store.
   */
  plugins: debug ? [createLogger(), vuexLocal.plugin, abilityPlugin, rightholderPlugin, redirectSwitchLabel] : [vuexLocal.plugin, abilityPlugin, rightholderPlugin, redirectSwitchLabel],
});
