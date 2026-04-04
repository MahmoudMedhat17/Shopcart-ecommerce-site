const ScrollToTop = () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth", // Optional: adds a smooth scrolling animation
  });
};

export default ScrollToTop;
