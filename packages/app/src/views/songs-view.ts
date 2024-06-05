import {  View } from "@calpoly/mustang";
import { css, html } from "lit";
import resetStyles from "../css/reset";
import { Msg } from "../messages";
import { Model } from "../model";

export class SongsViewElement extends View<Model, Msg> {

  constructor() {
    super("musical:model");
  }

  render() {
    return html`
    <ol>
        <li>Redlight</li>
        <li>LUNCH</li>
        <li>Haircut</li>
        <li>Paul</li>
    </ol>
    `;
  }

  static styles = [
    resetStyles,
    css`

    :host{
        display: contents;
    }

ol {
    grid-row: line2;
    grid-column: 3 / 6;
    justify-self: center;
    align-self: center;
}

`]
}

