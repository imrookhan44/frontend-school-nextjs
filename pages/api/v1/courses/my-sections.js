import Cors from "cors";
import initMiddleware from "@/lib/init-middleware";
import jwt from "jsonwebtoken";
import { sections as Section } from "@/models/index";

// Initialize the cors middleware
const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    // Only allow requests with GET, POST and OPTIONS
    methods: ["GET", "POST", "OPTIONS", "DELETE", "PUT"],
  })
);

export default async (req, res) => {
  await cors(req, res);
  if (!("authorization" in req.headers)) {
    return res.status(401).json({ message: "No autorization token" });
  }

  try {
    // console.log(req.query.courseid);
    const sections = await Section.findAll({
      order: [["order", "DESC"]],
      where: {
        courseId: req.query.courseid,
      },
    });

    res.send({ sections });
  } catch (error) {
    console.log(error);
  }
};
