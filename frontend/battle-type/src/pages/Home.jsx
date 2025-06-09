import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, Text } from "@react-three/drei";
import { Suspense, useRef, useState } from "react";
import { Link } from "react-router-dom";
import * as THREE from "three";

// 3D Text Component
function FloatingLetter({ letter, position, color = "#323232" }) {
  const meshRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime + position[0]) * 0.2;
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5 + position[1]) * 0.3;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.5;
    }
  });

  return (
    <Text
      ref={meshRef}
      fontSize={2}
      position={position}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      font="/fonts/Geist-Bold.ttf"
    >
      {letter}
      <meshStandardMaterial
        color={hovered ? "#2d8cf0" : color}
        roughness={0.3}
        metalness={0.1}
      />
    </Text>
  );
}

// 3D Scene Component
function TypingScene() {
  const letters = ["T", "Y", "P", "E", "F", "A", "S", "T"];

  return (
    <>
      <Environment preset="studio" />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#2d8cf0" />

      {letters.map((letter, index) => (
        <FloatingLetter
          key={letter + index}
          letter={letter}
          position={[(index - letters.length / 2) * 2, Math.sin(index) * 2, Math.cos(index) * 2]}
        />
      ))}

      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
    </>
  );
}

export default function LandingPage() {
  const isAuthenticated = localStorage.getItem('token');

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* 3D Animation Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 15], fov: 50 }}>
          <Suspense fallback={null}>
            <TypingScene />
          </Suspense>
        </Canvas>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="p-6">
          <nav className="flex justify-between items-center max-w-6xl mx-auto">
            <div className="text-2xl font-black text-[#323232]">TypeFast</div>
            <div className="flex gap-4">
              <Link
                to="/signup"
                className="px-6 py-2 border-2 border-[#323232] bg-white text-[#323232] font-semibold rounded-md shadow-[4px_4px_0px_#323232] hover:shadow-[2px_2px_0px_#323232] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
              >
                Login
              </Link>
              <Link
                to="/login"
                className="px-6 py-2 border-2 border-[#323232] bg-[#2d8cf0] text-white font-semibold rounded-md shadow-[4px_4px_0px_#323232] hover:shadow-[2px_2px_0px_#323232] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
              >
                Sign Up
              </Link>
            </div>
          </nav>
        </header>

        {/* Hero Section */}
        <main className="flex-1 flex items-center justify-center px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-white/90 backdrop-blur-sm border-2 border-[#323232] rounded-lg shadow-[8px_8px_0px_#323232] p-8 mb-8">
              <h1 className="text-6xl md:text-8xl font-black text-[#323232] mb-6 leading-tight">
                TYPE
                <span className="text-[#2d8cf0]">FAST</span>
              </h1>
              <p className="text-xl md:text-2xl text-[#666] font-semibold mb-8 max-w-2xl mx-auto">
                Challenge yourself with the ultimate typing speed test. Improve your WPM, compete with friends, and
                become a typing master!
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  to="/typingGame"
                  className="px-8 py-4 text-xl font-bold border-2 border-[#323232] bg-[#2d8cf0] text-white rounded-md shadow-[6px_6px_0px_#323232] hover:shadow-[3px_3px_0px_#323232] hover:translate-x-[3px] hover:translate-y-[3px] transition-all"
                >
                  Start Typing Test
                </Link>
                <Link
                  to={isAuthenticated ? "/dashboard" : "/signup"}
                  className="px-8 py-4 text-xl font-bold border-2 border-[#323232] bg-white text-[#323232] rounded-md shadow-[6px_6px_0px_#323232] hover:shadow-[3px_3px_0px_#323232] hover:translate-x-[3px] hover:translate-y-[3px] transition-all"
                >
                  {isAuthenticated ? "View Dashboard" : "Get Started"}
                </Link>
              </div>
            </div>

            {/* Features */}
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <div className="bg-white/90 backdrop-blur-sm border-2 border-[#323232] rounded-lg shadow-[4px_4px_0px_#323232] p-6">
                <div className="text-3xl mb-4">⚡</div>
                <h3 className="text-xl font-bold text-[#323232] mb-2">Lightning Fast</h3>
                <p className="text-[#666] font-medium">
                  Real-time WPM tracking with instant feedback on your typing speed and accuracy.
                </p>
              </div>

              <div className="bg-white/90 backdrop-blur-sm border-2 border-[#323232] rounded-lg shadow-[4px_4px_0px_#323232] p-6">
                <div className="text-3xl mb-4">🏆</div>
                <h3 className="text-xl font-bold text-[#323232] mb-2">Compete & Win</h3>
                <p className="text-[#666] font-medium">
                  Challenge friends and climb the global leaderboard to prove your typing skills.
                </p>
              </div>

              <div className="bg-white/90 backdrop-blur-sm border-2 border-[#323232] rounded-lg shadow-[4px_4px_0px_#323232] p-6">
                <div className="text-3xl mb-4">📈</div>
                <h3 className="text-xl font-bold text-[#323232] mb-2">Track Progress</h3>
                <p className="text-[#666] font-medium">
                  Monitor your improvement over time with detailed statistics and performance analytics.
                </p>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="p-6 text-center">
          <div className="max-w-6xl mx-auto">
            <p className="text-[#666] font-medium">
              Ready to test your typing speed?
              <Link to="/auth" className="text-[#2d8cf0] font-bold hover:underline ml-2">
                Get Started Now →
              </Link>
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
