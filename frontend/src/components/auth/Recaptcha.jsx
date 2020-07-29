import React from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

const Recaptcha = ({ verify, verifyMsg, setVerify }) => {
  const recaptchaHandler = (value) => {
    if (value) {
      setVerify(true);
    }
  };

  return (
    <div style={{ width: '30rem', margin: '1rem auto' }}>
      <ReCAPTCHA
        sitekey="6LcWr7MZAAAAACcy-tn0TQH2qGPdCEBOcQKcruXI"
        onChange={recaptchaHandler}
      />
      {verifyMsg && !verify && (
        <p style={{ color: 'red', textAlign: 'center' }}>
          Please check that you are not a robot!
        </p>
      )}
    </div>
  );
};

export default Recaptcha;
