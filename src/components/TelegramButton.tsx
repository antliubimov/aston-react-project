import React, { useCallback } from 'react';
import { Button, Image } from 'react-bootstrap';
import telegramImg from '../assets/images/telegram.svg';

type TelegramButtonProps = {
  id: string;
  name: string;
};

const getTelegramURL = ({ id, name }: TelegramButtonProps) => {
  const url = window.location.href;
  return `https://t.me/share/url?url=${encodeURIComponent(url)}/${id}&text=${encodeURIComponent(name)}`;
};

export const TelegramButton = (props: TelegramButtonProps) => {
  const handleClick = useCallback(() => {
    const encodeURL = getTelegramURL(props);
    window.open(encodeURL, '_blank');
  }, [props]);

  return (
    <Button onClick={handleClick} variant="outline-warning">
      <Image src={telegramImg} />
      Поделиться
    </Button>
  );
};
