import React, { useEffect, useState } from "react";
// import ChipInput from "material-ui-chip-input";
import Autosuggest from "react-autosuggest";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import Paper from "@mui/material/Paper";
import MenuItem from "@mui/material/MenuItem";
import { withStyles } from "@mui/material/styles";

const renderInput = (inputProps) => {
  const { value, onChange, chips, ref, ...other } = inputProps;

  return (
    <></>
    // <ChipInput
    //   label="Tags"
    //   clearInputValueOnChange
    //   onUpdateInput={onChange}
    //   value={chips}
    //   inputRef={ref}
    //   style={{ margin: 0, border: "1px solid black" }}
    //   variant="outlined"
    //   {...other}
    // />
  );
};

const renderSuggestion = (suggestion, { query, isHighlighted }) => {
  const matches = match(suggestion, query);
  const parts = parse(suggestion, matches);

  return (
    <MenuItem
      selected={isHighlighted}
      component="div"
      onMouseDown={(e) => e.preventDefault()} // prevent the click causing the input to be blurred
    >
      <div>
        {parts.map((part, index) => {
          return part.highlight ? (
            <span key={String(index)} style={{ fontWeight: 500 }}>
              {part.text}
            </span>
          ) : (
            <span key={String(index)}>{part.text}</span>
          );
        })}
      </div>
    </MenuItem>
  );
};

const renderSuggestionsContainer = (options) => {
  const { containerProps, children } = options;

  return (
    <Paper {...containerProps} square>
      {children}
    </Paper>
  );
};

const getSuggestionValue = (suggestion) => {
  return suggestion;
};

const styles: any = (theme) => ({
  container: {
    // flexGrow: 1,
    // position: "relative"
  },
  suggestionsContainerOpen: {
    // marginTop: theme.spacing.unit,
    // marginBottom: theme.spacing.unit * 3,
    marginLeft: 10,
    marginRight: 10,
    zIndex: 1,
  },
  suggestion: {
    display: "block",
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: "none",
  },
  textField: {
    width: "80%",
  },
});

interface AutoSuggestProps {
  data: any;
  classes?: any;
}

const ReactAutosuggest = (props: AutoSuggestProps) => {
  const { data, classes, ...other } = props;
  const [suggestion, setSuggestion] = useState([]);
  const [values, setValues]: any[] = useState([]);
  const [textFieldInput, setTextFieldInput] = useState("");

  useEffect(() => {
    setSuggestion(data);
  }, []);

  const getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    let count = 0;

    return inputLength === 0
      ? []
      : data.filter((suggestion) => {
          const keep = count < 5 && suggestion.toLowerCase().slice(0, inputLength) === inputValue;

          if (keep) {
            count += 1;
          }

          return keep;
        });
  };

  const handleSuggestionsFetchRequested = ({ value }) => {
    setSuggestion(getSuggestions(value));
  };

  const handleSuggestionsClearRequested = () => {
    setSuggestion([]);
  };

  const handletextFieldInputChange = (event, { newValue }) => {
    setTextFieldInput(newValue);
  };

  const handleAddChip = (chip) => {
    setValues([...values, chip]);
    setTextFieldInput("");
  };

  const handleDeleteChip = (chip, index) => {
    values.splice(index, 1);
    setValues([...values]);
  };

  return (
    <Autosuggest
      renderInputComponent={renderInput}
      suggestions={suggestion}
      onSuggestionsFetchRequested={handleSuggestionsFetchRequested}
      onSuggestionsClearRequested={handleSuggestionsClearRequested}
      renderSuggestionsContainer={renderSuggestionsContainer}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      onSuggestionSelected={(e, { suggestionValue }) => {
        handleAddChip(suggestionValue);
        e.preventDefault();
      }}
      focusInputOnSuggestionClick
      inputProps={{
        chips: values,
        value: textFieldInput,
        onChange: handletextFieldInputChange,
        onAdd: (chip) => handleAddChip(chip),
        onDelete: (chip, index) => handleDeleteChip(chip, index),
      }}
    />
  );
};

const ChipInputAutosuggest = ReactAutosuggest;

export default ChipInputAutosuggest;
