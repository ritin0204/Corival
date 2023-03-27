import fetchRequest, { getCsrfToken } from '../requests';

const Home = () => {
    fetchRequest('/', 'get', null)
    .then(data => console.log(data))
    .catch(err => console.log(err));
    return (
        <div className="home">
        </div>
    );
}

export default Home;