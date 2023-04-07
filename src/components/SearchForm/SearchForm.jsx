import { Component } from 'react';

import { FiSearch } from 'react-icons/fi';
import { FormBtn, InputSearch, SearchFormStyled } from './SearchForm.styled';

export class SearchForm extends Component {
  state = {
    value: '',
  };

  onHandleSubmit = evt => {
    evt.preventDefault();
    this.props.onSubmit(this.state.value);

    this.setState({ value: '' });
  };

  onHandleChange = evt => {
    this.setState({ value: evt.target.value });
  };
  render() {
    return (
      <SearchFormStyled onSubmit={this.onHandleSubmit}>
        <FormBtn type="submit">
          <FiSearch size="16px" />
        </FormBtn>
        <InputSearch
          placeholder="What do you want to write?"
          name="search"
          required
          value={this.state.value}
          autoFocus
          onChange={this.onHandleChange}
        />
      </SearchFormStyled>
    );
  }
}
