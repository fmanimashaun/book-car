import { Link } from 'react-router-dom';

const Missing = () => (
  <article style={{ padding: '100px' }}>
    <h1>Oops!</h1>
    <p>Page Not Found</p>
    <div className="flexGrow">
      <Link to="/" className="text-dark-blue">Visit Our Homepage</Link>
    </div>
  </article>
);

export default Missing;
