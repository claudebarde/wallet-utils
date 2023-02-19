<script lang="ts">
  import { onMount } from "svelte";
  import { char2Bytes } from "@taquito/utils";
  import {
    type RequestSignPayloadInput,
    SigningType
  } from "@airgap/beacon-sdk";
  import store from "../store";
  import config from "../config";

  let input = "";
  let signature = "";
  let copiedSig = false;

  const sign = async () => {
    if ($store.userAddress && $store.wallet) {
      const bytes = char2Bytes(input);
      const bytesLength = (bytes.length / 2).toString(16);
      const addPadding = `00000000${bytesLength}`;
      const paddedBytesLength = addPadding.slice(addPadding.length - 8);
      const payloadBytes = "05" + "01" + paddedBytesLength + bytes;
      const payload: RequestSignPayloadInput = {
        signingType: SigningType.MICHELINE,
        payload: payloadBytes,
        sourceAddress: $store.userAddress
      };
      const signedPayload = await $store.wallet.client.requestSignPayload(
        payload
      );
      const { signature: sig } = signedPayload;
      signature = sig;
    }
  };

  const copySig = async () => {
    try {
      await navigator.clipboard.writeText(signature);
      copiedSig = true;
      setTimeout(() => (copiedSig = false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  onMount(() => {
    if ($store.payloadToSign && $store.payloadToSign.length === 4) {
      input = config.outputPayload($store.payloadToSign);
    }
  });
</script>

<style lang="scss">
  @import "../styles/settings.scss";

  p.signature-header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    span:last-child {
      font-size: calc(#{$font-size} * 0.7);
      font-style: italic;
    }
  }

  p.signature {
    cursor: pointer;
    transition: 0.3s;

    &:hover {
      background-color: $purple-1;
    }
  }
</style>

<div class="action-container">
  <h1>Generate a signature</h1>
  <h3>Insert the payload to sign below</h3>
  <p>This will sign a string without any formatting.</p>
  <textarea bind:value={input} />
  <button class="primary" on:click={sign}> Sign </button>
  {#if signature}
    <div>
      <p class="signature-header">
        <span>Signature:</span>
        {#if copiedSig}
          <span>Copied!</span>
        {:else}
          <span />
        {/if}
      </p>
      <p class="signature" on:click={copySig} on:keydown={copySig}>
        {signature}
      </p>
    </div>
  {/if}
</div>
