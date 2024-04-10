import React, { SyntheticEvent, memo } from 'react';
import { Button, Form } from 'react-bootstrap';

type SearchFormProps = {
  title: string;
  btnName: string;
  onSubmit: (e: SyntheticEvent<EventTarget>) => void;
  children: React.ReactNode;
};

export const SearchForm = memo((props: SearchFormProps) => {
  const { title, btnName, onSubmit, children } = props;

  return (
    <main className="d-flex p-lg-2 search_container">
      <div className="d-flex w-75 align-items-center">
        <div className="w-50">
          <h1 className="text-warning">{title}</h1>
          <Form onSubmit={onSubmit} className="d-flex gap-3">
            {children}
            <Button variant="outline-warning" type="submit">
              {btnName}
            </Button>
          </Form>
        </div>
      </div>
    </main>
  );
});

SearchForm.displayName = 'SearchForm';
