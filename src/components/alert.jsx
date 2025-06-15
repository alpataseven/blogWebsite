export default function Alert({ type = "info", children }) {
  const bg = {
    info: "bg-blue-100 text-blue-700",
    warning: "bg-yellow-100 text-yellow-800",
    danger: "bg-red-100 text-red-800",
  };

  return (
    <div className={`p-3 my-4 rounded ${bg[type]}`}>
      {children}
    </div>
  );
}
