import { Component } from 'react';

import * as ImageService from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, CardItem } from 'components';
import { Loader } from '../components/Loader/Loader';
import { NotFound } from 'components/NotFound/NotFound';

const STATUS = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export class Gallery extends Component {
  state = {
    images: [],
    value: '',
    page: 1,
    results: 0,
    status: STATUS.IDLE,
  };

  async componentDidUpdate(_, prevState) {
    const { value, page } = this.state;
    try {
      if (prevState.value !== value || prevState.page !== page) {
        this.setState({ status: STATUS.PENDING });

        const { photos, total_results } = await ImageService.getImages(
          value,
          page
        );
        this.setState(prevState => ({
          images: [...prevState.images, ...photos],
          results: total_results,
          status: STATUS.RESOLVED,
        }));
      }
    } catch (error) {
      this.setState({ status: STATUS.REJECTED });
      throw new Error(error.message);
    }
  }

  onHandleSubmit = value => {
    this.setState({ value, images: [], page: 1, results: 0 });
  };

  onHandleLoadMoreBtnClick = () => {
    this.setState(prevState => ({
      page: (prevState.page += 1),
    }));
  };

  render() {
    const { images, results, status } = this.state;

    return (
      <>
        <SearchForm onSubmit={this.onHandleSubmit} />
        <Grid>
          {images.map(({ id, avg_color, alt, src }) => (
            <GridItem key={id}>
              <CardItem color={avg_color}>
                <img src={src.large} alt={alt} />
              </CardItem>
            </GridItem>
          ))}
        </Grid>
        {status === STATUS.RESOLVED && results > images.length && (
          <Button onClick={this.onHandleLoadMoreBtnClick}>Load more</Button>
        )}
        {status === STATUS.RESOLVED && !images.length && <NotFound />}
        {status === STATUS.PENDING && <Loader />}
      </>
    );
  }
}
