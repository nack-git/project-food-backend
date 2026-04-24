const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// เก็บ order ชั่วคราว (ยังไม่ใช้ DB)
let orders = [];

// เพิ่ม order
app.post("/api/order", (req, res) => {
    orders.push(req.body);
    res.json({ msg: "สั่งอาหารสำเร็จ 🎉" });
});

// ดู order
app.get("/api/orders", (req, res) => {
    res.json(orders);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running"));