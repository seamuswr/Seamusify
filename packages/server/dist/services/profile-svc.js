"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var profile_svc_exports = {};
__export(profile_svc_exports, {
  default: () => profile_svc_default
});
module.exports = __toCommonJS(profile_svc_exports);
var import_mongoose = require("mongoose");
const ProfileSchema = new import_mongoose.Schema(
  {
    id: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    spotifyUsername: { type: String, required: true, trim: true },
    color: String
  },
  { collection: "user_profiles" }
);
const ProfileModel = (0, import_mongoose.model)("Profile", ProfileSchema);
function index() {
  return ProfileModel.find();
}
function get(userid) {
  return ProfileModel.find({ userid }).then((list) => list[0]).catch((err) => {
    throw `${userid} Not Found`;
  });
}
function create(profile) {
  const p = new ProfileModel(profile);
  return p.save();
}
function update(userid, profile) {
  return ProfileModel.findOne({ userid }).then((found) => {
    if (!found)
      throw `${userid} Not Found`;
    else
      return ProfileModel.findByIdAndUpdate(
        found._id,
        profile,
        {
          new: true
        }
      );
  }).then((updated) => {
    if (!updated)
      throw `${userid} not updated`;
    else
      return updated;
  });
}
var profile_svc_default = { index, get, create, update };
let profiles = [
  {
    id: "JBills",
    name: "Johnny Bills",
    spotifyUsername: "JohnnyBills",
    color: "#8A81BE"
  },
  {
    id: "JSmalls",
    name: "Jimmy Smalls",
    spotifyUsername: "Terminator",
    color: "#800000"
  },
  {
    id: "KPlows",
    name: "Kenny Plows",
    spotifyUsername: "SnowPiercer",
    color: "#500000"
  }
  // add a few more profile objects here
];
