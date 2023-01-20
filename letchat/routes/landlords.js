import express from "express";
import { getAllLandlords } from "../models/landlords.js";

export const landlordsRouter = express.Router();

landlordsRouter.get("/", async (req, res) => {
  try {
    const allLandlords = await getAllLandlords();
    console.log(allLandlords);
    res.status(200);
    res.json({ success: true, payload: allLandlords });
  } catch (error) {
    console.log(error);
    res.status(500);
    res.json({ success: false, message: "Failed to get all landlords" });
  }
});
