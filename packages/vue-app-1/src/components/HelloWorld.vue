<template>
  <div class="hello">{{ msg }} - {{ now }} {{ rx }}
    <div>OK</div>
  </div>
</template>

<script>
import moment from "moment";
import {of} from "rxjs";

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      rx: of({}),
      now: moment()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  color:red;
}
</style>
