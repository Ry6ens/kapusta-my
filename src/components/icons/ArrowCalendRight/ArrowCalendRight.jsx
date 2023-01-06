export default function ArrowCalendRightIcon({ className, width, height, onClick }) {
  return (
    <div className={className} onClick={onClick}>
      <svg
        width={width}
        height={height}
        viewBox="0 0 7 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="m1 1 4 5-4 5" stroke="#FF751D" strokeWidth="2" />
      </svg>
    </div>
  );
}
