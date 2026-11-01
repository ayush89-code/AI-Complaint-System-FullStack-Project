function Card({ children }) {
  return (
    <div
      className="
        relative overflow-hidden
        bg-white/60 backdrop-blur-lg
        border border-white/30
        rounded-2xl p-6 mb-6
        shadow-md
        transition-all duration-300
        hover:shadow-2xl hover:-translate-y-1
        hover:bg-white/80
      "
    >
      {/* glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-200/20 to-transparent opacity-0 hover:opacity-100 transition" />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}

export default Card
