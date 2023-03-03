import express from "express";
import {
  getAllLandlords,
  getAllPropertiesByLandlordID,
} from "../models/landlords.js";

export const landlordsRouter = express.Router();

// Get all landlords
landlordsRouter.get("/", async (req, res) => {
  try {
    const allLandlords = await getAllLandlords();
    res.status(200);
    res.json({ success: true, payload: allLandlords });
  } catch (error) {
    res.status(404);
    res.json({ success: false, message: "There are no landlords!" });
  }
});

// Get all properties by landlord ID
landlordsRouter.get("/:id", async (req, res) => {
  const allPropertiesByLandlordID = await getAllPropertiesByLandlordID(
    req.params.id
  );
  if (allPropertiesByLandlordID.length === 0) {
    res.status(404);
    res.json({
      success: false,
      message: "No properties found for landlord ID",
    });
  } else {
    res.status(200);
    res.json({ success: true, payload: allPropertiesByLandlordID });
  }
});
