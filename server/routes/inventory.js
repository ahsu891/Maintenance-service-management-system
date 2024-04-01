import express from "express";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import {
  addInventory,
  deleteInventorySingleRequest,
  deleteSingleInventory,
  getInvetory,
  getReq,
  getReqList,
  getReqListNotClosed,
  getsingleInventory,
  makeReq,
  makeUpdateRu,
  updateInventory,
  updatesingleImage,
} from "../controllers/inventory.js";
// const upload = multer({ dest: "image/" });
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "image/");
  },
  filename: function (req, file, cb) {
    // const ext = path.extname(file.originalname);
    const originalFileName = file.originalname;
    const fileExtension = originalFileName.split(".").pop();
    //   const newFileName = `${course_id}.${fileExtension}`;
    const photo_id = uuidv4();
    cb(null, `${photo_id}.${fileExtension}`);
  },
});
const upload = multer({ storage: storage });
const router = express.Router();

router.post("/upload", upload.single("image"), addInventory);
router.post("/getListReq", getReq);
router.get("/getReqList", getReqList);
router.get("/getReqListNotClosed", getReqListNotClosed);
router.post("/getSingleInventoryInfo", getsingleInventory);
router.post("/UpdateInventoryRequest", makeUpdateRu);
router.post("/makeReqMat", makeReq);
router.post("/deleteInventoryRequest", deleteInventorySingleRequest);
router.get("/getInventory", getInvetory);
router.delete("/deleteSingle/:id", deleteSingleInventory);
router.put("/update/:id", updateInventory);
router.put("/update-image/:id", upload.single("image"), updatesingleImage);

export default router;
