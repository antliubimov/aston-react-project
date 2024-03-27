import React from 'react';
import { Button, Form, Image } from 'react-bootstrap';

interface SignFormProps {
  title: string;
  imageSrc: string;
  btnName: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
}

export const SignForm = (props: SignFormProps) => {
  const {
    title,
    imageSrc,
    btnName,
    onSubmit,
    children
  } = props;

  return (
    <main className="d-flex justify-content-center align-items-center vh-100">
      <div className="d-flex w-75 justify-content-center align-items-center">
        <div className="w-25 m-3">
          <Image src={imageSrc} alt={title} fluid />
        </div>
        <div className="w-50">
          <h1 className="text-warning">{title}</h1>
          <Form onSubmit={onSubmit} className="d-flex flex-column gap-3">
            {children}
            <Button variant="outline-warning" type="submit">{btnName}</Button>
          </Form>
        </div>
      </div>
    </main>
  );
};
