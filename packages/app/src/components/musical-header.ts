// src/components/blazing-header.ts
import { LitElement, css, html } from "lit";

export class MusicalHeaderElement extends LitElement {
  render() {
    return html`
      <header>
      <a class="main-header" , href="index.html"> Seamus's Music Mixer</a>
      <a class="login" , href="spotifyLogin.html">
              Spotify Login
      </a>
      </header>
    `;
  }

  static styles = css`
  header {
    display: contents;
}

.main-header {
    grid-row: 1 / 2;
    justify-self: center;
    grid-column: 2 / 7;
    font-family: var(--font-family-header);
    font-size: var(--font-size-xlarge);
    color: var(--color-text-header);
    background-color: var(--color-background-header);
    border-style: solid;
    border-radius: var(--border-radius-header);
    text-align: center;
    width: max-content;
    padding: 10px;
    margin: auto;
}

.login {
    grid-row: 1 / 2;
    justify-self: center;
    grid-column: 6 / 8;
    font-size: var(--font-size-medium);
    color: var(--color-text-body);
    background-color: var(--color-background-button);
    font-family: var(--font-family-body);
    border-style: solid;
    border-radius: var(--border-radius-header);
    text-align: center;
    width: max-content;
    padding: 8px;
    margin: auto;
}
  `;
}

