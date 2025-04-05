import React from "react";
import Notes from "./Notes";

function Home(props) {
  const { showAlert } = props;

  return (
    <div className="container-fluid px-3 px-sm-4 my-3">
      <Notes showAlert={showAlert} />
    </div>
  );
}

export default Home;
