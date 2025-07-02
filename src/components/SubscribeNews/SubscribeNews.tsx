import React, { useState } from 'react';
import { ModalError } from '../ModalError';
import { ModalSuccess } from '../ModalSuccess';
import { subscribeApi } from '../../api/subscribe';
import { ModalLoader } from '../ModalLoader';
import { AxiosError } from 'axios';

export function SubscribeNews() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    subscribeApi(email)
      .then(() => setShowSuccess(true))
      .catch((e: AxiosError) => {
        const data = e?.response?.data as Record<string, string[]> | undefined;
        const alreadyExist =
          data &&
          Object.values(data)[0][0] === 'This subscription already exists.';

        if (alreadyExist) {
          setShowError(false);
          setShowSuccess(true);
        } else {
          setShowError(true);
        }
      })
      .catch(() => {
        setShowError(true);
      })
      .finally(() => {
        setLoading(false);
        setEmail('');
      });
  };

  if (loading) {
    return <ModalLoader />;
  }

  return (
    <>
      <ModalError
        title="Subscription Failed!"
        body="We couldn't add your email to our subscription list. Please check the address and try again."
        isActive={showError}
        onClose={() => setShowError(false)}
      />

      <ModalSuccess
        title="Subscription Successful!"
        body="Thank you! Your email has been added. Get ready for heartwarming stories and updates from our shelter."
        isActive={showSuccess}
        onClose={() => setShowSuccess(false)}
      />

      <div className="container">
        <div className="box has-background-primary p-2">
          <h2 className="title is-4 has-text-link has-text-centered mt-2 mb-2">
            Join Our Community
          </h2>

          <div className="block p-0">
            <p className="has-text-link has-text-centered m-0">
              Get the latest news, stories, and smiles delivered straight to
              you. Subscribe for your weekly dose of cute and see how you can
              make a difference.
            </p>

            <div className="columns is-justify-content-center py-4">
              <div className="column is-9-tablet is-6-desktop is-7-widescreen is-6-fullh">
                <form
                  className="is-flex p-2"
                  onSubmit={handleSubmit}
                >
                  <div
                    className="field"
                    style={{ flexGrow: 1 }}
                  >
                    <div className="control">
                      <input
                        type="email"
                        className="input"
                        placeholder="your.email@example.com"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="field">
                    <div className="control">
                      <button
                        type="submit"
                        className="button is-link px-3 ml-5"
                      >
                        Subscribe
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
