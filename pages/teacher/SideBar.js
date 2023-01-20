import React from "react";
import Link from "@/utils/ActiveLink";

export const SideBar = () => {
  return (
    <div className="td-sidebar">
      <ul>
        <li>
          <Link legacyBehavior href="/teacher/courses" activeClassName="active">
            <a>My Courses</a>
          </Link>
        </li>
        <li>
          <Link
            legacyBehavior
            href="/teacher/course/create"
            activeClassName="active"
          >
            <a>Create A Course</a>
          </Link>
        </li>
        <li>
          <Link
            legacyBehavior
            href="/teacher/courses/course-edit"
            activeClassName="active"
          >
            <a>Edit My Course</a>
          </Link>
        </li>
        <li>
          <Link
            legacyBehavior
            href="/teacher/course/add-quiz"
            activeClassName="active"
          >
            <a>Add Quiz</a>
          </Link>
        </li>
        <li>
          <Link
            legacyBehavior
            href="/teacher/course/add-section"
            activeClassName="active"
          >
            <a>Add Section</a>
          </Link>
        </li>
        <li>
          <Link
            legacyBehavior
            href="/teacher/course/upload-course-video"
            activeClassName="active"
          >
            <a>Upload Course Video</a>
          </Link>
        </li>
        <li>
          <Link
            legacyBehavior
            href="/teacher/course/create-excercise"
            activeClassName="active"
          >
            <a>Create Excercise</a>
          </Link>
        </li>
      </ul>
    </div>
  );
};
