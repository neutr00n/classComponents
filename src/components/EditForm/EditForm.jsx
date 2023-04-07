import { RiSaveLine } from 'react-icons/ri';
import { MdOutlineCancel } from 'react-icons/md';

import { SearchFormStyled, FormBtn, InputSearch } from 'components';
import { BtnEdit } from './EditForm.styled';
import { useEffect } from 'react';

export const EditForm = ({ onCancel, currentTodo, onChange, onUpdate }) => {
  useEffect(() => {
    const handleCloseEditFormByEsc = ({ code }) => {
      if (code !== 'Escape') {
        return;
      }
      onCancel();
    };

    document.addEventListener('keydown', handleCloseEditFormByEsc);

    return () =>
      document.removeEventListener('keydown', handleCloseEditFormByEsc);
  }, [onCancel]);

  const handleInputValue = ({ target: { value } }) => {
    onChange(value);
  };

  const handleFormSubmit = evt => {
    evt.preventDefault();
    onUpdate();
    onCancel();
  };

  return (
    <SearchFormStyled onSubmit={handleFormSubmit}>
      <BtnEdit type="button" onClick={onCancel}>
        <MdOutlineCancel size="16px" color="red" />
      </BtnEdit>

      <FormBtn type="submit">
        <RiSaveLine size="16px" color="green" />
      </FormBtn>

      <InputSearch
        placeholder="EDIT TODO"
        name="edit"
        required
        defaultValue={currentTodo.text}
        autoFocus
        onChange={handleInputValue}
      />
    </SearchFormStyled>
  );
};
