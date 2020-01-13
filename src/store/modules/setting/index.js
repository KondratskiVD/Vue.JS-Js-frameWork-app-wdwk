/* ============
 * Setting Module
 * ============
 */

import getters from './getters';
import mutations from './mutations';
import state from './state';
import actions from './actions';

export default {
  namespaced: true,
  actions,
  getters,
  mutations,
  state,
};
