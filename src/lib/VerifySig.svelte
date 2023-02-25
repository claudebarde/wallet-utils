<script lang="ts">
  import { onMount } from "svelte";
  import { validateSignature, char2Bytes, bytes2Char } from "@taquito/utils";
  import store from "../store";

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

  const sign = () => {
    isSigVerified = false;

    // validates the signature
    if (validateSignature(signature) === 3) {
      isSigValid = true;
    } else {
      isSigValid = false;
    }
    // checks if the signature is correctly formatted
    const input = bytes2Char(message);
    const head = input.slice(0, 22);
    if (head === "Tezos Signed Message: ") {
      const tail = input.slice(22);
      const [url, date, ...rest] = tail.split(" ");
      console.log({ url, date, rest });
      // validates the URL
      const urlRegex = new RegExp(
        "[(http(s)?):\\/\\/(www\\.)?a-zA-Z0-9@:%._\\+~#=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*)"
      );
      if (urlRegex.test(url)) {
        // validates the date
        const dateRegex = new RegExp(
          "^(?<year>-?(?:[1-9][0-9]*)?[0-9]{4})-(?<month>1[0-2]|0[1-9])-(?<day>3[01]|0[1-9]|[12][0-9])T(?<hour>2[0-3]|[01][0-9]):(?<minute>[0-5][0-9]):(?<second>[0-5][0-9])(?<ms>.[0-9]+)?(?<timezone>Z|[+-](?:2[0-3]|[01][0-9]):[0-5][0-9])?$"
        );
        if (dateRegex.test(date)) {
          isSigCorrect = true;
        } else {
          isSigCorrect = false;
          console.log("date is wrong");
        }
      } else {
        isSigCorrect = false;
        console.log("url is wrong");
      }
    } else {
      isSigCorrect = false;
      console.log("no Tezos Signed Message: ");
    }

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
  <button class="primary" on:click={sign}> Verify </button>
  {#if isSigVerified}
    <div>
      <p>
        <span>Valid Tezos signature: {isSigValid.toString()}</span>
      </p>
      <p>
        <span>Correctly formatted signature: {isSigCorrect.toString()}</span>
      </p>
    </div>
  {/if}
</div>
