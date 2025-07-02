import React from 'react';
import style from './FooterElem.module.scss';
import {
  Columns,
  Container,
  Footer,
  Content,
  Heading,
} from 'react-bulma-components';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppSelector } from '../../app/hooks';
import {
  faFacebook,
  faTwitter,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';
import classNames from 'classnames';

export const FooterElem = () => {
  const { loggedIn } = useAppSelector(state => state.auth);

  return (
    <Footer
      className={classNames(
        'has-background-primary has-text-light py-5',
        style.container,
      )}
    >
      <Container>
        <Columns>
          <Columns.Column className="p-0 mb-5">
            <Heading
              size={5}
              className="has-text-light"
            >
              Adaptable
            </Heading>

            <p className="is-size-6">
              Find your new best friend. Give a pet a forever home.
            </p>
          </Columns.Column>

          <Columns.Column
            className={classNames(
              'is-flex is-flex-direction-column p-0',
              style.navigation_links,
            )}
          >
            <Heading
              size={5}
              textAlign="center"
              className="has-text-light"
            >
              Navigate
            </Heading>

            <div className="is-flex">
              <Columns.Column
                paddingless
                size="half"
                className="is-flex is-flex-direction-column"
                style={{ gap: '1rem' }}
              >
                <Link
                  to="/"
                  className="has-text-primary-90 is-size-5"
                >
                  Home
                </Link>

                <Link
                  to="/catalog"
                  className="has-text-primary-90 is-size-5"
                >
                  Catalog
                </Link>
              </Columns.Column>

              <Columns.Column
                paddingless
                className="is-flex is-flex-direction-column"
                style={{ gap: '1rem' }}
              >
                {loggedIn ? (
                  <Link
                    to="/account"
                    className="has-text-primary-90 is-size-5"
                  >
                    My Account
                  </Link>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="has-text-primary-90 is-size-5"
                    >
                      Login
                    </Link>

                    <Link
                      to="/register"
                      className="has-text-primary-90 is-size-5"
                    >
                      Register
                    </Link>
                  </>
                )}
              </Columns.Column>
            </div>
          </Columns.Column>

          <Columns.Column className="p-0">
            <Heading
              size={5}
              className="has-text-light"
              textAlign="center"
            >
              Follow Us
            </Heading>

            <div className={style.social_links}>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="has-text-link"
              >
                <FontAwesomeIcon
                  icon={faFacebook}
                  size="2x"
                />
              </a>

              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="has-text-link"
              >
                <FontAwesomeIcon
                  icon={faTwitter}
                  size="2x"
                />
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="has-text-link"
              >
                <FontAwesomeIcon
                  icon={faInstagram}
                  size="2x"
                />
              </a>
            </div>
          </Columns.Column>
        </Columns>

        <hr className={style.footer_hr} />
        <Content className="has-text-centered">
          <p className="is-size-7">
            &copy; {new Date().getFullYear()} Adaptable. All Rights Reserved.
          </p>
        </Content>
      </Container>
    </Footer>
  );
};
