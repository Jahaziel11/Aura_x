import {ref} from 'vue';

export default {
  setup() {
    const text = ref('');
    const value = ref(null);
    return {
      text,
      value
    };
  }
};
