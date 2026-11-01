function Button({ text, type, onClick }) {
  const base =
    "px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300"

  const styles = {
    success:
      "bg-green-500 text-white hover:bg-green-600 hover:shadow-lg hover:scale-105",
    danger:
      "bg-red-500 text-white hover:bg-red-600 hover:shadow-lg hover:scale-105"
  }

  return (
    <button onClick={onClick} className={`${base} ${styles[type]}`}>
      {text}
    </button>
  )
}

export default Button
