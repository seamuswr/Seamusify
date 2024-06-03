import {  View } from "@calpoly/mustang";
import { css, html } from "lit";
import { property } from "lit/decorators.js";
// @ts-ignore
import { Profile } from "server/models";
import resetStyles from "../css/reset";
import { Msg } from "../messages";
import { Model } from "../model";

export class ProfileViewElement extends View<Model, Msg> {
  @property({ attribute: "profile-id", reflect: true })
  profileid = "";

  @property()
  get profile(): Profile | undefined {
    return this.model.profile;
  }

  constructor() {
    super("musical:model");
  }

  render() {
    return html`
      <section>
        <h1><slot name="name"></slot></h1>
        <dl>
          <dt>Username</dt>
          <dd><slot name="id"></slot></dd>
          <dt>Spotify</dt>
          <dd><slot name="spotifyUsername"></slot></dd>
        </dl>
      </section>
    `;
  }

  static styles = [
    resetStyles,
    css`
    * {
      margin: 0;
      box-sizing: border-box;
    }

    section {
        background-color: blue;
        justify-self: right;
    }
        `
  ]


  attributeChangedCallback(
    name: string,
    oldValue: string,
    newValue: string
  ) {
    super.attributeChangedCallback(name, oldValue, newValue);
    if (
      name === "user-id" &&
      oldValue !== newValue &&
      newValue
    ) {
      console.log("Profiler Page:", newValue);
      this.dispatchMessage([
        "profile/select",
        { userid: newValue }
      ]);
    }
  }
}

