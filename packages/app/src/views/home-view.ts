import { Dropdown, define, View } from "@calpoly/mustang";
import { css, html } from "lit";
import resetStyles from "../css/reset";
import { Msg } from "../messages";
import { Model } from "../model";

export class HomeViewElement extends View<Model, Msg> {
    static uses = define({
        "drop-down": Dropdown.Element
      });

  constructor() {
    super("musical:model");
  }

  render() {
    return html`
 <a class="play_song" href="https://open.spotify.com/">
        Play a song
    </a>

    <ul class="favorites">
        <h3 class="checkout"> 
            Check out your top:
        </h3>

        <a class="songs" href="app/songs"
            >
            Songs
        </a>

        <a class="artists" href="app/artists">
            Artists
        </a>
        <a class="genres" href="app/genres">
            Genres
        </a>
    </ul>

    <a class="about" href="app/about">
        About
    </a>
    `;
  }

  static styles = [
    resetStyles,
    css`

    :host {
        display: contents;
    }

.play_song {
    color: var(--color-text-body);
    grid-row: line2;
    grid-column: 4 / 5;
    font-size: var(--font-size-medium);
    background-color: var(--color-background-button);
    border-style: solid;
    border-radius: var(--border-radius-header);
    text-align: center;
    width: max-content;
    padding: 8px;
    margin: auto;
}

.favorites {
    display: contents;
}

.checkout {
    grid-row: line3;
    grid-column: 3 / 6;
    justify-self: center;
    align-self: center;
}

.songs {
    color: var(--color-text-body);
    grid-row: line4;
    grid-column: 3;
    justify-self: right;
    text-decoration: underline;
}

.artists {
    color: var(--color-text-body);
    grid-row: line4;
    grid-column: 4;
    justify-self: center;
    text-decoration: underline;
}

.genres {
    color: var(--color-text-body);
    grid-row: line4;
    grid-column: 5;
    justify-self: left;
    text-decoration: underline;
}

.about {
    color: var(--color-text-body);
    grid-row: 6;
    grid-column: 4 / 5;
    justify-self: center;
    text-decoration: underline;
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

