import React from 'react';
import { Columns, Container, Heading } from 'react-bulma-components';
import { Link } from 'react-router-dom';

export const HomeBanner2 = () => {
  return (
    <div>
      <Container>
        <Columns className="is-vcentered">
          <Columns.Column size={6}>
            <figure className="image  mb-5">
              <img
                src="%PUBLIC_URL%\assets\how-to-help-banner-sqr.png"
                alt="A banner showing happy pets"
                style={{
                  borderRadius: '38px',
                  objectFit: 'cover',
                  maxHeight: '250px',
                }}
              />
            </figure>
          </Columns.Column>

          <Columns.Column
            className="is-flex is-flex-direction-column is-justify-content-center"
            size={6}
          >
            <Heading size={2}>How You Can Help</Heading>
            <p>
              There are many ways you can support our mission to find loving
              homes for pets. From volunteering your time to donating, every
              little bit helps us care for our animals and find them their
              forever families.
            </p>
            <Link
              to="/how-to-help"
              className="button is-primary mt-5"
            >
              Learn More
            </Link>
          </Columns.Column>
        </Columns>
      </Container>
    </div>
  );
};
