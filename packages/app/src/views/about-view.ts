import {  View } from "@calpoly/mustang";
import { css, html } from "lit";
import resetStyles from "../css/reset";
import { Msg } from "../messages";
import { Model } from "../model";

export class AboutViewElement extends View<Model, Msg> {

  constructor() {
    super("musical:model");
  }

  render() {
    return html`
        <p class="sub-header"> 
            Have you ever become frustrated by listening to the same music over and over again? Have you ever felt that Spotify
            is not playing the music you want? You have come to the right place. Here you can skip through songs of different genres
            until you find what you are looking for. Press play a song to get started. 
        </p>
    `;
  }

  static styles = [
    resetStyles,
    css`

    :host{
        display: contents;
    }

.sub-header {
    grid-row: line2;
    grid-column: 3 / 6;
    justify-self: center;
    align-self: center;
}

`]
}

