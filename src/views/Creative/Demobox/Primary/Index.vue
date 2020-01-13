<template>
  <div class="position-relative h-100">
    <addMembersModal
      v-if="showAddMembers"
      :current-showed-item="currentShowedItem"
      @click-close="showAddMembers = false"
      @add-new-members="addNewMembers"/>
    <transition name="transition-content">
      <div
        v-if="showAside || showAskModal || showConvertProject"
        :style="{ zIndex: showAddMembers ? '1080' : '1000'}"
        class="show fade-content"
        @click="hideFadeContent"/>
    </transition>
    <div class="d-flex flex h-100">
      <creative-demo-aside
        :filters="primaryFilters"
        :assets="assetsFilter"
        :labels="subLabels"
        :download-rejected="downloadingRejected"
        @filteredByType="onFiltered"/>
      <transition
        name="rsa">
        <demo-detail
          v-if="showAside"
          :type="type"
          :current-showed-item="currentShowedItem"
          :is-aside-loading="isAsideLoading"
          @click-close="showAside = false"
        />
        <convert-project
          v-if="showConvertProject"
          :current-showed-item="currentShowedItem"
          :members="members"
          @click-close="showConvertProject = false"
          @click-add-members="openAddMembers"
        />
      </transition>
      <div class="padding position-relative table-width-with-sidebar">
        <tool-bar
          :display-menu-on-mobile="true"
          class="p-3"
          @filteredByTermOrder="onFiltered"/>
        <table-content-demo
          :show-content="showAside"
          :render-data="list"
          :total-records="totalRecords"
          @load-more="setPage"
          @open-detail="changeFunc"
          @open-show-ask-modal="openShowAskModal"
          @open-convert-project="openConvertProject"
        />
      </div>
    </div>
  </div>
</template>

<script>
/* ============
     * Demo Primary Page
     * ============
    */
import { mapGetters } from 'vuex';
import TableContentDemo from '../../../../components/TableContentDemo.vue';
import AddMembersModal from '../../../../components/addMembersModal.vue';
import changechildRouteDemobox from '../../../mixins/changechildRouteDemobox';
import trackListMixin from '../../../mixins/trackListMixin';
import DemoDetail from '../../aside/Demobox/Detail/Index.vue';
import ConvertProject from '../../aside/Demobox/ConvertProject.vue';
import FilterMixin from '../../../mixins/demo/filter';
import { REJECTED_FILTER } from '../../../../const/DemoFilters';


export default {
  /**
     * The name of the page.
     */
  name: 'CreativeIndex',
  components: {
    AddMembersModal,
    TableContentDemo,
    DemoDetail,
    ConvertProject,
  },
  mixins: [trackListMixin, changechildRouteDemobox, FilterMixin],
  data() {
    return {
      showAside: false,
      showAskModal: false,
      showAddMembers: false,
      showConvertProject: false,
      identifier: '',
      downloadRejected: false,
      downloadingRejected: false,
      members: null,
    };
  },
  computed: {
    ...mapGetters({
      primaryRejectedCount: 'demobox/primaryRejectedCount',
      primaryDemoList: 'demobox/primaryDemoList',
      primaryFilters: 'demobox/primaryFilters',
      subLabels: 'account/currentSubLabels',
    }),
    itemsList() {
      return this.primaryDemoList;
    },
    totalRecords() {
      return this.list.length;
    },
  },
  watch: {
    primaryDemoList() {
      this.search();
    },
  },
  destroyed() {
    this.$store.dispatch('demobox/clearStorePrimaryData');
  },
  methods: {
    addNewMembers(addedMembers) {
      this.members = addedMembers;
    },
    hideFadeContent() {
      if (this.showAddMembers) {
        this.showAddMembers = false;
      } else {
        this.showAside = false;
        this.showAskModal = false;
        this.showConvertProject = false;
      }
    },
    openConvertProject(data) {
      this.showConvertProject = true;
      this.currentShowedItemFunc(data);
    },
    openAddMembers() {
      this.showAddMembers = true;
    },
    setPage(data) {
      this.page = data.page;
      this.$router.replace({
        query: {
          ...this.$route.query,
          page: data.page,
        },
      });
    },
    openShowAskModal(identifier) {
      this.showAskModal = true;
      this.identifier = identifier;
    },
    fetchTracks() {
      const {
        filter,
      } = this.$route.query;

      const isRejected = filter === REJECTED_FILTER;
      this.setIsContentLoader();
      this.$store.dispatch('demobox/clearStorePrimaryData');
      this.downloadRejected = true;
      this.downloadingRejected = true;

      this.$store.dispatch('demobox/fetchAllPrimaryTracks')
        .finally(() => {
          if (!isRejected) { this.$store.dispatch('setting/setIsContentLoader', false); }
        });
      this.$store.dispatch('demobox/fetchAllPrimaryRejectedTracks')
        .then(() => {
          this.downloadRejected = true;
        })
        .finally(() => {
          this.downloadingRejected = false;
          setTimeout(() => {
            if (isRejected) { this.$store.dispatch('setting/setIsContentLoader', false); }
          }, 10);
        });
    },
    onFiltered(data = {}) {
      if (data.filter && data.filter === REJECTED_FILTER && !this.downloadRejected) {
        this.setIsContentLoader();
        this.downloadRejected = true;
        this.$store.dispatch('demobox/fetchAllPrimaryRejectedTracks').finally(() => {
          this.$store.dispatch('setting/setIsContentLoader', false);
        });
      }
      this.filterTracks(data);
    },
    getListByTerm(term, items) {
      if (!items) {
        // eslint-disable-next-line no-param-reassign
        items = this.itemsList;
      }

      if (Array.isArray(items)) {
        return items.filter((obj) => {
          const { title } = obj;
          return (title)
            ? !!(title.toLowerCase()
              .includes(term.toLowerCase()))
            : false;
        });
      }
      return items;
    },

  },

};
</script>
<style scoped>
  .table-width-with-sidebar {
    width: calc(100% - 240px);
  }

  @media screen and (max-width: 768px) {
    .table-width-with-sidebar {
      width: 100%;
    }
  }
</style>
