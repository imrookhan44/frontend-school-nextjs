import Cors from 'cors';
import initMiddleware from '@/lib/init-middleware';
import jwt from 'jsonwebtoken';
import { quizzes as Quiz } from '@/models/index';

// Initialize the cors middleware
const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    // Only allow requests with GET, POST and OPTIONS
    methods: ['GET', 'POST', 'OPTIONS', 'DELETE', 'PUT']
  })
);

export default async (req, res) => {
  await cors(req, res);
  if (!('authorization' in req.headers)) {
    return res.status(401).json({ message: 'No autorization token' });
  }

  const { order, name, json, courseId, sectionId } = req.body;

  try {
    const { userId } = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
    await Quiz.create({
      order,
      name,
      json,
      courseId,
      sectionId,
      userId
    });

    res.send('Congratulations! Successfully Added Quiz to course.');
  } catch (error) {
    console.log(error);
  }
};
