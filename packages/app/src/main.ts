import { Auth, Store, define } from "@calpoly/mustang";
import { Msg } from "./messages";
import { Model, init } from "./model";
import update from "./update";
import { TourViewElement } from "./views/tour-view";
import { MusicalHeaderElement } from "./components/musical-header";

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
  "muscial-header": MusicalHeaderElement,
  "tour-view": TourViewElement
});