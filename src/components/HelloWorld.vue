<template>
  <div>
    <ul v-for="order in orders">
      <li>{{ order.amount }}</li>
      <li>{{ order.description }}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { loadOrders } from '@/api/reporting'

export default defineComponent({
  setup(){
    const orders = ref();

    const addOrders = async () => {
      orders.value = await loadOrders();
    }

    onMounted(() => {
      addOrders()
    })

    return {
      orders
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
