import React from 'react';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import partnerImg from '../../assets/partner-with-us-banner-main.png';

export const PartnerWithUsPage = () => {
  return (
    <main className="container my-6">
      <div className="has-text-centered">
        <h1 className="title is-1 has-text-grey-darker mb-2">
          Partner With Us
        </h1>

        <h2 className="subtitle is-4 has-text-grey mb-2">
          Let&apos;s connect our communities to find loving homes for every pet.
        </h2>

        <figure className="image is-16by9 mb-6">
          <img
            className="has-ratio"
            src={partnerImg}
            alt="A diverse group of happy dogs and cats together"
            style={{
              borderRadius: '12px',
              objectFit: 'cover',
            }}
          />
        </figure>

        <div className="columns is-centered">
          <div className="column is-four-fifths content is-medium has-text-left">
            <div className="mb-6">
              <h3 className="title is-3 has-text-grey-darker">
                Why Partnership is Key
              </h3>

              <p>
                At Happy Paws Shelter, we believe that collaboration is the most
                effective way to address the challenges of animal homelessness.
                No single organization can do it alone. By joining forces, we
                can create a powerful network that extends our reach, shares
                vital resources, and ultimately saves more lives. When we work
                together, we amplify our impact and bring more hope to animals
                in need.
              </p>
            </div>

            <div>
              <h3 className="title is-3 has-text-grey-darker">
                How We Can Help Each Other
              </h3>

              <p className="mb-4">
                Our partnership program is designed to be mutually beneficial.
                We envision a community where shelters and adoption agencies
                can:
              </p>

              <ul>
                <li>
                  <strong>Cross-promote adoptable pets</strong> on each
                  other&apos;s websites and social media channels to reach a
                  wider audience.
                </li>

                <li>
                  <strong>Share transport resources</strong> to move animals
                  from overcrowded areas to places with higher adoption demand.
                </li>
                <li>
                  <strong>Collaborate on adoption events</strong> to create
                  bigger, more impactful community gatherings.
                </li>

                <li>
                  <strong>Exchange knowledge and best practices</strong> on
                  animal care, volunteer management, and fundraising.
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="columns is-centered mt-6">
          <div className="column is-four-fifths">
            <div className="box p-6 has-background-white-ter">
              <h3 className="title is-2 has-text-info-dark">
                Join Our Lifesaving Network
              </h3>

              <p className="is-size-5 mb-5">
                If you represent a shelter, rescue, or adoption agency and share
                our vision, we would be thrilled to connect with you. Let&apos;s
                start a conversation about how we can work together to give
                every animal the chance they deserve.
              </p>

              <a
                href="mailto:partnerships@adoptable.com?subject=Inquiry About Partnership Program"
                className="button is-primary is-large is-rounded"
              >
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="mr-4"
                />

                <span>Partner With Us Today</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
