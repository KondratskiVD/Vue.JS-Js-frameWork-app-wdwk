/* ============
 * Mutations for the SETTINGS module
 * ============
 *
 * The mutations that are available on the
 * SETTINGS module.
 */

import * as types from './mutation-types';

/* eslint-disable no-param-reassign */
export default {
  [types.SET_STICKY_HEADER_MUTATION]: (state, checked) => {
    state.stickyHeader = checked;
  },
  [types.SET_STICKY_ASIDE_MUTATION]: (state, checked) => {
    state.stickyAside = checked;
  },
  [types.SET_FOLDE_ASIDE_MUTATION]: (state, checked) => {
    state.foldedAside = checked;
  },
  [types.SET_HIDE_ASIDE_MUTATION]: (state, checked) => {
    state.hideAside = checked;
  },
  [types.SET_COLOR_THEME]: (state, value) => {
    state.bgColor = value;
  },

  [types.SET_IS_CONTENT_LOADER](state, value) {
    state.isContentLoader = value;
  },

  [types.SET_RELEASES_STATUSES](state, statuses) {
    console.log('statuses');
    console.log(statuses);
    state.releaseStatuses = statuses;
    state.releaseStatusesLastUpdated = (new Date().getTime());
  },
};
