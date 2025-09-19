const ThemeBackground = () => {
  return (
    <>
      {/* Animated gradient base */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 animate-pulse"
        style={{ animationDuration: "4s" }}
      />

      {/* Hexagonal pattern overlay */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff08' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='m0 40 40-40h-40v40z'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Sparkle effects */}
      <div
        className="absolute top-24 left-1/3 w-2 h-2 bg-white opacity-0 animate-ping"
        style={{ animationDuration: "3s" }}
      />
      <div
        className="absolute top-1/3 right-1/4 w-3 h-3 bg-yellow-300 opacity-0 animate-ping"
        style={{ animationDuration: "4s", animationDelay: "1s" }}
      />
    </>
  );
};

export default ThemeBackground;
