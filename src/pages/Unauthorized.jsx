import { Link } from 'react-router-dom';

const Unauthorized = () => (
  <section>
    <h1>Unauthorized</h1>
    <br />
    <p>You do not have access to the requested page.</p>
    <div className="flexGrow">
      <Link to="/" className="text-dark-blue">Go to home</Link>
    </div>
  </section>
);

export default Unauthorized;
