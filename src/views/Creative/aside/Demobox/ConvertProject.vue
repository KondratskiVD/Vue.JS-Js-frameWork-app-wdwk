<template>
  <div
    :class="{calculatedHin: calcSticky, calculatedHoff: !calcSticky}"
    class="w-xl user-detail b-l">
    <div
      :class="{resizeHlg: calcWidth >= 453 && !calcSticky, resizeHsm: calcWidth < 453 && !calcSticky}"
      class="card scroll-y pb-4"
      style=" border-radius: 0;
      box-shadow: 0 2px 3px rgba(0, 0, 0, 0.5);
      height:103%"
    >
      <div class="navbar white lt box-shadow d-flex">
        <span
          class="mr-auto"
          @click="$emit('click-close')">
          <span class="text-md l-h-1x">×</span>
        </span>
        <button
          class="btn btn-xl btn-primary"
          @click="sentData">
          Convert to Project
        </button>
      </div>
      <div
        class="row no-gutters">
        <div class="col-md-12 pb-5">
          <p class="text-muted"/><h5 class="pl-4 pr-4">Make Your Move (Radio Edit)</h5><p/>
          <div class="d-flex align-items-center px-4 py-3">Project Members
            <button
              class="btn btn-sm btn-rounded btn-primary i-con-h-a ml-2"
              data-toggle="modal"
              data-target="#newEvent"
              @click="clickAddMembers">
              <i class="i-con i-con-plus"/>
              <span
                class="d-none d-md-inline"
              >Add</span>
            </button>
          </div>
          <div
            class="align-items-center px-1 py-3 pointer"
            data-toggle="collapse"
            data-parent="#accordion">
            <div class="list list-row">
              <div
                v-for="member in members"
                :key="member.id"
                class="list-item">
                <div>
                  <span class="w-40 avatar circle bg-warning-lt">
                    <span>{{ member.full_name | firstLetter | Capitalize }}</span>
                  </span>
                </div>
                <div class="flex">
                  <span
                    href="#"
                    class="item-author ">{{ member.full_name }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="d-flex align-items-center px-4 py-3 b-t">
            <div>Project groups</div>
            <div class="flex"/>
            <span>
              <select
                v-model="project_id"
                class="custom-select">
                <option
                  v-for="project_group_id in all_project_group_id"
                  :value="project_group_id.id">{{ project_group_id.name }}</option>
              </select>
            </span>
          </div>
          <div class="d-flex align-items-center px-4 py-3 b-t">
            <div>Project Type</div>
            <div class="flex"/>
            <span>
              <select
                v-model="project_type"
                class="custom-select">
                <option
                  v-for="type in types"
                  :value="type">{{ type }}</option>
              </select>
            </span>
          </div>
          <div class="d-flex align-items-center px-4 py-3 b-t">
            <div>Send notification to project members</div>
            <div class="flex"/>
            <span>
              <label class="md-switch">
                <input
                  v-model="send_notification"
                  type="checkbox">
                <i class="blue"/>
              </label>
            </span>
          </div>
          <div
            class="d-flex align-items-center px-4 py-3 b-t">
            <div>Additional comment to project members</div>
          </div>
          <div
            class="pl-4 pr-4 pb-4">
            <textarea
              v-model="comment"
              class="form-control"
              placeholder="Comment"
              maxlength="500"
              rows="4"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import LabelsDropdown from '../../../../components/LabelsDropdown.vue';
import ConvertDemoProxy from '../../../../proxies/creative/ConvertDemoProxy';
import ProjectGroupProxy from '../../../../proxies/creative/ProjectGroupProxy';

export default {
  name: 'ConvertProject',
  components: { LabelsDropdown },
  props: {
    currentShowedItem: {
      type: Object,
      default: () => {
      },
    },
    members: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      project_id: null,
      label_id: null,
      identifier: null,
      send_notification: true,
      project_type: 'Collab',
      all_project_group_id: null,
      comment: '',
      types: ['Collab', 'Single', 'Edit', 'Topline'],
    };
  },
  computed: {
    calcSticky() {
      let headerSticky;
      if (this.$store.state.setting.stickyHeader) {
        headerSticky = true;
      } else { headerSticky = false; }
      return headerSticky;
    },
    calcWidth() {
      return window.screen.availWidth;
    },
    ...mapGetters({
      accountCurrentLabel: 'account/currentLabel',
    }),
  },
  created() {
    this.label_id = this.currentShowedItem.item.label.id;
    const group = new ProjectGroupProxy(this.label_id);
    group.all().then((responses) => {
      this.all_project_group_id = responses.groups;
      this.project_id = this.all_project_group_id[0].id;
    });
  },
  methods: {
    clickAddMembers() {
      this.$emit('click-add-members');
    },
    sentData() {
      if (!this.members || this.members.length === 0) {
        this.$notify({
          group: 'error',
          type: 'error',
          title: 'ERROR',
          duration: 3000,
          text: 'You must select members.',
        });
      } else {
        const listMembers = this.members.map(mamber => mamber.id);

        const formData = new FormData();
        formData.append('identifier', this.currentShowedItem.item.identifier);
        formData.append('project_type', this.project_type);
        formData.append('project_group_id', this.project_id);
        formData.append('send_notification', this.send_notification);
        formData.append('comment', this.comment);
        formData.append('members', listMembers.join(','));

        const convertProject = new ConvertDemoProxy();
        convertProject.create(formData);
      }
    },
  },
};
</script>

<style scoped>
  .user-detail{position: fixed; z-index: 1060; right: 0; bottom: 0; top: 60px}
  .scroll-y::-webkit-scrollbar { width: 0 !important }
  td.clip {
    white-space: nowrap;
    max-width: 70px !important;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
