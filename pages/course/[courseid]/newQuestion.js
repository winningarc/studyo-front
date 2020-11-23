import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Header from '../../../components/header';
import CourseHeader from '../../../components/courseHeader';
import * as courseAPI from 'api/course';
import * as questionAPI from 'api/question';

const Course = () => {
  const router = useRouter();
  const { courseid } = router.query;

  const [newTitle, setNewTitle] = useState();
  const onInputTitle = ({ target: { value } }) => setNewTitle(value);
  const [newContent, setNewContent] = useState();
  const onInputContent = ({ target: { value } }) => setNewContent(value);
  const [newLecture, setNewLecture] = useState();
  const onInputLecture = ({ target: { value } }) => setNewLecture(value);
  
  const [lectures, setLectures] = useState([]);
  useEffect(() => {
    if (courseid) {
      courseAPI.courseLectures(courseid).then((res) => {
        setLectures(res.data);
        console.log(res.data);
      });
    }
  }, [courseid]);

  const addQuestion = () => {
    if (newKeyword && !/^\s+$/.test(newKeyword)) //?
      questionAPI
        .post({
          lectureId: newLecture.lectureId,
          title: newTitle,
          content: newContent
        })
        .then((res) => router.reload());//Todo: change to next
  };

  const lectureOptions = lectures.map((lecture) => (
    <>
      <option>{lecture.number}</option>
    </>
  ));

  return (
    <>
      <Header />
      <CourseHeader courseid={courseid} />
      <div className="container">
        <div className="title-text mt-5 mb-3" style={{ color: '#234382' }}>
          New Questions
        </div>
        <form>
          <div class="form-group">
            <label class="subtitle-text" for="exampleInputEmail1">
              Title
            </label>
            <input
              type="text"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Title"
              onChange={onInputTitle}
            />
            <label class="subtitle-text mt-2" for="exampleInputEmail1">
              Content
            </label>
            <textarea
              type="text"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Write your question here!"
              onChange={onInputContent}
            />
            <label class="subtitle-text mt-2" for="exampleInputEmail1">
              Lecture
            </label>
            <select class="form-control"
            onChange={onInputLecture}
            >{lectureOptions}</select>
            <small id="emailHelp" class="form-text text-muted">
              Your question will be shared to your classmates in the review
              quiz.
            </small>
          </div>
        </form>
        <hr />
        <button
          href={`/course/${courseid}/questionlist`}
          type="button"
          className="mt-4 ml-3 custom-btn float-right"
          onClick={() => addQuestion()}
        >
          Submit
        </button>
        <button
          href={`/course/${courseid}/questionlist`}
          type="button"
          className="mt-4 custom-btn-secondary float-right"
        >
          Cancel
        </button>
      </div>
    </>
  );
};

export default Course;
