export const TickIcon = ({ height = 24, width = 24 }) => {
  const hClass = `h-[${height}px]`;
  const wClass = `w-[${width}px]`;

  return (
    <svg
      className={`me-2 ${hClass} ${wClass} sm:h-4 sm:w-4`}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      />
    </svg>
  );
};
