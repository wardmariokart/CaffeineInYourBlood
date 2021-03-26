import styles from '../css/button.module.css'
import PropTypes from 'prop-types';

export const buttonStyles = {
    regular: 'regular',
    accent: 'accent'
}

export const buttonSizes = {
    small: 'small',
    regular: 'regular',
    big: 'big'
}

const Button = ({text, style, size, onClick}) => {

    const styleClasses = {
        regular: styles.styleRegular,
        accent: styles.styleAccent,
    }

    const sizeClasses = {
        small: styles.sizeSmall,
        regular: styles.sizeRegular,
        big: styles.sizeBig,
    }

    const styleClass = styleClasses[style] ?? styleClasses.regular;
    const sizeClass = sizeClasses[size] ?? sizeClasses.regular;

    return <button className={`${styleClass} ${sizeClass}`} onClick={onClick}>{text}</button>;
}

Button.defaultProps = {
    text: 'button',
    onClick: () => {},
}

Button.propTypes = {
    style: PropTypes.string.isRequired,
    size: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
}

export default Button;