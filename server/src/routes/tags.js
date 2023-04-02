import express from "express";
import mongoose from "mongoose";
import { tagsModel } from "../models/tags.js";
import { UserModel } from "../models/Users.js";
import { verifyToken } from "./user.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await tagsModel.find({});
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a new tag
router.post("/", verifyToken, async (req, res) => {
  const tag = new tagsModel({
    _id: new mongoose.Types.ObjectId(),                       //  id suoritukselle,  kun se tallentuu tietokantaan.  MongoDB tekee taman automaattisesti.
    name: req.body.name,                                      //  suorituksen nimi
    sportTime: req.body.sportTime,                            //  suorituksen aika  minutteja
    sportDistance: req.body.sportDistance,                    //  suorituksen mitta  kilometreja    
    description: req.body.description,                        //  suorituksen kuvaus, tekstikommenttia..
    userOwner: req.body.userOwner,                            //  kuka käyttäjä, on luonut suoritus tagin tietokantaan.. 
  });
  console.log(tag);

  try {
    const result = await tag.save();
    res.status(201).json({
      createdtag: {
        name: result.name,
        _id: result._id,
      },
    });
  } catch (err) {
    // console.log(err);
    res.status(500).json(err);
  }
});

// Get a tag by ID
router.get("/:tagId", async (req, res) => {
  try {
    const result = await tagsModel.findById(req.params.tagId);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

export { router as tagsRouter };
