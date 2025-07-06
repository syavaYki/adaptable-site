import React from 'react';
import { useEffect } from 'react';
import style from './Header.module.scss';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';

import { Heading, Navbar } from 'react-bulma-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw } from '@fortawesome/free-solid-svg-icons';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as menuActions } from '../../features/mobilMenu';
import { AcountLinkHeader } from '../AcountLinkHeader';
import { VALID_ROUTES } from '../../types/validRoutes';
import logo from '../../assets/header-logo.png';

export const Header = () => {
  const { visible: mobileMenuVisible } = useAppSelector(
    state => state.menuVisible,
  );
  const { favorites } = useAppSelector(state => state.favorite);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    window.addEventListener('resize', function () {
      if (document.body.clientWidth > 1024) {
        dispatch(menuActions.setMenuVisibility(false));
      }
    });
  }, []);

  function onLinkClick(pth: string, filterKey = '', filteVal = '') {
    dispatch(menuActions.setMenuVisibility(false));
    const params = new URLSearchParams();
    params.set(filterKey, filteVal);

    if (filteVal && filterKey) {
      navigate({
        pathname: pth,
        search: params.toString(),
      });
    } else {
      navigate({
        pathname: pth,
      });
    }
  }

  return (
    <Navbar
      className={classNames('mx-2', style.header, {
        [style.full_page]: mobileMenuVisible,
      })}
      active={mobileMenuVisible}
    >
      <Navbar.Brand className="mr-5">
        <a
          className={classNames('is-flex is-align-items-center', {
            [style.custom_hover]: !mobileMenuVisible,
          })}
          onClick={() => onLinkClick('/')}
        >
          <img
            src={logo}
            className={style.logo_image}
          />
        </a>

        <a
          role="button"
          className="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarStore"
          onClick={() => dispatch(menuActions.toggle())}
        >
          <span
            aria-hidden="true"
            className="has-text-black"
          ></span>

          <span
            aria-hidden="true"
            className="has-text-black"
          ></span>

          <span
            aria-hidden="true"
            className="has-text-black"
          ></span>

          <span
            aria-hidden="true"
            className="has-text-black"
          ></span>
        </a>
      </Navbar.Brand>

      <Navbar.Menu
        className={classNames({ [style.full_page]: mobileMenuVisible })}
      >
        <Navbar.Container
          align="left"
          className="py-2"
        >
          <Navbar.Item onClick={() => onLinkClick('/')}>
            <Navbar.Link
              arrowless
              className="p-0"
            >
              <Heading size={5}>Home</Heading>
            </Navbar.Link>
          </Navbar.Item>

          <Navbar.Item hoverable>
            <Navbar.Link onClick={() => onLinkClick('/catalog')}>
              <Heading size={5}>Find Friend</Heading>
            </Navbar.Link>

            <Navbar.Dropdown>
              <Navbar.Item
                onClick={() =>
                  onLinkClick(`/${VALID_ROUTES.CATALOG}`, 'pet_type', 'cat')
                }
              >
                <Navbar.Link>
                  <Heading size={6}>Cat</Heading>
                </Navbar.Link>
              </Navbar.Item>

              <Navbar.Item
                onClick={() =>
                  onLinkClick(`/${VALID_ROUTES.CATALOG}`, 'pet_type', 'dog')
                }
              >
                <Navbar.Link>
                  <Heading size={6}>Dog</Heading>
                </Navbar.Link>
              </Navbar.Item>

              <Navbar.Item
                onClick={() => onLinkClick(`/${VALID_ROUTES.CATALOG}`)}
              >
                <Navbar.Link>
                  <Heading size={6}>All Friends</Heading>
                </Navbar.Link>
              </Navbar.Item>
            </Navbar.Dropdown>
          </Navbar.Item>

          <Navbar.Item
            className="pr-4"
            onClick={() => onLinkClick(`/${VALID_ROUTES.HOW_TO_HELP}`)}
          >
            <Navbar.Link
              arrowless
              className="p-0"
            >
              <Heading size={5}>How To Help</Heading>
            </Navbar.Link>
          </Navbar.Item>

          <Navbar.Item
            className="pr-4"
            onClick={() => onLinkClick(`/${VALID_ROUTES.PARTNER_WITH_US}`)}
          >
            <Navbar.Link
              arrowless
              className="p-0"
            >
              <Heading size={5}>Partner With Us</Heading>
            </Navbar.Link>
          </Navbar.Item>
        </Navbar.Container>

        <Navbar.Container
          align="right"
          className=""
        >
          <Navbar.Item
            className={classNames('navbar-item', {
              [style.custom_hover]: !mobileMenuVisible,
              [style.header_txt]: mobileMenuVisible,
            })}
            onClick={() => onLinkClick('/favorites')}
          >
            {!mobileMenuVisible ? (
              <Navbar.Link className="p-0">
                <span
                  className={classNames(
                    'icon-text has-text-link',
                    'is-align-items-center',
                    'is-flex-direction-column',
                    style.icon_text_header,
                  )}
                >
                  <span className={classNames('icon')}>
                    <FontAwesomeIcon
                      icon={faPaw}
                      size="3x"
                      className={classNames('has-text-black')}
                    />
                  </span>
                  <span className={classNames('has-text-black')}>Favorite</span>
                </span>

                {favorites.length > 0 && !mobileMenuVisible && (
                  <div className={style.container_count}>
                    <span className={style.count}>{favorites.length}</span>
                  </div>
                )}
              </Navbar.Link>
            ) : (
              <Navbar.Link className="pl-0">
                <Heading size={5}>Favorite</Heading>
              </Navbar.Link>
            )}
          </Navbar.Item>

          <Navbar.Item hoverable>
            <AcountLinkHeader onLinkClick={onLinkClick} />
          </Navbar.Item>
        </Navbar.Container>
      </Navbar.Menu>
    </Navbar>
  );
};
