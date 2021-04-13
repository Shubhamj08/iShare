import React from 'react';
import logo from '../assets/ishare-logo-large.png';

const styles = {
    height: '80vh',
    backgroundImage: `url(${logo})`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
}

const Home = () => {
    return (
        <div style={styles}></div>
     );
}
 
export default Home;