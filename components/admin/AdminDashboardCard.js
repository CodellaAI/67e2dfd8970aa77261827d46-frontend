
export default function AdminDashboardCard({ title, value, icon, trend, color }) {
  return (
    <div className="bg-white rounded-lg shadow-soft p-6">
      <div className="flex items-center">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${color} text-white`}>
          {icon}
        </div>
        <div className="ml-4">
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </div>
      {trend && (
        <div className="mt-2 flex items-center text-sm">
          <span className="text-green-500 font-medium">{trend}</span>
          <span className="ml-1 text-gray-500">from last month</span>
        </div>
      )}
    </div>
  )
}
