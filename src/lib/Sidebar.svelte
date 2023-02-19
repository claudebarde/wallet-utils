<script lang="ts">
  import Wallet from "./Wallet.svelte";
  import store from "../store";
</script>

<style lang="scss">
  @import "../styles/settings.scss";

  aside {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 30px;
    padding: 20px;
    border-right: solid 3px $purple-4;

    ul {
      list-style: none;
      margin: 0px;
      padding: 0px;

      li {
        padding: 5px 0px;
        border-radius: 5px;
        transition: 0.3s;

        &:hover {
          background-color: $purple-1;
        }

        button {
          background-color: transparent;
          border: none;
          cursor: pointer;
          font-size: $font-size;

          &::after {
            content: " \003E";
            font-size: calc(#{$font-size} * 1.1);
          }
        }
      }
    }
  }
</style>

<aside>
  <div>Tezos Wallet Utils</div>
  <Wallet />
  <ul>
    <li>
      <button on:click={() => store.updateCurrentView("generate-sig")}>
        Generate a signature
      </button>
    </li>
    <li>
      <button on:click={() => store.updateCurrentView("verify-sig")}>
        Verify a signature
      </button>
    </li>
    <li>
      <button on:click={() => store.updateCurrentView("encode-payload")}>
        Encode a payload
      </button>
    </li>
    <li>
      <button on:click={() => store.updateCurrentView("decode-payload")}>
        Decode a payload
      </button>
    </li>
    <li>
      <button on:click={() => store.updateCurrentView("cast-bytes-to-keyhash")}>
        Cast bytes to key hash
      </button>
    </li>
  </ul>
</aside>
