import { useState } from 'react';

const useRecaptcha = () => {
  const [verify, setVerify] = useState(false);
  const [verifyMsg, setVerifyMsg] = useState(false);

  return { verify, verifyMsg, setVerify, setVerifyMsg };
};

export default useRecaptcha;
