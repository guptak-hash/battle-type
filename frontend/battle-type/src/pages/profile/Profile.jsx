import  React from "react"
import {Link} from "react-router-dom"
import { useState } from "react"

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
  accountStatus: "Active",
  plan: "Free",
  testsThisMonth: 23,
}

const handleLogout = () => {
  console.log("Logging out...")
  window.location.href = "/"
}

const handleSaveProfile = () => {
  console.log("Saving profile...")
  alert("Profile saved successfully!")
}

const handleSavePreferences = () => {
  console.log("Saving preferences...")
  alert("Preferences saved successfully!")
}

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: userData.name,
    email: userData.email,
  })

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

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
              <Link
                to="/dashboard"
                className="px-4 py-2 border-2 border-[#323232] bg-white text-[#323232] font-semibold rounded-md shadow-[4px_4px_0px_#323232] hover:shadow-[2px_2px_0px_#323232] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
              >
                ← Dashboard
              </Link>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#2d8cf0] border-2 border-[#323232] rounded-full flex items-center justify-center text-white font-bold">
                  {userData.avatar}
                </div>
                <div>
                  <div className="font-bold text-[#323232]">{userData.name}</div>
                  <div className="text-sm text-[#666]">Rank #{userData.globalRank}</div>
                </div>
              </div>
              <div className="flex gap-2">
                <Link
                  href="/game"
                  className="px-4 py-2 border-2 border-[#323232] bg-[#2d8cf0] text-white font-semibold rounded-md shadow-[4px_4px_0px_#323232] hover:shadow-[2px_2px_0px_#323232] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                >
                  New Test
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 border-2 border-[#323232] bg-white text-[#323232] font-semibold rounded-md shadow-[4px_4px_0px_#323232] hover:shadow-[2px_2px_0px_#323232] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-4xl font-black text-[#323232] mb-2">Profile Settings</h1>
          <p className="text-lg text-[#666] font-semibold">Manage your account information and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Information */}
          <div className="lg:col-span-2 space-y-8">
            {/* Basic Information */}
            <div className="bg-white border-2 border-[#323232] rounded-lg shadow-[4px_4px_0px_#323232] p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-[#323232]">Profile Information</h3>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="px-4 py-2 border-2 border-[#323232] bg-white text-[#323232] font-semibold rounded-md shadow-[4px_4px_0px_#323232] hover:shadow-[2px_2px_0px_#323232] hover:translate-x-[2px] hover:translate-y-[2px] transition-all text-sm"
                >
                  {isEditing ? "Cancel" : "Edit"}
                </button>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 bg-[#2d8cf0] border-2 border-[#323232] rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    {userData.avatar}
                  </div>
                  <div>
                    <button className="px-4 py-2 border-2 border-[#323232] bg-white text-[#323232] font-semibold rounded-md shadow-[4px_4px_0px_#323232] hover:shadow-[2px_2px_0px_#323232] hover:translate-x-[2px] hover:translate-y-[2px] transition-all text-sm">
                      Change Avatar
                    </button>
                    <p className="text-xs text-[#666] mt-2">JPG, PNG or GIF. Max size 2MB.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-[#323232] mb-2">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-[#323232] rounded-md shadow-[4px_4px_0px_#323232] font-semibold text-[#323232] focus:outline-none focus:border-[#2d8cf0]"
                      readOnly={!isEditing}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#323232] mb-2">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-[#323232] rounded-md shadow-[4px_4px_0px_#323232] font-semibold text-[#323232] focus:outline-none focus:border-[#2d8cf0]"
                      readOnly={!isEditing}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#323232] mb-2">Member Since</label>
                  <input
                    type="text"
                    value={userData.joinDate}
                    className="w-full px-4 py-3 border-2 border-[#323232] rounded-md shadow-[4px_4px_0px_#323232] font-semibold text-[#323232] bg-gray-50"
                    readOnly
                  />
                </div>

                {isEditing && (
                  <div className="flex gap-4">
                    <button
                      onClick={handleSaveProfile}
                      className="px-6 py-3 border-2 border-[#323232] bg-[#2d8cf0] text-white font-semibold rounded-md shadow-[4px_4px_0px_#323232] hover:shadow-[2px_2px_0px_#323232] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-6 py-3 border-2 border-[#323232] bg-white text-[#323232] font-semibold rounded-md shadow-[4px_4px_0px_#323232] hover:shadow-[2px_2px_0px_#323232] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Security Settings */}
            {/* <div className="bg-white border-2 border-[#323232] rounded-lg shadow-[4px_4px_0px_#323232] p-6">
              <h3 className="text-xl font-bold text-[#323232] mb-6">Security Settings</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 border-2 border-[#323232] rounded-md">
                  <div>
                    <h4 className="font-semibold text-[#323232]">Password</h4>
                    <p className="text-sm text-[#666]">Last changed 3 months ago</p>
                  </div>
                  <button className="px-4 py-2 border-2 border-[#323232] bg-white text-[#323232] font-semibold rounded-md shadow-[4px_4px_0px_#323232] hover:shadow-[2px_2px_0px_#323232] hover:translate-x-[2px] hover:translate-y-[2px] transition-all text-sm">
                    Change Password
                  </button>
                </div>
                <div className="flex justify-between items-center p-4 border-2 border-[#323232] rounded-md">
                  <div>
                    <h4 className="font-semibold text-[#323232]">Two-Factor Authentication</h4>
                    <p className="text-sm text-[#666]">Add an extra layer of security</p>
                  </div>
                  <button className="px-4 py-2 border-2 border-[#323232] bg-[#2d8cf0] text-white font-semibold rounded-md shadow-[4px_4px_0px_#323232] hover:shadow-[2px_2px_0px_#323232] hover:translate-x-[2px] hover:translate-y-[2px] transition-all text-sm">
                    Enable 2FA
                  </button>
                </div>
              </div>
            </div> */}

            {/* Typing Preferences */}
            <div className="bg-white border-2 border-[#323232] rounded-lg shadow-[4px_4px_0px_#323232] p-6">
              <h3 className="text-xl font-bold text-[#323232] mb-6">Typing Preferences</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-[#323232] mb-2">Default Test Duration</label>
                  <select className="w-full px-4 py-3 border-2 border-[#323232] rounded-md shadow-[4px_4px_0px_#323232] font-semibold text-[#323232] focus:outline-none focus:border-[#2d8cf0]">
                    <option>30 seconds</option>
                    <option>1 minute</option>
                    <option>2 minutes</option>
                    <option>5 minutes</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#323232] mb-2">Difficulty Level</label>
                  <select className="w-full px-4 py-3 border-2 border-[#323232] rounded-md shadow-[4px_4px_0px_#323232] font-semibold text-[#323232] focus:outline-none focus:border-[#2d8cf0]">
                    <option>Easy</option>
                    <option>Medium</option>
                    <option>Hard</option>
                    <option>Expert</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#323232] mb-2">Theme</label>
                  <select className="w-full px-4 py-3 border-2 border-[#323232] rounded-md shadow-[4px_4px_0px_#323232] font-semibold text-[#323232] focus:outline-none focus:border-[#2d8cf0]">
                    <option>Default</option>
                    <option>Dark</option>
                    <option>High Contrast</option>
                    <option>Colorful</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#323232] mb-2">Sound Effects</label>
                  <select className="w-full px-4 py-3 border-2 border-[#323232] rounded-md shadow-[4px_4px_0px_#323232] font-semibold text-[#323232] focus:outline-none focus:border-[#2d8cf0]">
                    <option>Enabled</option>
                    <option>Disabled</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#323232] mb-2">Auto-Save Results</label>
                  <select className="w-full px-4 py-3 border-2 border-[#323232] rounded-md shadow-[4px_4px_0px_#323232] font-semibold text-[#323232] focus:outline-none focus:border-[#2d8cf0]">
                    <option>Yes</option>
                    <option>No</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#323232] mb-2">Show Live WPM</label>
                  <select className="w-full px-4 py-3 border-2 border-[#323232] rounded-md shadow-[4px_4px_0px_#323232] font-semibold text-[#323232] focus:outline-none focus:border-[#2d8cf0]">
                    <option>Yes</option>
                    <option>No</option>
                  </select>
                </div>
              </div>
              <div className="mt-6 flex gap-4">
                <button
                  onClick={handleSavePreferences}
                  className="px-6 py-3 border-2 border-[#323232] bg-[#2d8cf0] text-white font-semibold rounded-md shadow-[4px_4px_0px_#323232] hover:shadow-[2px_2px_0px_#323232] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                >
                  Save Preferences
                </button>
                <button className="px-6 py-3 border-2 border-[#323232] bg-white text-[#323232] font-semibold rounded-md shadow-[4px_4px_0px_#323232] hover:shadow-[2px_2px_0px_#323232] hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
                  Reset to Default
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Account Summary */}
            <div className="bg-white border-2 border-[#323232] rounded-lg shadow-[4px_4px_0px_#323232] p-6">
              <h3 className="text-lg font-bold text-[#323232] mb-4">Account Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm font-semibold text-[#666]">Status:</span>
                  <span className="text-sm font-bold text-green-600">{userData.accountStatus}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-semibold text-[#666]">Plan:</span>
                  <span className="text-sm font-bold text-[#323232]">{userData.plan}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-semibold text-[#666]">Tests This Month:</span>
                  <span className="text-sm font-bold text-[#2d8cf0]">{userData.testsThisMonth}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-semibold text-[#666]">Member Since:</span>
                  <span className="text-sm font-bold text-[#323232]">{userData.joinDate}</span>
                </div>
              </div>
              <button className="w-full mt-4 px-4 py-2 border-2 border-[#323232] bg-[#2d8cf0] text-white font-semibold rounded-md shadow-[4px_4px_0px_#323232] hover:shadow-[2px_2px_0px_#323232] hover:translate-x-[2px] hover:translate-y-[2px] transition-all text-sm">
                Upgrade to Pro
              </button>
            </div>

            {/* Quick Stats */}
            <div className="bg-white border-2 border-[#323232] rounded-lg shadow-[4px_4px_0px_#323232] p-6">
              <h3 className="text-lg font-bold text-[#323232] mb-4">Your Stats</h3>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-black text-[#2d8cf0]">{userData.bestWPM}</div>
                  <div className="text-xs text-[#666]">Best WPM</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-black text-[#323232]">{userData.averageAccuracy}%</div>
                  <div className="text-xs text-[#666]">Avg Accuracy</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-black text-[#2d8cf0]">{userData.currentStreak}</div>
                  <div className="text-xs text-[#666]">Day Streak</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-black text-[#323232]">#{userData.globalRank}</div>
                  <div className="text-xs text-[#666]">Global Rank</div>
                </div>
              </div>
              <Link
                to="/dashboard"
                className="w-full mt-4 px-4 py-2 border-2 border-[#323232] bg-white text-[#323232] font-semibold rounded-md shadow-[4px_4px_0px_#323232] hover:shadow-[2px_2px_0px_#323232] hover:translate-x-[2px] hover:translate-y-[2px] transition-all text-sm text-center block"
              >
                View Full Dashboard
              </Link>
            </div>

            {/* Account Actions */}
            {/* <div className="bg-white border-2 border-[#323232] rounded-lg shadow-[4px_4px_0px_#323232] p-6">
              <h3 className="text-lg font-bold text-[#323232] mb-4">Account Actions</h3>
              <div className="space-y-3">
                <button className="w-full px-4 py-2 border-2 border-[#323232] bg-white text-[#323232] font-semibold rounded-md shadow-[4px_4px_0px_#323232] hover:shadow-[2px_2px_0px_#323232] hover:translate-x-[2px] hover:translate-y-[2px] transition-all text-sm">
                  Export Data
                </button>
                <button className="w-full px-4 py-2 border-2 border-[#323232] bg-white text-[#323232] font-semibold rounded-md shadow-[4px_4px_0px_#323232] hover:shadow-[2px_2px_0px_#323232] hover:translate-x-[2px] hover:translate-y-[2px] transition-all text-sm">
                  Privacy Settings
                </button>
                <button className="w-full px-4 py-2 border-2 border-[#323232] bg-white text-[#323232] font-semibold rounded-md shadow-[4px_4px_0px_#323232] hover:shadow-[2px_2px_0px_#323232] hover:translate-x-[2px] hover:translate-y-[2px] transition-all text-sm">
                  Download App
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 border-2 border-[#323232] bg-red-500 text-white font-semibold rounded-md shadow-[4px_4px_0px_#323232] hover:shadow-[2px_2px_0px_#323232] hover:translate-x-[2px] hover:translate-y-[2px] transition-all text-sm"
                >
                  Logout
                </button>
              </div>
            </div> */}

            {/* Danger Zone */}
            <div className="bg-red-50 border-2 border-red-500 rounded-lg shadow-[4px_4px_0px_red-500] p-6">
              <h3 className="text-lg font-bold text-red-600 mb-4">Danger Zone</h3>
              <p className="text-sm text-red-600 mb-4">
                Once you delete your account, there is no going back. Please be certain.
              </p>
              <button className="w-full px-4 py-2 border-2 border-red-500 bg-red-500 text-white font-semibold rounded-md shadow-[4px_4px_0px_red-500] hover:shadow-[2px_2px_0px_red-500] hover:translate-x-[2px] hover:translate-y-[2px] transition-all text-sm">
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
