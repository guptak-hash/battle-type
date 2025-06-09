import { Link } from 'react-router-dom'
import { useState, useEffect, useRef } from "react"
import { userService } from '../../services/userService'

// Mock data - replace with real data from your backend
const userData = {
  name: "Alex Johnson",
  email: "alex@example.com",
  joinDate: "March 2024",
  avatar: "AJ",
  currentStreak: 7,
  totalTests: 156,
  bestWPM: 87,
  averageWPM: 72,
  averageAccuracy: 94.5,
  totalTimeTyped: "24h 32m",
  globalRank: 1247,
  weeklyRank: 23,
}

const recentTests = [
  { id: 1, date: "2024-01-15", wpm: 85, accuracy: 96, duration: "1m", text: "Lorem ipsum dolor..." },
  { id: 2, date: "2024-01-14", wpm: 78, accuracy: 94, duration: "2m", text: "The quick brown fox..." },
  { id: 3, date: "2024-01-14", wpm: 82, accuracy: 97, duration: "1m", text: "Programming is fun..." },
  { id: 4, date: "2024-01-13", wpm: 76, accuracy: 92, duration: "3m", text: "Web development..." },
  { id: 5, date: "2024-01-13", wpm: 89, accuracy: 98, duration: "1m", text: "React components..." },
]

const achievements = [
  { id: 1, name: "Speed Demon", description: "Reach 80+ WPM", icon: "⚡", unlocked: true },
  { id: 2, name: "Accuracy Master", description: "95%+ accuracy for 10 tests", icon: "🎯", unlocked: true },
  { id: 3, name: "Consistent Typer", description: "7-day streak", icon: "🔥", unlocked: true },
  { id: 4, name: "Century Club", description: "Reach 100+ WPM", icon: "💯", unlocked: false },
  { id: 5, name: "Marathon Typer", description: "Type for 1 hour total", icon: "🏃", unlocked: true },
  { id: 6, name: "Perfect Score", description: "100% accuracy test", icon: "⭐", unlocked: false },
]

const weeklyProgress = [
  { day: "Mon", wpm: 68, accuracy: 92 },
  { day: "Tue", wpm: 72, accuracy: 94 },
  { day: "Wed", wpm: 75, accuracy: 96 },
  { day: "Thu", wpm: 78, accuracy: 93 },
  { day: "Fri", wpm: 82, accuracy: 97 },
  { day: "Sat", wpm: 85, accuracy: 95 },
  { day: "Sun", wpm: 87, accuracy: 98 },
]

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [profile, setProfile] = useState(null)
  const profileMenuRef = useRef(null)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await userService.getProfile();
        setProfile(data.user);
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      }
    };
    fetchProfile();

    // Close profile menu when clicking outside
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b-2 border-[#323232] bg-white">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="text-2xl font-black text-[#323232]">
              TypeFast
            </Link>
            <div className="flex items-center gap-4">
              <div className="relative">
                <button 
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center gap-3 focus:outline-none"
                   style={{ backgroundColor: "white" }}
                >
                  <div className="w-10 h-10 bg-[#2d8cf0] border-2 border-[#323232] rounded-full flex items-center justify-center text-white font-bold">
                    {profile ? profile.name.charAt(0).toUpperCase() : userData.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-[#323232]">{profile ? profile.name : userData.name}</div>
                    <div className="text-sm text-[#666]">Rank #{userData.globalRank}</div>
                  </div>
                </button>
                
                {showProfileMenu && (
                  <div 
                    ref={profileMenuRef}
                    className="absolute right-0 mt-2 w-48 bg-white border-2 border-[#323232] rounded-lg shadow-[4px_4px_0px_#323232] py-2 z-50"
                  >
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-[#323232] hover:bg-[#f0f0f0] font-semibold"
                    >
                      View Profile
                    </Link>
                    <button
                      onClick={userService.logout}
                      className="block w-full text-left px-4 py-2 text-red-600 hover:bg-[#f0f0f0] font-semibold"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
              <Link
                to="/typingGame"
                className="px-4 py-2 border-2 border-[#323232] bg-[#2d8cf0] text-white font-semibold rounded-md shadow-[4px_4px_0px_#323232] hover:shadow-[2px_2px_0px_#323232] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
              >
                New Test
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Navigation Tabs */}
        <div className="flex gap-2 mb-8">
          {[
            { id: "overview", label: "Overview" },
            { id: "stats", label: "Statistics" },
            { id: "history", label: "Test History" },
            { id: "achievements", label: "Achievements" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 border-2 border-[#323232] font-semibold rounded-md transition-all ${
                activeTab === tab.id
                  ? "bg-[#2d8cf0] text-white shadow-[4px_4px_0px_#323232]"
                  : "bg-white text-[#323232] shadow-[4px_4px_0px_#323232] hover:shadow-[2px_2px_0px_#323232] hover:translate-x-[2px] hover:translate-y-[2px]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white border-2 border-[#323232] rounded-lg shadow-[4px_4px_0px_#323232] p-6">
                <div className="text-3xl font-black text-[#2d8cf0] mb-2">{userData.bestWPM}</div>
                <div className="text-sm font-semibold text-[#323232]">Best WPM</div>
                <div className="text-xs text-[#666]">Personal Record</div>
              </div>
              <div className="bg-white border-2 border-[#323232] rounded-lg shadow-[4px_4px_0px_#323232] p-6">
                <div className="text-3xl font-black text-[#2d8cf0] mb-2">{userData.averageAccuracy}%</div>
                <div className="text-sm font-semibold text-[#323232]">Avg Accuracy</div>
                <div className="text-xs text-[#666]">Last 30 days</div>
              </div>
              <div className="bg-white border-2 border-[#323232] rounded-lg shadow-[4px_4px_0px_#323232] p-6">
                <div className="text-3xl font-black text-[#2d8cf0] mb-2">{userData.currentStreak}</div>
                <div className="text-sm font-semibold text-[#323232]">Day Streak</div>
                <div className="text-xs text-[#666]">Keep it up! 🔥</div>
              </div>
              <div className="bg-white border-2 border-[#323232] rounded-lg shadow-[4px_4px_0px_#323232] p-6">
                <div className="text-3xl font-black text-[#2d8cf0] mb-2">{userData.totalTests}</div>
                <div className="text-sm font-semibold text-[#323232]">Total Tests</div>
                <div className="text-xs text-[#666]">Since {userData.joinDate}</div>
              </div>
            </div>

            {/* Weekly Progress Chart */}
            <div className="bg-white border-2 border-[#323232] rounded-lg shadow-[4px_4px_0px_#323232] p-6">
              <h3 className="text-xl font-bold text-[#323232] mb-6">This Week's Progress</h3>
              <div className="flex items-end justify-between gap-4 h-48">
                {weeklyProgress.map((day, index) => (
                  <div key={day.day} className="flex flex-col items-center gap-2 flex-1">
                    <div className="text-xs font-semibold text-[#666]">{day.wpm} WPM</div>
                    <div
                      className="w-full bg-[#2d8cf0] border-2 border-[#323232] rounded-t-md"
                      style={{ height: `${(day.wpm / 100) * 100}%` }}
                    />
                    <div className="text-sm font-semibold text-[#323232]">{day.day}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Tests */}
            <div className="bg-white border-2 border-[#323232] rounded-lg shadow-[4px_4px_0px_#323232] p-6">
              <h3 className="text-xl font-bold text-[#323232] mb-6">Recent Tests</h3>
              <div className="space-y-3">
                {recentTests.slice(0, 3).map((test) => (
                  <div
                    key={test.id}
                    className="flex items-center justify-between p-4 border-2 border-[#323232] rounded-md"
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-2xl font-bold text-[#2d8cf0]">{test.wpm}</div>
                      <div>
                        <div className="font-semibold text-[#323232]">{test.accuracy}% accuracy</div>
                        <div className="text-sm text-[#666]">
                          {test.date} • {test.duration}
                        </div>
                      </div>
                    </div>
                    <div className="text-sm text-[#666] max-w-xs truncate">{test.text}</div>
                  </div>
                ))}
              </div>
              <Link
                to="/dashboard?tab=history"
                className="inline-block mt-4 text-[#2d8cf0] font-semibold hover:underline"
              >
                View all tests →
              </Link>
            </div>
          </div>
        )}

        {/* Statistics Tab */}
        {activeTab === "stats" && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Detailed Stats */}
              <div className="bg-white border-2 border-[#323232] rounded-lg shadow-[4px_4px_0px_#323232] p-6">
                <h3 className="text-xl font-bold text-[#323232] mb-6">Typing Statistics</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="font-semibold text-[#323232]">Average WPM:</span>
                    <span className="text-[#2d8cf0] font-bold">{userData.averageWPM}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-[#323232]">Best WPM:</span>
                    <span className="text-[#2d8cf0] font-bold">{userData.bestWPM}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-[#323232]">Average Accuracy:</span>
                    <span className="text-[#2d8cf0] font-bold">{userData.averageAccuracy}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-[#323232]">Total Time Typed:</span>
                    <span className="text-[#2d8cf0] font-bold">{userData.totalTimeTyped}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-[#323232]">Tests Completed:</span>
                    <span className="text-[#2d8cf0] font-bold">{userData.totalTests}</span>
                  </div>
                </div>
              </div>

              {/* Rankings */}
              <div className="bg-white border-2 border-[#323232] rounded-lg shadow-[4px_4px_0px_#323232] p-6">
                <h3 className="text-xl font-bold text-[#323232] mb-6">Rankings</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="font-semibold text-[#323232]">Global Rank:</span>
                    <span className="text-[#2d8cf0] font-bold">#{userData.globalRank}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-[#323232]">Weekly Rank:</span>
                    <span className="text-[#2d8cf0] font-bold">#{userData.weeklyRank}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-[#323232]">Current Streak:</span>
                    <span className="text-[#2d8cf0] font-bold">{userData.currentStreak} days</span>
                  </div>
                </div>
                <Link
                  to="/leaderboard"
                  className="inline-block mt-4 px-4 py-2 border-2 border-[#323232] bg-white text-[#323232] font-semibold rounded-md shadow-[4px_4px_0px_#323232] hover:shadow-[2px_2px_0px_#323232] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                >
                  View Leaderboard
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Test History Tab */}
        {activeTab === "history" && (
          <div className="bg-white border-2 border-[#323232] rounded-lg shadow-[4px_4px_0px_#323232] p-6">
            <h3 className="text-xl font-bold text-[#323232] mb-6">Test History</h3>
            <div className="space-y-3">
              {recentTests.map((test) => (
                <div
                  key={test.id}
                  className="flex items-center justify-between p-4 border-2 border-[#323232] rounded-md"
                >
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[#2d8cf0]">{test.wpm}</div>
                      <div className="text-xs text-[#666]">WPM</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[#323232]">{test.accuracy}%</div>
                      <div className="text-xs text-[#666]">Accuracy</div>
                    </div>
                    <div>
                      <div className="font-semibold text-[#323232]">{test.duration} test</div>
                      <div className="text-sm text-[#666]">{test.date}</div>
                    </div>
                  </div>
                  <div className="text-sm text-[#666] max-w-xs truncate">{test.text}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Achievements Tab */}
        {activeTab === "achievements" && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`border-2 border-[#323232] rounded-lg shadow-[4px_4px_0px_#323232] p-6 ${
                    achievement.unlocked ? "bg-white" : "bg-gray-100"
                  }`}
                >
                  <div className="text-center">
                    <div className={`text-4xl mb-3 ${achievement.unlocked ? "" : "grayscale opacity-50"}`}>
                      {achievement.icon}
                    </div>
                    <h4 className={`font-bold mb-2 ${achievement.unlocked ? "text-[#323232]" : "text-[#666]"}`}>
                      {achievement.name}
                    </h4>
                    <p className={`text-sm ${achievement.unlocked ? "text-[#666]" : "text-[#999]"}`}>
                      {achievement.description}
                    </p>
                    {achievement.unlocked && (
                      <div className="mt-3 text-xs font-semibold text-[#2d8cf0]">✓ UNLOCKED</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
