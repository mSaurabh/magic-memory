import { iCard } from "../App";
import "./SingleCard.css";
interface SingleCardProps {
  card: iCard;
  coverSrc: string;
  handleChoice: Function;
  flipped: boolean;
  disabled: boolean;
}

const SingleCard = (props: SingleCardProps) => {
  const { card, coverSrc, flipped, handleChoice, disabled } = props;

  const handleClick = () => {
    !disabled && handleChoice(card);
  };

  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <img src={card.src} className="front" alt="card front" />
        <img
          src={coverSrc}
          alt="card back"
          onClick={handleClick}
          className="back"
        />
      </div>
    </div>
  );
};

export default SingleCard;
