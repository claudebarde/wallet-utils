<script lang="ts">
  import store from "../store";
  import GenerateSig from "./GenerateSig.svelte";
  import VerifySig from "./VerifySig.svelte";
  import EncodePayload from "./EncodePayload.svelte";
  import DecodePayload from "./DecodePayload.svelte";
  import CastBytesToKeyhash from "./CastBytesToKeyhash.svelte";
</script>

<style lang="scss">
  main {
    padding: 20px;
    display: grid;
    place-items: center;
  }
</style>

<main>
  {#if $store.userAddress && $store.currentView === "initial"}
    <div>Choose an action in the column on the left</div>
  {:else if $store.userAddress && $store.currentView === "generate-sig"}
    <GenerateSig />
  {:else if $store.userAddress && $store.currentView === "verify-sig"}
    <VerifySig />
  {:else if $store.userAddress && $store.currentView === "encode-payload"}
    <EncodePayload />
  {:else if $store.userAddress && $store.currentView === "decode-payload"}
    <DecodePayload />
  {:else if $store.userAddress && $store.currentView === "cast-bytes-to-keyhash"}
    <CastBytesToKeyhash />
  {:else}
    <div>You must connect your wallet to use the wallet utils</div>
  {/if}
</main>
