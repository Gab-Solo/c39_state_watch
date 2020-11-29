import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { Link, useHistory } from 'react-router-dom';
import backArrow from '../../assets/images/backArrow.svg';
import email from '../../assets/images/email.svg';
import phone from '../../assets/images/phone.svg';
import { TwitterTimelineEmbed } from 'react-twitter-embed';

import './RepProfile.css';

const RepProfile = (props) => {
  const history = useHistory();
  const { individualRep, setIndividualRep } = useContext(AppContext);
  const [twitter, setTwitter] = useState('USAGov');
  //console.log(props.location.state.pass);
  const representative = props.location.state.pass;
  //setIndividualRep(representative);
  //console.log(props.location.state.pass);
  //console.log(representative);

  useEffect(() => {
    if (!props.location.state.pass) {
      history.push('./');
    }
  });

  const twitterUsername = representative.identifiers.filter((rep) => {
    if (rep.identifier_type.toLowerCase() === 'twitter') {
      console.log(rep.identifier_value);
      return rep.identifier_value;
    }
  });

  console.log(twitterUsername[0].identifier_value);

  const goBack = () => {
    history.goBack();
  };

  return (
    <div className="rp-body">
      <div className="rp-repcard">
        <img src={backArrow} className="backArrow" onClick={goBack} />
        <p className="rp-party">
          {representative.party
            ? representative.party.toUpperCase()
            : 'Independent'}
        </p>
        <div className="rp-profileinfo-container">
          <div className="rp-profilePhoto">
            <img src={representative.photo_origin_url} />
          </div>
          <div className="rp-namestack">
            <div className="rp-profileinfo">
              <h5 className="rp-name">
                {representative.first_name + ' ' + representative.last_name}
              </h5>
              <h6 className="rp-jobtitle">
                {representative.office.title +
                  ', ' +
                  (representative.office.representing_city
                    ? representative.office.representing_city
                    : representative.office.representing_state)}
              </h6>
            </div>
            <Link
              to={{
                pathname: '/MsgRep',
                state: {
                  pass:
                    representative.first_name + ' ' + representative.last_name
                }
              }}
            >
              <button className="rp-sendbutton">SEND MESSAGE</button>
            </Link>
          </div>
        </div>
        <div className="rp-footerinfo">
          <div>
            <img src={email} className="rp-icons" />
            <p className="rp-emailinfo">
              {representative.email_addresses[0]
                ? representative.email_addresses[0]
                : 'No-Email'}
            </p>
          </div>
          <div>
            <img src={phone} className="rp-icons" />
            <p className="rp-phoneinfo">
              {representative.addresses[0].phone_1
                ? representative.addresses[0].phone_1
                : representative.addresses[0].fax_1}
            </p>
          </div>
        </div>
      </div>
      <div className="rp-twitter">
        <div>
          <p className="rp-subtitles">
            What They're <span>Saying</span>
          </p>
        </div>
        <div className="twitterfeed">
          <TwitterTimelineEmbed
            sourceType="profile"
            screenName={twitterUsername[0].identifier_value}
            options={{ height: 400 }}
          />
        </div>
      </div>
      <div>
        <p className="rp-subtitles">
          Their <span>Story</span>
        </p>
        <p className="rp-Bio">{representative.notes}</p>
      </div>
    </div>
  );
};

export default RepProfile;
