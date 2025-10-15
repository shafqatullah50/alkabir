import { useState } from 'react';
import { Calendar, Clock, DollarSign, TrendingUp, CheckCircle, AlertCircle, User } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Badge } from '../components/ui/badge';
import { Switch } from '../components/ui/switch';

export default function ProfessionalDashboard() {
  const [isAvailable, setIsAvailable] = useState(true);

  const stats = [
    { label: 'Total Earnings', value: '$12,450', icon: DollarSign, color: 'bg-green-100 text-green-600' },
    { label: 'Completed Jobs', value: '87', icon: CheckCircle, color: 'bg-blue-100 text-blue-600' },
    { label: 'Average Rating', value: '4.9', icon: TrendingUp, color: 'bg-yellow-100 text-yellow-600' },
    { label: 'Pending Jobs', value: '5', icon: AlertCircle, color: 'bg-orange-100 text-orange-600' },
  ];

  const upcomingJobs = [
    {
      id: '1',
      service: 'House Cleaning',
      customer: 'Sarah Williams',
      date: 'Oct 18, 2025',
      time: '10:00 AM',
      address: '456 Oak Ave, New York, NY',
      price: 150,
      status: 'confirmed',
    },
    {
      id: '2',
      service: 'Deep Cleaning',
      customer: 'Michael Brown',
      date: 'Oct 19, 2025',
      time: '2:00 PM',
      address: '789 Pine St, New York, NY',
      price: 200,
      status: 'pending',
    },
  ];

  const earnings = [
    { date: 'Oct 12, 2025', service: 'House Cleaning', amount: 150, status: 'paid' },
    { date: 'Oct 10, 2025', service: 'Deep Cleaning', amount: 200, status: 'paid' },
    { date: 'Oct 8, 2025', service: 'Window Cleaning', amount: 100, status: 'pending' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-10 h-10 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl text-gray-900">Professional Dashboard</h1>
                <p className="text-gray-600">Michael Johnson</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-600">Availability Status:</span>
              <Switch checked={isAvailable} onCheckedChange={setIsAvailable} />
              <span className={`text-sm ${isAvailable ? 'text-green-600' : 'text-gray-600'}`}>
                {isAvailable ? 'Available' : 'Unavailable'}
              </span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">{stat.label}</span>
                  <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center`}>
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
                <div className="text-3xl text-gray-900">{stat.value}</div>
              </div>
            );
          })}
        </div>

        {/* Main Content */}
        <Tabs defaultValue="jobs" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="jobs">Upcoming Jobs</TabsTrigger>
            <TabsTrigger value="earnings">Earnings</TabsTrigger>
            <TabsTrigger value="schedule">My Schedule</TabsTrigger>
          </TabsList>

          {/* Upcoming Jobs Tab */}
          <TabsContent value="jobs">
            <div className="space-y-4">
              {upcomingJobs.map((job) => (
                <div key={job.id} className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-xl text-gray-900 mb-1">{job.service}</h3>
                          <p className="text-gray-600">Customer: {job.customer}</p>
                        </div>
                        <Badge className={job.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}>
                          {job.status}
                        </Badge>
                      </div>

                      <div className="grid sm:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center space-x-2 text-gray-600">
                          <Calendar className="w-4 h-4" />
                          <span>{job.date}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-600">
                          <Clock className="w-4 h-4" />
                          <span>{job.time}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-600">
                          <DollarSign className="w-4 h-4" />
                          <span>${job.price}</span>
                        </div>
                      </div>

                      <p className="text-sm text-gray-600">{job.address}</p>
                    </div>

                    <div className="flex flex-col gap-2">
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">View Details</Button>
                      <Button size="sm" variant="outline">Get Directions</Button>
                      {job.status === 'pending' && (
                        <Button size="sm" variant="outline">Accept Job</Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Earnings Tab */}
          <TabsContent value="earnings">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl text-gray-900">Earnings History</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase">Date</th>
                      <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase">Service</th>
                      <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase">Amount</th>
                      <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {earnings.map((earning, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 text-sm text-gray-900">{earning.date}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{earning.service}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">${earning.amount}</td>
                        <td className="px-6 py-4">
                          <Badge className={earning.status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}>
                            {earning.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          {/* Schedule Tab */}
          <TabsContent value="schedule">
            <div className="bg-white rounded-xl shadow-sm p-8">
              <h2 className="text-xl text-gray-900 mb-6">Manage Your Availability</h2>
              <div className="space-y-6">
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg text-gray-900 mb-4">Weekly Schedule</h3>
                  <div className="space-y-3">
                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                      <div key={day} className="flex items-center justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-700">{day}</span>
                        <div className="flex items-center space-x-4">
                          <span className="text-sm text-gray-600">9:00 AM - 6:00 PM</span>
                          <Button variant="outline" size="sm">Edit</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg text-gray-900 mb-4">Time Off Requests</h3>
                  <p className="text-gray-600 mb-4">Block dates when you're unavailable</p>
                  <Button className="bg-blue-600 hover:bg-blue-700">Request Time Off</Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
