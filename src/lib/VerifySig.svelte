<script lang="ts">
  import { onMount } from "svelte";
  import { validateSignature, char2Bytes } from "@taquito/utils";
  import store from "../store";
  import config from "../config";

  let message =
    "Tezos Signed Message: https://tezostaquito.io/ 2023-02-25T10:48:00.000Z test message";
  let publicKey = "";
  let signature =
    "edsigtmChkAT1aWayzmcr4MhxCqtg8DgY7RcLSHdQGNZYuPgwuHu9nTRGBTHbKxEDqr9WqErcS92QCJJcbWLX9i2oJRvfZhjsYP";
  let isSigVerified = false; // checks if the user clicked the Verify button
  let isSigValid = false; // checks if the signature is a valid Tezos signature
  let isSigCorrect = false; // checks if the signature has a valid format

  const messageToBytes = () => {
    const regex = new RegExp(`[0-9a-fA-F]{${message.length}}`);
    if (!regex.test(message)) {
      message = char2Bytes(message);
    }
  };

  const verify = () => {
    isSigVerified = false;

    // validates the signature
    if (validateSignature(signature) === 3) {
      isSigValid = true;
    } else {
      isSigValid = false;
    }
    // checks if the signature is correctly formatted
    const { result } = config.validatePayload(message);
    isSigCorrect = result;

    isSigVerified = true;
  };

  onMount(async () => {
    if ($store.wallet) {
      publicKey = (await $store.wallet.client.getActiveAccount()).publicKey;
    }
  });
</script>

<style lang="scss">
  .msg-header {
    width: 90%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>

<div class="action-container">
  <h1>Verify a signature</h1>
  <h3>Insert the signature to verify below</h3>
  <p>
    This will let you know if the signature is valid and properly formatted.
  </p>
  <label for="">
    <p class="msg-header">
      <span>Message:</span>
      <button class="mini" on:click={messageToBytes}>To Bytes</button>
    </p>
    <textarea bind:value={message} />
  </label>
  <label for="">
    <span>Public key:</span>
    <input
      type="text"
      bind:value={publicKey}
      style="width:90%"
      placeholder="Insert the public key that signed the message here"
    />
  </label>
  <label for="">
    <span>Signature:</span>
    <textarea bind:value={signature} />
  </label>
  <button class="primary" on:click={verify}> Verify </button>
  {#if isSigVerified}
    <div>
      <p>
        <span>Valid Tezos signature: </span>
        <span style={`color:${isSigValid ? "green" : "red"}`}>
          {isSigValid.toString()}
        </span>
      </p>
      <p>
        <span>Correctly formatted signature: </span>
        <span style={`color:${isSigCorrect ? "green" : "red"}`}>
          {isSigCorrect.toString()}
        </span>
      </p>
    </div>
  {/if}
</div>
