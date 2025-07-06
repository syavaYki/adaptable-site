import React from 'react';
import { Columns, Container, Heading } from 'react-bulma-components';
import { Link } from 'react-router-dom';
import bannerImg from '../../assets/partner-with-us-banner-small.png';
import { VALID_ROUTES } from '../../types/validRoutes';

export const HomeBannerPartner = () => {
  return (
    <div>
      <Container>
        <Columns className="is-vcentered">
          <Columns.Column size={6}>
            <figure className="image  mb-5">
              <img
                src={bannerImg}
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
            <Heading size={2}>Partner With Us</Heading>
            <p>
              Stronger Together. We partner with fellow shelters and rescues to
              amplify our impact, creating a powerful network to find loving
              homes for every animal. Join our life-saving mission and
              let&apos;s make a bigger difference, together.
            </p>

            <Link
              to={`/${VALID_ROUTES.PARTNER_WITH_US}`}
              className="button is-primary mt-5"
            >
              Partner With Us Today
            </Link>
          </Columns.Column>
        </Columns>
      </Container>
    </div>
  );
};
