import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { Heading, Navbar } from 'react-bulma-components';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { logout } from '../../features/authentication';

type Props = {
  onLinkClick: (pth: string, filterKey?: string, filteVal?: string) => void;
};

export const AcountLinkHeader: React.FC<Props> = ({ onLinkClick }) => {
  const naviagate = useNavigate();
  const dispatch = useAppDispatch();
  const { visible: mobileMenuVisible } = useAppSelector(
    state => state.menuVisible,
  );
  const { loggedIn } = useAppSelector(state => state.auth);

  function handleLogout() {
    dispatch(logout());
    naviagate('/');
  }

  if (loggedIn) {
    return (
      <>
        {!mobileMenuVisible ? (
          <>
            <Navbar.Link
              arrowless
              onClick={() => onLinkClick('/account')}
            >
              <span
                onClick={() => onLinkClick('/account')}
                className={classNames(
                  'icon-text has-text-link',
                  'is-align-items-center',
                  'is-flex-direction-column',
                )}
              >
                <span className={classNames('icon')}>
                  <FontAwesomeIcon
                    icon={faUser}
                    size="2x"
                    className={classNames('has-text-black')}
                  />
                </span>

                <span className={classNames('has-text-black')}>Account</span>
              </span>
            </Navbar.Link>

            <Navbar.Dropdown right>
              <Navbar.Item onClick={() => naviagate('/account')}>
                <Navbar.Link arrowless>
                  <Heading size={5}>Account</Heading>
                </Navbar.Link>
              </Navbar.Item>

              <Navbar.Item onClick={handleLogout}>
                <Navbar.Link arrowless>
                  <Heading size={5}>Logout</Heading>
                </Navbar.Link>
              </Navbar.Item>
            </Navbar.Dropdown>
          </>
        ) : (
          <>
            <Navbar.Link
              className="pl-0"
              arrowless
            >
              <Heading
                size={4}
                onClick={() => onLinkClick('/account')}
              >
                Account
              </Heading>
            </Navbar.Link>

            <Navbar.Link
              className="pl-0"
              onClick={handleLogout}
              arrowless
            >
              <Heading size={4}>Logout</Heading>
            </Navbar.Link>
          </>
        )}
      </>
    );
  }

  return (
    <>
      {!mobileMenuVisible ? (
        <>
          <Navbar.Link
            arrowless
            className="p-0"
          >
            <span
              className={classNames(
                'icon-text has-text-link',
                'is-align-items-center',
                'is-flex-direction-column',
              )}
            >
              <span
                className={classNames('icon')}
                onClick={() => naviagate('/account')}
              >
                <FontAwesomeIcon
                  icon={faUser}
                  size="2x"
                  className={classNames('has-text-black')}
                />
              </span>

              <span className={classNames('has-text-black')}>Account</span>
            </span>
          </Navbar.Link>

          <Navbar.Dropdown right>
            <Navbar.Item onClick={() => naviagate('/login')}>
              <Navbar.Link arrowless>
                <Heading size={5}>Login</Heading>
              </Navbar.Link>
            </Navbar.Item>

            <Navbar.Item onClick={() => naviagate('/register')}>
              <Navbar.Link arrowless>
                <Heading size={5}>Register</Heading>
              </Navbar.Link>
            </Navbar.Item>
          </Navbar.Dropdown>
        </>
      ) : (
        <>
          <Navbar.Link
            arrowless
            className="pl-0"
            onClick={() => onLinkClick('/login')}
          >
            <Heading size={4}>Login</Heading>
          </Navbar.Link>

          <Navbar.Link
            arrowless
            onClick={() => onLinkClick('/register')}
            className="pl-0"
          >
            <Heading size={4}>Register</Heading>
          </Navbar.Link>
        </>
      )}
    </>
  );
};
