import './directory-item.style.scss';

import { useNavigate } from 'react-router-dom';

interface DirectoryItemProps {
  category: {
    imageUrl: string;
    title: string;
    route: string;
  };
}

const DirectoryItem = ({ category }: DirectoryItemProps) => {
  const { imageUrl, title, route } = category;
  const naviagte = useNavigate();
  const onNavigateHandler = () => {
    naviagte(`shop/${route}`);
    console.log(`shop/${route}`);
  };

  return (
    <div className="directory-item-container">
      <div
        className="background-image"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
        onClick={onNavigateHandler}
      ></div>
      <div className="directory-item-body-container">
        <h2>{title}</h2>
        <p>Shop Now</p>
      </div>
    </div>
  );
};

export default DirectoryItem;
