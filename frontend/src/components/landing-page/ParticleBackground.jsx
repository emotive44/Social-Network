import React from 'react';
import Particles from 'react-particles-js';


const ParticleBackground = () => {
  return (
    <div style={{height: '100vh'}}>
      <Particles
        params={{
          particles: {
            number: {
              value: 100
            },
            size: {
              value: 3
            },
            line_linked: {
              color: '#707070',
            }
          },
          interactivity: {
            events: {
              onhover: {
                enable: true,
                mode: 'repulse'
              }
            }
          },
        }}
      />
    </div>
  );
}

export default ParticleBackground;
