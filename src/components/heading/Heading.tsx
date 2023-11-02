

interface props {
  title: string;
  slogan?: string;
 
}

export const Heading = ({ title, slogan   }: props) => {
  return (
    <div className="content-header">
      <div>
        <h2 className="content-title card-title">{title}</h2>
        <p>{slogan}</p>
      </div>
   
    </div>
  )
}
