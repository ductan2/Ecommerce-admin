

interface props {
  title: string;
  slogan?: string;
  isSearch?: boolean;
  placeholder?: string;
}

export const Heading = ({ title, slogan, isSearch, placeholder }: props) => {
  return (
    <div className="content-header">
      <div>
        <h2 className="content-title card-title">{title}</h2>
        <p>{slogan}</p>
      </div>
      {isSearch && (
        <div>
          <input type="text" placeholder={placeholder} className="form-control bg-white" />
        </div>
      )}
    </div>
  )
}
