import React, { useState, useEffect } from 'react';
import Link from '@/utils/ActiveLink';
import { handleLogout } from '@/utils/auth';

const Navbar = ({ user }) => {
  const [menu, setMenu] = useState(true);

  const toggleNavbar = () => {
    setMenu(!menu);
  };

  useEffect(() => {
    let elementId = document.getElementById('navbar');
    document.addEventListener('scroll', () => {
      if (window.scrollY > 170) {
        elementId.classList.add('is-sticky');
      } else {
        elementId.classList.remove('is-sticky');
      }
    });
  });

  const isAdmin = user && user.role === 'admin';
  const isTeacher = user && user.role === 'teacher';

  const classOne = menu ? 'collapse navbar-collapse' : 'collapse navbar-collapse show';
  const classTwo = menu
    ? 'navbar-toggler navbar-toggler-right collapsed'
    : 'navbar-toggler navbar-toggler-right';

  return (
    <>
      <div id="navbar" className="navbar-area">
        <div className="edemy-nav">
          <div className="container-fluid">
            <div className="navbar navbar-expand-lg navbar-light">
              <Link legacyBehavior href="/">
                <a onClick={toggleNavbar} className="navbar-brand">
                  <img src="/images/logo.png" alt="logo" />
                </a>
              </Link>

              <button
                onClick={toggleNavbar}
                className={classTwo}
                type="button"
                data-toggle="collapse"
                aria-expanded="false"
                aria-label="Toggle navigation">
                <span className="icon-bar top-bar"></span>
                <span className="icon-bar middle-bar"></span>
                <span className="icon-bar bottom-bar"></span>
              </button>

              <div className={classOne} id="navbarSupportedContent">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link legacyBehavior href="/" activeClassName="active">
                      <a onClick={toggleNavbar} className="nav-link">
                        Home
                      </a>
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link legacyBehavior href="/courses" activeClassName="active">
                      <a onClick={toggleNavbar} className="nav-link">
                        Courses
                      </a>
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link legacyBehavior href="/blog" activeClassName="active">
                      <a onClick={toggleNavbar} className="nav-link">
                        Blog
                      </a>
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link legacyBehavior href="/about" activeClassName="active">
                      <a onClick={toggleNavbar} className="nav-link">
                        About us
                      </a>
                    </Link>
                  </li>

                  {((user && isTeacher) || (user && isAdmin)) && (
                    <li className="nav-item">
                      <Link legacyBehavior href="/teacher/dashboard">
                        <a className="nav-link">Teacher Dashboard</a>
                      </Link>
                    </li>
                  )}
                  {user && isAdmin && (
                    <li className="nav-item">
                      <Link legacyBehavior href="/admin/dashboard">
                        <a className="nav-link">Dashboard</a>
                      </Link>
                    </li>
                  )}
                </ul>

                <div className="others-option d-flex align-items-center">
                  <div className="option-item">
                    {user ? (
                      <div className="user-dropdown">
                        <Link legacyBehavior href="/">
                          <a onClick={(e) => e.preventDefault()} className="default-btn">
                            <i className="flaticon-user"></i> {user.name} <span></span>
                          </a>
                        </Link>

                        <ul className="dropdown-menu">
                          <li className="nav-item">
                            <Link legacyBehavior href="/my-courses" activeClassName="active">
                              <a onClick={toggleNavbar} className="nav-link">
                                My Courses
                              </a>
                            </Link>
                          </li>

                          <li className="nav-item">
                            <Link legacyBehavior href="/user/my-profile" activeClassName="active">
                              <a onClick={toggleNavbar} className="nav-link">
                                My Profile
                              </a>
                            </Link>
                          </li>

                          <li className="nav-item">
                            <Link legacyBehavior href="/user/edit-profile" activeClassName="active">
                              <a onClick={toggleNavbar} className="nav-link">
                                Edit Profile
                              </a>
                            </Link>
                          </li>

                          <li className="nav-item">
                            <Link
                              legacyBehavior
                              href="/user/edit-password"
                              activeClassName="active">
                              <a onClick={toggleNavbar} className="nav-link">
                                Edit Password
                              </a>
                            </Link>
                          </li>

                          <li className="nav-item">
                            <Link legacyBehavior href="/">
                              <a
                                className="nav-link"
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleLogout();
                                }}>
                                Logout
                              </a>
                            </Link>
                          </li>
                        </ul>
                      </div>
                    ) : (
                      <Link legacyBehavior href="/authentication">
                        <a className="default-btn">
                          <i className="flaticon-user"></i> Login/Register <span></span>
                        </a>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
