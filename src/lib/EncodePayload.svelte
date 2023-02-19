<script lang="ts">
  import store from "../store";
  import config from "../config";

  let dappUrl = "";
  let date = "";
  let input = "";
  let payload: Array<string> = [];

  const encode = () => {
    if (dappUrl && date && input) {
      payload = [
        "Tezos Signed Message:",
        dappUrl,
        new Date(date).toISOString(),
        input
      ];
    }
  };

  const sign = () => {
    store.updatePayloadToSign(payload);
    store.updateCurrentView("generate-sig");
  };
</script>

<style lang="scss">
  .inputs {
    width: 90%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .payload-output {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    p {
      width: 100%;
      text-align: left;
    }
  }
</style>

<div class="action-container">
  <h1>Encode a payload</h1>
  <h3>Insert the input, time and dapp URL to encode below</h3>
  <p>This will format your inputs into a payload to sign.</p>
  <div class="inputs">
    <label for="dapp-url">
      <span>Dapp URL:</span>
      <input type="text" id="dapp-url" bind:value={dappUrl} />
    </label>
    <label for="date">
      <span>Date:</span>
      <input type="datetime-local" id="date" bind:value={date} />
    </label>
  </div>
  <label for="payload-input">
    <span>Input:</span>
    <textarea id="payload-input" bind:value={input} />
  </label>
  <button class="primary" on:click={encode}> Encode </button>
  {#if payload.length === 4}
    <div class="payload-output">
      <p>
        <span>Payload:</span>
      </p>
      <p>
        {payload.join(" ")}
      </p>
      <button class="primary" on:click={sign}> Sign </button>
    </div>
  {/if}
</div>
