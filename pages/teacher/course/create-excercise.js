import React from "react";
import { parseCookies } from "nookies";
import axios from "axios";
import { Alert } from "reactstrap";
import baseUrl from "@/utils/baseUrl";
import { Spinner } from "reactstrap";
import toast from "react-hot-toast";
import catchErrors from "@/utils/catchErrors";
import PageBanner from "@/components/Common/PageBanner";
import Link from "@/utils/ActiveLink";
import { SideBar } from "../SideBar";

const INITQUIZ = {
  order: 0,
  name: "",
  json: "",
  courseId: "",
  sectionId: "",
};

const addQuiz = ({ courses, sections }) => {
  const { token } = parseCookies();

  const [excercise, setQuiz] = React.useState(INITQUIZ);
  const [sectionOptions, setSectionOptions] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [disabled, setDisabled] = React.useState(true);

  React.useEffect(() => {
    const { order, name, json, sectionId } = excercise;
    const isQuiz = Object.values({
      name,
      order,
      json,
      sectionId,
    }).every((el) => Boolean(el));
    isQuiz ? setDisabled(false) : setDisabled(true);
  }, [excercise]);

  const handleChange = async (e) => {
    const { name, value } = e.target;
    if (name == "courseId") {
      if (!token) {
        return redirectUser(ctx, "/login");
      }

      const payload = {
        headers: { Authorization: token },
      };

      const url = `${baseUrl}/api/v1/courses/my-sections?courseid=${value}`;
      const response = await axios.get(url, payload);
      setSectionOptions(response.data.sections);
    }
    setQuiz((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const url = `${baseUrl}/api/v1/courses/course/new-excercise`;
      const { order, name, json, courseId, sectionId } = excercise;
      const payload = {
        order,
        name,
        json,
        courseId,
        sectionId,
      };

      const response = await axios.post(url, payload, {
        headers: { Authorization: token },
      });

      setLoading(false);
      toast.success(response.data);
      setQuiz(INITQUIZ);
    } catch (err) {
      catchErrors(err, setError);
      toast.error(err);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <React.Fragment>
      <PageBanner
        pageTitle="Create Course Excercise"
        homePageUrl="/"
        homePageText="Home"
        activePageText="Create Course Excercise"
      />

      <div className="ptb-100">
        <div className="container">
          {courses.length == 0 && (
            <Alert color="danger" className="text-center">
              You have to create course first here{" "}
              <Link legacyBehavior href="/teacher/course/create">
                <a>Create Course</a>
              </Link>
            </Alert>
          )}

          <div className="row">
            <div className="col-md-4 col-lg-4">
              <SideBar />
            </div>

            <div className="col-md-8 col-lg-8">
              <div className="border-box">
                <form onSubmit={handleSubmit}>
                  {loading && (
                    <h3 className="loading-spinner">
                      <div className="d-table">
                        <div className="d-table-cell">
                          <Spinner color="danger" /> Adding Course...
                        </div>
                      </div>
                    </h3>
                  )}

                  <div className="form-group">
                    <label>Select Course</label>
                    <select
                      onChange={handleChange}
                      name="courseId"
                      className="form-control"
                    >
                      <option>Select Course</option>
                      {courses.map((course) => (
                        <option value={course.id} key={course.id}>
                          {course.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Select Section</label>
                    <select
                      onChange={handleChange}
                      name="sectionId"
                      className="form-control"
                    >
                      <option>Select section</option>
                      {sectionOptions.map((section) => (
                        <option value={section.id} key={section.id}>
                          {section.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Excercise Order (1 or 2...)</label>
                    <input
                      type="number"
                      placeholder="Order Number"
                      className="form-control"
                      name="order"
                      value={excercise.order}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>Name</label>
                    <input
                      type="text"
                      placeholder="Enter problem description"
                      className="form-control"
                      name="name"
                      value={excercise.name}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>Problem Description</label>
                    <input
                      type="text"
                      placeholder="Enter problem description"
                      className="form-control"
                      name="problemDescription"
                      value={excercise.problemDescription}
                      onChange={handleChange}
                    />
                    <a href="https://dillinger.io/">Create Markdown Here</a>
                  </div>

                  <div className="form-group">
                    <label>Solution Description</label>
                    <input
                      type="text"
                      placeholder="Enter Solution description"
                      className="form-control"
                      name="solutionDescription"
                      value={excercise.solutionDescription}
                      onChange={handleChange}
                    />
                    <a href="https://dillinger.io/">Create Markdown Here</a>
                  </div>

                  <div className="form-group">
                    <label>Video Link</label>
                    <input
                      type="text"
                      placeholder="Enter Video Link"
                      className="form-control"
                      name="videoLink"
                      value={excercise.videoLink}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>Starting Code</label>
                    <input
                      type="text"
                      placeholder="Starting Code"
                      className="form-control"
                      name="startingCode"
                      value={excercise.startingCode}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>Test Cases</label>
                    <input
                      type="text"
                      placeholder="comma separated tests"
                      className="form-control"
                      name="tests"
                      value={excercise.tests}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>Test Case Results</label>
                    <input
                      type="text"
                      placeholder="comma separated expected results"
                      className="form-control"
                      name="tests"
                      value={excercise.tests}
                      onChange={handleChange}
                    />
                  </div>

                  <button
                    className="default-btn"
                    disabled={disabled || loading}
                  >
                    <i className="flaticon-right-chevron"></i>
                    Add
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

addQuiz.getInitialProps = async (ctx) => {
  const { token } = parseCookies(ctx);
  if (!token) {
    return { courses: [] };
  }

  const payload = {
    headers: { Authorization: token },
  };

  const url = `${baseUrl}/api/v1/courses/my-courses`;
  const response = await axios.get(url, payload);
  // console.log(response.data)
  return response.data;
};

export default addQuiz;
