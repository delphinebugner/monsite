import './App.css';
import { StandardTextFieldProps, TextField } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { useApp } from './useApp';
import { Field, ImageAdmin } from './interfaces';
import { Dispatch } from 'react';

const StyledTextField = withStyles({
  root: {
    margin: '10px',
  },
})(TextField);

const StyledButton = withStyles({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    marginTop: '50px',
  },
  label: {
    color: 'white',
    fontWeight: 'bold',
  },
})(Button);

const fields: Field[] = [
  { id: 'src', label: 'Source*' },
  { id: 'title', label: 'Titre*' },
  { id: 'description', label: 'Description' },
  { id: 'year', label: 'Année*', helper: 'Format string 2019, 2020...' },
  { id: 'month', label: 'Mois*', helper: 'Format string 01, 02...12' },
  {
    id: 'tags',
    label: 'Galleries*',
    helper: 'ID de galleries séparées par des virgules. Ex: paris, musee',
  },
];

const App = () => {
  const {
    futureImage,
    setFutureImage,
    error,
    validateAndSendDataInJsonConfig,
  } = useApp();

  return (
    <div className="App">
      <form className="Form" noValidate autoComplete="off">
        {fields.map((field, i) => (
          <MyTextField
            key={i}
            id={field.id}
            label={field.label}
            helperText={field.helper}
            futureImage={futureImage}
            setFutureImage={setFutureImage}
            error={error}
          />
        ))}
        <StyledButton
          onClick={() => validateAndSendDataInJsonConfig(futureImage)}
        >
          Valider
        </StyledButton>
      </form>
    </div>
  );
};

interface MyTextFieldProps extends StandardTextFieldProps {
  setFutureImage: Dispatch<React.SetStateAction<ImageAdmin>>;
  futureImage: ImageAdmin;
  id: keyof ImageAdmin;
}

const MyTextField: React.FC<MyTextFieldProps> = ({
  error,
  futureImage,
  setFutureImage,
  id,
  label,
  helperText,
}) => {
  return (
    <StyledTextField
      id={id}
      label={label}
      error={error}
      onChange={event =>
        setFutureImage(currentImage => ({
          ...currentImage,
          [id]: event.target.value,
        }))
      }
      value={futureImage[id]}
      helperText={helperText}
    />
  );
};

export default App;
