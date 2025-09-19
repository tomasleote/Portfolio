import '../styles/SocialMediaIcon.css'

function SocialMediaIcon({ icon, url, label }) {
    const handleClick = () => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    return (
        <button 
            className="social-icon"
            onClick={handleClick}
            aria-label={label}
            title={label}
        >
            <i className={`fab ${icon}`}></i>
        </button>
    );
}

export default SocialMediaIcon;
