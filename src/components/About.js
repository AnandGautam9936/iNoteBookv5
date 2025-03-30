import React from "react";

const About = () => {
  return (
    <div className="container my-5">
      <h1 className="text-center mb-4 fw-bold">📖 About iNoteBook</h1>
      <p className="text-center text-muted">
        A powerful and secure note-taking app designed to enhance productivity.
      </p>

      <div className="row mt-5">
        <div className="col-md-6 d-flex flex-column justify-content-center">
          <h3 className="fw-bold">🚀 What is iNoteBook?</h3>
          <p>
            iNoteBook is a simple and efficient note-taking application designed
            to help users organize their thoughts, ideas, and tasks in one
            place. Whether you need to store personal notes, to-do lists, or
            project details, iNoteBook makes it easy and secure.
          </p>
        </div>
        <div className="col-md-6">
          <h3 className="fw-bold">⭐ Key Features</h3>
          <ul className="list-unstyled">
            <li>✅ <strong>Effortless Note Management:</strong> Create, edit, and delete notes easily.</li>
            <li>🔒 <strong>Secure Authentication:</strong> Keep your notes private with authentication.</li>
            <li>☁️ <strong>Cloud Access:</strong> Access your notes from anywhere.</li>
            <li>🎨 <strong>User-Friendly Interface:</strong> Enjoy a clean and modern UI.</li>
          </ul>
        </div>
      </div>
      <div className="text-center mt-5">
        <h3 className="fw-bold">📞 Contact Me</h3>
        <p>Feel free to reach out for collaborations or queries!</p>
        <ul className="list-unstyled">
          <li>📧 <strong>Email:</strong> <a href="mailto:thecoolanand1@gmail.com?subject=Hello Anand!&body=I wanted to reach out about..."
          target="_blank" rel="noopener noreferrer">
            thecoolanand1@gmail.com
          </a></li>
          <li>💼 <strong>LinkedIn:</strong> <a href="https://linkedin.com/in/anand-gautam" target="_blank" rel="noopener noreferrer">linkedin.com/in/anand-gautam</a></li>
          <li>🐙 <strong>GitHub:</strong> <a href="https://github.com/AnandGautam9936" target="_blank" rel="noopener noreferrer">github.com/AnandGautam9936</a></li>
        </ul>
      </div>
      <div className="text-center mt-5">
        <h3>Made with ❤️ by Anand Gautam</h3>
      </div>
    </div>
  );
};

export default About;
