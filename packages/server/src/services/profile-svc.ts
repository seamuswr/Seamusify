// src/services/profile-svc.ts
import { Schema, Model, Document, model } from "mongoose";
import { Profile } from "../models/profile";


const ProfileSchema = new Schema<Profile>(
    {
    id: {type: String, required: true, trim: true},
    name: {type: String, required: true, trim: true},
    spotifyUsername: {type: String, required: true, trim: true},
    color: String
    },
    {collection: "user_profiles"}
);

const ProfileModel = model<Profile>("Profile", ProfileSchema);

function index(): Promise<Profile[]> {
    return ProfileModel.find();
  }
  
  function get(userid: String): Promise<Profile> {
    return ProfileModel.find({ userid })
      .then((list) => list[0])
      .catch((err) => {
        throw `${userid} Not Found`;
      });
  }
  
  function create(profile: Profile): Promise<Profile> {
    const p = new ProfileModel(profile);
    return p.save();
  }
  
  export default { index, get, create };

// in-memory DB
let profiles: Array<Profile> = [
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

