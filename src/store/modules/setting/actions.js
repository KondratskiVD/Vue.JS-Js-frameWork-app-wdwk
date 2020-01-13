/* ============
 * Actions for the setting module
 * ============
 *
 * The actions that are available on the
 * account module.
 */

import ReleaseStatusesProxy from '../../../proxies/ReleaseStatusesProxy';
import * as types from './mutation-types';

export const fetchAllStatuses = ({ commit }) => {
  const client = new ReleaseStatusesProxy();
  client.all()
    .then((response) => {
      commit(types.SET_RELEASES_STATUSES, response);
    })
    .catch(() => {
      console.log('Cannot fetchAllStatuses info!');
      // TODO: maybe add call to analytics or debug app?
    });
};
export const setIsContentLoader = ({ commit }, value) => {
  commit(types.SET_IS_CONTENT_LOADER, value);
};

export const setStickyHeaderMutation = ({ commit }, checked) => {
  commit(types.SET_STICKY_HEADER_MUTATION, checked);
};

export const setStickyAsideMutation = ({ commit }, checked) => {
  commit(types.SET_STICKY_ASIDE_MUTATION, checked);
};

export const setFoldeAsideMutation = ({ commit }, checked) => {
  commit(types.SET_FOLDE_ASIDE_MUTATION, checked);
};

export const setHideAsideMutation = ({ commit }, checked) => {
  commit(types.SET_HIDE_ASIDE_MUTATION, checked);
};

export const setColorTheme = ({ commit }, value) => {
  commit(types.SET_COLOR_THEME, value);
};

export default {
  fetchAllStatuses,
  setIsContentLoader,
  setColorTheme,
  setHideAsideMutation,
  setFoldeAsideMutation,
  setStickyAsideMutation,
  setStickyHeaderMutation,
};
