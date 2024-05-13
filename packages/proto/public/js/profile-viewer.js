import { prepareTemplate } from "./template.js";

export class ProfileViewElement extends HTMLElement {
  static styles = `
    * {
      margin: 0;
      box-sizing: border-box;
    }

    section {
        background-color: blue;
    }

  `;

  static template = prepareTemplate(`
    <template>
      <section>
        <h1><slot name="name"></slot></h1>
        <dl>
          <dt>Username</dt>
          <dd><slot name="id"></slot></dd>
          <dt>Spotify</dt>
          <dd><slot name="spotifyUsername"></slot></dd>
        </dl>
      </section>
      <style>${ProfileViewElement.styles}</style>
    </template>
  `);

  constructor() {
    super();

    this.attachShadow({ mode: "open" }).appendChild(
      ProfileViewElement.template.cloneNode(true)
    );
  }
}

customElements.define("profile-view", ProfileViewElement);