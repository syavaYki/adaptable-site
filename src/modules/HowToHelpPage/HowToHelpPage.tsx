import React from 'react';
import {
  Box,
  Button,
  Columns,
  Content,
  Heading,
  Section,
} from 'react-bulma-components';

export const HowToHelpPage = () => {
  return (
    <Section>
      <Columns centered>
        <Columns.Column size="four-fifths">
          <Box>
            <figure className="image is-2by1 mb-5">
              <img
                src="assets\how-to-help-banner.png"
                alt="A banner showing happy pets"
                style={{ borderRadius: '8px' }}
              />
            </figure>

            <Heading className="has-text-centered">How You Can Help</Heading>
            <Content>
              <p className="is-size-5 has-text-centered">
                Every year, millions of loving animals end up in shelters,
                waiting for a second chance. Your support can make a world of
                difference. Here’s how you can be a hero for a pet in need.
              </p>
            </Content>
            <hr />

            <Columns>
              <Columns.Column>
                <Heading size={4}>Why Adopt, Not Shop?</Heading>
                <Content>
                  <p>
                    When you adopt, you&apos;re not just getting a new
                    pet—you&apos;re saving a life. Commercial breeding
                    facilities (puppy and kitten mills) often prioritize profit
                    over animal welfare, leading to poor conditions and
                    unhealthy animals.
                  </p>
                  <ul>
                    <li>
                      <strong>Save a Life:</strong> Adoption gives a deserving
                      animal a home and frees up shelter space for another one
                      in need.
                    </li>
                    <li>
                      <strong>Get a Great Animal:</strong> Many shelter pets are
                      already house-trained and accustomed to living with
                      families.
                    </li>
                    <li>
                      <strong>Cost-Effective:</strong> Adoption fees are much
                      lower than buying from a breeder and usually include
                      vaccinations and spaying/neutering.
                    </li>
                  </ul>
                </Content>
              </Columns.Column>

              <Columns.Column>
                <Heading size={4}>Donate</Heading>
                <Content>
                  <p>
                    Your financial support is crucial. Donations help us provide
                    food, medical care, shelter, and spay/neuter services for
                    our animals. Every dollar counts!
                  </p>

                  <div className="is-flex is-justify-content-center">
                    <figure className="image is-128x128  mb-5">
                      <img
                        src="assets\donation-qr-code.png"
                        alt="A banner showing happy pets"
                      />
                    </figure>
                  </div>
                  <p className="is-size-7 has-text-centered mt-2">
                    We are a registered 501(c)(3) non-profit organization.
                  </p>
                </Content>
              </Columns.Column>
            </Columns>
            <hr />

            <div className="has-text-centered">
              <Heading size={4}>Support Our Partners</Heading>
              <Content>
                <p>
                  These organizations do incredible work for animal welfare
                  across the country. Consider supporting them as well.
                </p>
                <Button.Group centered>
                  <Button
                    renderAs="a"
                    href="https://www.aspca.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    color="info"
                  >
                    ASPCA
                  </Button>
                  <Button
                    renderAs="a"
                    href="https://www.humanesociety.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    color="info"
                  >
                    The Humane Society
                  </Button>
                  <Button
                    renderAs="a"
                    href="https://www.bestfriends.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    color="info"
                  >
                    Best Friends Animal Society
                  </Button>
                </Button.Group>
              </Content>
            </div>
          </Box>
        </Columns.Column>
      </Columns>
    </Section>
  );
};
