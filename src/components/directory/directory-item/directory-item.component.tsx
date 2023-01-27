import './directory-item.style.scss';

interface DirectoryItemProps {
  category: {
    imageUrl: string;
    title: string;
  };
}

const DirectoryItem = ({ category }: DirectoryItemProps) => {
  const { imageUrl, title } = category;

  return (
    <div className="directory-item-container">
      <div
        className="background-image"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      ></div>
      <div className="directory-item-body-container">
        <h2>{title}</h2>
        <p>Shop Now</p>
      </div>
    </div>
  );
};

export default DirectoryItem;
