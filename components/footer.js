import React from 'react';
import styles from './footer.module.scss';
import { Container, Navbar, Nav } from 'react-bootstrap';

const Footer = (props) => (
  // <div className={styles['footer']}>
  //   <p>This is some content in sticky footer</p>
  // </div>
  <div className={styles['footer']}>
    <Navbar as={Container}>
      <Nav className="mr-auto">
        <a
          className="custom-btn"
          href={`/course/${props.courseid}/question`}
        >
          New Question
        </a>
      </Nav>
    </Navbar>
  </div>
);

export default Footer;
