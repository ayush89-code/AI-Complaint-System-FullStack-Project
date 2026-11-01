function StatusBadge({ value }) {
  const styles = {
    Pending: "bg-yellow-100 text-yellow-700 border-yellow-300",
    Resolved: "bg-green-100 text-green-700 border-green-300",
    Rejected: "bg-red-100 text-red-700 border-red-300"
  }

  return (
    <span
      className={`
        px-4 py-1 text-xs font-semibold
        rounded-full border
        transition-all duration-300
        hover:scale-105
        ${styles[value]}
      `}
    >
      {value}
    </span>
  )
}

export default StatusBadge
