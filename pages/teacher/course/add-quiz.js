import React from 'react';
import { parseCookies } from 'nookies';
import axios from 'axios';
import { Alert } from 'reactstrap';
import baseUrl from '@/utils/baseUrl';
import { Spinner } from 'reactstrap';
import toast from 'react-hot-toast';
import catchErrors from '@/utils/catchErrors';
import PageBanner from '@/components/Common/PageBanner';
import Link from '@/utils/ActiveLink';
import SideBar from '../SideBar';

const INITQUIZ = {
  order: 0,
  name: '',
  json: '',
  courseId: '',
  sectionId: ''
};

const addQuiz = ({ courses, sections }) => {
  const { token } = parseCookies();

  const [quiz, setQuiz] = React.useState(INITQUIZ);
  const [sectionOptions, setSectionOptions] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [disabled, setDisabled] = React.useState(true);

  React.useEffect(() => {
    const { order, name, json, sectionId } = quiz;
    const isQuiz = Object.values({
      name,
      order,
      json,
      sectionId
    }).every((el) => Boolean(el));
    isQuiz ? setDisabled(false) : setDisabled(true);
  }, [quiz]);

  const handleChange = async (e) => {
    const { name, value } = e.target;
    if (name == 'courseId') {
      if (!token) {
        return redirectUser(ctx, '/login');
      }

      const payload = {
        headers: { Authorization: token }
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
      const url = `${baseUrl}/api/v1/courses/course/new-quiz`;
      const { order, name, json, courseId, sectionId } = quiz;
      const payload = {
        order,
        name,
        json,
        courseId,
        sectionId
      };

      const response = await axios.post(url, payload, {
        headers: { Authorization: token }
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
        pageTitle="Add Course Quiz"
        homePageUrl="/"
        homePageText="Home"
        activePageText="Add Course Quiz"
      />

      <div className="ptb-100">
        <div className="container">
          {courses.length == 0 && (
            <Alert color="danger" className="text-center">
              You have to create course first here{' '}
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
                          <Spinner color="danger" /> Adding Quiz...
                        </div>
                      </div>
                    </h3>
                  )}

                  <div className="form-group">
                    <label>Select Course</label>
                    <select onChange={handleChange} name="courseId" className="form-control">
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
                    <select onChange={handleChange} name="sectionId" className="form-control">
                      <option>Select section</option>
                      {sectionOptions.map((section) => (
                        <option value={section.id} key={section.id}>
                          {section.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Quiz Order (1 or 2...)</label>
                    <input
                      type="number"
                      placeholder="Order Number"
                      className="form-control"
                      name="order"
                      value={quiz.order}
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
                      value={quiz.name}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>Json Config</label>
                    <input
                      type="text"
                      placeholder="Enter course title"
                      className="form-control"
                      name="json"
                      value={quiz.json}
                      onChange={handleChange}
                    />
                    <a href="https://wingkwong.github.io/react-quiz-form/">
                      Generate the json here
                    </a>
                  </div>

                  <button className="default-btn" disabled={disabled || loading}>
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
    headers: { Authorization: token }
  };

  const url = `${baseUrl}/api/v1/courses/my-courses`;
  const response = await axios.get(url, payload);
  // console.log(response.data)
  return response.data;
};

export default addQuiz;
