import './FullPageLoader.css';

const FullPageLoader = () => {
    return (
        <div className="loader-container">
            <div className="loader">
                <img src={require('../../assets/img/loader.gif')} alt={"loading picture"} />
            </div>
        </div>
    );
}

export default FullPageLoader;
