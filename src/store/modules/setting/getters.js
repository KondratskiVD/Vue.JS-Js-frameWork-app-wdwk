/* ============
 * Getters for the account module
 * ============
 *
 * The getters that are available on the
 * account module.
 */

export default {
  releaseStatuses(state) {
    return state.releaseStatuses;
  },
  isContentLoader(state) {
    return state.isContentLoader;
  },
};
