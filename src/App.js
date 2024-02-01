import { useState } from "react";
let initialSubjects = [];
export default function App() {
  const [subjects, setSubjects] = useState(initialSubjects);
  const [render, setRender] = useState(subjects.length);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="container">
      <Title />
      <AddSubject
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        subjects={subjects}
        setSubjects={setSubjects}
        render={render}
        setRender={setRender}
      />
      {isOpen && (
        <Display
          subjects={subjects}
          render={render}
          setSubjects={setSubjects}
        />
      )}
      {isOpen && (
        <Calculate
          subjects={subjects}
          setSubjects={setSubjects}
          setRender={setRender}
        />
      )}
    </div>
  );
}

function Title() {
  return <h1 className="title"> GPA calculator</h1>;
}

function AddSubject({
  subjects,
  render,
  setRender,
  setSubjects,
  isOpen,
  setIsOpen,
}) {
  const [subject, setSubject] = useState("");
  const [grade, setGrade] = useState(0.7);
  const [hours, setHours] = useState(1);
  const [index, setIndex] = useState(0);
  function handleClick(e) {
    e.preventDefault();
    const input = {
      id: index,
      name: subject,
      gpa: grade,
      hours: hours,
    };
    setIndex(index + 1);
    setSubjects([...subjects, input]);
    setSubject("");
    setGrade(0.7);
    setHours(1);
    setRender(render + 1);
  }
  function handleClose() {
    setIsOpen(!isOpen);
  }
  function handleAdd() {
    setIsOpen(!isOpen);
  }
  return isOpen ? (
    <div>
      <div className="end">
        <p className="close" onClick={handleClose}>
          ✖
        </p>
      </div>

      <form>
        <label className="subject">Subject</label>

        <input
          required
          type="text"
          placeholder="Math"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        ></input>
        <label className="grade">Grade</label>
        <select
          id="grade"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
        >
          <option value="0.7">0.7 (A+)</option>
          <option value="1.0">1.0 (A)</option>
          <option value="1.3">1.3 (A-)</option>
          <option value="1.7">1.7 (B+)</option>
          <option value="2.0">2.0 (B)</option>
          <option value="2.3">2.3 (B-)</option>
          <option value="2.7">2.7 (C+)</option>
          <option value="3.0">3.0 (C)</option>
          <option value="3.3">3.3 (C-)</option>
          <option value="3.7">3.7 (D+)</option>
          <option value="4.0">4.0 (D)</option>
          <option value="5.0">5.0 (F)</option>
        </select>
        <label className="hours">Hours</label>
        <select
          id="grade"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
        </select>
        <button onClick={handleClick} className="addSubject">
          Add
        </button>
      </form>
    </div>
  ) : (
    <button className="addButton" onClick={handleAdd}>
      Add Subjects
    </button>
  );
}

function Display({ subjects, render, setSubjects }) {
  function handleRemove(id) {
    setSubjects((subjects) => subjects.filter((subject) => subject.id !== id));
  }
  return (
    <div>
      <ul>
        {subjects.map((element) => (
          <li key={element.name}>
            <span> Subject: </span>
            {element.name} <span>Credit Hours: </span>
            {element.hours} <span>Grade: </span> {element.gpa}
            {console.log(element.id)}
            <button
              className="removeSubject"
              onClick={() => handleRemove(element.id)}
            >
              remove
            </button>
          </li>
        ))}
      </ul>
      {subjects.length > 0 && (
        <p className="numSubjects">
          Calculate <span>{subjects.length} </span>{" "}
          {render === 1 ? "Subject" : "Subjects"}
        </p>
      )}
    </div>
  );
}

function Calculate({ subjects, setSubjects, setRender }) {
  const [gpa, setGpa] = useState(0);
  function handleClick(e) {
    e.preventDefault();
    let totalCredits = 0;
    let factors = 0;
    for (let i = 0; i < subjects.length; i++) {
      factors += subjects[i].gpa * subjects[i].hours;
      totalCredits += parseInt(subjects[i].hours);
    }

    setGpa(factors / totalCredits);
  }

  function handleReset(e) {
    e.preventDefault();
    setSubjects([]);
    setRender(0);
    setGpa(0);
  }
  if (subjects.length === 0) return;
  return (
    <div>
      <button onClick={handleClick} className="calculate">
        Calculate GPA
      </button>
      <button onClick={handleReset} className="reset">
        Reset
      </button>
      <h3 className="result">GPA: {gpa}</h3>
      <p className="message">
        {gpa === 0
          ? ""
          : gpa < 1
          ? "Too geeky, over Qualified for jobs and probably won't get a job."
          : gpa < 1.31
          ? "Try enjoying life!"
          : gpa < 2
          ? "You have the perfect balance in life!"
          : gpa < 2.7
          ? "Do you know that it's ok to not even include your gpa in your CV?"
          : gpa < 3.5
          ? "You are enjoying life too much, maintain the balance."
          : "Bruh go study now!!!!"}
      </p>
    </div>
  );
}