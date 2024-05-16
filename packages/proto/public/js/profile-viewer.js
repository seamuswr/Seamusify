import { prepareTemplate } from "./template.js";
import { loadJSON } from "./json-loader.js";
import { Auth, Observer } from "@calpoly/mustang";
import "./restful-form.js";

export class ProfileViewElement extends HTMLElement {
    get src() {
        return this.getAttribute("src");
      }
  
    static styles = `
    * {
      margin: 0;
      box-sizing: border-box;
    }

    section {
        background-color: blue;
        justify-self: right;
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
  connectedCallback() {
    this._authObserver.observe(({ user }) => {
      console.log("Setting user as effect of change", user);
      this._user = user;
      if (this.src) {
        console.log("LOading JSON", this.authorization);
        loadJSON(
          this.src,
          this,
          renderSlots,
          this.authorization
        ).catch((error) => {
          const { status } = error;
          if (status === 401) {
            const message = new CustomEvent("auth:message", {
              bubbles: true,
              composed: true,
              detail: ["auth/redirect"]
            });
            console.log("Dispatching", message);
            this.dispatchEvent(message);
          } else {
            console.log("Error:", error);
          }
        });
      }
    });
  }

  _authObserver = new Observer(this, "blazing:auth");

  get authorization() {
    console.log("Authorization for user, ", this._user);
    return (
      this._user?.authenticated && {
        Authorization: `Bearer ${this._user.token}`
      }
    );
  }
}


customElements.define("profile-view", ProfileViewElement);

function renderSlots(json) {
    const entries = Object.entries(json);
    const slot = ([key, value]) => {
      // default case for now:
      return `<span slot="${key}">${value}</span>`;
    };
  
    return entries.map(slot).join("\n");
  }