<script lang="ts">
  import { onMount } from "svelte";
  import { BeaconWallet } from "@taquito/beacon-wallet";
  import { NetworkType } from "@airgap/beacon-sdk";
  import store from "../store";
  import config from "../config";

  const connectWallet = async () => {
    const wallet = (() => {
      if ($store.wallet) {
        return $store.wallet;
      } else {
        return new BeaconWallet({
          name: "Tezos Wallet Utils",
          preferredNetwork: NetworkType.GHOSTNET
        });
      }
    })();
    await wallet.requestPermissions({
      network: { type: NetworkType.GHOSTNET, rpcUrl: config.rpcUrl }
    });
    const userAddress = await wallet.getPKH();
    store.updateUserAddress(userAddress);
  };

  const disconnectWallet = async () => {
    $store.wallet.client.destroy();
    store.updateWallet(undefined);
    store.updateUserAddress("");
  };

  onMount(async () => {
    const wallet = new BeaconWallet({
      name: "Tezos Wallet Utils",
      preferredNetwork: NetworkType.GHOSTNET
    });
    const activeAccount = await wallet.client.getActiveAccount();
    if (activeAccount) {
      const userAddress = await wallet.getPKH();
      store.updateUserAddress(userAddress);
      $store.Tezos.setWalletProvider(wallet);
    }

    store.updateWallet(wallet);
  });
</script>

<style lang="scss">
  @import "../styles/settings.scss";

  .wallet-wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
</style>

<div class="wallet-wrapper">
  {#if $store.userAddress}
    <span>
      {$store.userAddress.slice(0, 5)}...{$store.userAddress.slice(-5)}
    </span>
    <button class="primary" on:click={disconnectWallet}>
      Disconnect wallet
    </button>
  {:else}
    <button class="primary" on:click={connectWallet}> Connect wallet </button>
  {/if}
</div>
