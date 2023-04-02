import mongoose from "mongoose";

const tagSchema = mongoose.Schema({                  // SCHEMA, minka mukaan tallennetaan tieto MongoDB tietokantaan.
    name: {
      type: String,
      required: true,
    },

    sportTime: {
      type: Number,
      required: true,
    },

    sportDistance: {
      type: Number,
      required: true,
    },

    description: {
      type: String,
      required: false,                              // tama on false,  eli ei ole pakko täyttää kenttää, välttämättä.
    },

    userOwner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

  });
  
  export const tagsModel = mongoose.model("tags", tagSchema);


