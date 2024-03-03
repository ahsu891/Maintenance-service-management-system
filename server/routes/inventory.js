import express from "express";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import { addInventory, getInvetory } from "../controllers/inventory.js";
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
router.get("/getInventory", getInvetory);
export default router;
