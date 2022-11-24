import React, { useEffect } from 'react';

const BacktoTop = () => {
  useEffect(() => {
    const toTop = document.querySelector('.to-top');
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 100) {
        toTop.classList.add('active');
      } else {
        toTop.classList.remove('active');
      }
    });
  }, []);

  return (
    // eslint-disable-next-line
    <a href="#" className="to-top">
      <i className="fas fa-solid fa-chevron-up"></i>
    </a>
  );
};

export default BacktoTop;
