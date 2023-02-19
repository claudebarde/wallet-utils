<script lang="ts">
  import { onMount } from "svelte";
  import { TezosToolkit } from "@taquito/taquito";
  import store from "./store";
  import config from "./config";
  import Sidebar from "./lib/Sidebar.svelte";
  import Body from "./lib/Body.svelte";

  onMount(async () => {
    let tezos = new TezosToolkit(config.rpcUrl);
    store.updateTezos(tezos);
  });
</script>

<Sidebar />
<Body />
