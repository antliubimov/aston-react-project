import React from 'react';
import './HistoryPageStyles.css';
import { useAppDispatch, useAppSelector } from '../../core/hooks/hooks';
import { removeHistory } from '../../core/slices/historySlice';
import { HistoryType } from '../../types/ReduxTypes/MovieType';

export const HistoryPage = () => {
  const dispatch = useAppDispatch();
  const { history } = useAppSelector((state) => state.history);

  const handleRemove = (item: HistoryType) => {
    dispatch(removeHistory(item));
  };

  return (
    <div className="container_history">
      <h4 className="history_title">Вы смотрели:</h4>
      {history.length > 0 &&
        history.map(({ id, url }) => (
          <div key={id} className="history">
            <a href={url}>{url}</a>
            <button onClick={() => handleRemove({ id, url })}>Удалить</button>
          </div>
        ))}
    </div>
  );
};
