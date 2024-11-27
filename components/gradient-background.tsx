export function GradientBackground() {
  return (
    <div className="relative w-full h-full bg-[#121214] overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600 to-red-500 opacity-70" />
        <div className="absolute inset-0">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="absolute inset-0 border border-white/10 rounded-full"
              style={{
                transform: `scale(${1 + i * 0.2})`,
                opacity: 1 - i * 0.2,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}