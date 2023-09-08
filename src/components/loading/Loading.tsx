

type props = {
   isFull?: boolean
}
export const Loading = ({ isFull }: props) => {
   return (
      <div className={`${isFull ? "loading--full" : ""}`}>
         <div
            className={`loading`}
            role="status"
            style={{ color: isFull ? "#3BB77E" : '#fff' }}
         >
            <span>

            </span>
         </div>
      </div>
   );
}
