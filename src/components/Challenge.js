import React, { useState, useRef, useEffect } from 'react';

function testRegex(regex, text) {
  if (regex === text || regex === '.*') {
    return false;
  }
  try {
    let pattern = RegExp(regex);
    if (pattern.exec(text)[0] === text) {
      return true;
    }
  } catch (e) {}
  return false;
}

const charSet = [
  '0123456789',
  'abcdefghijklmnopqrstuvwxyz',
  'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  '!"#$%&\'()*+,-./',
  ':;<=>?@[\\]^_`{|}~',
];

function Challenge() {
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [value, setValue] = useState('');
  const [question, setQuestion] = useState("type 'start' to play");
  const [start, setStart] = useState(false);
  const ref = useRef();

  useEffect(() => {
    ref.current.focus();
  });

  useEffect(() => {
    if (start) {
      let pass = testRegex(value, question);

      if (pass) {
        setScore(score + 1);
        generateRandomText();
      }
    } else {
      if (value === 'start') {
        setStart(true);
        generateRandomText();
      }
    }
  }, [value]);

  useEffect(() => {
    setStart(false);
    setValue('');
    setScore(0);
  }, [level]);

  const handleInputChange = (event) => {
    setValue(event.target.value);
  };

  const generateRandomText = () => {
    let chars = charSet.slice(0, 2 + level).join('');

    let text = '';

    for (let i = 0; i < 10; i++) {
      text += chars[Math.floor(Math.random() * chars.length)];
    }

    setValue('');
    setQuestion(text);
  };

  return (
    <>
      <div>{start ? question : "type 'start' to play"}</div>
      <div>score : {score}</div>
      <div>
        level:
        <button
          disabled={level === 1 || start ? true : false}
          onClick={() => setLevel(level - 1)}
        >
          -
        </button>
        {level}
        <button
          disabled={level === 3 || start ? true : false}
          onClick={() => setLevel(level + 1)}
        >
          +
        </button>
      </div>
      <input type="text" ref={ref} onChange={handleInputChange} value={value} />
      <button disabled={start ? false : true} onClick={generateRandomText}>
        Generate
      </button>
      <button
        disabled={start ? false : true}
        onClick={() => {
          setStart(false);
          setValue('');
        }}
      >
        Stop
      </button>
    </>
  );
}

export default Challenge;
