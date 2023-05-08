import React from 'react';
import PageBanner from '@/components/Common/PageBanner';

import { parseCookies } from 'nookies';

const SingleQuiz = ({ quiz, token }) => {
  if (typeof window !== 'undefined') {
    window.parent.postMessage({ message: 'quizData', value: quiz }, '*');
  }

  return (
    <React.Fragment>
      <PageBanner
        pageTitle={'Quiz'}
        homePageUrl=" /my-courses"
        homePageText="My Courses"
        activePageText={'Quiz'}
      />
      <iframe
        width="100%"
        height="700"
        src={`http://localhost:3001/quiz?quizId=${quiz}&token=${token}`}
      />
    </React.Fragment>
  );
};

SingleQuiz.getInitialProps = async (ctx) => {
  const { token } = parseCookies(ctx);

  const { id } = ctx.query;

  return { quiz: id, token: token };
};

export default SingleQuiz;
