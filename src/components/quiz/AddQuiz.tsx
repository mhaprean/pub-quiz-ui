import { Alert, AlertTitle, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { IQuizQuestion, useCreateQuizMutation } from '../../redux/apiSlice';

interface IValidQuiz {
  questions: {
    question: string;
    incorrect_answers: string[];
    correct_answer: string;
    image: string;
    song: string;
  }[];
}

function validateQuiz(quiz: IValidQuiz): string {
  if (!Array.isArray(quiz.questions)) {
    return "The 'questions' property is not an array.";
  }

  for (const question of quiz.questions) {
    if (!question.question || typeof question.question !== 'string') {
      return "The 'question' property of a question is missing or not a string.";
    }

    if (!Array.isArray(question.incorrect_answers)) {
      return "The 'incorrect_answers' property of a question is not an array.";
    }

    for (const answer of question.incorrect_answers) {
      if (!answer || typeof answer !== 'string') {
        return 'An incorrect answer is missing or not a string.';
      }
    }

    if (!question.correct_answer || typeof question.correct_answer !== 'string') {
      return "The 'correct_answer' property of a question is missing or not a string.";
    }
  }

  return '';
}

const initialValue = `
{
  "questions": [
    {
      "category": "Politics",
      "type": "boolean",
      "difficulty": "easy",
      "question": "Denmark has a monarch.",
      "correct_answer": "True",
      "incorrect_answers": [
        "False"
      ]
    },
    {
      "category": "Politics",
      "type": "boolean",
      "difficulty": "easy",
      "question": "The 2016 United States Presidential Election is the first time Hillary Clinton has run for President.",
      "correct_answer": "False",
      "incorrect_answers": [
        "True"
      ]
    }
  ]
}
`;

const StyledAddQuiz = styled('div')`
  padding-bottom: 100px;
  .textarea {
    width: 100%;
    min-height: 500px;
    max-width: 100%;
    min-width: 100%;
    margin-top: 30px;
  }

  .MuiFormControl-root {
    margin-top: 30px;
    width: 100%;
  }

  .MuiButtonBase-root {
    margin-top: 30px;
    height: 50px;
  }
`;

const AddQuiz = () => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState('');

  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [difficulty, setDifficulty] = useState('easy');

  const [createQuiz, { isError, isSuccess, isLoading }] = useCreateQuizMutation();

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
  };

  const getId = () => (Math.random() + 1).toString(36).substring(10);

  const transformQuestions = (jsonString: string): IQuizQuestion[] => {
    try {
      const json = JSON.parse(jsonString);

      const res: IQuizQuestion[] = json.questions.map(
        (q: { question: string; correct_answer: string; incorrect_answers: string[]; id: string; song: string; image: string }) => {
          let answers = [q.correct_answer, ...q.incorrect_answers];

          let shuffled = answers
            .map((value) => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value);

          return {
            question: q.question,
            answers: shuffled,
            correct_answer: q.correct_answer,
            id: getId(),
            song: q.song || '',
            image: q.image || '',
          };
        }
      );

      return res;
    } catch (error) {
      return [];
    }
  };

  const handleValidateJSONQuestions = () => {
    try {
      const json = JSON.parse(value);

      const validated = validateQuiz(json);

      setError(validated);
      return validated === '';
    } catch (error) {
      setError('Invalid JSON object.');
      return false;
    }
  };

  const handleCreateQuiz = async () => {
    const isValid = handleValidateJSONQuestions();

    if (title.length < 3) {
      setError('Title must have at least 3 characters.');
      return false;
    }

    if (isValid) {
      const questions = transformQuestions(value);

      const createdQuiz = await createQuiz({ category: category, difficulty: difficulty, title: title, questions: questions }).unwrap();
    }
  };

  return (
    <StyledAddQuiz className="AddQuiz">
      {isSuccess && (
        <Alert severity="success">
          <AlertTitle>Success!</AlertTitle>
          Quiz was succesfuly <strong>created!</strong>
        </Alert>
      )}
      <TextField helperText="" label="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <TextField helperText="" label="Category" value={category} onChange={(e) => setCategory(e.target.value)} />

      <FormControl fullWidth>
        <InputLabel id="difficulty">Difficulty</InputLabel>
        <Select
          labelId="difficulty-label"
          id="difficulty"
          value={difficulty}
          label="Difficulty"
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <MenuItem value={'easy'}>Easy</MenuItem>
          <MenuItem value={'medium'}>Medium</MenuItem>
          <MenuItem value={'hard'}>Hard</MenuItem>
        </Select>
      </FormControl>

      <textarea className="textarea" value={value} onChange={handleChange} />

      {error && (
        <Alert severity="error" sx={{ marginTop: '20px' }}>
          <AlertTitle>Error!</AlertTitle>
          {error}
        </Alert>
      )}

      <Button type="submit" variant="contained" fullWidth size="large" onClick={handleCreateQuiz} disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Create Quiz'}
      </Button>
    </StyledAddQuiz>
  );
};

export default AddQuiz;
