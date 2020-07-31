import Vue from "vue";
import Icon from "@/components/Icon"; // svg component

// register globally
Vue.component("v-icon", Icon);

const req = require.context("@/assets/img", false, /.svg$/);
const requireAll = requireContext => requireContext.keys().map(requireContext);
requireAll(req);
