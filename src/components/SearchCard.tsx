import React from 'react';
import { Button, Card } from 'react-bootstrap';
import _ from 'lodash';
import { MovieType } from '../types/ReduxTypes/MovieType';
import { useFeatureFlag } from '../core/hooks';
import { TelegramButton } from './TelegramButton';
import { useAppSelector } from '../core/hooks/hooks';

type SearchCardProps = {
  handleAdd: (movie: MovieType) => () => void;
  movie: MovieType;
};

export const SearchCard = (props: SearchCardProps) => {
  const { Title, Year, imdbID, Type, Poster } = props.movie;
  const { isTelegramShareEnabled } = useFeatureFlag();
  const { favorites } = useAppSelector((state) => state.favorites);

  const isFavorite = !!_.find(favorites, props.movie);

  return (
    <Card className="h-100">
      <Card.Img variant="top" src={Poster} alt={Title} />
      <Card.Body>
        <Card.Title>{Title}</Card.Title>
        <Card.Text>Год: {Year}</Card.Text>
        <Card.Text>Тип: {Type}</Card.Text>
      </Card.Body>
      {isTelegramShareEnabled && <TelegramButton id={imdbID} />}
      {isFavorite ? (
        <Button disabled variant="outline-light">
          В избранном
        </Button>
      ) : (
        <Button
          onClick={props.handleAdd(props.movie)}
          variant="outline-success"
        >
          Добавить в избранное
        </Button>
      )}
    </Card>
  );
};
