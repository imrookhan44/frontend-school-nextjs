"use strict";
// main model file
const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};
import User from "./user";
import Course from "./course";
import Video from "./video";
import Section from "./section";
import Enroled_courses from "./enroled_courses";
import Quiz from "./quiz";
import Excercise from "./excercise";

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.users = User(sequelize, Sequelize);
db.quizzes = Quiz(sequelize, Sequelize);
db.excercises = Excercise(sequelize, Sequelize);
db.courses = Course(sequelize, Sequelize);
db.videos = Video(sequelize, Sequelize);
db.sections = Section(sequelize, Sequelize);
db.enroled_courses = Enroled_courses(sequelize, Sequelize);

// hasMany relationshipt with user and course
db.users.hasMany(db.courses, {
  as: "courses",
  foreignKey: "userId",
});
db.courses.belongsTo(db.users, {
  foreignKey: "userId",
  as: "user",
});

// hasMany relationshipt with course and videos
db.courses.hasMany(db.videos, {
  as: "videos",
  foreignKey: "courseId",
});
db.videos.belongsTo(db.courses, {
  foreignKey: "courseId",
  as: "course",
});

// hasMany relationshipt with course and section
db.courses.hasMany(db.sections, {
  as: "sections",
  foreignKey: "courseId",
});
db.sections.belongsTo(db.courses, {
  foreignKey: "courseId",
  as: "course",
});

// hasMany relationshipt with user and section
db.users.hasMany(db.sections, {
  as: "sections",
  foreignKey: "userId",
});
db.sections.belongsTo(db.courses, {
  foreignKey: "userId",
  as: "user",
});

// hasMany relationshipt with course and quiz
db.courses.hasMany(db.quizzes, {
  as: "quizzes",
  foreignKey: "courseId",
});
db.quizzes.belongsTo(db.courses, {
  foreignKey: "courseId",
  as: "course",
});

// hasMany relationshipt with section and quiz
db.sections.hasMany(db.quizzes, {
  as: "quizzes",
  foreignKey: "sectionId",
});
db.quizzes.belongsTo(db.sections, {
  foreignKey: "sectionId",
  as: "section",
});

// hasMany relationshipt with course and quiz
db.courses.hasMany(db.excercises, {
  as: "excercises",
  foreignKey: "courseId",
});
db.excercises.belongsTo(db.courses, {
  foreignKey: "courseId",
  as: "course",
});

// hasMany relationshipt with section and quiz
db.sections.hasMany(db.excercises, {
  as: "excercises",
  foreignKey: "sectionId",
});
db.excercises.belongsTo(db.sections, {
  foreignKey: "sectionId",
  as: "section",
});

// hasMany relationshipt with section and video
db.sections.hasMany(db.videos, {
  as: "videos",
  foreignKey: "sectionId",
});
db.videos.belongsTo(db.sections, {
  foreignKey: "sectionId",
  as: "section",
});

// hasMany relationshipt with user and quiz
db.users.hasMany(db.quizzes, {
  as: "quizzes",
  foreignKey: "userId",
});
db.quizzes.belongsTo(db.courses, {
  foreignKey: "userId",
  as: "user",
});

// hasMany relationshipt with user and videos
db.users.hasMany(db.videos, {
  as: "videos",
  foreignKey: "userId",
});
db.videos.belongsTo(db.courses, {
  foreignKey: "userId",
  as: "user",
});

// hasMany relationshipt with course and enroled
db.courses.hasMany(db.enroled_courses, {
  as: "enroled_courses",
  foreignKey: "courseId",
});
db.enroled_courses.belongsTo(db.courses, {
  foreignKey: "courseId",
  as: "course",
});

// hasMany relationshipt with user and enroled
db.users.hasMany(db.enroled_courses, {
  as: "enroled_courses",
  foreignKey: "userId",
});
db.enroled_courses.belongsTo(db.users, {
  foreignKey: "userId",
  as: "user",
});

// console.log('######', db)

module.exports = db;
