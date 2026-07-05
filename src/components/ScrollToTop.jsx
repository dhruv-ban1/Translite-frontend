import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Instantly scroll to the top left corner whenever the URL path changes
    window.scrollTo(0, 0);
  }, [pathname]);

  return null; // This component is invisible, it just runs the logic
}