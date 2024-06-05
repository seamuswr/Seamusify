import { Auth, History, Switch, Store, define } from "@calpoly/mustang";
import { Msg } from "./messages";
import { Model, init } from "./model";
import { html } from "lit";
import update from "./update";
import { ProfileViewElement } from "./views/profile-view";
import { HomeViewElement } from "./views/home-view";
import { MusicalHeaderElement } from "./components/musical-header";
import { AboutViewElement } from "./views/about-view";
import { ArtistsViewElement } from "./views/artists-view";
import { SongsViewElement } from "./views/songs-view";
import { GenresViewElement } from "./views/genres-view";

const routes = [
  {
    path: "/app/profile/:id",
    view: (params: Switch.Params) => html`
      <profile-view user-id=${params.id}></profile-view>
    `},

  {
    path: "/app/about",
    view: () => html`
      <about-view></about-view>
    ` },
  {
    path: "/app/artists",
    view: () => html`
      <artists-view></artists-view>
    ` },

{
  path: "/app/songs",
  view: () => html`
    <songs-view></songs-view>
  ` },

{
  path: "/app/genres",
  view: () => html`
    <genres-view></genres-view>
  ` },

  {
    path: "/app",
    view: () => html`
      <home-view></home-view>
    `},
  {
    path: "/",
    redirect: "/app"
  }
];

define({
  "mu-auth": Auth.Provider,
  "mu-store": class AppStore extends Store.Provider<
    Model,
    Msg
  > {
    constructor() {
      super(update, init, "musical:auth");
    }
  },
  "mu-history": History.Provider,
  "mu-switch": class AppSwitch extends Switch.Element {
    constructor() {
      super(routes, "musical:history", "musical:Auth");
    }
  },
  "musical-header": MusicalHeaderElement,
  "profile-view": ProfileViewElement,
  "home-view": HomeViewElement,
  "about-view": AboutViewElement,
  "songs-view": SongsViewElement,
  "genres-view": GenresViewElement,
  "artists-view": ArtistsViewElement
});