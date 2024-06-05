// src/components/musical-header.ts
import { css, html } from "lit";
import {
  View,
  Auth,
  Events,
  Observer,
} from "@calpoly/mustang";
import { Model } from "../model";
import { Msg } from "../messages";
import { property, state } from "lit/decorators.js";
import { Profile } from "server/models";

export class MusicalHeaderElement extends View<Model, Msg> {
  
  @property()
  username = "anonymous";

  @state()
  get profile(): Profile | undefined {
    return this.model.profile;
  }
  

  constructor() {
    super("musical:model");
  }

  connectedCallback() {
    super.connectedCallback();
    this._authObserver.observe(({ user }) => {
      if (user && user.username !== this.username) {
        this.username = user.username;
        this.dispatchMessage([
          "profile/select",
          { userid: this.username }
        ]);
      }
    });
  }
  render() {
    const { userid } =
    this.profile || {};
    return html`
      <header> 
      <a class="main-header" href="/"> Seamus's Music Mixer</a>
      <a class="see-profile" href="/profile/${userid}">Profile</a>
      <a class="logout" href="#" @click=${signOutUser}>
        Sign out
      </a>
          <label class="party-mode" @change=${togglePartyMode}>
            <input type="checkbox" autocomplete="off" />
              Party mode
          </label>
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

.see-profile {
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
    padding-bottom: 4px;
    padding-top: 4px;
    margin: auto;
}

.logout {
  grid-row: 1 / 2;
  color: var(--color-text-body);
  justify-self: center;
  grid-column: 6 / 8;
  font-size: var(--font-size-small);
  color: var(--color-text-body);
  align-self: end;
  padding-bottom: 20px;
}

.party-mode {
    grid-row: 1;
    grid-column: 1 / 2;
    justify-self: end;
    align-self: center;
}
  `;

_authObserver = new Observer<Auth.Model>(
  this,
  "musical:auth"
);
}

type Checkbox = HTMLInputElement & { checked: boolean };

function togglePartyMode(ev: InputEvent) {
  const target = ev.target as Checkbox;
  const checked = target.checked;
 
  Events.relay(ev, "party-mode", { checked });
}

function signOutUser(ev: Event) {
  Events.relay(ev, "auth:message", ["auth/signout"]);
}

