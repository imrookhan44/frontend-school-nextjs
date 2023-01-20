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

const INITSECTION = {
  order: 0,
  name: "",
  description: "",
  courseId: "",
};

const addSection = ({ courses }) => {
  // console.log(courses)
  const { token } = parseCookies();

  const [section, setSection] = React.useState(INITSECTION);
  const [loading, setLoading] = React.useState(false);
  const [disabled, setDisabled] = React.useState(true);

  React.useEffect(() => {
    const { order, name, description } = section;
    const isSection = Object.values({
      name,
      order,
      description,
    }).every((el) => Boolean(el));
    isSection ? setDisabled(false) : setDisabled(true);
  }, [section]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSection((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const url = `${baseUrl}/api/v1/courses/course/new-section`;
      const { order, name, description, courseId } = section;
      const payload = {
        order,
        name,
        description,
        courseId,
      };

      const response = await axios.post(url, payload, {
        headers: { Authorization: token },
      });

      console.log(response.data);

      setLoading(false);
      toast.success(response.data);
      setSection(INITSECTION);
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
        pageTitle="Add Course Section"
        homePageUrl="/"
        homePageText="Home"
        activePageText="Add Course Section"
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
                          <Spinner color="danger" /> Adding Section...
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
                    <label>Section Order (1 or 2...)</label>
                    <input
                      type="number"
                      placeholder="Order Number"
                      className="form-control"
                      name="order"
                      value={section.order}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>Name</label>
                    <input
                      type="text"
                      placeholder="Enter course title"
                      className="form-control"
                      name="name"
                      value={section.name}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>Deescription</label>
                    <input
                      type="text"
                      placeholder="Enter course title"
                      className="form-control"
                      name="description"
                      value={section.description}
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

addSection.getInitialProps = async (ctx) => {
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

export default addSection;
